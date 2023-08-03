import * as PIXI from 'pixi.js';
import {playgroundApp} from '../playground/playground'

import { rand, lerp, gradient, colorGradient, colorLerp } from './utility';

const WIDTH = 640;
const HEIGHT = 480;

console.log(colorLerp(0x000000, 0xffffff, .5).toString(16));

// canvas to use as the particle texture
let textureCanvas = document.createElement('canvas');
document.body.append(textureCanvas);
textureCanvas.width = textureCanvas.height = 16;
let textureContext = textureCanvas.getContext('2d');
textureContext.fillStyle = '#ffffff';
textureContext.beginPath();
textureContext.ellipse(8, 8, 4, 4, 0, 0, 6.28);
textureContext.fill();

export let particlesapp = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT
});


let effect = new PIXI.ParticleContainer(1000, {
    position: true,
    rotation: true,
    scale: true,
    uvs: true,
    tint: true,
    alpha: true
});
particlesapp.stage.addChild(effect);

// create an array to store all the effect
let particles = [];

let totalSprites = 200;

function resetParticle(particle) {
  particle.x = WIDTH / 2;
  particle.y = HEIGHT / 2;
  // Snowflake
  particle.size = rand(.05, .1);
  particle.speed = rand(0, 100);
  particle.angle = rand(0, 2 * Math.PI);
  particle.rotation = particle.angle;
  particle.life = rand(500, 800);
}

function resetEffect({ x, y }) {
  effect.x = x;
  effect.y = y;
  particles.forEach(resetParticle);
  effect.start = Date.now();
  let tint = [
    0xff0000,
    0x00ff00,
    0x00ffff,
    0xffff00,
    0xff00ff,
    0xffffff
  ][Math.random() * 6 | 0];
  effect.tintGradient = [
    [0, 0xFFFFFF],
    [1, tint]
  ];
  effect.brightnessGradient = [
    [0, 1],
    [.8, 1],
    [.96, 0],
    [.97, 1],
    [.98, 0],
    [.99, 1],
    [1, 0]
  ];
}

particlesapp.loader.add('star', 'https://cdn.glitch.com/a10133ef-3919-4200-ad35-26200e16b146%2Fwhite-star.png?v=1562875677679')
.load(function (loader, resources) {
  
  for (let i = 0; i < totalSprites; i++) {
    // create a new Sprite
    let particle = new PIXI.Sprite(resources.star.texture);

    // set the anchor point so the texture is centerd on the sprite
    particle.anchor.set(0.5);
    
    resetParticle(particle);
  
    // finally we push the particle into the particles array so it it can be easily accessed later
    particles.push(particle);

    effect.addChild(particle);
  }
  
  let waiting = false;

  particlesapp.ticker.add(function() {
    // iterate through the effect and update their position
    let now = Date.now();
    let elapsed = now - effect.start;
    for (let i = 0; i < particles.length; i++) {
      let particle = particles[i];
      // update our particles
      let t = Math.min(elapsed / particle.life, 1);
      let easedT = Math.pow(t, 1 / 3);
      let distance = lerp(0, particle.speed, easedT);
      particle.alpha = gradient(effect.brightnessGradient, t);
      particle.tint = colorGradient(effect.tintGradient, t);
      particle.scale.x = particle.size * lerp(.5, 1, t);
      particle.scale.y = particle.size * lerp(.5, 1, t);
      particle.x = (
        Math.cos(particle.angle) *
        distance
      );
      particle.y = (
        Math.sin(particle.angle) *
        distance
      );
    }
    if (elapsed > 1500 && !waiting) {
      waiting = true;
      setTimeout(() => {
        waiting = false;
        resetEffect({
          x: rand(0, WIDTH),
          y: rand(0, HEIGHT)
        });
      }, rand(1000, 2000))
    }
  });
  
  particlesapp.view.addEventListener('click', function (e) {
    resetEffect({
      x: e.pageX - particlesapp.view.offsetLeft,
      y: e.pageY - particlesapp.view.offsetTop
    });
  });


  resetEffect({
    x: WIDTH / 2,
    y: HEIGHT / 2
  });
});


/* ------------------------------- */


/* const stage = {
    data : null, // imageData 를 저장해 두는데 사용됨
    renderer : null, // 랜더러를 저장함.
    mouseX : 0, // 갱신되는 mouseX 값을 저장하는데 사용됨
    mouseY : 0, // 갱신되는 mouseY 값을 저장하는데 사용됨
    frame: 0, // requestAnimationFrame 이 한번 실행될때마다 ++

    sprite(){
      return new PIXI.Sprite(texture);
    },

    createParticles (_x, _y){ // 인자로 최초에 파티클을 생성할 텍스트 기준의 x, y 좌표를 받는다.
      const sprite = this.sprite(); // sprite 를 받는다.
      const scale = 0.2 + Math.random() * .2; // 파티클의 배율을 지정한다.
      const moveRadius = Math.random() * 10; // 파티클이 지속적으로 움직일 반지름의 값을 랜덤으로 지정한다.
      const tint = Math.random() * 0xE68664; // 색상을 지정한다.
      const x = canvasElement.width / 2 - this.textWidth / 2 + _x; // 캔바스를 기준으로 중심에 위치하도록 x 좌표를 구한다.
      const y = canvasElement.height / 2 - this.textHeight / 2 + _y; // 캔바스를 기준으로 중심에 위치하도록 y 좌표를 구한다.
      const speed = 5 + Math.random() * 5; // 파티클의 이동 속도를 랜덤함수를 이용해 산출 한다.
      const set = { // 지정된 값들을 저장한다.
        x,
        y,
        scale,
        moveRadius,
        tint,
        speed,
        _x,
        _y
      };

      const add = {
        moveRadius,
      };

      const move = ()  => { // 지속적으로 파티클이 움직이도록 하는 함수를 지정한다.
        const check = clashCheck(set.x, set.y, this.mouseX, this.mouseY); // 마우스와의 충돌을 체크하고
        if( check[0] ){ // 충돌했을 경우와
          add.moveRadius = Math.min ( add.moveRadius + check[1]/5, 200 );
        } else if( add.moveRadius > 0 ){ // 아닌경우를 지정.
          add.moveRadius --;
        } 
        const x = set._x + Math.cos(this.frame / set.speed) * ( set.moveRadius + add.moveRadius);
        const y = set._y + Math.sin(this.frame / set.speed) * ( set.moveRadius + add.moveRadius);
        // 변경되는 좌표를 파티클에 각각 지정
        sprite.x = canvasElement.width / 2 - this.textWidth / 2 + x;
        sprite.y = canvasElement.height / 2 - this.textHeight / 2 + y;
  
        // 변경되는 좌표를 별도 set 값에 저장함. ( 마우스와 충돌시 점점 멀어지는 효과를 구현하기 위해 )
        set.x = canvasElement.width / 2 - this.textWidth / 2 + set._x;
        set.y = canvasElement.height / 2 - this.textHeight / 2 + set._y;
      };
      // 최초 생성시 x, ym scale, tint 값을 sprite 에 지정
      sprite.x = x; 
      sprite.y = y; 
      sprite.scale.set(scale); 
      sprite.tint = tint;
  
      // 해당 값들을 객체로 리턴함.
      return {
        sprite,
        set,
        add,
        move
      };
    } // 여기까지 creatparticle
  } */