import * as PIXI from 'pixi.js';
<<<<<<< HEAD
import {playgroundApp} from '../playground/playground.js'
let explosionTextures = [];
export let explosions  =  [] ;
=======
import {playgroundApp} from '../playground/playground'
import { getAsset } from '../../assets';
>>>>>>> 1be59269ffcd3f49c069994fdd16d0003b54bb18

export let explosions  =  [];

const explosionTextures = [];
PIXI.Assets.load('https://pixijs.com/assets/spritesheet/mc.json').then(() => {
    let i;
    for (i = 0; i < 26; i++) {
        const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
        explosionTextures.push(texture);
    }
    console.log("폭발 텍스처 로딩 끝");
});

export function explosionPlay(rx, ry, id) {
    const explosion = new PIXI.AnimatedSprite(explosionTextures);

    explosion.x = rx;
    explosion.y = ry;
    explosion.anchor.set(0.5);
    explosion.rotation = Math.random() * Math.PI;
    explosion.scale.set(0.9 + Math.random() * 0.5);


    // 애니메이션이 반복되지 않도록 설정
    explosion.loop = false;
    
    playgroundApp.stage.addChild(explosion);
    explosions.push(explosion);
    
    explosion.onComplete =  function() {
        const indexToDelete = explosions.indexOf(this);
        explosions.splice(indexToDelete, 1);
    };
    
    /* 사운드 */
    const expSound = new Audio(getAsset('BoomTwice.mp3').src);
    expSound.volume = 0.1; 
    expSound.play();
    
}

