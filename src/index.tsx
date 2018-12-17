import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'
import './static/css/index.css'


class Parent{
    public name = 'gxx'
    public sex = '男'
    private age = 123
    getName(val?:any){
        console.log(val)
    }
}

class Son extends Parent{
    constructor(props:any){
        super()
    }
}

new Son('wmh').getName()

ReactDOM.render(<App />, document.getElementById('root'))
