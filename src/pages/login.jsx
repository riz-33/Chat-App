import React from 'react';
import { TextField, Button, Container, Grid, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from "../config/firebase";
import { useForm } from "react-hook-form"
import { db, doc, getDoc } from '../config/firebase';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(async (response) => {
                const docRef = doc(db, "users", response.user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log(error)
            });
        console.log(data)
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 10 }}>
                <Typography variant="h4" align="center" gutterBottom fontFamily='Helvetica Neue'>
                    Login
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
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} textAlign='center' fontFamily='Helvetica Neue'>
                            Don't have an account? <Link to={"/signup"}>Sign up</Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default LoginForm;