import React, { useState, useEffect } from 'react';
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
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import XLSX from 'xlsx';
import { useStyles, SelectContainer } from './styles';
import Header from '../../components/Header';
import GoBack from '../../components/GoBack';
import Snackbar from '../../components/Snackbar';
import api from '../../services/api';
import Upload from '../../components/Upload';
import LineChart from '../../components/LineChart';

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

  const [workbook, setWorkbook] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [sheets, setSheets] = useState({});
  const [sheet, setSheet] = useState('');
  const [dataChart, setDataChart] = useState([]);

  const classes = useStyles();

  const handleMode = (event) => {
    setMode(event.target.value);
    setXValues('');
    setYValues('');
    setCorrelation('');
    setRegression('');
  };

  function handleFile(e, droppedFile = null) {
    let f;
    if (droppedFile) {
      f = droppedFile;
    } else {
      const { files } = e.target;
      // eslint-disable-next-line prefer-destructuring
      f = files[0];
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      setWorkbook(XLSX.read(data, { type: 'array' }));
    };
    reader.readAsArrayBuffer(f);
  }

  const handleReadSheet = (value) => {
    delete sheets[value]['!margins'];
    delete sheets[value]['!ref'];
    const keys = Object.keys(sheets[value]);
    const keysA = keys.filter((item, index) => index % 2 === 0);
    const keysB = keys.filter((item, index) => index % 2 === 1);
    const XValuesArray = keysA
      .map((item) => sheets[value][item])
      .map((item) => item.v);
    const YValuesArray = keysB
      .map((item) => sheets[value][item])
      .map((item) => item.v);
    setLoading(true);
    api
      .post('/correlation', {
        xValues: XValuesArray,
        yValues: YValuesArray,
      })
      .then((res) => {
        setCorrelation(res.correlacaoLinear);
        setRegression(res.regressaoLinear);
        setDataChart(res.dataChart);
      })
      .catch((err) => {
        setMessageSnackbar(err.error);
        setShowSnackbar(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSheet = (e) => {
    setSheet(e.target.value);
    handleReadSheet(e.target.value);
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
        setDataChart(res.dataChart);
      })
      .catch((err) => {
        setMessageSnackbar(err.error);
        setShowSnackbar(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (workbook) {
      setSheetNames(workbook.SheetNames);
      setSheets(workbook.Sheets);
    }
  }, [workbook]);

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
                  Correlação e Regressão
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
                  {mode === 'upload' && (
                    <>
                      <Upload handleUploadFile={handleFile} />
                      {sheetNames.length > 0 && (
                        <FormControl margin="normal" component="fieldset">
                          <FormLabel component="legend">
                            Folhas disponíveis
                          </FormLabel>
                          <RadioGroup
                            name="sheets"
                            value={sheet}
                            onChange={(e) => handleSheet(e)}
                          >
                            {sheetNames.map((item) => (
                              <FormControlLabel
                                value={item}
                                key={item}
                                control={<Radio />}
                                label={item}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                    </>
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
        {correlation && regression && (
          <Grid item className={classes.cardSize}>
            <LineChart values={dataChart} />
          </Grid>
        )}
      </Grid>
    </>
  );
}
