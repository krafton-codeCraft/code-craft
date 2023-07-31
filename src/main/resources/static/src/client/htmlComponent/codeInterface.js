let editor1, editor2, editor3;
let currentEditor = editor1;  // 기본값으로 editor1을 설정합니다.

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
        editor1 = monaco.editor.create(document.getElementById('container1'), {
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
        editor2 = monaco.editor.create(document.getElementById('container2'), {
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

  }
}
    `,
            language: 'java',
            theme: 'hc-black'
        });
        editor3 = monaco.editor.create(document.getElementById('container3'), {
            value: `public class StupidBot extends Robot {
  @Override
  public void run() {
    while (true) {

      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        throw new RuntimeException(e);
      }
    }
  }

  @Override
  public void onScannedRobot(ScannedRobotEvent event) {
  
  }
}
    `,
            language: 'java',
            theme: 'hc-black'
        });
    });
});
function getEditorValue() {
    if (currentEditor) {
        const content = currentEditor.getValue();
        alert(content); // Display the content, you can do whatever you want with it
        return content;
    }
}

function code_check(result, status) {
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = `< span style="font-weight: bold; color: red;" > ${status}: </span > <span style="font-weight: bold; color: red;">${result}</span>`;
}

function deck_change(deckNum) {
    const editors = [editor1, editor2, editor3];
    const containers = ['container1', 'container2', 'container3'];

    for (let i = 0; i < 3; i++) {
        if ((i + 1) === deckNum) {
            document.getElementById(containers[i]).style.display = 'block';
            currentEditor = editors[i];
        } else {
            document.getElementById(containers[i]).style.display = 'none';
        }
    }
}