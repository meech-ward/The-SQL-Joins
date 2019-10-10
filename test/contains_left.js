require('../scripts/sql.js');
const assert = require('assert').strict;

describe("containsLeftJoin", function() {
  it("should return true when query contains left join", function() {
    const query1 = "select * from table1 left join table2 on something";
    assert(containsLeftJoin(query1));

    const query2 = "SELECT * FROM table1 LEFT JOIN table2 ON something";
    assert(containsLeftJoin(query2));

    const query3 = "select * from table1 left outer join table2 on something";
    assert(containsLeftJoin(query3));
  });
  it("should return false when query does not contain left join", function() {
    const queries = [
      "", 
      "select * from thing", 
      "select * from table1 right join on table2"];
      queries.forEach(query => assert(!containsLeftJoin(query)))
  });
});