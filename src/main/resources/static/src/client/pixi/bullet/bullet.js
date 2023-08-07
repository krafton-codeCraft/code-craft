import { getAsset } from '../../assets';
import { BoosterEffect } from '../effect/particles'
const Constants = require('../../../shared/constants');
const { BULLET_RADIUS } = Constants;

export const effectbullets = {};
export const bulletSprites = {};

export function renderBullet(bullet, app) {
    const {id} = bullet;

    let bulletsprite = bulletSprites[id];
    
    if(!bulletsprite){

        bulletsprite = createNewBulletSprite(bullet);
        bulletSprites[id] = bulletsprite;
        //app.stage.addChild(bulletsprite);

        const effectbullet = new BoosterEffect(app, bullet.x,bullet.y);
        effectbullets[id] = effectbullet;

    }else{

        updateBulletSprite(bulletsprite,bullet);

        effectbullets[id].moveTo(bullet.x,bullet.y);

    }
}

function createNewBulletSprite(bullet){
    const { x, y } = bullet;
    const canvasX = x;
    const canvasY = y; 

    const sprite = new PIXI.Sprite(PIXI.Texture.from(getAsset('bullet.svg')));
    sprite.anchor.set(0.5);
    sprite.x = canvasX;
    sprite.y = canvasY;

    sprite.width = BULLET_RADIUS * 2;
    sprite.height = BULLET_RADIUS * 2;

    return sprite;
}

function updateBulletSprite(sprite,bullet){
    const { x, y } = bullet;
    sprite.x = x;
    sprite.y = y;
}