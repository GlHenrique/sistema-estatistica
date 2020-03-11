import React from 'react';
import Header from "../../components/Header";
import {
    Paper,
    Grid,
    Card,
    Typography,
    CardActionArea,
    CardContent
} from '@material-ui/core';
import { useStyles } from './styles';

export default function DescriptiveStatistics() {

    const classes = useStyles();

    return (
        <>
            <Header titleToolbar="Lookup - Estatística Descritiva"/>
            <Grid container justify="center" style={{marginTop: '-10%'}}>
                <Grid item>
                    <Paper elevation={3}>
                        <Card className={classes.cardSize}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Descritiva
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Lizard are a ....
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
