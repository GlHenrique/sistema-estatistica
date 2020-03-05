import React, { useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import app from "../../base";
import { withRouter } from 'react-router';
function SignUp({history}) {

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            const response = await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            console.log(response);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <Grid container component="main">
            <CssBaseline/>
            <div>
                <Avatar>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cadastro
                </Typography>
                <form noValidate onSubmit={handleSignUp}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Cadastrar
                    </Button>
                </form>
            </div>
        </Grid>
    )
}

export default withRouter(SignUp)
