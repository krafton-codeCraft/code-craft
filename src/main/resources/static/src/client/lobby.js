import { downloadAssets } from './assets';
import './css/bootstrap-reboot.css';
import pixiApp from './pixi/app.js';
import './css/lobby.css';
import { getRobotInfos } from './networking';

const startButton = document.getElementById('start-button');
const robotIdElement = document.getElementById('robotId');
const nameElement = document.getElementById('name');
const usernameElement = document.getElementById('username');
const codeElement = document.getElementById('code');

let flag = true;

Promise.all([

  downloadAssets(),
  pixiApp(),
  getRobotInfos(),

]).then(() => {

  const username = sessionStorage.getItem('username');
  console.log(username);

}).catch(console.error);

/* -------------------------------------------------------- */

document.getElementById('gotoLobby').addEventListener('click', function () {
  window.location.href = '/lobby.html';
});

document.getElementById('gotoIngame').addEventListener('click', function () {
  window.location.href = '/ingame.html';
});

document.getElementById('gotoIndex').addEventListener('click', function () {
  window.location.href = '/index.html';
});

document.getElementById('gotosignup').addEventListener('click', function () {
  window.location.href = '/signup.html';
});

/* -------------------------------------------------------- */

export function renderCode(data) {
  // Check if the data is valid
  // if (typeof data !== 'object' || data === null) {
  //   console.error('Invalid data: ', data);
  //   return;
  // }

  // // Set each HTML element's text content
  // if (data.robotId != null) {
  //   robotIdElement.textContent = data.robotId;
  // } else {
  //   robotIdElement.textContent = 'No robot ID';
  // }
  // nameElement.textContent = data.name;
  // usernameElement.textContent = data.username;
  // codeElement.textContent = data.code;

  console.log("hi");
  console.log(data);

}