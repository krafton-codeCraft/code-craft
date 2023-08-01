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

registerLink.addEventListener('click', function () {
    wrapper.classList.add('active');
});
loginLink.addEventListener('click', function () {
    wrapper.classList.remove('active');
});

Promise.all([

    downloadAssets(),
    pixiApp(),

]).then(() => {

    window.addEventListener('keydown', handleEnterKey);
    usernameInput.focus();

    playButton.onclick = () => {

        window.removeEventListener('keydown', handleEnterKey);
        initState();
        startCapturingInput();
        sessionStorage.setItem('username', usernameInput.value);
        console.log(sessionStorage.getItem('username'));
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

