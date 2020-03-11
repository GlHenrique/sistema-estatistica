import React from 'react';
import { Grid } from '@material-ui/core';
import CardTitle from "../../components/CardTitle";
import Header from "../../components/Header";

export function Layout({children, title}) {
    return (
        <>
            <Header titleToolbar={title}/>
            {children}
        </>
    )
}

export default function Home() {
    document.title = 'Lookup | Home';

    return (
        <Layout title="Lookup">
            <div style={{flexGrow: 1}}>
                <Grid container justify='center'>
                    <Grid container justify='center' spacing={2} style={{marginTop: '-23%', width: '100%'}}>
                        <Grid item>
                            <CardTitle title="Estatística Descritiva"/>
                        </Grid>
                        <Grid item>
                            <CardTitle title="Probabilidade"/>
                        </Grid>
                        <Grid item>
                            <CardTitle title="Correlação e Regressão"/>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Layout>
    );
}
