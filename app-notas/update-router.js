const router = require('express').router();

let id = 0;
router.get('/:__id', (req, res, next) => {
  id = req.params.__id;
  req.id = req.params.__id;
  console.log('in get middleware');
  next();
});

router.post('/', (req, res, next) => {
  console.log('in post middleware');
  req.id = id;
  next();
});

module.exports = router;
