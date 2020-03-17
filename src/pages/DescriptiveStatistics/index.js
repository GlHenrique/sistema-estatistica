import React, { useEffect } from 'react';
import Header from "../../components/Header";
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
    Radio, CircularProgress,
} from '@material-ui/core';
import {
    useStyles
} from './styles';
import GoBack from "../../components/GoBack";
import { useState } from 'react';
import TableComponent from "../../components/Table";

export default function DescriptiveStatistics() {
    document.title = 'Estatística Descritiva';

    const classes = useStyles();
    const [variableName, setVariableName] = useState('');
    const [method, setMethod] = useState('');
    const [analyze, setAnalyze] = useState('');
    const [order, setOrder] = useState(null);
    const [showOrder, setShowOrder] = useState(false);
    const [values, setValues] = useState('56;14;78;99;63;100;42;36;36;36;36');
    const [calculating, setCalculating] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [formattedValues, setFormattedValues] = useState([]);
    const [variablePropName, setVariablePropName] = useState('');

    const handleCalculate = (event) => {
        event.preventDefault();
        setVariablePropName(variableName);
        setCalculating(true);
        let arrayFormatted = values.split(';');
        if (analyze === 'discreteQuantitative') {
            setTimeout(() => {
                setCalculating(false);
                arrayFormatted = arrayFormatted.map(item => {
                    return Number(item); // Convertendo para Number
                });
                arrayFormatted.sort(
                    (comparingA, comparingB) => {
                        return comparingA - comparingB;
                    }
                ); // Organizando do menor para o maior
                setFormattedValues(arrayFormatted);
                setShowTable(true);
                setValues('');
                setVariableName('');
            }, 2000);
            return;
        }
        if (analyze === 'qualitative' && order === 'false') {
            setFormattedValues(arrayFormatted);
            setShowTable(true);
            setValues('');
            setVariableName('');
        }
    };

    useEffect(() => {
        if (analyze === 'qualitative') {
            setShowOrder(true);
            return
        }
        setShowOrder(false);
    }, [analyze]);

    return (
        <>
            <Header titleToolbar="Lookup - Estatística Descritiva"/>
            <Grid container justify="center" alignItems="center" style={{position: 'absolute', top: 155}}>
                <Grid item className={classes.cardSize}>
                    <Paper elevation={3}>
                        <Card>
                            <Box display="flex" alignItems="center">
                                <GoBack/>
                                <Typography variant="h5" component="h2">
                                    Descritiva
                                </Typography>
                            </Box>
                            <CardContent>
                                <form onSubmit={(event) => handleCalculate(event)}>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p">
                                        Insira abaixo o nome da variável que deseja analisar.
                                    </Typography>
                                    <TextField
                                        required
                                        label="Nome da variável"
                                        variant="outlined"
                                        margin="normal"
                                        value={variableName}
                                        onChange={event => setVariableName(event.target.value)}
                                        fullWidth
                                    />
                                    <Grid container justify="space-between">
                                        <FormControl required component="fieldset" className={classes.formControl}>
                                            <FormLabel component="legend">Método de avaliação</FormLabel>
                                            <RadioGroup name="Method" value={method}
                                                        onChange={(event => setMethod(event.target.value))}>
                                                <FormControlLabel
                                                    value="population"
                                                    control={<Radio/>}
                                                    label="População"
                                                />
                                                <FormControlLabel
                                                    value="sample"
                                                    control={<Radio/>}
                                                    label="Amostra"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                        <FormControl required component="fieldset" className={classes.formControl}>
                                            <FormLabel component="legend">Análise:</FormLabel>
                                            <RadioGroup name="Analyze" value={analyze}
                                                        onChange={(event => setAnalyze(event.target.value))}>
                                                <FormControlLabel
                                                    value="qualitative"
                                                    control={<Radio/>}
                                                    label="Qualitativa"
                                                />
                                                <FormControlLabel
                                                    value="discreteQuantitative"
                                                    control={<Radio/>}
                                                    label="Quantitativa Discreta"
                                                />
                                                <FormControlLabel
                                                    value="continueQuantitative"
                                                    control={<Radio/>}
                                                    label="Quantitativa Contínua"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    {showOrder && (
                                        <FormControl required component="fieldset" className={classes.formControl}>
                                            <FormLabel component="legend">A ordem importa?</FormLabel>
                                            <RadioGroup name="order" value={order}
                                                        onChange={(event => setOrder(event.target.value))}>
                                                <FormControlLabel
                                                    value="true"
                                                    control={<Radio/>}
                                                    label="Sim"
                                                />
                                                <FormControlLabel
                                                    value="false"
                                                    control={<Radio/>}
                                                    label="Não"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p">
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
                                            value={values}
                                            inputProps={{spellCheck: false}}
                                            onChange={event => setValues(event.target.value)}
                                            placeholder="Insira os valores separados por ponto e vírgula (;)"
                                        />
                                    </Box>
                                    <CardActions className={classes.cardActions}>
                                        <Grid container justify="flex-end">
                                            <Button
                                                variant="contained"
                                                size="large"
                                                type="submit"
                                                color="primary">
                                                {calculating ?
                                                    <CircularProgress
                                                        size={20}
                                                        style={{color: 'rgb(220, 0, 78)'}}/>
                                                    : 'Calcular'}
                                            </Button>
                                        </Grid>
                                    </CardActions>
                                </form>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
                {showTable ? (
                    <Grid item style={{maxWidth: '100%', margin: '32px'}}>
                        <Box>
                            <TableComponent
                                variableName={variablePropName}
                                variableValues={formattedValues}
                                total={formattedValues.length}
                            />
                        </Box>
                    </Grid>
                ) : null}
            </Grid>
        </>
    )
}
