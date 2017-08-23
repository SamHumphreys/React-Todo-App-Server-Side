const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId
      })
      .then(todoItem => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(201).send(todoItem);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    if (req.method === 'OPTIONS') {
      res.send(200)};
    return TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId
        }
      })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: '404 dude'
          })
        };
        return todoItem
          .update({
            content: req.body.content || todoItem.content,
            complete: req.body.complete || todoItem.complete
          })
          .then(updatedTodoItem => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).send(updatedTodoItem)
          })
          .catch(error => {
            console.log(error);
            res.status(400).send(error)});
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId
        }
      })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: '404 brah'
          })
        };
        return todoItem
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
