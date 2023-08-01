import { getAsset } from '../../assets';

const Constants = require('../../../shared/constants');
const { BULLET_RADIUS } = Constants;


function renderBullet(bullet, app) {
    const { x, y ,id } = bullet;
    const canvasX = x;
    const canvasY = y; 
    // console.log(`x : ${x}`)
    // console.log(`y : ${y}`)
    const misslie = new PIXI.Sprite(PIXI.Texture.from(getAsset('bullet.svg')));
    misslie.anchor.set(0.5);
    misslie.x = canvasX;
    misslie.y = canvasY;
    misslie.width = BULLET_RADIUS * 2;
    misslie.height = BULLET_RADIUS * 2;
    app.stage.addChild(misslie);

    /* const text = new PIXI.Text(id, { fontFamily: 'Arial', fontSize: 16, fill: 'white' });
    text.anchor.set(0.5);
    text.x = canvasX;
    text.y = canvasY + BULLET_RADIUS + 16;
    app.stage.addChild(text); */

}

export default renderBullet;