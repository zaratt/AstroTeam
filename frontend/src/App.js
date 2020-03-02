import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// components
import Navbar from './shared/Navbar';
import Home from './home/Home';
import Dashboard from './task/pages/Dashboard';
import NewList from './task/pages/NewList';
import EditTask from './task/pages/EditTask';
import EditList from './task/pages/EditList';
import CreateTask from './task/pages/CreateTask';
import UserContext from './UserContext';
import axios from 'axios';
import Chart from './utils/Chart';
import Profile from './user/pages/Profile';
import Users from './user/pages/Users';
// scss
import './index.scss';
import MapContainer from './map/MapContainer';
import Twitter from './utils/Twitter';
import Chat from './utils/Chat';

function App() {

  const [user, setUser] = useState({
    isLoggedIn: false,
    profile: {
      // country: "",
      // tasks: [],
      // _id: "",
      // username: "",
      // email: "",
      // googleId: ""
    }
  });

  const updateProfile = (updatedProfile) => {
    setUser({ isLoggedIn: true, profile: updatedProfile });
  }

  useEffect(() => {
    axios.get('http://localhost:3001/', { withCredentials: true }).then(res => {
      getAuthUser(res.data.user, res.data.authenticated);
    });
  }, []);

  const getAuthUser = (userId, auth) => {
    axios.get(`http://localhost:3001/users/${userId}`).then(res => {
      setUser({
        isLoggedIn: auth,
        profile: res.data
      });
    });
  }

  let routes;

  if (user.isLoggedIn) {
    routes = (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/dashboard/:listId' component={Dashboard} />
        <Route exact path='/dashboard/:listId/tasks' component={Dashboard} />
        <Route exact path='/new-list' component={NewList} />
        <Route exact path='/edit-list/:listId' component={EditList} />
        <Route exact path='/create-task/:listId' component={CreateTask} />
        <Route exact path='/dashboard/:listId/tasks/:taskId' component={EditTask} />
        <Route path='/map' component={MapContainer} />
        <Route path='/chart' component={Chart} />
        <Route path='/twitter' component={Twitter} />
        <Route path='/profile' component={Profile} />
        <Route path='/chat' component={Chat} />
        <Route path='/users' component={Users} />
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    )
  }

  return (
    <UserContext.Provider value={{ ...user, updateProfile: updateProfile }}>
      <BrowserRouter>
        <div className="bg">
          <Navbar />
          {routes}
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
