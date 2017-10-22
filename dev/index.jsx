import React from 'react'
import ReactDOM from 'react-dom'
import te from 'trevor-engine'

class App extends React.Component {
  constructor () {
    super()
    const input = '1 km to mi'
    const output = this.convert(input)
    this.state = { input: input, output: output }
  }
  convert (lines) {
    return lines.split('\n').map(line => te(line) + '\n')
  }
  handleInput (event) {
    const input = event.target.value
    const output = this.convert(input)
    this.setState({ input: input, output: output })
  }
  render () {
    return (
      <div>
        <div id='drag'>Trevor</div>
        <textarea id='input' onChange={this.handleInput.bind(this)} value={this.state.input} autoFocus />
        <pre id='output'>{this.state.output}</pre>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
