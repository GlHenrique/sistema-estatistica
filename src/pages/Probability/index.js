import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Card,
  Box,
  Typography,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardActions,
  CircularProgress,
  Button,
} from '@material-ui/core';
import Header from '../../components/Header';
import GoBack from '../../components/GoBack';
import { useStyles, SelectContainer, GridRate, GridBetween } from './styles';
import api from '../../services/api';

export default function Probability() {
  document.title = 'Probabilidade';

  const classes = useStyles();
  const [method, setMethod] = useState('');
  const [amostra, setAmostra] = useState('');
  const [successRate, setSuccessRate] = useState('');
  const [failRate, setFailRate] = useState('');
  const [eventSelected, setEventSelected] = useState('');

  const [mode, setMode] = useState('');
  const [moreThan, setMoreThan] = useState('');
  const [lessThan, setLessThan] = useState('');
  const [betweenA, setBetweenA] = useState('');
  const [betweenB, setBetweenB] = useState('');
  const [media, setMedia] = useState('');
  const [desvioPadrao, setDesvioPadrao] = useState('');

  const [probability, setProbability] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!method) {
      return;
    }
    switch (method) {
      case 'binomial':
        if (!amostra) {
          return;
        }
        if (!successRate) {
          return;
        }
        if (!failRate) {
          return;
        }
        if (!eventSelected) {
          return;
        }
        api
          .post('probability', {
            method,
            sampleSize: amostra,
            successRate: successRate / 100,
            failRate: failRate / 100,
            eventSelected,
          })
          .then((res) => setProbability(res.probabilidade));
        break;
      case 'normal':
        if (!media || !desvioPadrao) {
          return;
        }
        if (mode === 'maiorq') {
          if (!moreThan) {
            return;
          }
        }
        if (mode === 'menorq') {
          if (!lessThan) {
            return;
          }
        }
        if (mode === 'entre') {
          if (!betweenA || !betweenB) {
            return;
          }
        }
        api
          .post('/probability', {
            method,
            moreThan,
            lessThan,
            betweenA,
            betweenB,
            media,
            desvioPadrao,
          })
          .then((res) => setProbability(res.probabilidade));
        break;
      default:
        break;
    }
  };

  const handleMethod = (event) => {
    setMethod(event.target.value);
    setProbability('');
    setAmostra('');
    setSuccessRate('');
    setFailRate('');
    setEventSelected('');
  };

  const handleMode = (event) => {
    setMode(event.target.value);
    setMoreThan('');
    setLessThan('');
    setBetweenA('');
    setBetweenB('');
  };

  return (
    <>
      <Header titleToolbar="Lookup - Probabilidade" />
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
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <SelectContainer>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Método
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={method}
                        required
                        onChange={(event) => handleMethod(event)}
                        label="Método"
                      >
                        <MenuItem value="binomial">Binomial</MenuItem>
                        <MenuItem value="normal">Normal</MenuItem>
                        <MenuItem value="uniforme">Uniforme</MenuItem>
                      </Select>
                    </FormControl>
                  </SelectContainer>
                  {method === 'normal' && (
                    <>
                      <SelectContainer>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="demo-simple-select-outlined-mode">
                            Modo:
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-mode"
                            value={mode}
                            required
                            onChange={(event) => handleMode(event)}
                            label="Modo"
                          >
                            <MenuItem value="maiorq">Maior que</MenuItem>
                            <MenuItem value="menorq">Menor que</MenuItem>
                            <MenuItem value="entre">Entre</MenuItem>
                          </Select>
                        </FormControl>
                      </SelectContainer>
                      {mode === 'maiorq' && (
                        <TextField
                          required
                          label="Valor"
                          variant="outlined"
                          margin="none"
                          value={moreThan}
                          onChange={(event) => setMoreThan(event.target.value)}
                          fullWidth
                        />
                      )}
                      {mode === 'menorq' && (
                        <TextField
                          required
                          label="Valor"
                          variant="outlined"
                          margin="none"
                          value={lessThan}
                          onChange={(event) => setLessThan(event.target.value)}
                          fullWidth
                        />
                      )}
                      {mode === 'entre' && (
                        <GridBetween container>
                          <TextField
                            style={{ marginRight: 4 }}
                            required
                            label="Valor A"
                            variant="outlined"
                            margin="none"
                            value={betweenA}
                            onChange={(event) =>
                              setBetweenA(event.target.value)
                            }
                            fullWidth
                          />
                          <TextField
                            style={{ marginLeft: 4 }}
                            required
                            label="Valor B"
                            variant="outlined"
                            margin="none"
                            value={betweenB}
                            onChange={(event) =>
                              setBetweenB(event.target.value)
                            }
                            fullWidth
                          />
                        </GridBetween>
                      )}
                      <TextField
                        required
                        label="Média"
                        variant="outlined"
                        margin="normal"
                        value={media}
                        onChange={(event) => setMedia(event.target.value)}
                        fullWidth
                      />
                      <TextField
                        required
                        label="Desvio Padrão"
                        variant="outlined"
                        margin="normal"
                        value={desvioPadrao}
                        onChange={(event) =>
                          setDesvioPadrao(event.target.value)
                        }
                        fullWidth
                      />
                    </>
                  )}
                  {method === 'binomial' && (
                    <>
                      <TextField
                        required
                        label="Tamanho da amostra"
                        variant="outlined"
                        margin="normal"
                        value={amostra}
                        onChange={(event) => setAmostra(event.target.value)}
                        fullWidth
                      />
                      <GridRate
                        className={classes.rate}
                        container
                        direction="row"
                      >
                        <TextField
                          required
                          label="Taxa de sucesso (p)"
                          placeholder="30%"
                          variant="outlined"
                          margin="normal"
                          value={successRate}
                          onChange={(event) =>
                            setSuccessRate(event.target.value)
                          }
                          style={{ marginRight: 4 }}
                          fullWidth
                        />
                        <TextField
                          required
                          label="Taxa de fracasso (q)"
                          placeholder="70%"
                          variant="outlined"
                          margin="normal"
                          value={failRate}
                          onChange={(event) => setFailRate(event.target.value)}
                          style={{ marginLeft: 4 }}
                          fullWidth
                        />
                      </GridRate>
                      <TextField
                        required
                        label="Evento selecionado"
                        variant="outlined"
                        margin="normal"
                        value={eventSelected}
                        onChange={(event) =>
                          setEventSelected(event.target.value)
                        }
                        fullWidth
                      />
                    </>
                  )}
                  <CardActions>
                    <Grid container justify="flex-end">
                      <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        color="primary"
                      >
                        {false ? (
                          <CircularProgress
                            size={20}
                            style={{ color: 'rgb(220, 0, 78)' }}
                          />
                        ) : (
                          'Calcular'
                        )}
                      </Button>
                    </Grid>
                  </CardActions>
                  {probability && (
                    <Grid container justify="center">
                      <Typography style={{ fontSize: 22 }} variant="h1">
                        Probabilidade: {probability}%
                      </Typography>
                    </Grid>
                  )}
                </form>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
