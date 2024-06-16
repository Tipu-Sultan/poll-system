import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Paper, Button, Grid, LinearProgress } from '@mui/material';
import pollService from '../../services/pollService';

const ViewPoll = () => {
    const { role, questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        pollService.getPollsByRole(role, questionId)
            .then(response => {
                setQuestion(response.data.question);
                setOptions(response.data.options);
            })
            .catch(error => {
                console.error(error);
            });
    }, [role, questionId]);

    const handleVote = async (pollId, optionId) => {
        try {
            const res = await pollService.vote(pollId, optionId);
            alert(res.data.message);
            // Refresh poll options after voting
            pollService.getPollsByRole(role, questionId)
                .then(response => {
                    setOptions(response.data.options);
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={3} style={{ padding: '1.5rem', width: '50%' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Polls for {role}
                </Typography>
                {question && (
                    <>
                        <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                            {question.question}
                        </Typography>
                        <Grid container spacing={2}>
                            {options.map((option, index) => (
                                <Grid item xs={12} key={option.id}>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() => handleVote(question.id, option.id)}
                                        style={{ width: '100%', marginBottom: '1rem' }}
                                    >
                                        {option.optionText}
                                    </Button>
                                    <LinearProgress variant="determinate" value={(option.voteCount / options.reduce((total, opt) => total + opt.voteCount, 0)) * 100} />
                                    <Typography variant="body2" color="textSecondary">{option.voteCount} vote(s)</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default ViewPoll;
