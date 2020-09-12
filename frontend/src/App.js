import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ChatPage from './containers/page/ChatPage'
import ChatState from './context/chat/ChatState'

import './App.css'

const App = () => {
  return (
    <ChatState>
      <Router>
        <Fragment>
          <Switch>
            <Route path='/' component={ChatPage} />
          </Switch>
        </Fragment>
      </Router>
    </ChatState>
  )
}

export default App
