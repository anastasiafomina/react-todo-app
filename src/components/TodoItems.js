import React, { Component } from 'react'

class TodoItems extends Component {
  renderTask = item => {
    return (
      <li 
        key={item.key} 
        onClick={() => this.props.crossOutOnClick(item.key)}
        className={ (item.isDone) ? 'crossOut' : '' }
      >
        {item.text}
      </li>
    )
  }
  render() {
    const { entries } = this.props
    const listItems = entries.map(this.renderTask)
    return <ol className="listOfTasks">{listItems}</ol>
    
  }
}

export default TodoItems