import React, { Component } from 'react'

class TodoItems extends Component {
  renderTask = item => {
    return (
      <div className="taskLine">
        <li 
          key={item.key} 
          onClick={() => this.props.crossOutOnClick(item.key)}
          className={ (item.isDone) ? 'crossOut' : '' }
        >
          {item.text}
        </li>
        <button 
          onClick={() => this.props.deleteItem(item.key)}
          className="crossButton"
          >
        </button>
      </div>
    )
  }
  render() {
    const { entries } = this.props
    const listItems = entries.map(this.renderTask)
    return <ol className="listOfTasks">{listItems}</ol>
  }
}

export default TodoItems