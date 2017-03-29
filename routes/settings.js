var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');

router.get('/', (req, res, next) => {
  res.render('settings')
})

router.get('/clear', (req, res, next) => {
  const query = 'DELETE FROM tasks;'
  db.run(query, (err) => {
    if (err) {
      throw err
    }
    req.flash('info', 'DB cleared')
    res.redirect('/tasks')
  })
})

module.exports = router;
