import React, { useState } from 'react';
import { TextField, Button, Typography, Container, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import pollService from '../../services/pollService';

const CreatePoll = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(false);

    const [pollData, setPollData] = useState({
        question: '',
        options: ['', ''],
        role: '',
        accessRole: user.role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('option')) {
            const index = parseInt(name.split('-')[1]);
            const newOptions = [...pollData.options];
            newOptions[index] = value;
            setPollData({ ...pollData, options: newOptions });
        } else {
            setPollData({ ...pollData, [name]: value });
        }
    };

    const addOption = () => {
        setPollData({ ...pollData, options: [...pollData.options, ''] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        pollService.createPoll(pollData)
            .then(response => {
                alert('Poll created successfully');
                setLoading(false);
            })
            .catch(error => {
                console.error('Error creating poll:', error);
                setLoading(false);
            });
    };

    return (
        <Container maxWidth="sm" className="mt-8">
            <Typography variant="h4" align="center" gutterBottom>
                Create Poll
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    id="question"
                    name="question"
                    value={pollData.question}
                    onChange={handleChange}
                />
                {pollData.options.map((option, index) => (
                    <TextField
                        key={index}
                        label={`Option ${index + 1}`}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        id={`option-${index}`}
                        name={`option-${index}`}
                        value={option}
                        onChange={handleChange}
                    />
                ))}
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={addOption}
                    fullWidth
                    style={{ marginTop: 16, marginBottom: 16 }}
                >
                    Add Option
                </Button>
                <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel id="role-label">Target Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={pollData.role}
                        onChange={handleChange}
                        label="Target Role"
                    >
                        <MenuItem value="">Select target role</MenuItem>
                        <MenuItem value="Teacher">Teacher</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 16 }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Create Poll'}
                </Button>
            </form>
        </Container>
    );
};

export default CreatePoll;
