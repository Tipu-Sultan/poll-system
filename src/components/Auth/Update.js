import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import userService from '../../services/userService';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
    });

    useEffect(() => {
        userService.getUserById(id)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        userService.updateUser(id, user)
            .then(() => {
                alert('User Updated');
                setLoading(false);
                navigate('/users');
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <Container maxWidth="sm" className="mt-20">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Update User
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
                    <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Update'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Update;
