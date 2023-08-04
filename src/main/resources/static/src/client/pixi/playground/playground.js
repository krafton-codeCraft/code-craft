import * as PIXI from 'pixi.js';

const canvasElement = document.getElementById('game-canvas');
   
export const playgroundApp = new PIXI.Application({ 
    view : canvasElement,
    width: 1500, 
    height: 1000,
    antialias : true,
    backgroundColor : 0x000000,
    backgroundAlpha : 0,
});

export function playground() {

    playgroundApp.view.style.position = "absolute";
    playgroundApp.view.style.top = "50%";
    playgroundApp.view.style.left = "50%";
    playgroundApp.view.style.transform = "translate(-50%, -50%)";
    playgroundApp.view.style.border = "1px solid gray";
    // playgroundApp.renderer.background.color = 0x0000ff;
    // playgroundApp.renderer.background.alpha = 0.5;
    // playgroundApp.renderer.view.style.width = "94vh";
    // playgroundApp.renderer.view.style.height = "94vh";
    // playgroundApp.renderer.resize(window.innerWidth, window.innerHeight * 0.94);

    document.body.appendChild(playgroundApp.view);
}

