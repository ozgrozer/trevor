import React from 'react'
import ReactDOM from 'react-dom'
import coonnE from 'coonn-engine'

class App extends React.Component {
  constructor () {
    super()
    const input = '60 mi to km'
    const output = this.convert(input)
    this.state = { input: input, output: output }
  }
  convert (lines) {
    return lines.split('\n').map(line => coonnE(line) + '\n')
  }
  handleInput (event) {
    const input = event.target.value
    const output = this.convert(input)
    this.setState({ input: input, output: output })
  }
  render () {
    return (
      <div>
        <div id='drag'>Coonn</div>
        <textarea id='input' onChange={this.handleInput.bind(this)} value={this.state.input} autoFocus />
        <pre id='output'>{this.state.output}</pre>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
