// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#3-client-entrypoints
import { connect, play, handleChatAttack } from './networking';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';
import { setLeaderboardHidden } from './htmlComponent/leaderboard';
// I'm using a tiny subset of Bootstrap here for convenience - there's some wasted CSS,
// but not much. In general, you should be careful using Bootstrap because it makes it
// easy to unnecessarily bloat your site.
import './css/bootstrap-reboot.css';
import './css/main.css';
import pixiApp from './pixi/app.js';

const gamecanvers = document.getElementById('game-canvas');

const playButton = document.getElementById('play-button');
const usernameInput = document.getElementById('username-input');

const replayButton = document.getElementById('replay-button');
let flag = true;

Promise.all([

  downloadAssets(),
  pixiApp(),

]).then(() => {

  window.addEventListener('keydown' ,handleEnterKey);
  usernameInput.focus();

  playButton.onclick = () => {

    window.removeEventListener('keydown' ,handleEnterKey);
    initState();
    startCapturingInput();
    sessionStorage.setItem('username', usernameInput.value);
    console.log(sessionStorage.getItem('username'));
    console.log("hi");
    window.location.href = '/lobby.html';
    // 로그인 기능 여기다가 넣어야 함
    // 아이디랑 비빌번호를 기억해서 저장해 둬야 함

  };

}).catch(console.error);

// 엔터 키 이벤트를 감지하는 함수
function handleEnterKey(event) {
  // event.keyCode는 Enter 키의 키코드가 13입니다.
  if (event.keyCode === 13) {
    // 엔터 키를 누른 경우, playButton을 클릭한 것과 같은 동작을 수행합니다.
    if (flag) {
      playButton.click();
    } else {
      replayButton.click();
    }
  }
}

document.getElementById('gotoLobby').addEventListener('click', function () {
  window.location.href = '/lobby.html';
});

document.getElementById('gotoIngame').addEventListener('click', function () {
  window.location.href = '/ingame.html';
});

document.getElementById('gotoIndex').addEventListener('click', function () {
  window.location.href = '/index.html';
});
