import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {Learning} from './Learning.jsx'
import {Inference} from './Inference.jsx'

export class Settings extends React.Component {
    handleSelect (index, last) {
        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    }
    render() {
        return (
            <Tabs onSelect={this.handleSelected} selectedIndex={0}>
            <TabList>
              <Tab>Learning</Tab>
              <Tab>Inference</Tab>
            </TabList>
            <TabPanel>
               <Learning></Learning>
            </TabPanel>
            <TabPanel>
               <Inference></Inference>
            </TabPanel>
          </Tabs> )
    }
}






