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

    // const isAuthenticated = async () => {
    //     const authenticated = authService.isAuthenticated;
    //     if (authenticated !== userAuthenticated) {
    //         const user = await authService.getUser();
    //         setUser(user)
    //         setUserAuthenticated(authenticated)
    //     }
    // }



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
                    console.log('Auth response: ', res);
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
            <IconButton onClick={handleMenuOpen} color='inherit' >
                <AccountCircle />
            </IconButton>

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

            {
                !user ? (
                    <Button color='inherit' onClick={login}>Login</Button>
                ) : (
                    null
                )

            }

        </div>
    );
}

export default LoginButton
