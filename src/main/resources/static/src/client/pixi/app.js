import * as PIXI from 'pixi.js';
import { renderBackground, makestar } from './background/background';
import { playground } from './playground/playground';
import renderPlayer from './player/player';
import renderBullet from './bullet/bullet';
import { getCurrentState } from '../state';
import renderScan from './scan/scan';

export function pixiApp() {
  const app = new PIXI.Application({ resizeTo: window });
  document.body.appendChild(app.view);
  makestar(app);
  const playgroundApp = playground();


  app.ticker.add((delta) => {
    playgroundApp.stage.removeChildren();

    const { robots,bullets,scans } = getCurrentState();

    renderBackground(app, delta);

    if(robots){
      robots.forEach((robot) => renderPlayer(robot,playgroundApp));
      bullets.forEach((bullet) => renderBullet(bullet,playgroundApp));
      scans.forEach((scan) => renderScan(scan,playgroundApp));
    }
    /* if(me){

      renderPlayer(me, playgroundApp);
      meteors.forEach((meteor) => renderMeteor(me, meteor, playgroundApp));
    
    } */
  });

}

export default pixiApp;
