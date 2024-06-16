import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import authService from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
            setIsLoggedIn(true);
            setUser(user);
        } else {
            setIsLoggedIn(false);
            setUser('');
        }
    }, []);

    const logout = () => {
        authService.logout();
        setIsLoggedIn(false);
        setUser('');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
                    Poll System
                </Typography>
                <div>
                    {isLoggedIn ? (
                        <>
                            <NavLink to="/" label="Dashboard" />
                            {user.role === 'Institute' && (
                                <NavLink to="/polls/create" label="Create Polls" />
                            )}
                            {(user.role === 'Institute' || user.role === 'Teacher') && (
                                <NavLink to="/users" label="Users" />
                            )}
                            <NavLink to={`/profile/${user.id}`} label="Profile" />
                            <Button color="inherit" onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/register" label="Register" />
                            <NavLink to="/login" label="Login" />
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

const NavLink = ({ to, label }) => (
    <Button component={RouterLink} to={to} color="inherit" sx={{ textTransform: 'none' }}>
        {label}
    </Button>
);

export default Navbar;
