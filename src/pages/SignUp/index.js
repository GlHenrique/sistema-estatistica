import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { withRouter } from 'react-router';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import app from '../../base';
import { useStyles } from '../Login/styles';
import FormValidators from '../../utils/validators';
import GoBack from '../../components/GoBack';

function SignUp({ history }) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorDuplicatedEmail, setErrorDuplicatedEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);
  const [errorWeekPassword, setErrorWeekPassword] = useState(false);
  const [errorPasswordDifferent, setErrorPasswordDifferent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      const { email, senha } = event.target.elements;
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, senha.value)
        .then(() => {
          history.push('/');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            setErrorDuplicatedEmail(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [history]
  );

  useEffect(() => {
    if (!email) {
      setErrorEmail(false);
      setErrorDuplicatedEmail(false);
      return;
    }
    const result = FormValidators.emailValidator(email);
    setErrorEmail(!result);
  }, [email, errorDuplicatedEmail]);

  useEffect(() => {
    if (password) {
      if (password.length < 6) {
        setErrorWeekPassword(true);
        return;
      }
      setErrorWeekPassword(false);
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword !== password) {
        setErrorPasswordDifferent(true);
      } else {
        setErrorPasswordDifferent(false);
      }
    }
  }, [confirmPassword, errorPasswordDifferent, password]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <GoBack />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <form
            noValidate={false}
            className={classes.form}
            onSubmit={handleSignUp}
          >
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
              helperText={
                errorEmail
                  ? 'Email inválido'
                  : errorDuplicatedEmail
                  ? 'Email já cadastrado'
                  : null
              }
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Senha"
              name="senha"
              type={isPassword ? 'password' : 'text'}
              error={errorWeekPassword}
              helperText={
                errorWeekPassword
                  ? 'A senha exige no mínimo 6 caracteres.'
                  : null
              }
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      tabIndex={-1}
                      onClick={() => setIsPassword(!isPassword)}
                    >
                      {isPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
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
              error={errorPasswordDifferent}
              helperText={
                errorPasswordDifferent ? 'As senhas devem ser iguais' : null
              }
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={
                errorPasswordDifferent || errorEmail || errorWeekPassword
              }
              className={classes.submit}
              style={{ height: '48px' }}
            >
              {loading ? (
                <CircularProgress style={{ color: 'rgb(220, 0, 78)' }} />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(SignUp);
