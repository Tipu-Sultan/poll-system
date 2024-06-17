import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Card, CardContent, CardActions, CircularProgress } from '@mui/material';
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
            setPolls(prevPolls => prevPolls.filter(poll => poll.id !== pollId));
            alert('Poll deleted');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mx-auto mt-5">
            <Typography variant="h2" align="center" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {polls.length === 0 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
                        <Typography variant="body1">No polls available</Typography>
                    </div>
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
                                    <div>
                                        {poll.options.map(option => {
                                            const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);
                                            const votePercentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                                            const buttonStyle = user.role === 'Institute'
                                                ? {
                                                    background: `linear-gradient(90deg, #3f51 ${user.role === 'Institute' && votePercentage}%, #ddd ${user.role === 'Institute' && votePercentage}%)`,
                                                    color: 'black',
                                                    marginBottom: '8px',
                                                    display: 'block',
                                                    textAlign: 'left'
                                                }
                                                : {
                                                    backgroundColor: '#3f51b5',
                                                    color: 'white',
                                                    marginBottom: '8px',
                                                    display: 'block',
                                                    textAlign: 'left'
                                                };

                                            return (
                                                <Button
                                                    key={option.optionText}
                                                    variant="contained"
                                                    style={buttonStyle}
                                                    fullWidth
                                                >
                                                    {option.optionText} {user.role === 'Institute' && `(${option.votes}) votes`}
                                                </Button>
                                            );
                                        })}
                                    </div>
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
                                        onClick={() => window.location.href = `/polls/${poll.role}/${poll.id}`}
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
