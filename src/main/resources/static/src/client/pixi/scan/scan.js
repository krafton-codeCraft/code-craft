import { robotId } from '../../networking'
import { playerSprites } from '../player/player'

const scanSprites = {};

export function renderScan(scan, app) {
    const { id } = scan;
    
    if(!playerSprites[id]){
        const scaning = scanSprites[id];
        if(scaning){
            app.stage.removeChild(sprite);
            delete playerSprites[id];
        }
        return;
    }


    let scansprite = scanSprites[id];

    if(!scansprite){
        scansprite = createNewScan()
        scanSprites[id] = scansprite;
        app.stage.addChild(scansprite);
    }else{
        updateScanData(scansprite,scan);
    }

}

function createNewScan(scan){
    const { id,name, robotX,robotY, x,y,width,height, angleStart , angleExtent} = scan;
    //console.log(`angleStart : ${angleStart}  angleExtent : ${angleExtent}`)
    const midx = robotX;//(x+width)/2
    const midy = robotY;//(y+height)/2
    const dist = width/2;//distRadius(x,y,width,height);
    let startrad = null;
    let endrad = null;
    if(angleExtent > 0 ){
        startrad = toRadius(2*Math.PI - angleStart - angleExtent);
        endrad = toRadius(2*Math.PI - angleStart - (angleExtent *2));
    }else{
        startrad = toRadius(2*Math.PI - angleStart + angleExtent);
        endrad = toRadius(2*Math.PI - angleStart + (angleExtent *2));
    }
    
    const Scaning = new PIXI.Graphics();
    if(robotId === id){
        Scaning.beginFill(0x00ff00, 0.25);
        Scaning.lineStyle(1, 0x00ff00, 0.25);
    }else{
        Scaning.beginFill(0xff0000, 0.25);
        Scaning.lineStyle(1, 0xff0000, 0.25);
    }
    Scaning.moveTo(midx,midy);
    Scaning.arc(midx,midy, dist , startrad, endrad , true); // 각은 라디안을 사용해야함
    Scaning.lineTo(midx,midy);
    Scaning.endFill();
    return Scaning;
}

function updateScanData(sprite, scan){
    const { id,name, robotX,robotY, x,y,width,height, angleStart , angleExtent} = scan;
    const midx = robotX;//(x+width)/2
    const midy = robotY;//(y+height)/2
    const dist = width/2;//distRadius(x,y,width,height);
    let startrad = null;
    let endrad = null;
    if(angleExtent > 0 ){
        startrad = toRadius(2*Math.PI - angleStart - angleExtent);
        endrad = toRadius(2*Math.PI - angleStart - (angleExtent *2));
    }else{
        startrad = toRadius(2*Math.PI - angleStart + angleExtent);
        endrad = toRadius(2*Math.PI - angleStart + (angleExtent *2));
    }
    sprite.clear();
    if(robotId === id){
        sprite.beginFill(0x00ff00, 0.25);
        sprite.lineStyle(1, 0x00ff00, 0.25);
    }else{
        sprite.beginFill(0xff0000, 0.25);
        sprite.lineStyle(1, 0xff0000, 0.25);
    }
    sprite.moveTo(midx,midy);
    sprite.arc(midx,midy, dist , startrad, endrad , true); // 각은 라디안을 사용해야함
    sprite.lineTo(midx,midy);
    sprite.endFill();
}

function toRadius(angle){
    // 각도가 들어오면 라디안 값으로 변환
    return angle * Math.PI / 180;
}

function distRadius(x1, y1, x2, y2){
    // 반지름 구하기
    const distanceX = x2 - x1;
    const distanceY = y2 - y1;

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    return distance/2;
}
