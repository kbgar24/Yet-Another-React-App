import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateID, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';
import {loadTodos} from './lib/todoService';

class App extends Component {
  state = {
      todos: [],
      currentTodo: ''
    }

  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos: todos}))
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    });
 
  }

  handleSubmit =(evt) => {
    evt.preventDefault()
    const newID = generateID()
    const newTodo = {id: newID, name: this.state.currentTodo, isComplete: false};
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: '',        
      errorMessage: ''
    })
   

  }

  handleEmptySubmit =(evt) => {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please supply a valid name'
    })
  }

  handleToggle = (id) => {
    // const todo = findById(this.state.todos, id)
    // const toggled = toggleTodo(todo)
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(this.state.todos, id)
    this.setState({
      todos: updatedTodos
    })
  }

  handleRemove = (id, evt) => {
    evt.preventDefault()
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({
      todos: updatedTodos
    })

  }

  render() {

    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          <TodoForm handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo} 
            handleSubmit={submitHandler}
          />
        <TodoList todos={displayTodos} handleToggle={this.handleToggle} handleRemove={this.handleRemove} />
        <Footer />

        </div>
      </div>
    );
  }
}

export default App;
