$(async () => {
  const [schema, seeds, SQL] = await Promise.all([
    $.get('http://thesqljoins.com/sql/schema.sql'),
    $.get('http://thesqljoins.com/sql/seeds.sql'),
    initSqlJs({ locateFile: filename => `/sqljs/${filename}` })
  ]);
  const db = new SQL.Database();
  db.run(schema);
  db.run(seeds);
  editors[0].setValue (schema+"\n"+seeds);
  editors[1].setValue(`SELECT year, title, full_name 
FROM actors 
JOIN awards on actors.id = awards.winner_id;`);

  $("#execute-button").on("click", function(event) {
    event.preventDefault();
    const sql = editors[1].getValue();
    const output = db.exec(sql);
    console.log(output);

    const addTags = R.curry((open, close, string) => `${open}${string}${close}`);
    const addTH = addTags('<th>', '</th>');
    const addTD = addTags('<td>', '</td>');
    const addTR = addTags('<tr>', '</tr>');
    const joiner = R.join('');

    const tableRow = R.pipe(R.map, joiner, addTR);
    const tableRows = R.pipe(R.map(R.pipe(R.map(addTD), joiner, addTR)), joiner);
    // const trs = output[0].values.map(col => `<tr>``<td>${col}</td>`).join("");
    $("#output")
      .empty()
      .append(
      $(`
      <table>
          <thead>
            ${tableRow(addTH, output[0].columns)}
          </thead>
          <tbody>
            ${tableRows(output[0].values)}
          </tbody>
      </table>
      `)
      );
    
  })
});
