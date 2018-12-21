import React, { Component } from 'react';
import TodoInput from './components/TodoInput';
import TodoItems from './components/TodoItems';
import './styles/App.css';
import uuid4 from 'uuid/v4';

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
      text: ''
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
      key: uuid4()
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

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => item.key !== key)
    this.setState({
      items: filteredItems,
    })
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
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
