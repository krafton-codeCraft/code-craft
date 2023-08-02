import { downloadAssets } from './assets';
import './css/bootstrap-reboot.css';
import pixiApp from './pixi/app.js';
import './css/lobby.css';
import { getRobotInfos } from './networking';

const startButton = document.getElementById('start-button');

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
  
  console.log("hi");
  console.log(data);

  // Get each HTML element by its ID
  const robotIdElement = document.getElementById('robotId');
  const nameElement = document.getElementById('name');
  const usernameElement = document.getElementById('username');
  const codeElement = document.getElementById('code');

  // Set each HTML element's text content
  if (data.robotId != null) {
    robotIdElement.textContent = 'Robot ID: ' + data.robotId;
  } else {
    robotIdElement.textContent = 'Robot ID: null';
  }
  nameElement.textContent = 'Name: ' + data.name;
  usernameElement.textContent = 'Username: ' + data.username;
  
  if (data.code != null) {
    codeElement.textContent = 'Code: ' + data.code;
  } else {
    codeElement.textContent = 'Code: null';
  }

  // Set each HTML element's color to white
  robotIdElement.style.color = 'white';
  nameElement.style.color = 'white';
  usernameElement.style.color = 'white';
  codeElement.style.color = 'white';

}