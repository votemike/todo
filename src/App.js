import React from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  const useStateWithLocalStorage = storageKey => {
    const [todos, setTodos] = React.useState(
        JSON.parse(localStorage.getItem(storageKey)) || [
      { effort: 1, impact: 10, text: "Add to Home screen" },
      { effort: 2, impact: 9, text: "Add some todos" },
      { effort: 3, impact: 4, text: "Test offline" }
    ]);

    React.useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(todos));
    }, [todos, storageKey]);

    return [todos, setTodos];
  };

  const [todos, setTodos] = useStateWithLocalStorage('todos');

  const addTodoHandler = event => {
    event.preventDefault();

    const text = event.target.elements.todo.value.trim();

    if (text) {
      const newTodos = [...todos, { text: event.target.elements.todo.value, effort: event.target.elements.effort.value || 5, impact: event.target.elements.impact.value || 5 }];
      setTodos(newTodos);
      event.target.elements.todo.value = null;
      event.target.elements.effort.value = null;
      event.target.elements.impact.value = null;
    }
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  let todoList;
  if (todos.length > 0) {
    todoList = (
        <section className="list">
          <TodoList todos={todos} removeTodo={removeTodo}/>
        </section>
    );
  }


  return (
      <div>
        <header>
          <h1>Tah-Do</h1>
        </header>
        <div className="notepad">
          <AddTodo submitHandler={addTodoHandler} />
          {todoList}
        </div>
      </div>
  );
}

export default App;
