import pixiApp from './pixi/app.js';
import './css/bootstrap-reboot.css';
import './css/signup.css';

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

let flag = true;

Promise.all([

    // downloadAssets(),
    pixiApp(),

]).then(() => {
    
    registerLink.addEventListener('click', function () {
        wrapper.classList.add('active');
    });
    
    loginLink.addEventListener('click', function () {
        wrapper.classList.remove('active');
    });

}).catch(console.error);

<<<<<<< HEAD
// 엔터 키 이벤트를 감지하는 함수s

=======
>>>>>>> 468885226246c7008556dad87fe81a01ed6b1e63
