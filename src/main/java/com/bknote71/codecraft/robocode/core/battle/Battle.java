package com.bknote71.codecraft.robocode.core.battle;

import com.bknote71.codecraft.robocode.core.BulletPeer;
import com.bknote71.codecraft.robocode.core.BulletState;
import com.bknote71.codecraft.robocode.core.RobotPeer;
import com.bknote71.codecraft.robocode.core.RobotSpecification;
import com.bknote71.codecraft.robocode.job.JobSerializer;
import com.bknote71.codecraft.session.ClientSession;
import com.bknote71.codecraft.session.packet.TriConsumer;
import com.bknote71.codecraft.proto.*;
import lombok.extern.slf4j.Slf4j;

import java.awt.geom.Arc2D;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.BiConsumer;
import java.util.function.Consumer;

@Slf4j
public class Battle {

    private TimerTask battleTask;
    private int battleId;

    // current time
    private int currentTime;
    private long millisWait;
    private int nanoWait;

    // objects in the battle
    private int robotId;
    private Map<Integer, RobotPeer> robots = new HashMap<>();
    private List<BulletPeer> bullets = new CopyOnWriteArrayList<>();

    // death events
    private List<RobotPeer> deathRobots = new ArrayList<>();

    // rules
    protected BattleRules battleRules;

    public Battle() {
        // battle update task
        battleTask = new TimerTask() {
            @Override
            public void run() {
                // update 내용
                update();
            }
        };

        registerTimerTask();
    }

    private void registerTimerTask() {
        int frame = 20;
        Timer battleTimer = new Timer();
        battleTimer.schedule(battleTask, 0, 1000 / frame);
    }

    public BattleRules getBattleRules() {
        return this.battleRules;
    }

    public long getTime() {
        return currentTime;
    }

    public void setBattleId(int id) {
        this.battleId = id;
    }

