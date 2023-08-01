package com.bknote71.codecraft.entity.service;

import com.bknote71.codecraft.entity.RobotSpecEntity;
import com.bknote71.codecraft.entity.UserEntity;
import com.bknote71.codecraft.entity.repository.RobotSpecRepository;
import com.bknote71.codecraft.entity.repository.UserRepository;
import com.bknote71.codecraft.robocode.core.RobotManager;
import com.bknote71.codecraft.robocode.core.RobotPeer;
import com.bknote71.codecraft.robocode.core.battle.Battle;
import com.bknote71.codecraft.robocode.loader.AwsS3ClassLoader;
import com.bknote71.codecraft.session.packet.PacketHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class RobotSpecService {

    private final UserRepository userRepository;
    private final RobotSpecRepository robotSpecRepository;
    private final PacketHandler packetHandler;

    public List<RobotSpecEntity> getRobotInfo(String username) {
        AwsS3ClassLoader classLoader = new AwsS3ClassLoader("robot-class");
        UserEntity user = userRepository.findByUsername(username);
        List<RobotSpecEntity> specs = null;
        if (user == null || (specs = user.getSpecifications()) == null || specs.isEmpty()) {
            System.out.println("잘못된 접근");
            return null;
        }

        for (RobotSpecEntity spec : specs) {
            // 여기서 뭔가 dto 로 변환 ??
        }

        return specs;
    }


    @Transactional
    public Long saveRobotSpec(String username, String robotName, String fullClassName, String code) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            System.out.println("save robot spec 하는데 유저가 존재하지 않음");
            return null;
        }

        RobotSpecEntity robotSpecEntity = new RobotSpecEntity();
        robotSpecEntity.setName(robotName);
        robotSpecEntity.setFullClassName(fullClassName);
        robotSpecEntity.setCode(code);
        robotSpecEntity.setUser(user);

        RobotSpecEntity savedEntity = robotSpecRepository.save(robotSpecEntity);
        if (savedEntity == null) {
            System.out.println("저장 실패");
            return null;
        }

        return savedEntity.getId();
    }

    @Transactional
    public String changeRobotSpec(String username, int robotId, int specIndex, String robotName, String fullClassName, String code) {
        log.info("submit new code");

        // spec 변경 및 저장
        Long updateResult = updateRobotSpec(username, specIndex, robotName, fullClassName, code);
        if (updateResult == null) {
            System.out.println("업데이트 로봇 스펙 실패");
            return null;
        }

        packetHandler.changeAndReenter(username, robotId, specIndex);
        return "success";
    }

    @Transactional
    private Long updateRobotSpec(String username, int specIndex, String robotName, String fullClassName, String code) {
        UserEntity user = userRepository.findByUsername(username);

        List<RobotSpecEntity> specifications = user.getSpecifications();
        if (specifications.size() <= specIndex) {
            log.error("스펙 인덱스가 잘못됨");
            return null;
        }

        RobotSpecEntity robotSpecEntity = specifications.get(specIndex);
        robotSpecEntity.setName(robotName);
        robotSpecEntity.setFullClassName(fullClassName);
        robotSpecEntity.setCode(code);
        return robotSpecEntity.getId();
    }
}
