package com.bknote71.codecraft.robocode.sample;

import com.bknote71.codecraft.robocode.api.Robot;

public class GogoBot extends Robot {

    @Override
    public void run() {
        while (true) {
            ahead(200);
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
