const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return Todo
      .create({
        title: req.body.title
      })
      .then(todo => {
        todo.dataValues.todoItems = [];
        res.status(201).send(todo)
      })

      .catch(error => res.status(400).send(error))
  },
  list(req, res) {
    return Todo
      .findAll({
        // where: {
        //   archived: false
        // },
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })

      .all()
      .then((todos) => {
        todos.forEach((todo) => {
          todo.todoItems = todo.todoItems.sort((a,b) => {
            return a.dataValues.id - b.dataValues.id;
          });
        });
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(todos)})
      .catch((error) => {
        console.log(error);
        res.status(400).send(error)
      });
  },
  retrieve(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as : 'todoItems'
        }]
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'todo not found :('
          });
        }
        return res.status(200).send(todo);
      })
      .catch(error => res.status(400).send(error))
  },
  update(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'todo not found, soz bro'
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title,
            archived: req.body.archived || todo.archived
          })
          .then(todo => res.status(200).send(todo))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },
  destroy(req, res) {
    return Todo
      .findById(req.params.todoId)
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'todo not found'
          })
        }
        return todo
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))

  }
};
