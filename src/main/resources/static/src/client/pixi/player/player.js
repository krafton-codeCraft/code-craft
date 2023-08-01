import { getAsset } from '../../assets';
import { explosionPlay } from '../effect/explosion';
const Constants = require('../../../shared/constants');
const { PLAYER_RADIUS,PLAYER_MAXENERGY } = Constants;
let test = 0;
function renderPlayer(player, app) {
    test += 1;
    const { x, y, name , bodyHeading, gunHeading, raderHeading, energy } = player;
    const canvasX = x;
    const canvasY = y;
    const ratiohp = energy === 0 ? 0 : energy / PLAYER_MAXENERGY * 60;
    // 배 그리기
    const bodyship = new PIXI.Sprite(PIXI.Texture.from(getAsset('ship.svg')));
    bodyship.anchor.set(0.5);
    bodyship.x = canvasX;
    bodyship.y = canvasY;
    bodyship.rotation = Math.PI - bodyHeading;
    bodyship.width = PLAYER_RADIUS * 2;
    bodyship.height = PLAYER_RADIUS * 2;
    app.stage.addChild(bodyship);
    // if (test% 500 === 0){
    //     explosionPlay(canvasX,canvasY,app);
    // }
    // 포탑
    const gunhead = new PIXI.Sprite(PIXI.Texture.from(getAsset('ship.svg')));
    gunhead.anchor.set(0.5);
    gunhead.x = canvasX;
    gunhead.y = canvasY;
    gunhead.rotation = Math.PI - gunHeading;
    gunhead.width = PLAYER_RADIUS;
    gunhead.height = PLAYER_RADIUS;
    gunhead.tint = 0x000000;
    app.stage.addChild(gunhead);

    //체력바 
    /* const innerBar = new PIXI.Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(canvasX - (PLAYER_RADIUS * 2) , canvasY - (PLAYER_RADIUS * 2) - 5, 60, 10);
    innerBar.endFill();
    app.stage.addChild(innerBar);

    const outerBar = new PIXI.Graphics();
    outerBar.beginFill(0xFF3300);
    outerBar.drawRect(canvasX - (PLAYER_RADIUS * 2) , canvasY - (PLAYER_RADIUS * 2) - 5,ratiohp , 10);
    outerBar.endFill();
    app.stage.addChild(outerBar); */
   
    //체력바 텍스트
    const hptext = new PIXI.Text(energy+'/' + PLAYER_MAXENERGY, { fontFamily: 'Arial', fontSize: 10, fill: 'white' });
    hptext.anchor.set(0.5);
    hptext.x = canvasX;
    hptext.y = canvasY - (PLAYER_RADIUS * 2);
    app.stage.addChild(hptext);


    // 텍스트 그리기
    const text = new PIXI.Text(name, { fontFamily: 'Arial', fontSize: 16, fill: 'white' });
    text.anchor.set(0.5);
    text.x = canvasX;
    text.y = canvasY + PLAYER_RADIUS + 20;
    app.stage.addChild(text);
}

export default renderPlayer;