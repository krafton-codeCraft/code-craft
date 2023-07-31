import { getAsset } from '../../assets';

const Constants = require('../../../shared/constants');
const { BULLET_RADIUS } = Constants;

let sprite = null;

function renderBullet(bullet, app) {
    const { x, y, direction } = bullet;
    const canvasX = x;//app.screen.width / 2 + x - me.x;
    const canvasY = y;//app.screen.height / 2 + y - me.y;

    sprite = new PIXI.Sprite(PIXI.Texture.from(getAsset('missile.svg')));
    sprite.anchor.set(0.5);
    sprite.x = canvasX;
    sprite.y = canvasY;
    sprite.rotation = direction;
    sprite.width = BULLET_RADIUS * 2;
    sprite.height = BULLET_RADIUS * 2;
    app.stage.addChild(sprite);
    
}

export default renderBullet;