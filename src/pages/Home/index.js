import React from 'react';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CardTitle from '../../components/CardTitle';
import Header from '../../components/Header';
import {
  contentDescriptive,
  contentProbability,
  contentCorrelation,
} from '../../utils/constants';
import descritivaImage from '../../assets/images/estatistica-descritiva.jpg';
import probabilidadeImage from '../../assets/images/probabilidade.png';
import correlacaoImage from '../../assets/images/correlacao.png';

export default function Home() {
  document.title = 'Lookup | Home';
  const history = useHistory();

  const handleNavigate = (route) => {
    history.push(route);
  };

  return (
    <>
      <Header titleToolbar="Lookup" />

      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ position: 'absolute', top: 155 }}
      >
        <Grid style={{ padding: '8px' }} item>
          <CardTitle
            content={contentDescriptive}
            title="Estatística Descritiva"
            image={descritivaImage}
            onPress={() => handleNavigate('/discriptive-statistics')}
          />
        </Grid>
        <Grid style={{ padding: '8px' }} item>
          <CardTitle
            content={contentProbability}
            title="Probabilidade"
            image={probabilidadeImage}
            onPress={() => handleNavigate('/probability')}
          />
        </Grid>
        <Grid style={{ padding: '8px' }} item>
          <CardTitle
            content={contentCorrelation}
            title="Correlação e Regressão"
            image={correlacaoImage}
            onPress={() => handleNavigate('/correlation-regression')}
          />
        </Grid>
      </Grid>
    </>
  );
}
