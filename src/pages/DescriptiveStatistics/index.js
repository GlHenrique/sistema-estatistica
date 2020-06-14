import React, { useEffect, useState } from 'react';
import {
  Paper,
  Grid,
  Card,
  Typography,
  CardContent,
  Box,
  CardActions,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  CircularProgress,
  Fab,
  Icon,
  Snackbar,
  Select,
  InputLabel,
  MenuItem,
  Slider,
} from '@material-ui/core';
import Header from '../../components/Header';
import {
  FabContainer,
  useStyles,
  SelectContainer,
  SliderContainer,
} from './styles';
import GoBack from '../../components/GoBack';

import TableComponent from '../../components/Table';
import Alert from '../../components/Alert';
import api from '../../services/api';

export default function DescriptiveStatistics() {
  document.title = 'Estatística Descritiva';

  const classes = useStyles();
  const [isContinue, setIsContinue] = useState(false);
  const [variableName, setVariableName] = useState('');
  const [method, setMethod] = useState('');
  const [analyze, setAnalyze] = useState('');
  const [order, setOrder] = useState('');
  const [showOrder, setShowOrder] = useState(false);
  const [values, setValues] = useState('');
  const [calculating, setCalculating] = useState(false);
  const [total, setTotal] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [variablePropName, setVariablePropName] = useState('');
  const [disableForm, setDisableForm] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [separatingMeasure, setSeparatingMeasures] = useState('quartil');
  const [stepSlider, setStepSlider] = useState(25);
  const [separatingMeasureValue, setSeparatingMeasureValue] = useState(0);
  const [rows, setRows] = useState([]);
  const [media, setMedia] = useState('');
  const [moda, setModa] = useState('');
  const [mediana, setMediana] = useState('');
  const [desvioPadrao, setDesvioPadrao] = useState('');
  const [variancia, setVariancia] = useState('');

  const handleCalculate = (event) => {
    event.preventDefault();
    if (!method) {
      document.getElementsByName('method')[0].focus();
      return false;
    }
    if (!analyze) {
      document.getElementsByName('analyze')[0].focus();
      return false;
    }
    if (!separatingMeasureValue) {
      setShowSnackbar(true);
      return false;
    }
    setVariablePropName(variableName);
    let arrayFormatted = values.split(';');
    arrayFormatted = arrayFormatted.filter((item) => item !== ''); // Removendo index vazios.
    setCalculating(true);
    return api
      .post('/calculate', {
        variableName,
        method,
        analyze,
        order,
        values: arrayFormatted,
        isContinue,
        separatingMeasure: separatingMeasureValue,
      })
      .then((res) => {
        setDisableForm(true);
        setTotal(res.total);
        setRows(res.rows);
        setShowTable(true);
        setMedia(res.media);
        setModa(res.moda);
        setMediana(res.mediana);
        setDesvioPadrao(res.desvioPadrao);
        setVariancia(res.variancia);
      })
      .catch((error) => {
        console.log(error);
        setShowSnackbar(true);
      })
      .finally(() => {
        setCalculating(false);
      });
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleSeparatingMeasures = (event) => {
    setSeparatingMeasures(event.target.value);
    switch (event.target.value) {
      case 'quartil':
        setStepSlider(25);
        break;
      case 'quintil':
        setStepSlider(20);
        break;
      case 'decil':
        setStepSlider(10);
        break;
      default:
        setStepSlider(1); // Porcentil
        break;
    }
  };

  useEffect(() => {
    if (analyze === 'qualitative') {
      setShowOrder(true);
    } else {
      setShowOrder(false);
    }

    if (analyze === 'continueQuantitative') {
      setIsContinue(true);
    } else {
      setIsContinue(false);
    }
  }, [analyze, isContinue]);

  function handleReload() {
    window.location.reload();
  }

  return (
    <>
      <Header titleToolbar="Lookup - Estatística Descritiva" />
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ position: 'absolute', top: 155, marginBottom: 64 }}
      >
        <Grid
          item
          className={classes.cardSize}
          style={{ marginBottom: '16px' }}
        >
          <Paper elevation={3}>
            <Card>
              <Box display="flex" alignItems="center">
                <GoBack />
                <Typography variant="h5" component="h2">
                  Descritiva
                </Typography>
              </Box>
              <CardContent>
                <form onSubmit={(event) => handleCalculate(event)}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Insira abaixo o nome da variável que deseja analisar.
                  </Typography>
                  <TextField
                    required
                    label="Nome da variável"
                    variant="outlined"
                    margin="normal"
                    disabled={disableForm}
                    value={variableName}
                    onChange={(event) => setVariableName(event.target.value)}
                    fullWidth
                  />
                  <Grid container justify="space-between">
                    <FormControl
                      disabled={disableForm}
                      required
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Método de avaliação
                      </FormLabel>
                      <RadioGroup
                        name="method"
                        value={method}
                        onChange={(event) => setMethod(event.target.value)}
                      >
                        <FormControlLabel
                          value="population"
                          control={<Radio />}
                          label="População"
                        />
                        <FormControlLabel
                          value="sample"
                          control={<Radio />}
                          label="Amostra"
                        />
                      </RadioGroup>
                    </FormControl>
                    <FormControl
                      disabled={disableForm}
                      required
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Análise:</FormLabel>
                      <RadioGroup
                        name="analyze"
                        value={analyze}
                        onChange={(event) => setAnalyze(event.target.value)}
                      >
                        <FormControlLabel
                          value="qualitative"
                          control={<Radio />}
                          label="Qualitativa"
                        />
                        <FormControlLabel
                          value="discreteQuantitative"
                          control={<Radio />}
                          label="Quantitativa Discreta"
                        />
                        <FormControlLabel
                          value="continueQuantitative"
                          control={<Radio />}
                          label="Quantitativa Contínua"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {showOrder && (
                    <FormControl
                      disabled={disableForm}
                      required
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">A ordem importa?</FormLabel>
                      <RadioGroup
                        name="order"
                        value={order}
                        onChange={(event) => setOrder(event.target.value)}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Sim"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Não"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                  <SelectContainer>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Medida Separatriz
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={separatingMeasure}
                        onChange={(event) => handleSeparatingMeasures(event)}
                        label="Medida Separatriz"
                      >
                        <MenuItem value="quartil">Quartil</MenuItem>
                        <MenuItem value="decil">Decil</MenuItem>
                        <MenuItem value="quintil">Quintil</MenuItem>
                        <MenuItem value="porcentil">Porcentil</MenuItem>
                      </Select>
                    </FormControl>
                  </SelectContainer>
                  <SliderContainer>
                    <Slider
                      defaultValue={100}
                      getAriaValueText={(value) => `${value}%`}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"
                      step={stepSlider}
                      onChange={(event, newValue) =>
                        setSeparatingMeasureValue(newValue)
                      }
                      value={separatingMeasureValue}
                      max={100}
                    />
                  </SliderContainer>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Inserção manual de valores:
                  </Typography>
                  <Box className={classes.formControl}>
                    <TextField
                      label="Elementos"
                      multiline
                      rows="4"
                      variant="outlined"
                      required
                      fullWidth
                      disabled={disableForm}
                      value={values}
                      inputProps={{ spellCheck: false }}
                      onChange={(event) => setValues(event.target.value)}
                      placeholder="Insira os valores separados por ponto e vírgula (;)"
                    />
                  </Box>
                  <CardActions className={classes.cardActions}>
                    <Grid container justify="flex-end">
                      <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={disableForm}
                        color="primary"
                      >
                        {calculating ? (
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
                </form>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        {showTable && (
          <TableComponent
            id="table"
            variableName={variablePropName}
            total={total}
            method={method}
            analyze={analyze}
            rows={rows}
            media={media}
            moda={moda}
            mediana={mediana}
            desvioPadrao={desvioPadrao}
            variancia={variancia}
          />
        )}
      </Grid>
      {showTable && (
        <FabContainer>
          <Fab color="secondary" onClick={() => handleReload()}>
            <Icon title="Nova consulta">autorenew</Icon>
          </Fab>
        </FabContainer>
      )}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={7000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity="error">
          Ops! Você não inseriu valores permitidos!
        </Alert>
      </Snackbar>
    </>
  );
}
