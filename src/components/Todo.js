import React from 'react';

const Todo = ({ removeTodo, index, text, effort, impact, settings }) => (
    <li>
        <div className='todo-text'>
            {text}
        </div>
        <div className="todo-meta">
            <div className="metaline">
                <div className="metalinelabel">
                    {settings.effort}:
                </div>
                <div className="metalinenumber">
                    {effort}
                </div>
            </div>
            <div className="metaline">
                <div className="metalinelabel">
                    {settings.impact}:
                </div>
                <div className="metalinenumber">
                    {impact}
                </div>
            </div>
        </div>
        <button aria-label="Remove Todo" className='remove' onClick={() => removeTodo(index)}></button>
    </li>
);

export default Todo
