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
import './css/signup.css';
import pixiApp from './pixi/app.js';

const gamecanvers = document.getElementById('game-canvas');

// const playButton = document.getElementById('play-button');
// const usernameInput = document.getElementById('username-input');

// const replayButton = document.getElementById('replay-button');


const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');


let flag = true;


Promise.all([

    downloadAssets(),
    pixiApp(),

]).then(() => {

    registerLink.addEventListener('click', function () {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', function () {
        wrapper.classList.remove('active');
    });

}).catch(console.error);

// 엔터 키 이벤트를 감지하는 함수s

document.getElementById('gotoLobby').addEventListener('click', function () {
    window.location.href = '/lobby.html';
});

document.getElementById('gotoIngame').addEventListener('click', function () {
    window.location.href = '/ingame.html';
});

document.getElementById('gotoIndex').addEventListener('click', function () {
    window.location.href = '/index.html';
});


