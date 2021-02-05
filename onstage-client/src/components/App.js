import React, { Component, useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useQuery, gql, graphql } from '@apollo/client';
import Profile from './Profile';
import Login from './Auth/Login';
import Footer from './Footer';

// Pass in new props
function App(props) {

  const [userState, setUserState] = useState({
    currentUserId: []
  })

  function updateUser (userId) {
    setUserState({ currentUserId: userId })
}
    
    return (
      <div >
      <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/"
            render={(props) => <Login userId={userState.currentUserId} onUserChange={(user) => updateUser(user)} {...props} /> } 
          />
          <Route exact path="/profile"
            render={(props) => <Profile userId={userState.currentUserId} onUserChange={() => updateUser()} {...props} />}
           />
        </Switch>
        <Footer />
      </div>
      </BrowserRouter>
    </div>
    )
  
}

export default App;
