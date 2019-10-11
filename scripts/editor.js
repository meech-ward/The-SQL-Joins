$(() => {
  const $editorComponents = $('.sql-editor-component');
  window.editors = {};

  $editorComponents.each((index, editorComponent) => {
    const $editorComponent = $(editorComponent);
    const editorName = $editorComponent.data('editor');

    // pass options to ace.edit
    const editor = ace.edit($editorComponent.find('.editor')[0], {
      mode: "ace/mode/sql",
      selectionStyle: "text"
    })
    editors[editorName] = editor;

    // use setOptions method to set several options at once
    editor.setOptions({
      autoScrollEditorIntoView: true,
      copyWithEmptySelection: true,
    });
    // use setOptions method
    editor.setOption("mergeUndoDeltas", "always");

    // some options are also available as methods e.g. 
    editor.setTheme("ace/theme/twilight");

    const key = `editor-${index}-code`;
    // const code = localStorage.getItem(key);
    // editor.setValue(code || "// Write your code here");

    editor.session.on('change', function(delta) {
      localStorage.setItem(key, editor.getValue());
    });
  });
})
