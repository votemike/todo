import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, removeTodo, settings }) => (
    <ul>
        {todos.map((todo, index) => (
            <Todo key={index} index={index} {...todo} removeTodo={removeTodo} settings={settings}/>
        ))}
    </ul>
);

export default TodoList
