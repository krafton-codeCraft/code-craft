export const line = {
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
  }

export let test = {
	"alpha": {
		"start": 1,
		"end": 1
	},
	"scale": {
		"start": 0.1,
		"end": 0.3,
		"minimumScaleMultiplier": 0.6
	},
	"color": {
		"start": "#e4f9ff",
		"end": "#3fcbff"
	},
	"speed": {
		"start": 100,
		"end": 200,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 360
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.2,
		"max": 0.35
	},
	"blendMode": "normal",
	"frequency": 0.001,
	"emitterLifetime": -1,
	"maxParticles": 1000,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "point"
}