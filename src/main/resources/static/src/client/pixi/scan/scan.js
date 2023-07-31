
let Scaning = null;

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

function renderScan(scan, app) {
    const {robotX,robotY, x,y,width,height, angleStart , angleExtent} = scan;
    
    const midx = robotX;//(x+width)/2
    const midy = robotY;//(y+height)/2
    const dist = width/2;//distRadius(x,y,width,height);
    const startrad = toRadius(angleStart);
    const endrad = toRadius(angleStart + angleExtent);

    Scaning = new PIXI.Graphics();
    Scaning.beginFill(0xffd900, 0.4);
    Scaning.lineStyle(1, 0xffd900, 0.4);
    Scaning.moveTo(midx,midy);
    Scaning.arc(midx,midy, dist , startrad, endrad , true); // 각은 라디안을 사용해야함
    Scaning.lineTo(midx,midy);
    Scaning.endFill();

    app.stage.addChild(Scaning);

}

export default renderScan;