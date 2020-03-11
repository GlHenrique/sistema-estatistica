import React from 'react';
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
    Radio,
} from '@material-ui/core';
import {
    useStyles
} from './styles';
import GoBack from "../../components/GoBack";
import { useState } from 'react';

export default function DescriptiveStatistics() {
    document.title = 'Estatística Descritiva';

    const classes = useStyles();
    const [variableName, setVariableName] = useState('');
    const [method, setMethod] = useState('populacao');

    const handleMethod = method => event => {
        setMethod(event.target.value)
    };

    return (
        <>
            <Header titleToolbar="Lookup - Estatística Descritiva"/>
            <Grid container justify="center" alignItems="center" style={{marginTop: '-25%'}}>
                <Grid item>
                    <Paper elevation={3}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <GoBack/>
                                    <Typography variant="h5" component="h2">
                                        Descritiva
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                        style={{width: '100%'}}>
                                        Insira abaixo o nome da variável que deseja analisar.
                                    </Typography>
                                </Box>
                                <TextField
                                    required
                                    id="outlined-required"
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
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
