import { downloadAssets } from './assets';
import './css/bootstrap-reboot.css';
import pixiApp from './pixi/app.js';
import './css/lobby.css';
import './css/start-button.css'
import { getRobotInfos } from './networking.js';

// const startButton = document.getElementById('start-button');

let flag = true;

Promise.all([

  // downloadAssets(),
  pixiApp(),
  // getRobotInfos(),
  
]).then(() => {

//  startButton.onclick = () => {
//
//    window.location.href = '/ingame.html';
//
//  }


}).catch(console.error);

/* -------------------------------------------------------- */