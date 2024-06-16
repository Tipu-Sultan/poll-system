import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import authService from '../../services/authService';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.register(user)
            .then(() => {
                alert('User registered');
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <Container maxWidth="sm" className="mt-20">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Register
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                        />
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
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            type="text"
                            id="phone"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                label="Role"
                            >
                                <MenuItem value="">Select your role</MenuItem>
                                <MenuItem value="Student">Student</MenuItem>
                                <MenuItem value="Teacher">Teacher</MenuItem>
                                <MenuItem value="Institute">Institute</MenuItem>
                            </Select>
                        </FormControl>
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
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Register;
