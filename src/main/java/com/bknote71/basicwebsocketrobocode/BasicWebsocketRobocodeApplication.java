package com.bknote71.basicwebsocketrobocode;

import com.bknote71.basicwebsocketrobocode.robocode.core.battle.Battle;
import com.bknote71.basicwebsocketrobocode.robocode.core.battle.BattleManager;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BasicWebsocketRobocodeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BasicWebsocketRobocodeApplication.class, args);

		// 1 번 배틀 시작
		Battle battle = BattleManager.Instance.startNewBattle();
	}
}
