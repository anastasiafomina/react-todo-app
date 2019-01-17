import React, { Component } from 'react'

const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
  function getCurrentMonth (date) {
    const index = date.getMonth()
    return months[index]
  }

class TodoItems extends Component {
  renderTask = item => {
    const date = new Date(item.date)
    const minutes = (date.getMinutes() < 10) ? ("0" + date.getMinutes()) : date.getMinutes()
    const hours = (date.getHours() < 10) ? ("0" + date.getHours()) : date.getHours()

    const itemDateTime = date.getDate() + ' ' + getCurrentMonth(date) + ', ' + hours + ':' + minutes

    return (
      <div 
        className="taskLine"
        key={item.key} 
      >
        <div className="itemDateTime">
          {itemDateTime}
        </div>
        <li 
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
    const listItems = (this.props.hiding) ? entries.filter(item => item.isDone === false).map(this.renderTask) 
    : entries.map(this.renderTask)
    return <ol className="listOfTasks">{listItems}</ol>
  }
}

export default TodoItems