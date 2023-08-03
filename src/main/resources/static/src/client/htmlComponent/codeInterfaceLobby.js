let editorLobby;
let selectedDeckLobby = 0;
let robotInfosLobby = [];
document.addEventListener('DOMContentLoaded', function () {
  require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });

  let proxy = URL.createObjectURL(new Blob([`
      self.MonacoEnvironment = {
          baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
      };
      importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
  `], { type: 'text/javascript' }));

  window.MonacoEnvironment = { getWorkerUrl: () => proxy };

  require(["vs/editor/editor.main"], function () {
    editorLobby = monaco.editor.create(document.getElementById('container-lobby-body'), {
      value: '',
      language: 'java',
      theme: 'vs-dark',
      automaticLayout: true,
      fontSize: 20
    });

    // 에디터가 생성된 후 데이터를 불러옵니다.
    const url = `http://localhost:8080/get/robot-infos`;
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        robotInfosLobby = data;
        console.log(data);
        console.log(data[0].code);
        editorLobby.setValue(data[0].code);
      })
      .catch(e => {
        console.log("ee?");
      });
  });
});

function getEditorValueLobby() {
  if (editorLobby) {
      const content = editorLobby.getValue();
      alert(content); // Display the content, you can do whatever you want with it
      return content;
  }
}

function code_check_lobby(result, status, index, code) {
  const terminal = document.getElementById('terminal-lobby');
  if (result != 0) {
      terminal.innerHTML = `<span style="font-weight: bold; color: red;" > ${status}: </span> <span style="font-weight: bold; color: red;">${result}</span>`;
  }
  else {
    terminal.innerHTML = `<span style="font-weightL bold; color: green;" > ${status}: </span> <span style="font-weight: bold; color: green;"${result}</span>`;
    robotInfos[index] = code;
    }
}


function selectDeckIndexLobby(deckId) {
  selectedDeckLobby = deckId;
  console.log(robotInfosLobby)
  if (robotInfosLobby[selectedDeckLobby]) {
    editorLobby.setValue(robotInfosLobby[selectedDeckLobby].code)
    console.log(selectedDeckLobby);
  } else {
    console.log('No robot info found for selected deck.')
  }
}