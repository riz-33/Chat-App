import React from 'react';
import { Box, Divider, Stack, TextField, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from "../config/firebase";
import { useForm } from "react-hook-form"
import { db, doc, setDoc } from '../config/firebase';
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
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
                await setDoc(doc(db, "users", response.user.uid), {...data, uid: response.user.uid});
            })
            .catch((error) => {
                console.log(error)
            });
        console.log(data)
    }

    return (
        <SignUpContainer direction="column" justifyContent="space-between" component="main" maxWidth="xs">
            <Card variant='outlined' >
                <Typography variant="h4" align="center" gutterBottom fontFamily='Helvetica Neue'>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                {...register("username")}
                                label="Username"
                                type="name"
                                fullWidth
                                variant="outlined"
                                color='warning'
                                required
                            />
                        </Grid>
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
                    </Grid>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Google')}
                            startIcon={<FcGoogle />}
                        >
                            Sign up with Google
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link to={"/"}>
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Card>
        </SignUpContainer>
    );
};

export default SignupForm;