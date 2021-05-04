import React from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
    withStyles
} from '@material-ui/core';
import LoginButton from './LoginButton'
// import classes from '*.module.css';

const styles = {
    flex: {
        flex: 1
    }
}

const Header = ({ classes }) => {

    return (
        <AppBar position="static" >
            <Toolbar>
                <Typography variant="h6" color="inherit" >
                    My React App
            </Typography>
                <div className={classes.flex} />
                <LoginButton />
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(Header)
