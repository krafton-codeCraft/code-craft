import { getAsset } from '../../assets';

const Constants = require('../../../shared/constants');
const { BULLET_RADIUS } = Constants;


function renderBullet(bullet, app) {
    const { x, y, direction } = bullet;
    const canvasX = x;
    const canvasY = y;

    const sprite = new PIXI.Sprite(PIXI.Texture.from(getAsset('bullet.svg')));
    sprite.anchor.set(0.5);
    sprite.x = canvasX;
    sprite.y = canvasY;
    //sprite.rotation = direction;
    sprite.width = BULLET_RADIUS * 2;
    sprite.height = BULLET_RADIUS * 2;
    app.stage.addChild(sprite);
    
}

export default renderBullet;