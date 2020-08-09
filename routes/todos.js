let todoData = [{
    text: 'drink coffee',
    completed: false,
    id: '1'
  },
  {
    text: 'run',
    completed: false,
    id: '2'
  },
  {
    text: 'go to sleep',
    completed: false,
    id: '3'
  }
]
let user = null;
const todos = (app) => {
  app.get('/auth', (req, res) => {
    res.send(user)
  })
  app.get('/todos', authMiddleware, (req, res) => {
    res.send(todoData)
  })
  app.post('/todos', authMiddleware, (req, res) => {
    const {
      text,
      id
    } = req.body
    if (text && id) {
      todoData.push({
        text: text,
        id: id,
        completed: false
      })
      res.sendStatus(200)
    } else {
      res.sendStatus(500)
    }

  })
  app.put('/todos/:id', authMiddleware, (req, res) => {
    todoData = todoData.map((item) => {
      if (item.id === req.params.id) {
        return {
          ...item,
          completed: !item.completed
        };
      }
      return item;
    })
    res.sendStatus(200)
  })
  app.delete('/todos/:id', authMiddleware, (req, res) => {
    todoData = todoData.filter(item => item.id !== req.params.id)
    res.sendStatus(200)
  })
  app.post('/login', (req, res) => {
    if (req.body.name) {
      user = req.body.name
      res.sendStatus(200)
    } else {
      res.sendStatus(500)
    }
  })
  app.put('/signout', (req, res) => {
    user = null
    res.sendStatus(200)
  })
}

const authMiddleware = (req, res, next) => {
  if (user) {
    next()
    return;
  }
  res.sendStatus(500)
}
module.exports = todos