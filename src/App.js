import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo';
import {addTodo, generateID} from './lib/todoHelpers';

class App extends Component {
  state = {
      todos: [
        {id: 1, name: 'Learn JSX', isComplete: true},
        {id: 2, name: 'Build and Awesome App!', isComplete: false},
        {id: 3, name: 'Ship It!', isComplete: false},
      ],
      currentTodo: ''
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

  render() {

    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    
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
        <TodoList todos={this.state.todos} />
          

        </div>
      </div>
    );
  }
}

export default App;
