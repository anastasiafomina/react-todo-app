import React, { Component } from 'react'

class TodoInput extends Component {
  render() {
    return (
      <form onSubmit={this.props.addItem} className="todoListMain">
        <input 
          type="text"
          placeholder="What needs to be done?" 
          value={this.props.text}
          onChange={this.props.handleInput}
        />
        <button type="submit"> Add Task </button>    
      </form>
    )
  }
}

export default TodoInput