import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import decode from 'jwt-decode';

//styles
import useStyles from './Navbar.styles';

//images
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

const NavBar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    

    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });

        navigate('/auth');

        setUser(null);
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [user?.token, location, logout]);

    

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img src={memoriesText} className={classes.heading} alt='memoriesText' height='40px' />
                <img className={classes.image} src={memoriesLogo} alt='memories' height='35px' />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user?.result.name }
                            src={user?.result.imageUrl}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user?.result.name}
                        </Typography>
                        <Button
                            variant='contained'
                            className={classes.logout}
                            color='secondary'
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                ): (
                    <Button component={Link} to='/auth' variant='contained' color='primary'> sign in </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar