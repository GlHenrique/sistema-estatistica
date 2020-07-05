import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Card,
  Box,
  Typography,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CardActions,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useStyles, SelectContainer } from './styles';
import Header from '../../components/Header';
import GoBack from '../../components/GoBack';
import Snackbar from '../../components/Snackbar';
import api from '../../services/api';

export default function CorrelationRegression() {
  document.title = 'Correlação e Regressão';
  const [mode, setMode] = useState('');
  const [xValues, setXValues] = useState('');
  const [yValues, setYValues] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');

  const [correlation, setCorrelation] = useState('');
  const [regression, setRegression] = useState('');

  const classes = useStyles();

  const handleMode = (event) => {
    setMode(event.target.value);
    setXValues('');
    setYValues('');
    setCorrelation('');
    setRegression('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (xValues.split(';').length <= 1) {
      setMessageSnackbar('Insira no mínimo 2 valores de X');
      setShowSnackbar(true);
      return;
    }
    if (yValues.split(';').length <= 1) {
      setMessageSnackbar('Insira no mínimo 2 valores de Y');
      setShowSnackbar(true);
      return;
    }
    api
      .post('/correlation', {
        xValues: xValues.split(';'),
        yValues: yValues.split(';'),
      })
      .then((res) => {
        setCorrelation(res.correlacaoLinear);
        setRegression(res.regressaoLinear);
      })
      .catch((err) => {
        setMessageSnackbar(err.error);
        setShowSnackbar(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Header titleToolbar="Lookup - Correlação e Regressão" />
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ position: 'absolute', top: 155, marginBottom: 64 }}
      >
        <Grid item className={classes.cardSize}>
          <Paper elevation={3}>
            <Card>
              <Box display="flex" alignItems="center">
                <GoBack />
                <Typography variant="h5" component="h2">
                  Probabilidade
                </Typography>
              </Box>
              <form onSubmit={handleSubmit}>
                <CardContent>
                  <SelectContainer>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Modo
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={mode}
                        required
                        onChange={(event) => handleMode(event)}
                        label="Modo"
                      >
                        <MenuItem value="upload">Upload</MenuItem>
                        <MenuItem value="manual">Manual</MenuItem>
                      </Select>
                    </FormControl>
                  </SelectContainer>
                  {mode === 'manual' && (
                    <>
                      <TextField
                        required
                        label="Valores de X"
                        variant="outlined"
                        margin="normal"
                        multiline
                        placeholder="Insira os valores separados por ;"
                        rows={3}
                        value={xValues}
                        onChange={(event) => setXValues(event.target.value)}
                        fullWidth
                      />
                      <TextField
                        required
                        label="Valores de Y"
                        variant="outlined"
                        margin="normal"
                        multiline
                        placeholder="Insira os valores separados por ;"
                        rows={3}
                        value={yValues}
                        onChange={(event) => setYValues(event.target.value)}
                        fullWidth
                      />
                    </>
                  )}
                  {mode === 'manual' && (
                    <CardActions>
                      <Grid container justify="flex-end">
                        <Button
                          variant="contained"
                          size="large"
                          type="submit"
                          color="primary"
                        >
                          {loading && (
                            <CircularProgress
                              size={20}
                              style={{ color: 'rgb(220, 0, 78)' }}
                            />
                          )}
                          {!loading && 'Calcular'}
                        </Button>
                      </Grid>
                    </CardActions>
                  )}
                  {correlation && (
                    <Grid container justify="center">
                      <Typography style={{ fontSize: 22 }} variant="h1">
                        Correlação: {correlation}
                      </Typography>
                    </Grid>
                  )}
                  {regression && (
                    <Grid container justify="center">
                      <Typography style={{ fontSize: 22 }} variant="h1">
                        Regressão Linear: {regression}
                      </Typography>
                    </Grid>
                  )}
                </CardContent>
              </form>
              <Snackbar
                open={showSnackbar}
                handleClose={() => setShowSnackbar(false)}
                message={messageSnackbar}
                severity="error"
              />
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
