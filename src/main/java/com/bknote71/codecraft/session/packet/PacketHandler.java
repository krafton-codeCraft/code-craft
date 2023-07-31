package com.bknote71.codecraft.session.packet;

import com.bknote71.codecraft.entity.RobotSpecEntity;
import com.bknote71.codecraft.entity.UserEntity;
import com.bknote71.codecraft.proto.CEnterBattle;
import com.bknote71.codecraft.proto.Protocol;
import com.bknote71.codecraft.entity.repository.UserRepository;
import com.bknote71.codecraft.robocode.core.battle.Battle;
import com.bknote71.codecraft.robocode.core.battle.BattleManager;
import com.bknote71.codecraft.robocode.core.RobotSpecification;
import com.bknote71.codecraft.session.ClientSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import javax.transaction.Transactional;

@Slf4j
@Component
@Transactional
@RequiredArgsConstructor
public class PacketHandler {

    private final UserRepository userRepository;

    public void CEnterBattleHandler(ClientSession clientSession, Protocol protocol) {
        log.info("client enter game");
        CEnterBattle enterPacket = (CEnterBattle) protocol;

        // 로봇피어를 생성하기 전에 specification 을 읽어와야 한다.
        // 어디서? enterPacket <<
        UserEntity user = userRepository.findByUsername(enterPacket.getUsername());

        int specCount = user.getSpecifications().size();
        RobotSpecification[] robotSpecifications = new RobotSpecification[specCount];
        for (int i = 0; i < specCount; ++i) {
            RobotSpecEntity spec = user.getSpecifications().get(i);
            robotSpecifications[i] = new RobotSpecification(spec.getName(), spec.getAuthor(), spec.getFullClassName());
        }

        // 배틀 방 찾기
        Integer battleId = getBattleId(clientSession.getWebSocketSession());
        Battle battle = BattleManager.Instance.find(battleId);
        battle.push(battle::enterBattle, robotSpecifications, clientSession);
    }

    private Integer getBattleId(WebSocketSession session) {
        String[] paths = session.getUri().getPath().split("/");
        // path: /battle/{battleId}
        Integer roomId = Integer.valueOf(paths[2]);
        return roomId;
    }
}
