import React from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';
import { GridItem } from '../../pages/DescriptiveStatistics/styles';
import PieChart from '../PieChart';
import BarChat from '../BarChart';
import BarSydeBarChart from '../BarSydeByBarChat';
import capitalize from '../../utils/capitalize';

export default function TableComponent(props) {
  const {
    total,
    method,
    analyze,
    rows,
    media,
    moda,
    mediana,
    desvioPadrao,
    variancia,
    medidaSeparatriz,
  } = props;
  const classes = useStyles();
  let { variableName } = props;
  variableName = capitalize(variableName);

  return (
    <>
      <GridItem item>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <caption>
              Dados coletados através de{' '}
              {method === 'population' ? 'população' : 'amostra'} <br />
              Total: {total} <br />
              Média: {media} <br />
              Moda: {moda} <br />
              Mediana: {mediana} <br />
              Desvio padrão: {desvioPadrao || 'Não possui'} <br />
              Variância: {variancia || 'Não possui'} <br />
              Medida Separatriz: {medidaSeparatriz}
            </caption>
            <TableHead>
              <TableRow>
                <StyledTableCell>{variableName}</StyledTableCell>
                <StyledTableCell align="right">
                  Frequência simples
                </StyledTableCell>
                <StyledTableCell align="right">
                  Frequência relativa
                </StyledTableCell>
                <StyledTableCell align="right">
                  Frequência acumulada
                </StyledTableCell>
                <StyledTableCell align="right">
                  Frequência acumulada percentual
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.variableName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.simpleFrequency}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.relativeFrequency}%
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.accumulatedFrequency}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.accumulatedPercentageFrequency}%
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </GridItem>
      {analyze === 'qualitative' && (
        <Grid style={{ margin: 16, width: '100%', maxWidth: 1500 }}>
          <PieChart title={variableName} content={rows} />
        </Grid>
      )}
      {analyze === 'discreteQuantitative' && (
        <Grid style={{ margin: 16, width: '100%', maxWidth: 1500 }}>
          <BarChat title={variableName} content={rows} />
        </Grid>
      )}
      {analyze === 'continueQuantitative' && (
        <Grid style={{ margin: 16, width: '100%', maxWidth: 1500 }}>
          <BarSydeBarChart title={variableName} content={rows} />
        </Grid>
      )}
    </>
  );
}
