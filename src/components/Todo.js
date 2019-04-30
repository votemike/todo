import React from 'react';

const Todo = ({ removeTodo, index, text, effort, impact }) => (
    <li>
        <div className='todo-text'>
            {text}
        </div>
        <div className="todo-meta">
            <div className="metaline">
                <div className="metalinelabel">
                    Effort:
                </div>
                <div className="metalinenumber">
                    {effort}
                </div>
            </div>
            <div className="metaline">
                <div className="metalinelabel">
                    Impact:
                </div>
                <div className="metalinenumber">
                    {impact}
                </div>
            </div>
        </div>
        <button className='remove' onClick={() => removeTodo(index)}></button>
    </li>
);

export default Todo
