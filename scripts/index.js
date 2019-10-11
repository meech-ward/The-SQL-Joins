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

function executeEditorScript($editorComponent) {
  const editorName = $editorComponent.data('editor');

  let html = '';

  let sql = editors[editorName].getValue();

  if (containsJoin(sql)) {
    if (containsLeftJoin(sql)) {
      html += `<h4>LEFT OUTER JOIN</h4>`;
    } else if (containsRightJoin(sql)) {
      html += `<h4>RIGHT OUTER JOIN</h4>`;
    } else if (containsFullJoin(sql)) {
      html += `<h4>FULL OUTER JOIN</h4>`;
    } else {
      html += `<h4>INNER JOIN</h4>`;
    }
  }
  

  if (containsFullJoin(sql)) {
    sql = fullToLeft(sql);
  }
  if (containsRightJoin(sql)) {
    sql = rightToLeft(sql);
  }

  const extras = {
    'schema': "SELECT name as tables FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%';",
    'seeds': ""
  };
  
  if (editorName === 'seeds') {
    const tableNames = db.exec("SELECT name as tables FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%';");
    let subSQL = `select `;
    tableNames[0].values.forEach((value, index) => {
      subSQL += ` count(DISTINCT ${value[0]}.id) as 'Number Of Rows in ${value[0]}' ${index < tableNames[0].values.length-1 ? ', ': ''}`
    });
    subSQL += 'from';
    tableNames[0].values.forEach((value, index) => {
      subSQL += ` ${value[0]} ${index < tableNames[0].values.length-1 ? ', ': ''}`;
    });
    extras.seeds = subSQL;
  }

  let output;
  sql += ";" + (extras[editorName] || '');

  try {
    output = db.exec(sql);
  } catch (e) {
    alert("There was an error with your query. Check the console for more details");
    console.log(e)
  }
  console.log(output);

  if (editorName !== 'schema' && editorName !== 'seeds') {
    html += `<h5>Total Rows: ${output[0].values.length}</h5>`;
  }

  if (!output[0]) {
    html += '<p>👍</p>';
  } else {
    html += tableFromOutput(output);
  }

  $editorComponent.find(".output")
    .empty()
    .append(html);
}

function executeButtonClicked(event) {
  event.preventDefault();
  const $editorComponent = $(event.target).closest('.sql-editor-component');
  executeEditorScript($editorComponent);
}

$(async () => {
  const SQL = await initSqlJs({ locateFile: filename => `/sqljs/${filename}` });
  window.db = new SQL.Database();

  const [schema, seeds] = await getSchemeAndSeeds();

  editors['schema'].setValue(schema);
  editors['seeds'].setValue(seeds);

  const executeNow = ['schema', 'seeds']; 
  $('.sql-editor-component').each((index, component) => {
    const $component = $(component);
    if (executeNow.includes($component.data('editor'))) {
      executeEditorScript($component);
    }
  });
  

  editors['joins'].setValue(`SELECT year, title, full_name 
FROM actors 
JOIN awards 
ON actors.id = awards.winner_id
ORDER BY year DESC;`);

  $(".execute-button").on("click", executeButtonClicked);
});
