const express = require('express');
const { Todo } = require('../mongo');
const { setAsync, getAsync } = require('../redis')
const { findByIdAndUpdate } = require('../mongo/models/Todo');
const router = express.Router();

const incrementCounter = async () => {
    count = await getAsync("count")
    if (count) {
      setAsync('count', parseInt(count) + 1)
    } else {
      setAsync('count', 1)
    }
    
};

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
  incrementCounter();
});

router.get('/statistics', async (req, res) => {
  const count = await getAsync('count')
  return res.json({"added_todos" : count || 0})
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  try {
    const toDo = await Todo.findById(req.todo)
    res.send(toDo)
  } catch (e) {
    res.sendStatus(405); // Implement this
  }
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
    const newToDo = await Todo.findByIdAndUpdate(req.todo._id, req.body, { new: true })
    console.log(newToDo)
    res.send(newToDo)
  } catch (e) {
    res.sendStatus(405); // Implement this
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
