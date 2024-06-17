import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, CircularProgress, Grid } from '@mui/material';
import userService from '../../services/userService';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        userService.getUserById(id)
            .then(response => {
                setUser(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [id]);

    const handleUpdate = () => {
        navigate(`/users/${user.id}/update`);
    };

    const handleDelete = () => {
        userService.deleteUser(user.id)
            .then(() => {
                console.log('User deleted');
                navigate('/users');
            })
            .catch(error => {
                console.error(error);
            });
    };

    if (isLoading) {
        return (
            <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} className="p-4" style={{ width: '100%', maxWidth: '600px' }}>
                {user ? (
                    <Grid container spacing={2} direction="column" p={5}>
                        <Grid item xs={12}>
                            <Typography variant="h4" className="mb-2">{user.name}</Typography>
                            <Typography variant="body1" className="text-gray-600 mb-2">Email: {user.email}</Typography>
                            <Typography variant="body1" className="text-gray-600 mb-2">Phone: {user.phone}</Typography>
                            <Typography variant="body1" className="text-gray-600 mb-4">Role: {user.role}</Typography>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpdate}
                            >
                                Update
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1">User not found.</Typography>
                )}
            </Paper>
        </Container>
    );
};

export default UserDetail;
