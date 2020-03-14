import React from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Paper,

} from "@material-ui/core";
import {
    StyledTableCell,
    StyledTableRow,
    useStyles,
} from './styles';

export default function TableComponent(props) {

    const {variableValues} = props;
    const classes = useStyles();

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

    const rows = [
        // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        // createData('Eclair', 262, 16.0, 24, 6.0),
        // createData('Cupcake', 305, 3.7, 67, 4.3),
        // createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    const simpleFrequency = variableValues.reduce((age, count) => {
        if (!age[count]) {
            age[count] = 1;
        } else {
            age[count]++;
        }
        return age;

    }, {})

    const tableRow = Object.getOwnPropertyNames(simpleFrequency);

    let simpleFrequencyValues = Object.values(simpleFrequency);

    // let relativeFrequency = simpleFrequencyValues[i];
    // console.log(relativeFrequency);


    // console.log(simpleFrequency)

    for (let i in simpleFrequency) {
        // console.log(i); // Para calcular Frequencia Relativa: FreSimples / Total
        // console.log(simpleFrequencyValues[i])
    }

    simpleFrequencyValues = simpleFrequencyValues.map(item => {
        let result = Number(item / props.total * 100).toFixed(2);
        return result
    });

    simpleFrequencyValues = simpleFrequencyValues.map(item => {
        item = Number(item);
        let parseItem = Math.trunc(item);
        let floatItem = Number((item - parseItem).toFixed(2));
        if (floatItem >= 0.5) {
            return parseItem + 1;
        }
        return parseItem // Frequencia simples
    });

    // TODO Show Relative Frequency, on table,
    // TODO and show accumulated frequency

    for (let i of tableRow) {
        console.log(i);
        rows.push(createData([i], simpleFrequency[i], simpleFrequencyValues[i]))
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>{props.variableName}</StyledTableCell>
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
                            <StyledTableCell align="right">{row.simpleFrequency}</StyledTableCell>
                            <StyledTableCell align="right">{row.relativeFrequency}</StyledTableCell>
                            <StyledTableCell align="right">{row.accumulatedFrequency}</StyledTableCell>
                            <StyledTableCell align="right">{row.accumulatedPercentageFrequency}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            Total: {props.total}
                        </StyledTableCell>
                        <StyledTableCell align="right"/>
                        <StyledTableCell align="right"/>
                        <StyledTableCell align="right"/>
                        <StyledTableCell align="right"/>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
