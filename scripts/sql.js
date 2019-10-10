if (typeof global === 'undefined') {
  global = window;
}

function rightToLeft(query) {
  const regex = /from[\s\n]+([a-zA-Z0-9_]+)[\s\n]*right[\s\n]+(outer )?[\s\n]*join[\s\n]+([a-zA-Z0-9_]+)[\s\n]+on/i
  return query.replace(regex, function(match, p1, p2, p3) {
    return `from ${p3} left join ${p1} on`;
  });
}

function containsRightJoin(query) {
  return Boolean(query.match(/right[\s\n]+(outer )?[\s\n]*join/i));
}

function containsFullJoin(query) {
  return Boolean(query.match(/full[\s\n]+(outer )?[\s\n]*join/i));
}

global.rightToLeft = rightToLeft;
global.containsRightJoin = containsRightJoin;
global.containsFullJoin = containsFullJoin;