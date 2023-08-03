import { downloadAssets } from './assets';
import './css/bootstrap-reboot.css';
import pixiApp from './pixi/app.js';
import './css/lobby/lobby.css';
import './css/lobby/start-button.css';
import './css/lobby/module-button.css';
import './css/lobby/event-button.css';
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

document.querySelector('.module-btn').addEventListener('click', function() {
  var sidebar = document.getElementById('module-sidebar');
  if(sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  } else {
    sidebar.classList.add('open');
  }
});

document.querySelector('.event-btn').addEventListener('click', function() {
  var sidebar = document.getElementById('event-sidebar');
  if(sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  } else {
    sidebar.classList.add('open');
  }
});

document.getElementById('module-sidebar').addEventListener('click', function() {
  this.classList.remove('open');
});

document.getElementById('event-sidebar').addEventListener('click', function() {
  this.classList.remove('open');
});