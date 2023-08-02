import { robotId } from '../../networking'
let Scaning = null;
export let deadRobot = []
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

export function renderScan(scan, app) {
    const { id,name, robotX,robotY, x,y,width,height, angleStart , angleExtent} = scan;
    const indexToDelete = deadRobot.indexOf(id);
    // 배열에서 해당 인덱스의 요소를 삭제합니다.
    if (indexToDelete !== -1) {
        return;
    }
    //console.log(`angleStart : ${angleStart}  angleExtent : ${angleExtent}`)
    const midx = robotX;//(x+width)/2
    const midy = robotY;//(y+height)/2
    const dist = width/2;//distRadius(x,y,width,height);
    const startrad = toRadius(2*Math.PI - angleStart);
    let endrad = null
    if(angleExtent < 0 ){
        endrad = toRadius(2*Math.PI - angleStart - angleExtent);
    }else{
        endrad = toRadius(2*Math.PI - angleStart + angleExtent);
    }
    

    Scaning = new PIXI.Graphics();
    if(robotId === id){
        Scaning.beginFill(0x00ff00, 0.25);
        Scaning.lineStyle(1, 0x00ff00, 0.25);
    }else{
        Scaning.beginFill(0xff0000, 0.25);
        Scaning.lineStyle(1, 0xff0000, 0.25);
    }
    Scaning.moveTo(midx,midy);
    Scaning.arc(midx,midy, dist , startrad, endrad , false); // 각은 라디안을 사용해야함
    Scaning.lineTo(midx,midy);
    Scaning.endFill();

    app.stage.addChild(Scaning);

}
