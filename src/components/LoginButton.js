import React, { useEffect, useState } from 'react';
import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    ListItemText
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useOktaAuth } from '@okta/okta-react';

function LoginButton() {

    const { authState, authService } = useOktaAuth;
    const [user, setUser] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [userAuthenticated, setUserAuthenticated] = useState(null);

    // const isAuthenticated = async () => {
    //     if (!authState.isAuthenticated) {
    //         setUser(null)
    //     } else {
    //         await authService.getUser().then((response) => {
    //             setUser(response.sub)
    //         })
    //     }
    // } 

    const handleMenuOpen = e => {
        setMenuAnchorEl(e.target)
    }

    const handleMenuClose = () => {
        setMenuAnchorEl(null)
    }

    const isAuthenticated = async () => {
        const authenticated = authState.isAuthenticated;
        if (authenticated !== userAuthenticated) {
            await authService.getUser();
            setUserAuthenticated(user);
        }
    }

    const login = () => authService.login('/');
    const logout = () => {
        handleMenuClose();
        authService.logout('/')
    }

    useEffect(() => {
        isAuthenticated()
    }, [])

    const menuPosition = {
        vertical: 'top',
        horizontal: 'right'
    };


    return (
        <div>
            {/* if (!authenticated) return <Button color="inherit" onClick={this.login}>Login</Button>; */}

           The fuck

        </div>
    );
}

export default LoginButton
