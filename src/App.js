import React from 'react';
import { Route } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react'
import {
  CssBaseline,
  withStyles
} from '@material-ui/core';
import Header from './components/Header';
import Home from './pages/Home';

const styles = theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
});

function App({ classes }) {
  return (
    <>
      <CssBaseline>
        <Header />
        <main className={classes.main} >
          {/* <Home /> */}
          <Route exact path='/' component={Home} />
          <Route path='login/callback' component={LoginCallback} />
        </main>
      </CssBaseline>
    </>
  );
}

export default withStyles(styles)(App);
