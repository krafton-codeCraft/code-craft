import * as PIXI from 'pixi.js';
import {playgroundApp} from '../playground/playground'
let explosionTextures = [];
export let explosions  =  [] ;

const loadExplosionTextures = () => {
    return PIXI.Assets.load('https://pixijs.com/assets/spritesheet/mc.json').then(() => {
        let i;
        for (i = 0; i < 26; i++) {
            const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
            explosionTextures.push(texture);
        }
    });
};

export function explosionPlay(rx, ry, id) {
    if (explosionTextures.length === 0) {
        // 리소스 로드가 완료되지 않았으면 먼저 로드 후 애니메이션 생성
        loadExplosionTextures().then(() => createExplosion(rx, ry));
    } else {
        // 리소스 로드가 완료된 상태이므로 바로 애니메이션 생성
        createExplosion(rx, ry);
    }
}


function createExplosion(rx,ry){
    const explosion = new PIXI.AnimatedSprite(explosionTextures);
    explosion.x = rx;
    explosion.y = ry;
    explosion.anchor.set(0.5);
    explosion.rotation = Math.random() * Math.PI;
    explosion.scale.set(0.7 + Math.random() * 0.5);
    explosion.gotoAndPlay(Math.random() * 26 | 0);
    // 애니메이션이 반복되지 않도록 설정
    explosion.loop = false;
    
    playgroundApp.stage.addChild(explosion);
    explosions.push(explosion);
    explosion.onComplete = function(){
        const indexToDelete = explosions.indexOf(this);
        explosions.splice(indexToDelete, 1);
        // 애니메이션의 재생이 끝나면 스테이지에서 제거
        playgroundApp.stage.removeChild(this);
    };
    
}

