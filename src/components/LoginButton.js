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

    const { authState, authService } = useOktaAuth();
    const [user, setUser] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    // const [userAuthenticated, setUserAuthenticated] = useState(null);

    console.log("Auth: ", authService);

    const handleMenuOpen = e => {
        setMenuAnchorEl(e.target)
    }

    const handleMenuClose = () => {
        setMenuAnchorEl(null)
    }


    const login = () => authService.login('/');
    const logout = () => {
        handleMenuClose();
        authService.logout('/')
    }

    useEffect(() => {
        const isAuthenticated = async () => {
            if (!authState.isAuthenticated) {
                setUser(null)
            } else {
                await authService.getUser().then((res) => {
                    setUser(res)
                })
            }
        }
        isAuthenticated()

    }, [authState, authService])

    const menuPosition = {
        vertical: 'top',
        horizontal: 'right'
    };


    return (
        <div>
            { user ? (
                <IconButton onClick={handleMenuOpen} color='inherit' >
                    <AccountCircle />
                </IconButton>
            ) : (<Button color='inherit' onClick={login}>Login</Button>)}


            <Menu
                anchorEl={menuAnchorEl}
                anchorOrigin={menuPosition}
                transformOrigin={menuPosition}
                open={!!menuAnchorEl}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={logout}>
                    <ListItemText
                        primary='Logout'
                        secondary={user && user.name}
                    />
                </MenuItem>

            </Menu>

        </div>
    );
}

export default LoginButton
