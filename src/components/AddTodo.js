import React from 'react';

function TodoForm({ submitHandler, variableNames }) {
    return (
        <form onSubmit={submitHandler}>
            <div className="text-input-wrapper">
                <input
                    name="todo"
                    placeholder="What needs to be done?"
                    type="text"
                    autoFocus={true}
                    required={true}
                />
            </div>
            <div className="ei-wrapper">
                <input type="number" min="1" max="10" step="1" placeholder={variableNames.effort} className="effort" name="effort" required={true}/>
                <input type="number" min="0" max="10" step="1" placeholder={variableNames.impact} className="impact" name="impact" required={true}/>
            </div>
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm
