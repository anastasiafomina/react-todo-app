import React, { Component } from 'react'
import TodoInput from './components/TodoInput'
import TodoItems from './components/TodoItems'
import './styles/App.css'
import uuid4 from 'uuid/v4'

class App extends Component {
  constructor(props) {
    super(props)

    const itemsFromStorage = localStorage.getItem("itemsKey")
    // itemsFromStorage - это строка
    const parsedItems = JSON.parse(itemsFromStorage) || {}
    // парсим строку обратно в объект
    const itemsForState = parsedItems.savedItems || []
    // достаем оттуда сами итемы, т.к. сохраняли их как объект 
    this.state = {
      items: itemsForState,
      text: '',
      hidingCompleted: false,
      hidingActive: false
    } 
  }

  handleInput = e => {
    this.setState({
      text: e.target.value
    })
  }

  addItem = e => {
    e.preventDefault()
    const newItem = {
      text: this.state.text,
      date: Date.now(),
      key: uuid4(),
      isDone: false
    }
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        text: ''
      }, () => {
        localStorage.setItem('itemsKey', JSON.stringify( { savedItems: items }))
      })
    }
  }

  crossOutOnClick = key => {
    const index = this.state.items.findIndex(item => item.key === key)
    const crossedItem = {
      ...this.state.items[index],
      isDone: this.state.items[index].isDone ? false: true
    }
    const newCrossedItems = [...this.state.items]
    newCrossedItems.splice(index, 1, crossedItem)
    this.setState({
      items: newCrossedItems,
      text: ''
    }, () => {
      localStorage.setItem('itemsKey', JSON.stringify( { savedItems: newCrossedItems }))
    })
  }

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => item.key !== key)
    this.setState({
      items: filteredItems,
    }, () => {
      localStorage.setItem('itemsKey', JSON.stringify( { savedItems: filteredItems }))
    })
  }

  deleteAll = () => {
    const deletedAll = []
    this.setState({
      items: deletedAll
    }, () => {
      localStorage.setItem('itemsKey', JSON.stringify( { savedItems: deletedAll }))
    })
  }

  renderDeleteButton = () => {
    if (this.state.items.length >=3) {
      return (
        <button
          onClick={this.deleteAll}
          className="deleteAllButton"
        >
          Delete all
        </button>
      )
    }
    return null
  }

  hidingCompletedTasks = () => {
    this.setState({
      hidingCompleted: !this.state.hidingCompleted,
      hidingActive: false
    })
  }

  hidingActiveTasks = () => {
    this.setState({
      hidingActive: !this.state.hidingActive,
      hidingCompleted: false
    })
  }

  hideCompleted = () => {
    return (
      <button 
        onClick={this.hidingCompletedTasks}
        className={`hiding${this.state.hidingCompleted && this.state.hidingActive === false ? ' activatedButton' : ''}`}
      >
        Active
      </button>
    )
  }

  hideActive = () => {
    return (
      <button 
        onClick={this.hidingActiveTasks}
        className={`hiding${this.state.hidingActive && this.state.hidingCompleted === false ? ' activatedButton' : ''}`}
      >
        Completed
      </button>
    )
  }
  
  render() {
    return (
      <div>
        <h1>Todo list</h1>
        <div className="container">
          <div className="row">
            <TodoInput 
              addItem={this.addItem} 
              handleInput={this.handleInput}
              text={this.state.text}
            />
            <TodoItems 
              entries={this.state.items}
              deleteItem={this.deleteItem}
              crossOutOnClick={this.crossOutOnClick}
              hidingCompleted={this.state.hidingCompleted}
              hidingActive={this.state.hidingActive}
            />
            <div className="footerButtons">
              {this.hideCompleted()}
              {this.hideActive()}
              {this.renderDeleteButton()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
