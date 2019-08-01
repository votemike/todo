import React from 'react';

function TodoForm({ effortRef, todoRef, newItemText, submitHandler, settings }) {
    return (
        <form onSubmit={submitHandler}>
            <div className="text-input-wrapper">
                <input
                    name="todo"
                    placeholder="What needs to be done?"
                    type="text"
                    defaultValue={newItemText}
                    autoFocus={true}
                    required={true}
                    ref={todoRef}
                />
            </div>
            <div className="ei-wrapper">
                <input type="number" min="1" max="10" step="1" placeholder={settings.effort} className="effort" name="effort" required={true} ref={effortRef}/>
                <input type="number" min="0" max="10" step="1" placeholder={settings.impact} className="impact" name="impact" required={true}/>
            </div>
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm
