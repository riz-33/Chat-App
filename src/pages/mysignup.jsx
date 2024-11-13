import React from 'react';
import { TextField, Button, Container, Grid, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from "../config/firebase";
import { useForm } from "react-hook-form"
import { db, doc, setDoc } from '../config/firebase';

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (response) => {
                // console.log(response, "user")
                await setDoc(doc(db, "users", response.user.uid), {
                    email: data.email,
                    // state: "CA",
                    // country: "USA"
                });
            })
            .catch((error) => {
                console.log(error)
            });
        console.log(data)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 10 }}>
                <Typography variant="h4" align="center" gutterBottom fontFamily='Helvetica Neue'>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                {...register("email")}
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                color='warning'
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("password")}
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                color='warning'
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                Register
                            </Button>
                        </Grid>
                        <Grid item xs={12} textAlign='center' fontFamily='Helvetica Neue'>
                            Already have an account? <Link to={"/"}>Login</Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default SignupForm;