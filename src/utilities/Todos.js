function getPrioritisedTodos(todos) {
    todos = JSON.parse(JSON.stringify(todos)); //clone
    todos.sort((a, b) => (b.impact - b.effort) - (a.impact - a.effort));
    return todos;
}

function todosNeedSorting(todos) {
    if (todos.length <= 1) {
        return false;
    }

    return JSON.stringify(getPrioritisedTodos(todos)) !==  JSON.stringify(todos);
}

module.exports = {
    getPrioritisedTodos,
    todosNeedSorting
};
