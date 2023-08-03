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
// import './css/main.css';
import './css/ingame.css';
import pixiApp from './pixi/app.js';
import { getRobotInfos } from './networking.js';

const gamecanvers = document.getElementById('game-canvas');

const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const usernameInput = document.getElementById('username-input');

const gameoverMenu = document.getElementById('game-over');
const replayButton = document.getElementById('replay-button');
const usernamereInput = document.getElementById('username-reinput');
let flag = true;

Promise.all([

  connect(onGameOver),
  downloadAssets(),
  pixiApp(),
  // getRobotInfos(),

]).then(() => {

  play();

}).catch(console.error);

function onGameOver(obj) {
  gamecanvers.classList.add('hidden');
  stopCapturingInput();
  setLeaderboardHidden(true);
  gameoverMenu.classList.remove('hidden');

  if(flag){// 전판과 똑같은 이름으로 복사
    usernamereInput.value = usernameInput.value;
    flag = false;
  }
  usernamereInput.focus();
  replayButton.onclick = () => {
    gamecanvers.classList.remove('hidden');
    window.removeEventListener('keydown' ,handleEnterKey);
    play(usernamereInput.value);
    gameoverMenu.classList.add('hidden');
    initState();
    startCapturingInput();
    setLeaderboardHidden(false);
  }
}


// 엔터 키 이벤트를 감지하는 함수
function handleEnterKey(event) {
  // event.keyCode는 Enter 키의 키코드가 13입니다.
  if (event.keyCode === 13) {
    // 엔터 키를 누른 경우, playButton을 클릭한 것과 같은 동작을 수행합니다.
    if(flag){
      playButton.click();
    }else{
      replayButton.click();
    }
  }
}

document.getElementById('toggle-main-container').addEventListener('click', function() {
  var mainContainer = document.getElementById('main-container');
  if(mainContainer.classList.contains('open')) {
    mainContainer.classList.remove('open');
  } else {
    mainContainer.classList.add('open');
  }
});

document.getElementById('closebtn').addEventListener('click', function() {
  var mainContainer = document.getElementById('main-container');
  mainContainer.classList.remove('open');
});