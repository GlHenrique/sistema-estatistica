import React, { useCallback, useEffect, useState } from "react";
import { Button, CssBaseline, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from "@material-ui/core";
import app from "../../base";
import { withRouter } from 'react-router';
import { useStyles } from "../Login/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import FormValidators from "../../utils/validators";

function SignUp({history}) {

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorDuplicatedEmail, setErrorDuplicatedEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);
    const [errorWeekPassword, setErrorWeekPassword] = useState(false);

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        if (!errorWeekPassword) {
            const {email, senha} = event.target.elements;
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, senha.value)
                .then(() => {
                    history.push("/");
                })
                .catch((error) => {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            setErrorDuplicatedEmail(true);
                    }
                });
        }
    }, [history]);

    useEffect(() => {
        if (!email) {
            setErrorEmail(false);
            setErrorDuplicatedEmail(false);
            return
        }
        let result = FormValidators.emailValidator(email);
        setErrorEmail(!result);
        if (errorDuplicatedEmail) {
            setErrorDuplicatedEmail(false);
        }
    }, [email]);

    useEffect(() => {
        if (password) {
            if (password.length < 6) {
                setErrorWeekPassword(true);
                return;
            }
            setErrorWeekPassword(false);
        }
    }, [password]);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Cadastro
                    </Typography>
                    <form className={classes.form} onSubmit={handleSignUp}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            error={errorEmail || errorDuplicatedEmail}
                            helperText={errorEmail ?
                                'Email inválido' : errorDuplicatedEmail ? 'Email já cadastrado' : null}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Senha"
                            name="senha"
                            type="password"
                            error={errorWeekPassword}
                            helperText={errorWeekPassword ? 'A senha exige no mínimo 6 caracteres.' : null}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsPassword(!isPassword)}
                                        >
                                            {isPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Confirmar Senha"
                            name="confirmar-senha"
                            type="password"
                            error={false}
                            value={confirmPassword}
                            onChange={event => setConfirmPassword(event.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit} style={{height: '48px'}}
                        >
                            Cadastrar
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}

export default withRouter(SignUp)
