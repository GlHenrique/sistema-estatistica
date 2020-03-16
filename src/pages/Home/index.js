import React from 'react';
import { Grid } from '@material-ui/core';
import CardTitle from "../../components/CardTitle";
import Header from "../../components/Header";

export default function Home() {
    document.title = 'Lookup | Home';

    return (
        <>
            <Header titleToolbar="Lookup" />


            <Grid container alignItems="center" justify='center' style={{ position: 'absolute', top: 155 }}>
                <Grid style={{ padding: '8px' }} item>
                    <CardTitle title="Estatística Descritiva" />
                </Grid>
                <Grid style={{ padding: '8px' }} item>
                    <CardTitle title="Probabilidade" />
                </Grid>
                <Grid style={{ padding: '8px' }} item>
                    <CardTitle title="Correlação e Regressão" />
                </Grid>
            </Grid>


        </>
    );
}
