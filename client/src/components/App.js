import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from './views/NavBar/NavBar';
import MovieDetail from './views/MovieDetail/MovieDetail';
import FavoritePage from './views/FavoritePage/FavoritePage';

import Auth from '../utils/auth';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route
              exact
              path="/movie/:movieId"
              component={Auth(MovieDetail, null)}
            />
            <Route
              exact
              path="/favorite"
              component={Auth(FavoritePage, true)}
            />
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
