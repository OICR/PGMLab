require("../assets/css/materialize.css")
require("../assets/css/style.css")

var $ = require('jquery')
window.jQuery = $
window.$ = $

var materialize = require('./lib/materialize.min.js')
require("material-design-icons")

import React from 'react'
import { render } from 'react-dom'

import {Header} from './components/PGMLab/Header.jsx'
import {Body}   from './components/PGMLab/BodyPGMLab.jsx'
import {Footer} from './components/PGMLab/Footer.jsx'

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
        return (
            <div>
                <Header />
                <Body />
                <Footer />
            </div> )
    }
}

render(<App />, document.getElementById('app'))
