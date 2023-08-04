export let robotMessages = {};

export function handleChat(robotId, content) {
    const expirationTime = Date.now() + 2000;  // 2 seconds from now
    robotMessages[robotId] = {
        content: content,
        expiresAt: expirationTime
    };
}

function drawMapleStoryBubble(graphics, x, y, width, height, radius) {
    const tailHeight = 10; // 말풍선의 꼬리 부분 높이

    graphics.beginFill(0xFFFFFF); // 하얀색으로 채우기
    graphics.drawRoundedRect(x, y, width, height, radius);
    graphics.endFill();

    // 말풍선의 꼬리 부분 추가 (downwards pointing tail)
    graphics.beginFill(0xFFFFFF);
    graphics.moveTo(x + width / 2 - 10, y + height); // Starting point of the tail, left side
    graphics.lineTo(x + width / 2, y + height + tailHeight); // Middle point of the tail, pointing downwards
    graphics.lineTo(x + width / 2 + 10, y + height); // Ending point of the tail, right side
    graphics.closePath();
    graphics.endFill();
}


export function renderSpeechBubble(robot, playgroundApp, content) {
    const text = new PIXI.Text(content, {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 'black', // 글씨 색을 검정색으로 변경
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 150,
        stroke: 'white', // 글씨 주변에 하얀색 테두리 추가
        strokeThickness: 2,
        dropShadowBlur: 3, 
        dropShadowDistance: 2, 
        padding: 5 
    });

    const padding = 15;
    const bubbleWidth = text.width + 2 * padding;
    const bubbleHeight = text.height + 2 * padding;

    const offsetY = bubbleHeight + 40;
    const bubbleY = robot.y - offsetY;

    const bubble = new PIXI.Graphics();
    drawMapleStoryBubble(bubble, robot.x - bubbleWidth / 2, bubbleY, bubbleWidth, bubbleHeight, 10);

    // 텍스트를 말풍선의 중앙에 위치시키기 위한 조정
    text.x = robot.x - text.width / 2;
    text.y = bubbleY + (bubbleHeight - text.height) / 2;  // 말풍선 내의 수직 중앙에 위치

    playgroundApp.stage.addChild(bubble);
    playgroundApp.stage.addChild(text);
}
