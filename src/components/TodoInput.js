import React, { Component } from 'react'

class TodoInput extends Component {
  render() {
    return (
      <div className="todoListMain">
        <form onSubmit={this.props.addItem} >
          <input 
            type="text"
            placeholder="What needs to be done?" 
            value={this.props.currentItem.text}
            onChange={this.props.handleInput}
          />
        <button type="submit"> Add Task </button>    
        </form>
      </div>
    )
  }
}

export default TodoInput;