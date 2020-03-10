import React, { useCallback, useContext, useEffect, useState } from 'react';
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
    IconButton,
    CircularProgress
} from '@material-ui/core';
import {
    useStyles
} from './styles';
import app from "../../base";
import { withRouter, Redirect } from 'react-router';
import FormValidators from "../../utils/validators";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import logo from '../../assets/logos/lookup-density.png';
import { AuthContext } from "../../auth/Auth";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            Copyright © Looukup{' ' + new Date().getFullYear() + '.'}
        </Typography>
    );
}


function Login({history}) {
    const authContext = useContext(AuthContext);
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUserNotFound(false);
        if (email) {
            if (!FormValidators.emailValidator(email)) {
                setErrorEmail(true);
                return;
            }
            setErrorEmail(false);
        }
    }, [email]);

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            setLoading(true);
            const {email, senha} = event.target.elements;
            await app.auth().signInWithEmailAndPassword(email.value, senha.value)
                .then(() => {
                    setLoading(false);
                    setTimeout(() => {
                        history.push('/home');
                    }, 100);
                })
                .catch((error) => {
                    setLoading(false);
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
                })
        }, [history]
    );

    useEffect(() => {
        if (wrongPassword) {
            setWrongPassword(false);
        }
    }, [password, wrongPassword]);

    if (authContext.currentUser) {
        return (
            <Redirect to="/home"/>
        )
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img alt="Lookup" src={logo}/>
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
                                        <IconButton tabIndex={-1}
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
                            disabled={errorEmail || userNotFound}
                            className={classes.submit} style={{height: '48px'}}
                        >
                            {loading ? <CircularProgress style={{color: 'rgb(220, 0, 78)'}}/>
                                : 'Entrar'}
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
