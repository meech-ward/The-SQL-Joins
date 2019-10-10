require('../scripts/sql.js');
const assert = require('assert').strict;

const normalizeText = text => text.toLowerCase().replace(/[\s\n]+/g, '');

describe("fullToLeft", function() {
  it("should convert a full join to a left join", function() {
    const query1 = "select * from table1 full join table2 on something";
    const expectedResult1 = "select * from table1 left join table2 on something union select * from table2 left join table1 on something";
    assert.equal(normalizeText(expectedResult1), normalizeText(fullToLeft(query1)));

    const query2 = "select * from table1 full join table2 on something;";
    const expectedResult2 = "select * from table1 left join table2 on something union select * from table2 left join table1 on something;";
    assert.equal(normalizeText(expectedResult2), normalizeText(fullToLeft(query2)));

    // const query2 = "SELECT * FROM table1 RIGHT JOIN table2 ON something";
    // const expectedResult2 = "SELECT * FROM table2 LEFT JOIN table1 ON something";
    // assert.equal(expectedResult2.toLowerCase(), rightToLeft(query2).toLowerCase());

    // const query3 = `SELECT * 
    // FROM table1 
    // RIGHT JOIN table2 
    // ON something`;
    // const expectedResult3 = `SELECT * 
    // FROM table2 LEFT JOIN table1 ON something`;
    // assert.equal(expectedResult3.toLowerCase(), rightToLeft(query3).toLowerCase());
  });

  it("should convert a full join with order by to a left join", function() {
    const query1 = `
    select * from table1 
    full join table2 
    on something = table2.something_2
    order by things;
    `;
    const expectedResult1 = `
    select * from table1 
    left join table2 
    on something = table2.something_2
    union 
    select * from table2 
    left join table1 
    on something = table2.something_2
    order by things;
    `;
    assert.equal(normalizeText(fullToLeft(query1)), normalizeText(expectedResult1));
  });

  xit("should convert a full outer join to a left outer join", function() {
    const query = "select * from table1 right outer join table2 on something";
    const expectedResult = "select * from table2 left join table1 on something";
    assert.equal(expectedResult.toLowerCase(), rightToLeft(query).toLowerCase());
  });
});