import React, { Component } from 'react';
import TodoInput from './components/TodoInput';
import TodoItems from './components/TodoItems';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      currentItem: {
        text: '', 
        key: ''
      },
    }
  }

  handleInput = e => {
    const itemText = e.target.value
    const currentItem = { text: itemText, key: Date.now() }
    this.setState({
      currentItem,
    })
  }

  addItem = e => {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: { text: '', key: '' },
      })
    }
  }

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key
    })
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
              currentItem={this.state.currentItem}
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
