import './css/bootstrap-reboot.css';
import pixiApp from './pixi/app.js';
import './css/signup.css';
import { downloadAssets, getAsset } from './assets';

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

let flag = true;

Promise.all([

    // downloadAssets(),
    pixiApp(),

]).then(() => {
    // const bgm = new Audio(getAsset('NLP_InGame_Final_Int.wav').src);
    //     bgm.play();
    registerLink.addEventListener('click', function () {
        wrapper.classList.add('active');
    });
    
    loginLink.addEventListener('click', function () {
        wrapper.classList.remove('active');
    });

}).catch(console.error);

