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

router.post('/', (req, res, next) => {
  console.log(req.body)
  if (req.body.name.trim() && req.body.email.trim() && req.body.title.trim()) {
    let stmt = db.prepare('INSERT INTO tasks(name, email, title) VALUES (?, ?, ?)')
    stmt.run(req.body.name, req.body.email, req.body.title)
    stmt.finalize()
    res.redirect('/tasks')
  }
  else {
    req.flash('error', 'Please fill all fields')
    res.redirect('/tasks/new')
  }
})

router.get('/:id/destroy', (req, res, next) => {
  console.log(req.params.id)
  let stmt = db.prepare('DELETE FROM tasks WHERE id = ?;')
  stmt.run(req.params.id)
  stmt.finalize()
  res.redirect('/tasks')
})

module.exports = router;
