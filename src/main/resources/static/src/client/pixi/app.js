import * as PIXI from 'pixi.js';
import { renderBackground, makestar } from './background/background';
import { playground, playgroundApp } from './playground/playground';
import renderPlayer from './player/player';
import renderBullet from './bullet/bullet';
import { getCurrentState } from '../state';
import { renderScan }  from './scan/scan';
import { explosions } from './effect/explosion';

export function pixiApp() {
  return new Promise((resolve) => {
    const app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(app.view);
    makestar(app);
    playground();

    app.ticker.add((delta) => {
      playgroundApp.stage.removeChildren();

      const { robots,bullets,scans } = getCurrentState(); 

      renderBackground(app, delta);

      if(explosions && explosions.length > 0){
        explosions.forEach((explosion) => {
          if(!explosion.playing){
            explosion.gotoAndPlay(Math.random() * 26 | 0);
          }
          playgroundApp.stage.addChild(explosion);
        })
      }
      
      if(robots){
        robots.forEach((robot) => renderPlayer(robot,playgroundApp));
        scans.forEach((scan) => renderScan(scan,playgroundApp));
      }

      if (bullets) {
        bullets.forEach((bullet) => renderBullet(bullet, playgroundApp));
      }
      
    });
    resolve();
  });

}

export default pixiApp;
