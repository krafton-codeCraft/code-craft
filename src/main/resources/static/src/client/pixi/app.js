import * as PIXI from 'pixi.js';
import { renderBackground, makestar } from './background/background';
import { playground } from './playground/playground';
import renderPlayer from './player/player';
import renderBullet from './bullet/bullet';
import { getCurrentState } from '../state';
import renderScan from './scan/scan';
import { explosion } from './effect/explosion';

export function pixiApp() {
  const app = new PIXI.Application({ resizeTo: window });
  document.body.appendChild(app.view);
  makestar(app);
  const playgroundApp = playground();

  app.ticker.add((delta) => {
    playgroundApp.stage.removeChildren();
    /* for (let i = playgroundApp.stage.children.length - 1; i >= 0; i--) {
      const child = playgroundApp.stage.children[i];
      if (child !== explosion) {
        playgroundApp.stage.removeChildAt(i);
      }
    } */
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
  
}

export default pixiApp;
