import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import authService from '../../services/authService';

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.login(user)
            .then(() => {
                alert('User logged in');
                window.location.href ='/'
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <Container maxWidth="sm" className="mt-20">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Log in
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            Log In
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;
