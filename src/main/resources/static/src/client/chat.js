export let robotMessages = {};


export function handleChat(robotId, content){
    const expirationTime = Date.now() + 2000;  // 2 seconds from now
    robotMessages[robotId] = {
        content: content,
        expiresAt: expirationTime
    };
}

export function renderSpeechBubble(robot, playgroundApp, content) {
    const text = new PIXI.Text(content, {
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 'white',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 150  // adjust this as needed
    });

    // Calculate the bubble size based on the text content
    const bubbleWidth = text.width + 20; // adding some padding
    const bubbleHeight = text.height + 10;

    const bubble = new PIXI.Graphics();
    drawRoundedRect(bubble, robot.x - bubbleWidth / 2, robot.y - 20 - bubbleHeight, bubbleWidth, bubbleHeight, 10);

    text.x = robot.x - text.width / 2;
    text.y = robot.y - 20 - bubbleHeight / 2 - text.height / 2;

    playgroundApp.stage.addChild(bubble);
    playgroundApp.stage.addChild(text);
}
function drawRoundedRect(graphics, x, y, width, height, radius) {
    graphics.beginFill(0x000000, 0.7); // slightly transparent black
    graphics.drawRoundedRect(x, y, width, height, radius);
    graphics.endFill();
}
