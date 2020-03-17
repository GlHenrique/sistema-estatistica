import React from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, } from "@material-ui/core";
import { StyledTableCell, StyledTableRow, useStyles, } from './styles';
import { accumulate } from '../../utils/accumulator';

export default function TableComponent(props) {

    const { variableValues, variableName, total } = props;
    const classes = useStyles();

    const rows = [];

    function createData(
        variableName,
        simpleFrequency,
        relativeFrequency,
        accumulatedFrequency,
        accumulatedPercentageFrequency) {
        return {
            variableName,
            simpleFrequency,
            relativeFrequency,
            accumulatedFrequency,
            accumulatedPercentageFrequency
        };
    }

    const simpleFrequency = variableValues.reduce((age, count) => {
        if (!age[count]) {
            age[count] = 1;
        } else {
            age[count]++;
        }
        return age;

    }, {});

    const tableRow = Object.getOwnPropertyNames(simpleFrequency);

    let simpleFrequencyValues = Object.values(simpleFrequency);
    let accumulatedFrequence = simpleFrequencyValues;

    simpleFrequencyValues = simpleFrequencyValues.map(item => {
        return Number(item / total * 100).toFixed(2);
    });

    simpleFrequencyValues = simpleFrequencyValues.map(item => {
        item = Number(item);
        let parseItem = Math.trunc(item);
        let floatItem = Number((item - parseItem).toFixed(2));
        if (floatItem >= 0.5) {
            return parseItem + 1;
        }
        return parseItem // Relative Frequency
    });

    for (let i of tableRow) {
        rows.push(createData([i], simpleFrequency[i]))
    }

    for (let i = 0; i < simpleFrequencyValues.length; i++) {
        rows[i].relativeFrequency = simpleFrequencyValues[i];
    }

    accumulatedFrequence = accumulate(accumulatedFrequence);
    let accumulatedPercentageFrequency = accumulate(simpleFrequencyValues);

    for (let i = 0; i < rows.length; i++) {
        rows[i].accumulatedFrequency = accumulatedFrequence[i];
        rows[i].accumulatedPercentageFrequency = accumulatedPercentageFrequency[i];
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>{variableName}</StyledTableCell>
                        <StyledTableCell align="right">Frequência simples</StyledTableCell>
                        <StyledTableCell align="right">Frequência relativa</StyledTableCell>
                        <StyledTableCell align="right">Frequência acumulada</StyledTableCell>
                        <StyledTableCell align="right">Frequência acumulada percentual</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {row.variableName}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.simpleFrequency}</StyledTableCell>
                            <StyledTableCell align="center">{row.relativeFrequency}%</StyledTableCell>
                            <StyledTableCell align="center">{row.accumulatedFrequency}</StyledTableCell>
                            <StyledTableCell align="center">{row.accumulatedPercentageFrequency}%</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            Total: {total}
                        </StyledTableCell>
                        <StyledTableCell align="right" />
                        <StyledTableCell align="right" />
                        <StyledTableCell align="right" />
                        <StyledTableCell align="right" />
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
