var $ = require('jquery')
window.jQuery = $
window.$ = $

var materialize = require('./lib/materialize.min.js')

import React from 'react'
import { render } from 'react-dom'

import {Header} from './components/Header.jsx'
import {Body}   from './components/BodyPGMLab.jsx'
import {Footer} from './components/Footer.jsx'

var moment = require('moment')

class App extends  React.Component {

    constructor (props) {
        super(props)

    }

    static getCurrentDateTime() {
        return moment().format('MMM D, YYYY HH:mm')
    }

    componentDidMount () {
      $('.modal-trigger').leanModal()
    }

    render () {
       console.log("rendering app", this)
        return (
            <div>
                <Header />
               <Body />
               <Footer />
            </div> )
    }
}

render(<App />, document.getElementById('app'))
