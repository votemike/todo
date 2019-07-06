import React from 'react';
import './App.scss';
import Graph from './components/Graph';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Settings from './components/Settings';
import JiraImport from './components/JiraImport';
import GitHubImport from './components/GitHubImport';
import GitHub from './utilities/GitHub';
import Jira from './utilities/Jira';

function App() {
  const useStateWithLocalStorage = (storageKey, defaultValue) => {
    const [name, setter] = React.useState(JSON.parse(localStorage.getItem(storageKey)) || defaultValue);

    React.useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(name));
    }, [name, storageKey]);

    return [name, setter];
  };

  const [todos, setTodos] = useStateWithLocalStorage(
      'todos',
      [
          { effort: 1, impact: 10, text: "Add to Home screen" },
          { effort: 2, impact: 9, text: "Add some todos" },
          { effort: 3, impact: 4, text: "Test offline" }
      ]
  );
  const effortRef = React.createRef();
  const [settings, setSettings] = useStateWithLocalStorage('settings', {impact: "Impact", effort: "Effort", showLabels: false});
  const [newItems, setNewItems] = React.useState([]);
  const [newItemText, setNewItemText] = React.useState('');
  React.useEffect(() => {
    if (newItems.length > 0 && newItemText === '') {
      setNewItemText(newItems[0].text);
      const newestItems = [...newItems];
      newestItems.splice(0, 1);
      setNewItems(newestItems);
      effortRef.current.focus();
    }
  }, [newItems, newItemText, setNewItems, effortRef]);

  const addTodoHandler = event => {
    event.preventDefault();

    let { todo, impact, effort } = event.target.elements;

    const text = todo.value.trim();

    if (text) {
      const newTodos = [...todos, { text: todo.value, effort: effort.value || 5, impact: impact.value || 5 }];
      setTodos(newTodos);
      effort.value = null;
      impact.value = null;
      setNewItemText('');
    }
  };

  const settingsFormHandler = event => {
    event.preventDefault();

    const { impact, effort, tooltip } = event.target.elements;

    setSettings({impact: impact.value, effort: effort.value, showLabels: !tooltip.checked });
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
          <TodoList todos={todos} removeTodo={removeTodo} settings={settings}/>
        </section>
    );
    sortButton = (
        <div className={"prioritise-button-wrapper " + (todosNeedSorting(todos) ? "" : "hidden")}>
          <button className="prioritise-button" onClick={prioritiseTodos}>Prioritise</button>
        </div>
    );
    graph = (
        <div className="graph">
          <Graph todos={todos} settings={settings}/>
        </div>
    );
  }

  return (
      <div>
        <header>
          <h1>Tah-Do</h1>
        </header>
        <div className="container">
          <div className="notepad">
            <AddTodo newItemText={newItemText} submitHandler={addTodoHandler} settings={settings} effortRef={effortRef} />
            {sortButton}
            {todoList}
          </div>
          {graph}
        </div>
        <footer>
          <GitHubImport handleSubmit={(event) => GitHub.importIssues(event, newItems, setNewItems)}/>
          <JiraImport handleFiles={(event) => Jira.handleCsvUpload(event, newItems, setNewItems)}/>
          <Settings settingsFormHandler={settingsFormHandler} settings={settings} />
          <a href="https://github.com/votemike/todo#Tah-Do">About Tah-Do</a>
        </footer>
      </div>
  );
}

export default App;
