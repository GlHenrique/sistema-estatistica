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

    const { variableValues } = props;
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

    for (let i of variableValues) {
        rows.push(createData([i]))
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
                    {rows.map(row => (
                        <StyledTableRow key={row.variableName}>
                            <StyledTableCell component="th" scope="row">
                                {row.variableName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.simpleFrequency}</StyledTableCell>
                            <StyledTableCell align="right">{row.relativeFrequency}</StyledTableCell>
                            <StyledTableCell align="right">{row.accumulatedFrequency}</StyledTableCell>
                            <StyledTableCell align="right">{row.accumulatedPercentageFrequency}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
