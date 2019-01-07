import 'babel-polyfill'
require('antd/dist/antd.css')

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'
import './static/css/index.css'

ReactDOM.render(<App />, document.getElementById('root'))
