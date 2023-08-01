export function playground() {

    const canvasElement = document.getElementById('game-canvas');
   
    const playgroundApp = new PIXI.Application({ 
        view: canvasElement,
        width: 900, 
        height: 900,
        antialias: true,
        transparent: true
    });
    
    playgroundApp.view.style.position = "absolute";
    playgroundApp.view.style.top = "50%";
    playgroundApp.view.style.left = "5%";
    playgroundApp.view.style.transform = "translateY(-50%)";
    playgroundApp.view.style.border = "2px solid gray";
    // playgroundApp.renderer.view.style.width = "94vh";
    // playgroundApp.renderer.view.style.height = "94vh";
    // playgroundApp.renderer.resize(window.innerWidth, window.innerHeight * 0.94);

    document.body.appendChild(playgroundApp.view);

    return playgroundApp;

}

export default playground;
