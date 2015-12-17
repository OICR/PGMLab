import { reactmaterialize } from 'react-materialize';
import jquery from 'jquery';

//import d3 from 'd3';
//import d3tip from 'd3-tip';

//import resumable from 'resumable';
//import autobahn from 'autobahn';

import React from 'react';
import { render } from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

//import createGraph from './graph'

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

render(<App />, document.getElementById('app'))

//Creategraph();



