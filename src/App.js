import React, { Fragment } from 'react';
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
    <Fragment>
      <CssBaseline>
        <Header />
        <main className={classes.main} >
          <Home />
        </main>
      </CssBaseline>
    </Fragment>
  );
}

export default withStyles(styles)(App);
