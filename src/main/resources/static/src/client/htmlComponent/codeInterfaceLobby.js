import { getRobotInfos } from "../networking";

let editor;
let info;
let selectedDeckLobby = 0;

document.addEventListener('DOMContentLoaded', async function () {

  console.log("hi");

  const data = await getRobotInfos();
  info = data[0].code || `public class StupidBot extends Robot {
  // ... (여기에 StupidBot 코드를 적으세요)
  }`;

  require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });
  let proxy = URL.createObjectURL(new Blob([`
        self.MonacoEnvironment = {
            baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
        };
        importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
    `], { type: 'text/javascript' }));

  window.MonacoEnvironment = { getWorkerUrl: () => proxy };

  require(["vs/editor/editor.main"], function () {
    editor = monaco.editor.create(document.getElementById('container-lobby-body'), {
      value: info,
      language: 'java',
      theme: 'vs-dark'
    });
  });
});

function getEditorValue() {
  if (editor) {
    const content = editor.getValue();
    alert(content); // Display the content, you can do whatever you want with it
    return content;
  }
}

function code_check(result, status) {
  const terminal = document.getElementById('terminal-lobby');
  if (result != 0) {
    terminal.innerHTML = `<span style="font-weight: bold; color: red;" > ${status}: </span> <span style="font-weight: bold; color: red;">${result}</span>`;
  }
  else {
    terminal.innerHTML = `<span style="font-weight: bold; color: green;" > ${status}: </span> <span style="font-weight: bold; color: green;"${result}</span>`;
  }
}
function selectDeckIndexLobby(deckId) {
  selectedDeckLobby = deckId;
  console.log(selectedDeckLobby);
}

