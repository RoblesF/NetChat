import React, { Component } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  state = {
    channels: []
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/channels').then((response) => {
      this.setState({
        channels: response.data
      })
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <ul>
          {this.state.channels.map((value: any) => (
            <li key={value.id}>{value.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App;
