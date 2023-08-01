let editor

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
    editor = monaco.editor.create(document.getElementById('container-lobby-body'), {
      value: `public class StupidBot extends Robot {
  @Override
  public void run() {
    while (true) {
      System.out.println(Thread.currentThread().getName() + " 헤헤헤헤: " + getX() + ", " + getY());
      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        throw new RuntimeException(e);
      }
    }
  }

  @Override
  public void onScannedRobot(ScannedRobotEvent event) {
    System.out.println("헤헤헤헤헤 스캔: " + event.getName());
  }
}
    `,
      language: 'java',
      theme: 'hc-black'
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
    terminal.innerHTML = `<span style="font-weightL bold; color: green;" > ${status}: </span> <span style="font-weight: bold; color: green;"${result}</span>`;
  }
}