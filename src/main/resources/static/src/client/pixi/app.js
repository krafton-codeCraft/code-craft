import * as PIXI from 'pixi.js';
import { renderBackground, makestar } from './background/background';
import { playground, playgroundApp } from './playground/playground';
import renderPlayer from './player/player';
import renderBullet from './bullet/bullet';
import { getCurrentState } from '../state';
import { renderScan }  from './scan/scan';
import { particletest } from './effect/particles';

export function pixiApp() {
  return new Promise((resolve) => {
    const app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(app.view);
    makestar(app);
    playground();
    // particletest(app);
    app.ticker.add((delta) => {
      playgroundApp.stage.removeChildren();

      const { robots,bullets,scans } = getCurrentState(); 

      renderBackground(app, delta);
      
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
