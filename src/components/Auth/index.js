import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Avatar, Button, Grid, Paper, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useNavigate} from 'react-router-dom';

//useStyles
import useStyles from './Auth.styles';

//components
import Input from './Input';
import Icon from './Icon';

//actions
import { signup, signin } from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const GoogleClientId = process.env.REACT_APP_API_KEY

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);


    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);

    const handleSubmit = (e) => { 
        e.preventDefault();

        if (isSignUp) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
        setFormData(initialState);
    };

    const handleChange = (e) => { 
        setFormData({...formData, [e.target.name] : e.target.value})
    };

    const switchMode = () => {
        setIsSignUp(prevIsSignUp => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: "AUTH", payload: { result, token } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleError = () => { 
        console.log("Google Sign In unsuccessful, Try again later");
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant='h5'>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input
                            name="password"
                            label="password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && <Input name="confirmPassword" label="confirm password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId='982852597819-3i42qcv2vgsotiggiltcdu0nqh1ilq83.apps.googleusercontent.com'
                        render={renderProps => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant='contained'
                            >
                                {isSignUp ? "sign up with google" : "Sign in with Google"}
                            </Button>
                        )}
                        onSuccess={ googleSuccess }
                        onFailure={googleError}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "already have an account? sign in" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