    public void update() { // 기존 게임 룸의 update --> updatePacket 을 보냄
        try {
            currentTime++;

            SUpdate updatePacket = new SUpdate();
            UpdateInfo update = new UpdateInfo();
            update.t = System.currentTimeMillis();

            // 커맨드가 업로드 되기 전까지는 수행하면 안된다.
            jobFlush();

            // 커맨드 불러오기 (from robots)
            loadCommands(update);

            updateBullets(update);

            updateRobots(update);

            handleDeadRobots(update);

            publishStatuses();

            wakeupRobots();

            // send update packet
            updatePacket.setUpdate(update);
            for (RobotPeer robot : robots.values()) {
                robot.session().send(updatePacket);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("update error");
        }
    }

    public void setup(BattleProperties battleProperties) {
        battleRules = BattleRules.HiddenHelper.createRules(battleProperties);
    }

    public void enterBattle(RobotPeer robotPeer) {
        log.info("enter battle " + robotPeer.getName());
        robotPeer.startBattle();

        robots.put(robotPeer.getId(), robotPeer);

        ClientSession session = robotPeer.session();
        if (session == null)
            return;

        // enter packet
        SEnterBattle enterPacket = new SEnterBattle();
        enterPacket.setRobotId(robotId);
        enterPacket.setRobotName(robotPeer.getName());
        enterPacket.setSpecIndex(robotPeer.getSpecIndex());
        enterPacket.setSpecifications(robotPeer.getSpecifications());
        enterPacket.setUsername(session.getUsername());
        session.send(enterPacket);
    }

    public void leaveBattle(int robotId) {
        log.info("leave battle in thread: " + Thread.currentThread().getName());
        // clear
        RobotPeer robotPeer;
        if ((robotPeer = robots.remove(robotId)) == null) {
            System.out.println(robotId + " id에 해당하는 로봇은 없습니다.");
            return;
        }

        System.out.println("cleanup");
        robotPeer.cleanup();
    }

    public void changeRobot(int robotId, RobotPeer newRobot) {
        // 뭘하냐 여기서...
        System.out.println("change robot " + robotId);
        leaveBattle(robotId);
        enterBattle(newRobot);
    }

    // 이벤트 등록 및 이벤트 처리
    public void registerDeathRobot(RobotPeer peer) { // == onDie --> DiePacket
        deathRobots.add(peer);
    }

    public void addBullet(BulletPeer bullet) {
        System.out.println(Thread.currentThread().getName() + " add bullet and bullets size: " + bullets.size());
        bullets.add(bullet);
    }

    // | NOTE: 커맨드 == 처리해야 할 이벤트 (이벤트 발생 시 커맨드로 전환)
    // |
    // | update command 처리
    private void loadCommands(UpdateInfo update) {
        for (RobotPeer robot : robots.values()) {
            robot.performLoadCommands();
        }
    }

    // 총알 업데이트
    private void updateBullets(UpdateInfo updateInfo) {
        List<BulletPeer> shuffledList = new ArrayList<>(bullets);
        Collections.shuffle(shuffledList, ThreadLocalRandom.current());
        log.info("update bullets: " + shuffledList.size());
        for (BulletPeer bullet : shuffledList) {
            bullet.update();
            if (bullet.getState() == BulletState.INACTIVE) {
                bullets.remove(bullet);
            } else { // 불릿 패킷
                updateInfo.bullets.add(new UpdateInfo.BulletInfo(bullet.getX(), bullet.getY()));
            }
        }
    }

    private void updateRobots(UpdateInfo update) {
        // move all robots
        for (RobotPeer robotPeer : robots.values()) {
            robotPeer.performMove(new ArrayList<>(robots.values()));
            // 위치 정보
            update.robots.add(
                    new UpdateInfo.RobotInfo(robotPeer.getId(), robotPeer.getName(), robotPeer.getX(), robotPeer.getY(),
                            robotPeer.getBodyHeading(), robotPeer.getGunHeading(), robotPeer.getRadarHeading(), robotPeer.getEnergy())
            );
        }

        // 충돌 이후 업데이트 ??
        // 우리 게임은 충돌이 없다.

        // scan after moved all
        for (RobotPeer robotPeer : robots.values()) {
            robotPeer.performScan(new ArrayList<>(robots.values()));
            // 스캐닝 정보
            Arc2D arc = robotPeer.getScanArc();
            update.scans.add(
                    new UpdateInfo.ScanInfo(robotPeer.getId(), robotPeer.getName(), robotPeer.getX(), robotPeer.getY(),
                            arc.getAngleStart(), arc.getAngleExtent(), arc.getX(), arc.getY(), arc.getWidth(), arc.getHeight())
            );
        }
    }

    private void handleDeadRobots(UpdateInfo update) {
        // publish dead event ??
        // 우리는 dead event 를 아직은 안만들거임 !
        for (RobotPeer deadRobot : deathRobots) {
            SDie diePacket = new SDie();
            diePacket.setId(deadRobot.getId());
            broadcast(diePacket);
        }
    }

    private void publishStatuses() {
        for (RobotPeer robotPeer : robots.values()) {
            robotPeer.publishStatus(currentTime);
        }
    }

    // 나 이제 업데이트 끝났어 라고 신호를 보낸다 (to robot)
    private void wakeupRobots() {
        for (RobotPeer robotPeer : robots.values()) {
            if (robotPeer.isRunning()) {
                // This call blocks until the robot's thread actually wakes up.
                robotPeer.waitWakeup();
                if (robotPeer.isAlive()) {
                    // robotPeer.waitSleeping(millisWait, nanoWait);
                }
            }
        }
    }

    public void broadcast(Protocol protocol) {
        for (RobotPeer robot : robots.values())
            robot.session().send(protocol);
    }

    public RobotPeer getRobotInRange(RobotPeer shooter, double x, double y, int radius) {
        for (RobotPeer robot : robots.values()) {
            if (robot != shooter && Math.pow(robot.getX() - x, 2) + Math.pow(robot.getY() - y, 2) <= Math.pow(radius, 2)) {
                return robot;
            }
        }
        return null;
    }

    // job queue
    private JobSerializer jobSerializer = new JobSerializer();

    public <T> void push(Consumer<T> job, T t) {
        jobSerializer.push(job, t);
    }

    public <T1, T2> void push(BiConsumer<T1, T2> job, T1 t1, T2 t2) {
        jobSerializer.push(job, t1, t2);
    }

    public <T1, T2, T3> void push(TriConsumer<T1, T2, T3> job, T1 t1, T2 t2, T3 t3) {
        jobSerializer.push(job, t1, t2, t3);
    }


    public void jobFlush() {
        // job 처리
        jobSerializer.flush();
    }
}
