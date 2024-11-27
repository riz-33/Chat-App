import React from 'react';
import { Box, Divider, Stack, TextField, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
    db, doc, getDoc, auth, signInWithEmailAndPassword, signInWithPopup, googleProvider
} from "../config/firebase";
import { useForm } from "react-hook-form"
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { FcGoogle } from "react-icons/fc";
import "./style.css"

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

const LoginContainer = styled(Stack)(({ theme }) => ({
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

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await signInWithEmailAndPassword(auth, data.email, data.password);
            const docRef = doc(db, "users", response.user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                console.log("No such document!");
            }
            console.log("User logged in:", response.user);
            reset();
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // const user = result.user;
            const docRef = doc(db, "users", result.user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                console.log("No such document!");
            }

            // await setDoc(doc(db, "users", user.uid), {
            //     username: user.displayName,
            //     email: user.email,
            //     uid: user.uid
            // });
            console.log("Google user signed in", result.user);
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    return (
        <LoginContainer direction="column" justifyContent="space-between" component="main" maxWidth="xs">
            <Card variant="outlined">
                <Typography variant="h4" align="center" gutterBottom fontFamily="Helvetica Neue">
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
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
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider>
                        <Typography sx={{ color: "text.secondary" }}>or</Typography>
                    </Divider>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={googleLogin}
                            startIcon={<FcGoogle />}
                        >
                            Sign in with Google
                        </Button>
                        <Typography sx={{ textAlign: "center" }}>
                            Already have an account?{" "}
                            <Link to={"/signup"}>
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Card>
        </LoginContainer>
    );
};

export default LoginForm;