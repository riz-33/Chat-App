import React from 'react';
import { Box, Divider, Stack, TextField, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
    auth, createUserWithEmailAndPassword, signInWithPopup, googleProvider, db, doc, setDoc, serverTimestamp
} from "../config/firebase";
import { useForm } from "react-hook-form"
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { FcGoogle } from "react-icons/fc";

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const UserInfoContainer = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

const UserInfo = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await setDoc(doc(db, "users", response.user.uid), {
                username: data.username,
                email: data.email,
                password: data.password,
                number: response.user.phoneNumber,
                photo: response.user.photoURL,
                uid: response.user.uid,
                createdAt: serverTimestamp()
            });
            console.log("User registered and saved to Firestore:", response.user);
            reset();
        } catch (error) {
            console.error("Error during email/password signup:", error);
        }
    };

    return (
        <UserInfoContainer direction="column" justifyContent="space-between" component="main" maxWidth="xs">
            <Card variant="outlined">
                <Typography variant="h4" align="center" gutterBottom fontFamily="Helvetica Neue">
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                {...register("username", { required: "Username is required" })}
                                label="Username"
                                fullWidth
                                variant="outlined"
                                color="warning"
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("email", { required: "Email is required" })}
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                color="warning"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("password", { required: "Password is required" })}
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                color="warning"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </UserInfoContainer>
    );
};

export default UserInfo;