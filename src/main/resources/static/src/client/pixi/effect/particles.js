import { getAsset } from '../../assets';
import { line , test } from './emitter_config';

/* const emitterObject = new PIXI.utils.EventEmitter();
const customEventName = "customEvent";

export function triggerCustomEvent(x, y) {
  emitterObject.emit(customEventName, x, y);
} */

/* export function particletest(app){
PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

const sharpness = 1;
const minDelta = 0.05;

const texture = createTexture(0, 8, app.renderer.resolution);
const pointer = new PIXI.Point(app.screen.width / 2, app.screen.height / 2);
const emitterPos = pointer.clone();

const container = new PIXI.ParticleContainer(1000, {
  scale: true,
  position: true,
  rotation: false,
  uvs: false,
  tint: true
});

const emitter = new PIXI.particles.Emitter(container, [texture], line);

let resized = false;

emitter.updateOwnerPos(emitterPos.x, emitterPos.y);

app.stage.addChild(container);
app.stage.interactive = true;
app.ticker.add(onTick);
//app.stage.on("pointermove", event => pointer.copy(event.data.global));
//

emitterObject.on(customEventName, (x, y) => {
  pointer.x = x;
  pointer.y = y;
});

//
function onTick(delta) {
  
  if (!emitterPos.equals(pointer)) {
        
    const dt = 1 - Math.pow(1 - sharpness, delta); 
    const dx = pointer.x - emitterPos.x;
    const dy = pointer.y - emitterPos.y;
    

    const interpolatedX = interpolateXPosition(emitterPos.x, pointer.x, dt);
    const interpolatedY = interpolateYPosition(emitterPos.y, pointer.y, dt);

    emitterPos.x = interpolatedX;
    emitterPos.y = interpolatedY;

    // if (Math.abs(dx) > minDelta) {
    //   emitterPos.x += dx * dt;
    // } else {
    //   emitterPos.x = pointer.x;
    // }

    // if (Math.abs(dy) > minDelta) {
    //   emitterPos.y += dy * dt;
    // } else {
    //   emitterPos.y = pointer.y;
    // }    
    
    emitter.updateOwnerPos(emitterPos.x, emitterPos.y);
  }

}

// 위치 값을 보간하는 함수
function interpolateYPosition(p1, p2, ratio) {
  const distance = Math.abs(p2 - p1);
  if (distance > 1000 / 2) {
    // 경계를 넘어가는 경우, 반대편으로 회전하여 보간
    if (p1 < p2) {
      p1 += 1000;
    } else {
      p1 -= 1000;
    }
  }
  return p1 + (p2 - p1) * ratio;
}

function interpolateXPosition(p1, p2, ratio) {
  const distance = Math.abs(p2 - p1);
  if (distance > 1500 / 2) {
    // 경계를 넘어가는 경우, 반대편으로 회전하여 보간
    if (p1 < p2) {
      p1 += 1500;
    } else {
      p1 -= 1500;
    }
  }
  return p1 + (p2 - p1) * ratio;
}
  function createTexture(r1, r2, resolution) {
      
    const c = (r2 + 1) * resolution;
    r1 *= resolution;
    r2 *= resolution;
      
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = canvas.height = c * 2;
    
    const gradient = context.createRadialGradient(c, c, r1, c, c, r2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    return PIXI.Texture.from(canvas);
  }

} */

/* export function particletest2(app){
  PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

  const sharpness = 0.1;
  const minDelta = 0.05;
  
  const texture = createTexture(0, 8, app.renderer.resolution);
  const pointer = new PIXI.Point(app.screen.width / 2, app.screen.height / 2);
  const emitterPos = pointer.clone();
  
  const container = new PIXI.ParticleContainer(1000, {
    scale: true,
    position: true,
    rotation: true,
    uvs: false,
    tint: true
  });

  const emitter = new PIXI.particles.Emitter(container, [texture], test);
  
  let resized = false;
  
  emitter.updateOwnerPos(emitterPos.x, emitterPos.y);
  
  app.stage.addChild(container);
  app.stage.interactive = true;
  app.ticker.add(onTick);
  app.stage.on("pointermove", event => pointer.copy(event.data.global));
  
  
  function onTick(delta) {
    
    if (!emitterPos.equals(pointer)) {
          
      const dt = 1 - Math.pow(1 - sharpness, delta); 
      const dx = pointer.x - emitterPos.x;
      const dy = pointer.y - emitterPos.y;
      
      if (Math.abs(dx) > minDelta) {
        emitterPos.x += dx * dt;
      } else {
        emitterPos.x = pointer.x;
      }
  
      if (Math.abs(dy) > minDelta) {
        emitterPos.y += dy * dt;
      } else {
        emitterPos.y = pointer.y;
      }    
      
      emitter.updateOwnerPos(emitterPos.x, emitterPos.y);
    }
  
  }
  
    function createTexture(r1, r2, resolution) {
        
      const c = (r2 + 1) * resolution;
      r1 *= resolution;
      r2 *= resolution;
        
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = canvas.height = c * 2;
      
      const gradient = context.createRadialGradient(c, c, r1, c, c, r2);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      return PIXI.Texture.from(canvas);
    }
} */

