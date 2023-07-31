package com.bknote71.codecraft.session.packet;

import com.bknote71.codecraft.entity.RobotSpecEntity;
import com.bknote71.codecraft.entity.UserEntity;
import com.bknote71.codecraft.proto.CEnterBattle;
import com.bknote71.codecraft.proto.Protocol;
import com.bknote71.codecraft.entity.repository.UserRepository;
import com.bknote71.codecraft.robocode.core.RobotManager;
import com.bknote71.codecraft.robocode.core.RobotPeer;
import com.bknote71.codecraft.robocode.core.battle.Battle;
import com.bknote71.codecraft.robocode.core.battle.BattleManager;
import com.bknote71.codecraft.robocode.core.RobotSpecification;
import com.bknote71.codecraft.session.ClientSession;
import com.bknote71.codecraft.session.ClientSessionManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Component
@Transactional
@RequiredArgsConstructor
public class PacketHandler {

    private final UserRepository userRepository;

    public void CEnterBattleHandler(ClientSession clientSession, Protocol protocol) {
        log.info("client enter game");
        CEnterBattle enterPacket = (CEnterBattle) protocol;

        // 로봇 생성 (음.. 어떻게 하지?)
        // 로봇피어를 생성하기 전에 specification 을 읽어와야 한다.
        String username = clientSession.getUsername();
        username = username.equals("anon") ? enterPacket.getUsername() : username;

        // robot index = 0
        RobotPeer robot = createRobotPeer(clientSession, username, 0);
        if (robot == null) {
            System.out.println("로봇 생성 실패");
            return;
        }

        Battle battle = robot.getBattle();
        if (battle == null) {
            System.out.println("배틀에 들어가지 못했습니다.");
            return;
        }

        battle.push(battle::enterBattle, robot);
    }

    private Integer getBattleId(WebSocketSession session) {
        String[] paths = session.getUri().getPath().split("/");
        // path: /battle/{battleId}
        Integer roomId = Integer.valueOf(paths[2]);
        return roomId;
    }

    @Transactional
    private RobotPeer createRobotPeer(ClientSession session, String username, int robotIndex) {
        UserEntity user = userRepository.findByUsername(username);

        int specCount = user.getSpecifications().size();
        RobotSpecification[] robotSpecifications = new RobotSpecification[specCount];
        for (int i = 0; i < specCount; ++i) {
            RobotSpecEntity spec = user.getSpecifications().get(i);
            robotSpecifications[i] = new RobotSpecification(spec.getName(), spec.getAuthor(), spec.getFullClassName());
        }

        RobotPeer robotPeer = RobotManager.Instance.add();
        robotPeer.setSession(session);
        session.setMyRobot(robotPeer);

        Integer battleId = getBattleId(session.getWebSocketSession());
        Battle battle = BattleManager.Instance.find(battleId);
        if (battle == null) {
            System.out.println("battle 을 찾지 못하였습니다.");
            robotPeer = null;
            return null;
        }

        robotPeer.init(battle, robotSpecifications, robotIndex);

        return robotPeer;
    }


    @Transactional
    public void changeRobotSpec(String username, int robotId, int specIndex, String robotName, String fullClassName) {
        log.info("submit new code");

        // spec 변경 및 저장
        updateRobotSpec(username, specIndex, robotName, fullClassName);

        // 새로운 스펙으로 새로운 로봇 생성
        ClientSession session = ClientSessionManager.Instance.findByUsername(username);

        RobotPeer robot = createRobotPeer(session, username, specIndex);
        if (robot == null) {
            System.out.println("로봇 생성 실패");
            return;
        }

        Battle battle = robot.getBattle();
        if (battle == null) {
            System.out.println("배틀에 들어가지 못했습니다.");
            return;
        }

        battle.push(battle::changeRobot, robotId, robot);
    }

    @Transactional
    private void updateRobotSpec(String username, int specIndex, String robotName, String fullClassName) {
        UserEntity user = userRepository.findByUsername(username);

        List<RobotSpecEntity> specifications = user.getSpecifications();
        if (specifications.size() <= specIndex) {
            log.error("스펙 인덱스가 잘못됨");
            return;
        }

        RobotSpecEntity robotSpecEntity = specifications.get(specIndex);
        robotSpecEntity.setName(robotName);
        robotSpecEntity.setFullClassName(fullClassName);
    }
}
