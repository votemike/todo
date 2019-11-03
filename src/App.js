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
import { getPrioritisedTodos, todosNeedSorting } from "./utilities/Todos";

function App() {
  const useStateWithLocalStorage = (storageKey, defaultValue) => {
    const [name, setter] = React.useState(JSON.parse(localStorage.getItem(storageKey)) || defaultValue);

    React.useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(name));
    }, [name, storageKey]);

    return [name, setter];
  };

  const getDefaultSettings = () => {
    const defaultSettings = {impact: "Impact", effort: "Effort", showLabels: false};

    if (window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('positive')) {
        defaultSettings.impact = searchParams.get('positive');
      }
      if (searchParams.get('negative')) {
        defaultSettings.effort = searchParams.get('negative');
      }
      window.history.pushState("", "", '/');
    }

    return defaultSettings;
};

  const [todos, setTodos] = useStateWithLocalStorage(
      'todos',
      [
          { effort: 1, impact: 10, text: "Do not store sensitive information" },
          { effort: 3, impact: 4, text: "Test offline" },
          { effort: 2, impact: 8, text: "Add to Home screen" },
          { effort: 2, impact: 9, text: "Add some todos" }
      ]
  );
  const todoRef = React.createRef();
  const effortRef = React.createRef();
  const [settings, setSettings] = useStateWithLocalStorage('settings', getDefaultSettings());
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

  const addTodoHandler = formState => {
    let { todo, impact, effort } = formState;

    const text = todo.trim();

    if (text) {
      const newTodos = [...todos, { text: todo, effort: effort || 5, impact: impact || 5 }];
      setTodos(newTodos);
      setNewItemText('');
      if (newItems.length === 0) {
          todoRef.current.focus();
      }
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

  const prioritiseTodos = () => {
    setTodos(getPrioritisedTodos(todos));
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
            <AddTodo newItemText={newItemText} submitHandler={addTodoHandler} settings={settings} effortRef={effortRef} todoRef={todoRef} />
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
