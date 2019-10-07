require('../scripts/sql.js');
const assert = require('assert').strict;

describe("containsRightJoin", function() {
  it("should return true when query contains right join", function() {
    const query1 = "select * from table1 right join table2 on something";
    assert(containsRightJoin(query1));

    const query2 = "SELECT * FROM table1 RIGHT JOIN table2 ON something";
    assert(containsRightJoin(query2));

    const query3 = "select * from table1 right outer join table2 on something";
    assert(containsRightJoin(query3));
  });
  it("should return false when query does not contain right join", function() {
    const queries = [
      "", 
      "select * from thing", 
      "select * from table1 left join on table2"];
      queries.forEach(query => assert(!containsRightJoin(query)))
  });
});