import { downloadAssets } from './assets';
import './css/bootstrap-reboot.css';
import pixiApp from './pixi/app.js';
import './css/lobby.css';
import './css/start-button.css'
import { getRobotInfos } from './networking.js';
const startButton = document.getElementById('start-button');

let flag = true;

Promise.all([

  // downloadAssets(),
  pixiApp(),
  // getRobotInfos(),
  
]).then(() => {

  startButton.onclick = () => {

    window.location.href = '/ingame.html';

  }


}).catch(console.error);

/* -------------------------------------------------------- */

// document.getElementById('gotoLobby').addEventListener('click', function () {
//   window.location.href = '/lobby.html';
// });

// document.getElementById('gotoIngame').addEventListener('click', function () {
//   window.location.href = '/ingame.html';
// });

// document.getElementById('gotoIndex').addEventListener('click', function () {
//   window.location.href = '/index.html';
// });

// document.getElementById('gotosignup').addEventListener('click', function () {
//   window.location.href = '/signup.html';
// });
