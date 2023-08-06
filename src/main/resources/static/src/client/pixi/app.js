import * as PIXI from 'pixi.js';
import { renderBackground, makestar } from './background/background';
import { playground, playgroundApp } from './playground/playground';
import { renderPlayer , playerSprites } from './player/player';
import { renderBullet , bulletSprites , effectbullets } from './bullet/bullet';
import { getCurrentState } from '../state';
import { renderScan }  from './scan/scan';
import { robotMessages , renderSpeechBubble ,messageSprites } from '../chat';
let prevrobots = [];
let prevbullets = [];

export function pixiApp() {
  return new Promise((resolve) => {
    const app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(app.view);
    makestar(app);
    playground();

    app.ticker.add((delta) => {
      const { robots,bullets,scans } = getCurrentState(); 
      const removebullets = prevbullets.filter((prevbullet) => !bullets.some((bullet) => bullet.id === prevbullet.id) );
      const removerobots = prevrobots.filter((prevrobot) => !robots.some((robot) => robot.id === prevrobot.id) );

      if(removebullets){
        removebullets.forEach((removebullet) => {
          effectbullets[removebullet.id].removeEffect();
          playgroundApp.stage.removeChild(bulletSprites[removebullet.id]);
          delete effectbullets[removebullet.id];
          delete bulletSprites[removebullet.id];
        });
      }
      
      if(removerobots){
        removerobots.forEach((removerobot) => {
          playgroundApp.stage.removeChild(playerSprites[removerobot.id]);
          delete playerSprites[removerobot.id];
        });
      }

      renderBackground(app, delta);
      
      if (robots) {
        robots.forEach((robot) => {
          renderPlayer(robot, playgroundApp);

          // Render speech bubble if there's a non-expired message for this robot
          const robotMessage = robotMessages[robot.id];
          if (robotMessage && robotMessage.expiresAt > Date.now()) {
            renderSpeechBubble(robot, playgroundApp, robotMessage.content);
          } else if (robotMessage && robotMessage.expiresAt <= Date.now()) {
            playgroundApp.stage.removeChild(messageSprites[robot.id]);
            delete messageSprites[robot.id];
            delete robotMessages[robot.id];
          }

        });
        scans.forEach((scan) => renderScan(scan, playgroundApp));
      }

      if (bullets) {
        bullets.forEach((bullet) => renderBullet(bullet, playgroundApp));

        
      }
      prevrobots = robots ? robots.slice() : [] ;
      prevbullets = bullets ? bullets.slice() : [] ;
    });
    resolve();
  });

}

export default pixiApp;
