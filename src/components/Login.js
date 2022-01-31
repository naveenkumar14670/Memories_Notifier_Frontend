import React from 'react';
import axios from 'axios';

import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, Snackbar, TextField, Typography } from '@material-ui/core';
import { useLoginStyles } from './Styles';
import MuiAlert from '@material-ui/lab/Alert';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Copyright(props) {
    return (
        <Typography variant="body2" color="textSecondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/naveenkumar14670">
                Naveen Kumar Anagandula
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login({ handleUser }) {
    const classes = useLoginStyles();
    const [notification, setNotification] = React.useState({ state: false, message: '', severity: '' });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, state: false });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        try {
            const response = await axios.post(`${process.env.REACT_APP_PROXY}/user/login`, { email, password });
            localStorage.setItem('userId', response.data.user._id);
            localStorage.setItem('userToken', response.data.userToken);
            localStorage.setItem('userEmail', response.data.user.email);
            handleUser({ userId: response.data.user._id, userToken: response.data.userToken });
        }
        catch (err) {
            setNotification({ state: true, message: "Invalid Email or Password !!!", severity: 'error' });
        }
        return;
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box className={classes.signInContainer}>
                <Avatar className={classes.signInIcon}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} className={classes.signInFormContainer}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete='off'
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color='primary'
                        className={classes.signInButton}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright className={classes.copyright} />
            <Snackbar open={notification.state} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity={notification.severity}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Login;
