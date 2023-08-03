import * as PIXI from 'pixi.js';

const canvasElement = document.getElementById('game-canvas');
   
export const playgroundApp = new PIXI.Application({ 
    view: canvasElement,
    width: 1000, 
    height: 1000,
    antialias : true,
    backgroundColor: 0x000000,
    transparent: true,
});

export function playground() {

    playgroundApp.view.style.position = "absolute";
    playgroundApp.view.style.top = "50%";
    playgroundApp.view.style.left = "3%";
    playgroundApp.view.style.transform = "translateY(-50%)";
    playgroundApp.view.style.border = "2px solid gray";

    // playgroundApp.renderer.view.style.width = "94vh";
    // playgroundApp.renderer.view.style.height = "94vh";
    // playgroundApp.renderer.resize(window.innerWidth, window.innerHeight * 0.94);

    document.body.appendChild(playgroundApp.view);
}

