import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, removeTodo }) => (
    <ul>
        {todos.map((todo, index) => (
            <Todo key={index} index={index} {...todo} removeTodo={removeTodo} />
        ))}
    </ul>
);

export default TodoList
