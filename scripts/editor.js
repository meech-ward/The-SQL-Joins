const $editors = $('.editor');
editors = [];
$editors.each((index, editorElement) => {
  // pass options to ace.edit
  const editor = ace.edit(editorElement, {
    mode: "ace/mode/sql",
    selectionStyle: "text"
  })
  editors.push(editor);
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
  const code = localStorage.getItem(key);
  editor.setValue(code || "// Write your code here");

  editor.session.on('change', function(delta) {
    localStorage.setItem(key, editor.getValue());
  });
})
