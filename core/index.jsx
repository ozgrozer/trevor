import React from 'react'
import ReactDOM from 'react-dom'
import trevorEngine from 'trevor-engine'
import { webFrame } from 'electron'
import Store from 'electron-store-data'

webFrame.setZoomLevelLimits(1, 1)

const storeInput = new Store({
  filename: 'input',
  defaults: { input: '1 mi to km' }
})

console.error = (function (_error) {
  return function (message) {
    if (typeof message !== 'string' || message.indexOf('component is `contentEditable`') === -1) {
      _error.apply(console, arguments)
    }
  }
})(console.error)

class App extends React.Component {
  constructor (props) {
    super(props)
    const input = storeInput.get('input')
    const output = this.convert(input)
    this.state = { input: input, output: output }
    this.handleInput = this.handleInput.bind(this)
  }

  convert (lines) {
    return lines.split('\n').map(line => trevorEngine(line) + '\n')
  }

  handleInput (event) {
    const input = event.target.innerText
    const output = this.convert(input)
    this.setState({ output: output })
    storeInput.set('input', input)
  }

  returnFalse (e) {
    e.preventDefault()
  }

  render () {
    return (
      <div>
        <div id='drag' onMouseDown={this.returnFalse}>Trevor</div>
        <div id='scroll'>
          <pre id='input' contentEditable onInput={this.handleInput}>{this.state.input}</pre>
          <pre id='output'>{this.state.output}</pre>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
