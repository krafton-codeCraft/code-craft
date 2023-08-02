import * as PIXI from 'pixi.js';
import {playgroundApp} from '../playground/playground'
let explosionTextures = null;
export let explosion = null;

PIXI.Assets.load('https://pixijs.com/assets/spritesheet/mc.json').then(() =>
    {
        // create an array to store the textures
        explosionTextures = [];
        let i;

        for (i = 0; i < 26; i++)
        {
            const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);

            explosionTextures.push(texture);
        }

        // create an explosion AnimatedSprite
        explosion = new PIXI.AnimatedSprite(explosionTextures);
    });

export function explosionPlay(rx,ry){
    explosion.x = rx;
    explosion.y = ry;
    explosion.anchor.set(0.5);
    explosion.rotation = Math.random() * Math.PI;
    explosion.scale.set(0.75 + Math.random() * 0.5);
    explosion.gotoAndPlay(Math.random() * 26 | 0);
    // 애니메이션이 반복되지 않도록 설정
    explosion.loop = false;
    // 애니메이션의 재생이 끝나면 스테이지에서 제거
    explosion.onComplete = () => {
        playgroundApp.stage.removeChild(explosion);
    };
    playgroundApp.stage.addChild(explosion);
}

