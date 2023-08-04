export function particletest(app){
PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

const sharpness = 0.1;
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

const emitter = new PIXI.particles.Emitter(container, [texture], {
  autoUpdate: true,
  alpha: {
    start: 0.8,
    end: 0.15
  },
  scale: {
    start: 1,
    end: 0.2,
    minimumScaleMultiplier: 1
  },
  color: {
    start: "#e3f9ff",
    end: "#2196F3"
  },
  speed: {
    start: 0,
    end: 0,
    minimumSpeedMultiplier: 1
  },
  acceleration: {
    x: 0,
    y: 0
  },
  maxSpeed: 0,
  startRotation: {
    min: 0,
    max: 0
  },
  noRotation: true,
  rotationSpeed: {
    min: 0,
    max: 0
  },
  lifetime: {
    min: 0.6,
    max: 0.6
  },  
  blendMode: "normal",
  frequency: 0.0008,
  emitterLifetime: -1,
  maxParticles: 5000,
  pos: {
    x: 0,
    y: 0
  },
  addAtBack: false,
  spawnType: "point"
});

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

}