export class ParticleEffect {
  constructor(app) {
    this.app = app;
    this.container = new PIXI.ParticleContainer(400, {
      scale: true,
      position: true,
      rotation: false,
      uvs: false,
      tint: true,
    });

    this.emitter = this.createEmitter();
    this.pointer = new PIXI.Point(this.app.screen.width / 2, this.app.screen.height / 2);
    this.emitterPos = this.pointer.clone();

    this.emitterObject = new PIXI.utils.EventEmitter();
    this.customEventName = Math.random();

    this.app.stage.interactive = true;
    this.app.ticker.add(this.onTick.bind(this));

    // 이벤트 리스너 추가
    this.emitterObject.on(this.customEventName, (x, y) => {
      this.pointer.x = x;
      this.pointer.y = y;
    });
  }

  createEmitter() {
    const texture = this.createTexture(0, 8, this.app.renderer.resolution);

    const emitter = new PIXI.particles.Emitter(this.container, [texture], line);

    return emitter;
  }

  onTick(delta) {
    if (!this.emitterPos.equals(this.pointer)) {
      const dt = 1;
      const dx = this.pointer.x - this.emitterPos.x;
      const dy = this.pointer.y - this.emitterPos.y;

      const interpolatedX = this.interpolateXPosition(this.emitterPos.x, this.pointer.x, dt);
      const interpolatedY = this.interpolateYPosition(this.emitterPos.y, this.pointer.y, dt);

      this.emitterPos.x = interpolatedX;
      this.emitterPos.y = interpolatedY;

      this.emitter.updateOwnerPos(this.emitterPos.x, this.emitterPos.y);
    }
  }

  triggerCustomEvent(x, y) {
    this.emitterObject.emit(this.customEventName , x, y);
  }

  // 위치 값을 보간하는 함수
  interpolateYPosition(p1, p2, ratio) {
    const distance = Math.abs(p2 - p1);
    if (distance > 1000 / 2) {
      // 경계를 넘어가는 경우, 반대편으로 회전하여 보간
      if (p1 < p2) {
        p1 += 1000;
      } else {
        p1 -= 1000;
      }
    }
    return p1 + (p2 - p1) * ratio;
  }

  interpolateXPosition(p1, p2, ratio) {
    const distance = Math.abs(p2 - p1);
    if (distance > 1500 / 2) {
      // 경계를 넘어가는 경우, 반대편으로 회전하여 보간
      if (p1 < p2) {
        p1 += 1500;
      } else {
        p1 -= 1500;
      }
    }
    return p1 + (p2 - p1) * ratio;
  }

  createTexture(r1, r2, resolution) {
    const c = (r2 + 1) * resolution;
    r1 *= resolution;
    r2 *= resolution;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = canvas.height = c * 2;

    const gradient = context.createRadialGradient(c, c, r1, c, c, r2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    return PIXI.Texture.from(canvas);
  }
}

import { rand, lerp, gradient, colorGradient, colorLerp } from './utility';

/* export function starParticletest(){

// canvas to use as the particle texture
let textureCanvas = document.createElement('canvas');
document.body.append(textureCanvas);
textureCanvas.width = textureCanvas.height = 16;
let textureContext = textureCanvas.getContext('2d');
textureContext.fillStyle = '#ffffff';
textureContext.beginPath();
textureContext.ellipse(8, 8, 4, 4, 0, 0, 6.28);
textureContext.fill();

let app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT
});
document.body.appendChild(app.view);

let effect = new PIXI.particles.ParticleContainer(1000, {
    position: true,
    rotation: true,
    scale: true,
    uvs: true,
    tint: true,
    alpha: true
});
app.stage.addChild(effect);

let particles = [];

let totalSprites = app.renderer instanceof PIXI.WebGLRenderer ? 200 : 100;

function resetParticle(particle) {
  particle.x = WIDTH / 2;
  particle.y = HEIGHT / 2;
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

app.loader.add('star', 'https://cdn.glitch.com/a10133ef-3919-4200-ad35-26200e16b146%2Fwhite-star.png?v=1562875677679')
.load(function (loader, resources) {
  
  for (let i = 0; i < totalSprites; i++) {
    let particle = new PIXI.Sprite(resources.star.texture);

    particle.anchor.set(0.5);
    
    resetParticle(particle);
  
    particles.push(particle);

    effect.addChild(particle);
  }
  
  let waiting = false;
  app.ticker.add(function() {
    let now = Date.now();
    let elapsed = now - effect.start;
    for (let i = 0; i < particles.length; i++) {
      let particle = particles[i];
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

  app.view.addEventListener('click', function (e) {
    resetEffect({
      x: e.pageX - app.view.offsetLeft,
      y: e.pageY - app.view.offsetTop
    });
  });

  resetEffect({
    x: WIDTH / 2,
    y: HEIGHT / 2
  });
});


} */

export class StarParticleEffect {
  constructor(app, width, height) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.particles = [];
    this.totalSprites = PIXI.utils.isWebGLSupported() ? 200 : 100;
    this.app = app

