import React, { Component } from 'react'

class TodoItems extends Component {
  createTasks = item => {
    return (
      <li 
        key={item.key} 
        onClick={() => this.props.deleteItem(item.key)}
      >
        {item.text}
      </li>
    )
  }
  render() {
    const { entries } = this.props
    const listItems = entries.map(this.createTasks)
    return <ol className="listOfTasks">{listItems}</ol>
    
  }
}

export default TodoItems