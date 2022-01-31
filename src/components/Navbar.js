import React from 'react';

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { useNavbarStyles } from './Styles';

import CakeRoundedIcon from '@material-ui/icons/CakeRounded';


function Navbar({ handleUser }) {
    const classes = useNavbarStyles();

    const handleLogout = () => {
        localStorage.clear();
        handleUser(null);
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <div className={classes.titleContainer}>
                        <CakeRoundedIcon className={classes.titleLogo} />
                        <Typography variant="h6" className={classes.title}>
                            Memories Notifier
                        </Typography>
                    </div>
                    <Button variant="contained" color='default' onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;
