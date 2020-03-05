import React, { useCallback, useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import app from "../../base";
import { AuthContext } from "../../auth/Auth";
import { withRouter } from 'react-router';
import FormValidators from "../../utils/validators";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


function Login({history}) {

    const classes = useStyles();

    const [errorEmail, setErrorEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);

    useEffect(() => {
        if (!email) {
            return
        }
        let result = FormValidators.emailValidator(email);
        setErrorEmail(!result);
    }, [email]);


    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email } = event.target.elements;

            try {
                await app.auth().signInWithEmailAndPassword(email.value, password)
                    .then(res => {
                        localStorage.setItem('session', JSON.stringify(res))
                    });
                history.push("/");
            } catch (error) {
                console.log(error);
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('email nao existe');
                        break;
                    case 'auth/wrong-password':
                        alert('senha incorreta');
                        break;
                }
            }
        }, [history]
    );

    // const currentUser = useContext(AuthContext);


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="none"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            error={errorEmail}
                            helperText={errorEmail ? 'Email inválido' : null}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={isPassword ? 'password' : 'text'}
                                value={password} label="Senha"
                                onChange={event => setPassword(event.target.value)} fullWidth
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsPassword(!isPassword)}
                                        >
                                            {isPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
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
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default withRouter(Login)
