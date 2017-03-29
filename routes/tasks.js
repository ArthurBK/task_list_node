var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');


/* GET tasks listing. */
router.get('/', (req, res, next) => {
  const query = 'SELECT * FROM tasks;'
  db.all(query, (err, rows) => {
    res.render('tasks', { rows: rows })
  })
  // res.render('respond with a resource');
})

router.get('/new', (req, res, next) => {
  res.render('new_task')
})

module.exports = router;



// var stmt = db.prepare('INSERT INTO tasks VALUES (?, ?, ?)')
//
// for (var i = 0; i < 10; i++) {
//   stmt.run('Ipsum ' + i)
// }
//
// stmt.finalize()
//
