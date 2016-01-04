import { reactmaterialize } from 'react-materialize';

window.jquery = window.jQuery = window.$ = require('./lib/jquery');

import style from 'style';

import resumable from 'resumable';
import autobahn from 'autobahn';

import navigator from 'navigator';

var pi = require('./data/HDRdec17pi.js');
var pp = require('./data/HDRdec17pp.js');

var graph = require('./bin/graph.js');

graph.render(pi, pp);

require('hammerjs');

require('./lib/materialize.min.js');

import React from 'react';
import { render } from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

var App = React.createClass({
  handleSelect: function (index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  },
  render: function () {
    return (
        <Tabs onSelect={this.handleSelected} selectedIndex={2}>
        <TabList>
          <Tab>Select Graph</Tab>
          <Tab>Learning</Tab>
          <Tab>Inference</Tab>
        </TabList>
        <TabPanel>
          <h3>list of networks</h3>
          <h3>upload graph</h3>
        </TabPanel>
        <TabPanel>
          <h3>Learning</h3>
        </TabPanel>
        <TabPanel>
          <h3>Inference</h3>
        </TabPanel>
      </Tabs>
    );
  }
});
render(<App />, document.getElementById('app'));

$(".button-collapse").sideNav({'edge': 'left'});
$( document ).ready(function(){});
