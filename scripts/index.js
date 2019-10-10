const getSchemeAndSeeds = () => Promise.all([
  $.get('/sql/schema.sql'),
  $.get('/sql/seeds.sql')
]);

function tableFromOutput(output) {
  const addTags = R.curry((open, close, string) => `${open}${string}${close}`);
  const addTH = addTags('<th>', '</th>');
  const addTD = addTags('<td>', '</td>');
  const addTR = addTags('<tr>', '</tr>');
  const joiner = R.join('');

  const tableRow = R.pipe(R.map, joiner, addTR);
  const tableRows = R.pipe(R.map(R.pipe(R.map(addTD), joiner, addTR)), joiner);
  // const trs = output[0].values.map(col => `<tr>``<td>${col}</td>`).join("");
  return `
    <table>
        <thead>
          ${tableRow(addTH, output[0].columns)}
        </thead>
        <tbody>
          ${tableRows(output[0].values)}
        </tbody>
    </table>
    `;
}

function executeButtonClicked(event) {
  event.preventDefault();
  const $editorComponent = $(event.target).closest('.sql-editor-component');
  const editorName = $editorComponent.data('editor');

  let sql = editors[editorName].getValue();

  if (containsRightJoin(sql)) {
    sql = rightToLeft(sql);
  }
  
  const output = db.exec(sql);
  console.log(output);

  let html;

  if (!output[0]) {
    html = '<p>👍</p>';
  } else {
    html = `<h5>Total Rows: ${output[0].values.length}</h5>` + tableFromOutput(output);
  }

  $editorComponent.find(".output")
    .empty()
    .append(html);
}

$(async () => {
  const SQL = await initSqlJs({ locateFile: filename => `/sqljs/${filename}` });
  window.db = new SQL.Database();

  const [schema, seeds] = await getSchemeAndSeeds();

  editors['schema'].setValue(schema);
  editors['seeds'].setValue(seeds);

  editors['joins'].setValue(`SELECT year, title, full_name 
FROM actors 
JOIN awards on actors.id = awards.winner_id
ORDER BY year DESC;`);

  $(".execute-button").on("click", executeButtonClicked);
});
