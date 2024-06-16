import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import pollService from '../services/pollService';

const Dashboard = () => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await pollService.getAllPolls();
                if (response && Array.isArray(response)) {
                    setPolls(response);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPolls();
    }, []);

    const handleDelete = async (pollId) => {
        try {
            await pollService.deletePoll(pollId);
            // Remove the deleted poll from the state
            setPolls(prevPolls => prevPolls.filter(poll => poll.id !== pollId));
            alert('Poll deleted');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto">
            <Typography variant="h2" align="center" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {polls.length === 0 ? (
                    <Typography variant="body1">No polls available</Typography>
                ) : (
                    polls.map(poll => (
                        <Grid item key={poll.id} xs={12} sm={6} md={4} lg={3}>
                            <Card className="h-100">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {poll.role}
                                    </Typography>
                                    <Typography variant="h6" className="font-bold" gutterBottom>
                                        {poll.question}
                                    </Typography>
                                    <ul>
                                        {poll.options.map(option => (
                                            <li key={option.id}>
                                                {option.optionText}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                {user.role === 'Institute' && (
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(poll.id)}
                                            fullWidth
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                )}
                                
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            color="info"
                                            onClick={() => window.location.href=`/polls/${poll.role}/${poll.id}`}
                                            fullWidth
                                        >
                                            View Poll
                                        </Button>
                                    </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
};

export default Dashboard;
