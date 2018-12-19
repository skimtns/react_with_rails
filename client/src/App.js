import React, { Component } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Container } from 'semantic-ui-react';
import axios from 'axios';

class App extends Component {
  state = { todos: [] }

  // Grab all of the todos from the database
  componentDidMount() {
    axios.get("/api/items")
      .then( res => {
        this.setState({ todos: res.data });
      })
      .catch( err => {
        console.log(err);
      })
  }

  addItem = (name) => {
    // add the todo item to the database
    // add it to state 
    axios.post('/api/items', {name})
      .then( res => {
        const { todos } = this.state
        this.setState({ todos: [...todos, res.data]})
      })
      .catch( err => {
        console.log(err)
      })
  }

  updateTodo = (id) => {
    // update the todo item in the database
    // update it to state
    axios.put(`/api/items/${id}`)
      .then( res => {
        const todos = this.state.todos.map( t => {
          if (t.id === id)
            return res.data
          return t
        })
        this.setState({ todos })
      })
      .catch( err => {
        console.log(err)
      })
  }

  deleteTodo = (id) => {
    // delete the todo from the database
    // delete it to the state
    axios.delete(`/api/items/${id}`)
      .then( res => {
        const { todos } = this.state
        this.setState({ todos: todos.filter(t => t.id !== id)})
      })
      .catch( err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Container>
        <TodoForm
          addItem={this.addItem}
        />
        <br />
        <br />
        <TodoList 
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
          todos={this.state.todos}
        />
      </Container>
    );
  }
}

export default App;