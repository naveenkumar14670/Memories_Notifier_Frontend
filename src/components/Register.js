import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, Snackbar, TextField, Typography } from '@material-ui/core';
import { useRegisterStyles } from './Styles';
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

function Register() {
    let navigate = useNavigate();
    const classes = useRegisterStyles();
    const [notification, setNotification] = React.useState({ state: false, message: '', severity: '' });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, state: false });
    };

    const isEmpty = (word) => {
        return word === undefined || word === ''
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');
        if (isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
            setNotification({ state: true, message: "Fields should not be empty !!!", severity: 'error' });
            return;
        }
        if (password !== confirmPassword) {
            setNotification({ state: true, message: "Passwords Doesn't match !!!", severity: 'error' });
            return;
        }
        try {
            await axios.post(`${process.env.REACT_APP_PROXY}/user/register`, { email, password });
            setNotification({ state: true, message: "Signup Successfull", severity: 'success' });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
        catch (err) {
            setNotification({ state: true, message: "Email Already Exists", severity: 'error' });
        }
        return;
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box className={classes.signUpContainer}>
                <Avatar className={classes.signUpIcon}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} className={classes.signUpFormContainer}>
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete='off'
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color='primary'
                        className={classes.signUpButton}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
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

export default Register;
