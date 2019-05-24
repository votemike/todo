import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, removeTodo, variableNames }) => (
    <ul>
        {todos.map((todo, index) => (
            <Todo key={index} index={index} {...todo} removeTodo={removeTodo} variableNames={variableNames}/>
        ))}
    </ul>
);

export default TodoList
