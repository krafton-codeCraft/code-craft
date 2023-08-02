// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#4-client-networking
// import io from 'socket.io-client';
//import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';
//import { explosionPlay } from './pixi/effect/explosion'
//import constants from '../shared/constants';
//import renderCheckbox from './htmlComponent/checkbox';
import { renderCode } from './codeSpace';

// import redis from 'redis';

// websocket connection
const battleId = 1;
const devaddr = 'localhost';
// const prodaddr = '3.35.214.100';
const addr = process.env.ADDRR;
// const websocket = new WebSocket(`ws://13.124.67.137:8080/room/${roomId}`);
const websocket = new WebSocket(`ws://${addr}:8080/battle/${battleId}`);

const wsconnectedPromise = new Promise(resolve => {
  // to websocket, 이벤트 핸들러 변경
  // io 와는 다르게 WebSocket 을 사용할 때는 이벤트 핸들러를 직접 등록해야 한다.
  websocket.onopen = (() => {
    console.log('Connected to web socket game server!');
    resolve();
  });
});

export let robotId;
export let robotname;
export let username;

// connect 이후 콜백 등록
export const connect = onGameOver => (
  wsconnectedPromise.then(() => {
    // Register callbacks
    // socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    // 이벤트 핸들러 등록 (open, close, error 제외한 일반적인 메시지에 대한 이벤트 핸들러)
    // 
    websocket.onmessage = event => {
      const message = JSON.parse(event.data);

      if (message.type === 'senterbattle') {
        robotId = message.robotId;
        robotname = message.robotName;
        console.log(`enter game!! ${robotId}`);

      } else if (message.type === 'supdate') { // update (움직임 패킷)
        // 플레이어 update
        const update = {
          t: message.update.t,
          robots: message.update.robots,
          bullets: message.update.bullets,
          scans: message.update.scans
        };
        // console.log(update);
        processGameUpdate(update);

      } else if (message.type === 'schat') {
        // console.log('schat');
      } else if (message.type === 'sdie') {
        console.log('sdie');
      }
    };

    websocket.onclose = () => {
      console.log('Disconnected from server.');
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    };
  })
);

// send data << 어차피 이거 아님
export const play = name => {
  const message = {
    type: 'centerbattle',
    protocol: 'C_EnterBattle',
    username: name,
  };
  websocket.send(JSON.stringify(message));
};

export const submitNewCode = (code, specIndex) => {
  const message = {
    type: 'csubmit',
    protocol: C_Submit,
    username: '',
    robotId: '',
    code: code,
    specIndex: specIndex
  }
  websocket.send(JSON.stringify(message));
}


