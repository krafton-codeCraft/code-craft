import { getAsset } from '../../assets';
import { robotId } from '../../networking';

const Constants = require('../../../shared/constants');
const { PLAYER_RADIUS,PLAYER_MAXENERGY, PLAYER_MAXHP } = Constants;

export const playerSprites = {};

export function renderPlayer(player, app) {
    
    const { id , dead } = player;
    
    // console.log(id);
    if(dead){
        const sprite = playerSprites[id];
        if(sprite){
            app.stage.removeChild(sprite);
            delete playerSprites[id];
        }
        return;
    }

    let robot = playerSprites[id];

    if(!robot){
        robot = createNewPlayerSprite(player);
        playerSprites[id] = robot;
        app.stage.addChild(robot);
    }else{
        updatePlayerSpriteData(robot,player);
    }

    
}

function createNewPlayerSprite(player){
    const robotContainer = new PIXI.Container();
    const { id, x, y, name , bodyHeading, gunHeading, raderHeading, energy ,hp } = player;

    const canvasX = x;
    const canvasY = y;
    let randcolor = 0xFFFFFF;

    //console.log(`x : ${x} ()  y : ${y}`);
    const ratiohp = energy === 0 ? 0 : energy / PLAYER_MAXENERGY * 60;
    if(robotId === id){
        randcolor = 0x00ff00;
    }else{
        randcolor = 0xFFFFFF;
    }
    
    //spaceship${robotId%8}.png
    // 배 그리기
    const bodyship = new PIXI.Sprite(PIXI.Texture.from(getAsset(`ship.svg`)));
    bodyship.anchor.set(0.5);
    bodyship.x = canvasX;
    bodyship.y = canvasY;
    bodyship.rotation = Math.PI - bodyHeading;
    bodyship.width = PLAYER_RADIUS * 2;
    bodyship.height = PLAYER_RADIUS * 2;
    bodyship.tint = randcolor
    robotContainer.addChild(bodyship);
    
    const gunhead = new PIXI.Sprite(PIXI.Texture.from(getAsset('ship.svg')));
    gunhead.anchor.set(0.5);
    gunhead.x = canvasX;
    gunhead.y = canvasY;
    gunhead.rotation = Math.PI - gunHeading;
    gunhead.width = PLAYER_RADIUS;
    gunhead.height = PLAYER_RADIUS;
    gunhead.tint = 0x000000;
    robotContainer.addChild(gunhead);

    //체력바 
    /* const innerBar = new PIXI.Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(canvasX - (PLAYER_RADIUS * 2) , canvasY - (PLAYER_RADIUS * 2) - 5, 60, 10);
    innerBar.endFill();
    app.stage.addChild(innerBar);

    const outerBar = new PIXI.Graphics();
    outerBar.beginFill(0xFF3300);
    outerBar.drawRect(canvasX - (PLAYER_RADIUS * 2) , canvasY - (PLAYER_RADIUS * 2) - 5,ratiohp , 10);
    outerBar.endFill();
    app.stage.addChild(outerBar); */
   
    //체력바 텍스트
    const hptext = new PIXI.Text(hp +'/' + PLAYER_MAXHP, { fontFamily: 'Arial', fontSize: 10, fill: 'white' });
    hptext.anchor.set(0.5);
    hptext.x = canvasX;
    hptext.y = canvasY + (PLAYER_RADIUS * 2) + 10;
    robotContainer.addChild(hptext);

    randcolor = Math.floor(randcolor);
    const fillValue = '#' + randcolor.toString(16).padStart(6, '0');
    // 텍스트 그리기
    const text = new PIXI.Text(name, { fontFamily: 'Arial', fontSize: 16, fill: fillValue });
    text.anchor.set(0.5);
    text.x = canvasX;
    text.y = canvasY + PLAYER_RADIUS + 20;
    robotContainer.addChild(text);

    return robotContainer;
}

function updatePlayerSpriteData(sprite,player){
    const { x, y , bodyHeading, gunHeading ,hp } = player;
    const { bodyship , gunhead , hptext , text } = sprite;

    bodyship.x = x;
    bodyship.y = y;
    bodyship.rotation = Math.PI - bodyHeading;

    gunhead.x = x;
    gunhead.y = y;
    gunhead.rotation = Math.PI - gunHeading;

    hptext.x = x;
    hptext.y = y + (PLAYER_RADIUS * 2) + 10;
    hptext.text = hp +'/' + PLAYER_MAXHP;

    text.x = x;
    text.y = y + PLAYER_RADIUS + 20;
}

export default renderPlayer;