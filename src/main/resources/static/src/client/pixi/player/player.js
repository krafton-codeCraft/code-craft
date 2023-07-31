import { getAsset } from '../../assets';

const Constants = require('../../../shared/constants');
const { PLAYER_RADIUS } = Constants;

let sprite = null;
let text = null;

function renderPlayer(player, app) {
    const { x, y, name , bodyHeading, gunHeading, raderHeading,energy } = player;
    const canvasX = x;//app.screen.width / 2 + x - me.x;
    const canvasY = y;//app.screen.height / 2 + y - me.y;

    // 배 그리기
    sprite = new PIXI.Sprite(PIXI.Texture.from(getAsset('ship.svg')));
    sprite.anchor.set(0.5);
    sprite.x = canvasX;
    sprite.y = canvasY;
    sprite.rotation = bodyHeading;
    sprite.width = PLAYER_RADIUS * 2;
    sprite.height = PLAYER_RADIUS * 2;
    app.stage.addChild(sprite);

    // TODO 포탑

    // TODO 체력바 
    // TODO 체력바 텍스트


    // 텍스트 그리기
    text = new PIXI.Text(name, { fontFamily: 'Arial', fontSize: 16, fill: 'white' });
    text.anchor.set(0.5);
    text.x = canvasX;
    text.y = canvasY + PLAYER_RADIUS + 16;
    app.stage.addChild(text);
}

export default renderPlayer;