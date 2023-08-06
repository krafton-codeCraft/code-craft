import { getAsset } from '../../assets';
import { robotId } from '../../networking';
import { explosionEffect ,warpEffect } from '../effect/particles'

const Constants = require('../../../shared/constants');
const { PLAYER_RADIUS,PLAYER_MAXENERGY, PLAYER_MAXHP } = Constants;


export const playerSprites = {};

export function renderPlayer(player, app) {
    
    const { id , dead } = player;
    
    // console.log(id);
    if(dead){
        const sprite = playerSprites[id];
        if(sprite){
            new explosionEffect(app,player.x,player.y);
            app.stage.removeChild(sprite);
            delete playerSprites[id];
        }
        return;
    }

    let robot = playerSprites[id];

    if(!robot){

        setTimeout(() => {
            new warpEffect(app,robot.getChildAt(0).x,robot.getChildAt(0).y);
            app.stage.addChild(robot);
            animateScale(robot);
        }, 200 )

        robot = createNewPlayerSprite(player);
        playerSprites[id] = robot;

    }else{
        updatePlayerSpriteData(robot,player);
    }

}

function animateScale(robot){
    const scaleSpeed = 0.5;
    if (robot.getChildAt(0).width < PLAYER_RADIUS * 2) {
        robot.getChildAt(0).width = Math.min(PLAYER_RADIUS * 2, robot.getChildAt(0).width + scaleSpeed);
        robot.getChildAt(0).height = Math.min(PLAYER_RADIUS * 2, robot.getChildAt(0).height + scaleSpeed);
        robot.getChildAt(1).width = Math.min(PLAYER_RADIUS, robot.getChildAt(0).width + scaleSpeed);
        robot.getChildAt(1).height = Math.min(PLAYER_RADIUS, robot.getChildAt(0).height + scaleSpeed);
        requestAnimationFrame(() => animateScale(robot));
    }
}

function createNewPlayerSprite(player){
    const robotContainer = new PIXI.Container();
    const { id, x, y, name , bodyHeading, gunHeading, raderHeading, energy ,hp } = player;
    
    const canvasX = x;
    const canvasY = y;
    let randcolor = 0xFFFFFF;

    const ratiohp = energy === 0 ? 0 : energy / PLAYER_MAXENERGY * 60;
    /* console.log("robotId" + robotId);
    console.log("id " + id); */
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
    bodyship.width = 10;
    bodyship.height = 10;
    bodyship.tint = randcolor
    robotContainer.addChildAt(bodyship,0);
    
    const gunhead = new PIXI.Sprite(PIXI.Texture.from(getAsset('ship2.svg')));
    gunhead.anchor.set(0.5);
    gunhead.x = canvasX;
    gunhead.y = canvasY;
    gunhead.rotation = Math.PI - gunHeading;
    gunhead.width = 0;
    gunhead.height = 0;
    gunhead.tint = 0x000000;
    robotContainer.addChildAt(gunhead,1);
   
    //체력바 텍스트
    const hptext = new PIXI.Text(hp, { fontFamily: 'Arial', fontSize: 16, fill: 'white' });
    hptext.anchor.set(0.5);
    hptext.x = canvasX;
    hptext.y = canvasY + (PLAYER_RADIUS * 2) + 10;
    robotContainer.addChildAt(hptext,2);

    randcolor = Math.floor(randcolor);
    const fillValue = '#' + randcolor.toString(16).padStart(6, '0');
    // 텍스트 그리기
    const text = new PIXI.Text(name, { fontFamily: 'Arial', fontSize: 20, fill: fillValue });
    text.anchor.set(0.5);
    text.x = canvasX;
    text.y = canvasY + PLAYER_RADIUS + 20;    
    robotContainer.addChildAt(text,3);

    //robotContainer.scale.set(0); // 초기 스케일을 0으로 설정
    return robotContainer;
}

function updatePlayerSpriteData(sprite,player){
    const { x, y , bodyHeading, gunHeading ,hp } = player;

    sprite.getChildAt(0).x = x;
    sprite.getChildAt(0).y = y;
    sprite.getChildAt(0).rotation = Math.PI - bodyHeading;

    sprite.getChildAt(1).x = x;
    sprite.getChildAt(1).y = y;
    sprite.getChildAt(1).rotation = Math.PI - gunHeading;

    sprite.getChildAt(2).x = x;
    sprite.getChildAt(2).y = y + (PLAYER_RADIUS * 2) + 10;
    sprite.getChildAt(2).text = hp;

    sprite.getChildAt(3).x = x;
    sprite.getChildAt(3).y = y + PLAYER_RADIUS + 20;

}
