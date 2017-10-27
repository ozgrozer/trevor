import React from 'react'
import ReactDOM from 'react-dom'
import trevorEngine from 'trevor-engine'

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
    const input = '1 km to mi'
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
  }

  render () {
    return (
      <div>
        <div id='drag'>Trevor</div>
        <div id='scroll'>
          <div id='input' contentEditable onInput={this.handleInput}>
            <div>{this.state.input}</div>
          </div>
          <pre id='output'>{this.state.output}</pre>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
