'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Todo.hasMany(models.TodoItem, {
          foreignKey: 'todoId',
          as: 'todoItems'
        });
      }
    }
  });
  return Todo;
};
