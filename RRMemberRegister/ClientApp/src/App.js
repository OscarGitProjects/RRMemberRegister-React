import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ClickCounter } from './components/ClickCounter';
import { Game } from './components/Game';
import { MemberDetail } from './components/member/MemberDetail';
import { MemberCreate } from './components/member/MemberCreate';
import { MemberList } from './components/member/MemberList';
import { MemberDelete } from './components/member/MemberDelete';
import { MemberEdit } from './components/member/MemberEdit';

import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>npm audit fix
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/click-counter' component={ClickCounter} />
        <Route path='/game' component={Game} />
        <Route path='/memberdetail/:MemberId' component={MemberDetail} />
        <Route path='/memberedit/:MemberId' component={MemberEdit} />
        <Route path='/memberdelete/:MemberId' component={MemberDelete} />
        <Route path='/membercreate' component={MemberCreate} />        
        <Route exact path='/memberlist/:MessageId' component={MemberList} />
        <Route exact path='/memberlist' component={MemberList} />
      </Layout>
    );
  }
}
