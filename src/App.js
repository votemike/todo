import React from 'react';
import './App.scss';
import Graph from './components/Graph';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let foo = params.get('jql');
  console.log(encodeURI(foo));
  let headers = new Headers();
  fetch(`${baseJiraUrl}/issues/?jql=status%20!%3D%20Closed%20AND%20project%20%3D%20Michael%20and%20assignee%20is%20EMPTY%20and%20component%20%3D%20%22Discover%20team%22%20and%20%22Epic%20Link%22%20%3D%20Michael-68`, {headers: headers})
      .then(res => res.json())
      .then((out) => {
        console.log('Checkout this JSON! ', out);
      })
      .catch(err => { throw err });

  const useStateWithLocalStorage = (storageKey, defaultTodos = null) => {
    const [value, setValue] = React.useState(JSON.parse(localStorage.getItem(storageKey)) || defaultTodos);

    React.useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    return [value, setValue];
  };

  const defaultTodos = [
    { effort: 1, impact: 10, text: "Add to Home screen" },
    { effort: 2, impact: 9, text: "Add some todos" },
    { effort: 3, impact: 4, text: "Test offline" }
  ];
  const [todos, setTodos] = useStateWithLocalStorage('todos', defaultTodos);
  const [importing, setImporting] = useStateWithLocalStorage('importing');

  React.useEffect((foo, setTodos, todos) => {
    if (foo && todos.length > 0) {
      if (window.confirm("Would you like to replace this list with your JIRA results?")) {
        setTodos([]);
        fetch(`${baseJiraUrl}/rest/api/2/search?${foo}`)
            .then(res => res.json())
            .then((out) => {
              console.log('Checkout this JSON! ', out);
            })
            .catch(err => { throw err });

      }
      // window.location.href = '/';
    }
  }, []);

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

  const todosNeedSorting = function (todos) {
    if (todos.length <= 1) {
      return false;
    }

    const todosString = JSON.stringify(todos); //clone
    const prioritisedTodos = getPrioritisedTodos(JSON.parse(todosString));

    return JSON.stringify(prioritisedTodos) !== todosString;
  };

  const prioritiseTodos = () => {
    setTodos(getPrioritisedTodos(JSON.parse(JSON.stringify(todos))));
  };

  const getPrioritisedTodos = todos => {
    todos.sort((a, b) => (b.impact - b.effort) - (a.impact - a.effort));
    return todos;
  };

  let graph;
  let todoList;
  let sortButton;
  if (todos.length > 0) {
    todoList = (
        <section className="list">
          <TodoList todos={todos} removeTodo={removeTodo}/>
        </section>
    );
    sortButton = (
        <div className={"prioritise-button-wrapper " + (todosNeedSorting(todos) ? "" : "hidden")}>
          <button className="prioritise-button" onClick={prioritiseTodos}>Prioritise</button>
        </div>
    );
    graph = (
        <div className="graph">
          <Graph todos={todos}/>
        </div>
    );
  }

  return (
      <div>
        <header>
          <h1>Tah-Do</h1>
        </header>
        <div className="notepad">
          <AddTodo submitHandler={addTodoHandler} />
          {sortButton}
          {todoList}
        </div>
        {graph}
        <footer>
          <a href="https://github.com/votemike/todo#Tah-Do">About Tah-Do</a>
        </footer>
      </div>
  );
}

export default App;
