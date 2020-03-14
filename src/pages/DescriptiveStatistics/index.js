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
    const [method, setMethod] = useState('populacao');
    const [values, setValues] = useState('56;14;78;99;63;100;42;36;36;36;36');
    const [calculating, setCalculating] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [formattedValues, setFormattedValues] = useState([]);

    const handleMethod = method => event => {
        setMethod(event.target.value)
    };

    const handleCalculate = () => {
        setCalculating(true);
        setTimeout(() => {
            setCalculating(false);
            setShowTable(true);
            let arrayFormatted = values.split(';');
            arrayFormatted = arrayFormatted.map(item => {
                return Number(item); // Convertendo para Number
            });
            arrayFormatted.sort(
                (comparingA, comparingB) => {
                    return comparingA - comparingB;
                }
            ); // Organizando do menor para o maior
            setFormattedValues(arrayFormatted);
            setValues('');
        });
    };

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
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Método de avaliação</FormLabel>
                                    <RadioGroup name="Method" value={method} onChange={handleMethod('populacao')}>
                                        <FormControlLabel
                                            value="populacao"
                                            control={<Radio/>}
                                            label="População"
                                        />
                                        <FormControlLabel
                                            value="amostra"
                                            control={<Radio/>}
                                            label="Amostra"
                                        />
                                    </RadioGroup>
                                </FormControl>
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
                                        <Button onClick={(event) => handleCalculate(event)} variant="contained"
                                                size="large" color="primary">
                                            {calculating ? <CircularProgress size={20}
                                                                             style={{color: 'rgb(220, 0, 78)'}}/> : 'Calcular'}
                                        </Button>
                                    </Grid>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
                <Grid item style={{maxWidth: '100%', margin: '32px'}}>
                    {showTable ? (
                        <Box>
                            <TableComponent
                                variableName={variableName}
                                variableValues={formattedValues}
                                total={formattedValues.length}
                            />
                        </Box>
                    ) : null}
                </Grid>
            </Grid>
        </>
    )
}