    this.effect = new PIXI.particles.ParticleContainer(1000, {
      position: true,
      rotation: true,
      scale: true,
      uvs: true,
      tint: true,
      alpha: true
    });
    this.app.stage.addChild(this.effect);

    this.textureCanvas = document.createElement('canvas');
    this.textureCanvas.width = this.textureCanvas.height = 16;
    this.textureContext = this.textureCanvas.getContext('2d');
    this.textureContext.fillStyle = '#ffffff';
    this.textureContext.beginPath();
    this.textureContext.ellipse(8, 8, 4, 4, 0, 0, 6.28);
    this.textureContext.fill();

    this.app.loader.add('star', 'https://cdn.glitch.com/a10133ef-3919-4200-ad35-26200e16b146%2Fwhite-star.png?v=1562875677679')
      .load((loader, resources) => {
        for (let i = 0; i < this.totalSprites; i++) {
          let particle = new PIXI.Sprite(resources.star.texture);
          particle.anchor.set(0.5);
          this.resetParticle(particle);
          this.particles.push(particle);
          this.effect.addChild(particle);
        }

        this.app.ticker.add(this.update.bind(this));

        this.app.view.addEventListener('click', (e) => {
          this.resetEffect({
            x: e.pageX - this.app.view.offsetLeft,
            y: e.pageY - this.app.view.offsetTop
          });
        });

        this.resetEffect({
          x: this.WIDTH / 2,
          y: this.HEIGHT / 2
        });
      });
  }

  resetParticle(particle) {
    particle.x = this.WIDTH / 2;
    particle.y = this.HEIGHT / 2;
    particle.size = rand(0.05, 0.1);
    particle.speed = rand(0, 100);
    particle.angle = rand(0, 2 * Math.PI);
    particle.rotation = particle.angle;
    particle.life = rand(500, 800);
  }

  resetEffect({ x, y }) {
    this.effect.x = x;
    this.effect.y = y;
    this.particles.forEach(this.resetParticle);
    this.effect.start = Date.now();
    let tint = [
      0xff0000,
      0x00ff00,
      0x00ffff,
      0xffff00,
      0xff00ff,
      0xffffff
    ][Math.random() * 6 | 0];
    this.effect.tintGradient = [
      [0, 0xFFFFFF],
      [1, tint]
    ];
    this.effect.brightnessGradient = [
      [0, 1],
      [0.8, 1],
      [0.96, 0],
      [0.97, 1],
      [0.98, 0],
      [0.99, 1],
      [1, 0]
    ];
  }

  update() {
    let now = Date.now();
    let elapsed = now - this.effect.start;
    for (let i = 0; i < this.particles.length; i++) {
      let particle = this.particles[i];
      let t = Math.min(elapsed / particle.life, 1);
      let easedT = Math.pow(t, 1 / 3);
      let distance = lerp(0, particle.speed, easedT);
      particle.alpha = gradient(this.effect.brightnessGradient, t);
      particle.tint = colorGradient(this.effect.tintGradient, t);
      particle.scale.x = particle.size * lerp(0.5, 1, t);
      particle.scale.y = particle.size * lerp(0.5, 1, t);
      particle.x = (
        Math.cos(particle.angle) *
        distance
      );
      particle.y = (
        Math.sin(particle.angle) *
        distance
      );
    }
    /* if (elapsed > 1500 && !this.waiting) {
      this.waiting = true;
      setTimeout(() => {
        this.waiting = false;
        this.resetEffect({
          x: rand(0, this.WIDTH),
          y: rand(0, this.HEIGHT)
        });
      }, rand(1000, 2000))
    } */
  }
}