export const requestLeaderBoard = (roomId) => {
  const url = `http://${addr}:8080/get/leaderboard?roomId=` + roomId;
  return fetch(url, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const requestTodayRanking = () => {
  const url = `http://${addr}:8080/get/today_ranking`;
  fetch(url, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
};

function compile_code() {
  const content = getEditorValue();
  const url = `http://${addr}:8080/create/robot`;
  let Data = { code: content };
  console.log(content);
  fetch_code(Data, url);
};

function change_code(index) {
  const content = getEditorValue();
  const url = `http://${addr}:8080/change/ingame-robot`;
  let Data = { robotId: robotId, specIndex: index, code: content }
  console.log(Data)
  fetch_code(Data, url);
};

function fetch_code(Data, url) {
  const params = new URLSearchParams(Data).toString();
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
    .then(response => response.json())
    .then(data => {
      const result = data.exitCode;
      const status = data.content;
      code_check(result, status);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
window.change_code = change_code;
window.compile_code = compile_code;

export const getRobotInfos = () => {
  const url = `http://${addr}:8080/get/robot-infos`;
  return fetch(url, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      renderCode(data);
      return data;
    });
}

// export const updateInputKeyBoardDown = throttle(20, (key) => {
//   let dir;
//   if (key === 38) {
//     dir = 'North';
//   } else if (key === 40) {
//     dir = 'South';
//   } else if (key === 39) {
//     dir = 'East';
//   } else if (key === 37) {
//     dir = 'West';
//   }

//   const message = {
//     type: 'cmove',
//     protocol: 'C_Move',
//     posInfo: {
//       pos: {},
//       dirs: [],
//       state: null,
//     },
//     dir: dir,
//     updown: true,
//   };

//   websocket.send(JSON.stringify(message));
// });

// export const updateInputKeyBoardUp = (key) => {
//   let dir;
//   if (key === 38) {
//     dir = 'North';
//   } else if (key === 40) {
//     dir = 'South';
//   } else if (key === 39) {
//     dir = 'East';
//   } else if (key === 37) {
//     dir = 'West';
//   }

//   const message = {
//     type: 'cmove',
//     protocol: 'C_Move',
//     posInfo: {
//       pos: {},
//       dirs: [],
//       state: null,
//     },
//     dir: dir,
//     updown: false,
//   };

//   websocket.send(JSON.stringify(message));
// };

// let analysisResult = { result: null, percentage: null };
// export { analysisResult };

// export const performSentimentAnalysisPlayer = (playerID, targetID, inputValue) => {
//   const url = `http://localhost:5050/sentiment-analysis-player`; // Adjust the URL to match your Python server
//   const dataString = playerID + '|' + targetID + '|' + inputValue;
//   // Send the input value to the Python server using fetch API
//   sendContent(url, dataString, targetID, inputValue);
// }
// export const performSentimentAnalysisMeteor = (meteorWord, targetID, inputValue) => {
//   const url = `http://localhost:5050/sentiment-analysis-meteor`; // Adjust the URL to match your Python server
//   const dataString = meteorWord + '|' + targetID + '|' + inputValue;
//   // Send the input value to the Python server using fetch API
//   sendContent(url, dataString, targetID, inputValue);
// }


// function sendContent(url, dataString, targetID, inputValue) {
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'text/plain',
//       'Connection': 'keep-alive'
//     },
//     body: dataString
//   })
//     .then(response => response.json())
//     .then(data => {
//       const result = data.result;
//       handleChatAttack(targetID, inputValue, result, data.percentage);

//       console.log(result);
//       analysisResult.result = data.result;
//       analysisResult.percentage = data.percentage;
//       // Update the UI with the sentiment analysis result as needed
//       renderCheckbox(targetID, inputValue, result);

//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }


// const bullletInstance = {
//   skillId: 1,
//   name: 'bullet',
//   damage: constants.BULLET_DAMAGE,
//   skillType: 'BULLET',
//   projectile: {
//     speed: constants.BULLET_SPEED,
//     range: constants.BULLET_RADIUS,
//   }
// };

// const shieldInstance = {
//   skillId: 2,
//   name: 'shield',
//   damage: 0,
//   skillType: 'SHIELD',
// };

// export const handleChatAttack = (targetID, content, result, percent) => {

//   if (targetID == -1 && !result) { //
//     console.log('타겟이 없는 상태에서 부정이면 방어할 수 없습니다.');
//     return;
//   }

//   let targetType = ((targetID >> 24) & 0x7F);
//   if (targetType == 2 && !result) {
//     console.log('70% 의 유사도를 넘지 못했으므로 공격할 수 없습니다.');
//     return;
//   }

//   if (targetID == -1) {
//     sendSkill(targetID, true);
//   }
//   else if (targetType == 1) {
//     sendSkill(targetID, result);
//   }
//   else if (targetType == 2) {
//     sendSkill(targetID, false);
//   }
//   else {
//     console.log('굉장히 잘못되었다.');
//   }
// }

// function sendSkill(targetID, result) {
//   // false 이면 공격, true 이면 쉴드
//   let info = result === false ? bullletInstance : shieldInstance;
//   const skillPacket = {
//     type: 'cskill',
//     protocol: 'C_Skill',
//     target: targetID,
//     info: info
//   }
//   // skill
//   websocket.send(JSON.stringify(skillPacket));
// }z
