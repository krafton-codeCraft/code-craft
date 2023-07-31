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
        let editor = monaco.editor.create(document.getElementById('javaEditor'), {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            language: 'java',
            theme: 'hc-black'
        });
    });
});

function code_check(result, status) {
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = `${status}: ${result}`;
}
