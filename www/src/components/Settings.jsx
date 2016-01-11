import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {SelectGraph} from './Selectgraph.jsx'
import {Learning} from './Learning.jsx'

export class Settings extends React.Component {
    handleSelect (index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    }
    render() {
        return (
            <Tabs onSelect={this.handleSelected} selectedIndex={0}>
            <TabList>
              <Tab>Sub Graph</Tab>
              <Tab>Learning</Tab>
              <Tab>Inference</Tab>
            </TabList>
            <TabPanel>
               <SelectGraph pathways={this.props.pathways}></SelectGraph>
            </TabPanel>
            <TabPanel>
               <Learning></Learning>
            </TabPanel>
            <TabPanel>
    
            </TabPanel>
          </Tabs> )
    }
}






