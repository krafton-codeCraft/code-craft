import { startCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';
import './css/bootstrap-reboot.css';
import './css/signup.css';
import pixiApp from './pixi/app.js';

const gamecanvers = document.getElementById('game-canvas');

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

