import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
    InputAdornment,
    IconButton
} from '@material-ui/core';
import {
    useStyles,
    Logo
} from './styles';
import app from "../../base";
import { withRouter } from 'react-router';
import FormValidators from "../../utils/validators";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import logo from '../../assets/logos/lookup.png';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            Copyright © Looukup{' ' + new Date().getFullYear() + '.'}
        </Typography>
    );
}


function Login({history}) {

    const classes = useStyles();

    const [errorEmail, setErrorEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);

    useEffect(() => {
        if (!email) {
            setErrorEmail(false);
            setUserNotFound(false);
            return
        }
        if (userNotFound) {
            setUserNotFound(false);
        }
        let result = FormValidators.emailValidator(email);
        setErrorEmail(!result);
    }, [email]);

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, senha} = event.target.elements;
            await app.auth().signInWithEmailAndPassword(email.value, senha.value)
                .then(() => {
                    history.push('/');
                })
                .catch((error) => {
                    switch (error.code) {
                        case 'auth/wrong-password':
                            setWrongPassword(true);
                            document.getElementsByName('senha')[0].focus();
                            break;
                        default:
                            setUserNotFound(true);
                            document.getElementsByName('email')[0].focus();
                            break;
                    }
                });
        }, [history]
    );

    useEffect(() => {
        if (wrongPassword) {
            setWrongPassword(false);
        }
    }, [password]);

    // const currentUser = useContext(AuthContext);


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} onSubmit={handleLogin}>
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
                            error={errorEmail || userNotFound}
                            helperText={errorEmail ? 'Email inválido' : userNotFound ? 'Usuário não encontrado' : null}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Senha"
                            name="senha"
                            type={isPassword ? 'password' : 'text'}
                            error={wrongPassword}
                            helperText={wrongPassword ? 'Senha incorreta' : null}
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit} style={{height: '48px'}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Esqueceu sua senha?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Não tem uma conta? Cadastre-se já"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default withRouter(Login)
