import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow, useStyles } from "./styles";
import { accumulate } from "../../utils/accumulator";

export default function TableComponent(props) {
  const { variableValues, variableName, total, isContinue } = props;
  const classes = useStyles();

  let rows = [];

  function createData(
    variableName,
    simpleFrequency,
    relativeFrequency,
    accumulatedFrequency,
    accumulatedPercentageFrequency
  ) {
    return {
      variableName,
      simpleFrequency,
      relativeFrequency,
      accumulatedFrequency,
      accumulatedPercentageFrequency
    };
  }

  if (isContinue) {
    let amplitude =
      variableValues[variableValues.length - 1] - variableValues[0] + 1;
    const k = parseInt(Math.sqrt(total));
    const previousK = k - 1;
    const successor = k + 1;
    const arrayK = [previousK, k, successor];
    let interval;
    let linesCount;

    for (let i = 0; i < arrayK.length; i++) {
      if (amplitude % arrayK[0] === 0) {
        linesCount = arrayK[0];
        interval = amplitude / arrayK[0];
        break;
      } else if (amplitude % arrayK[1] === 0) {
        interval = amplitude / arrayK[1];
        linesCount = arrayK[1];
        break;
      } else if (amplitude % arrayK[2] === 0) {
        linesCount = arrayK[2];
        interval = amplitude / arrayK[2];
        break;
      } else {
        amplitude++;
        i = 0;
      }
    }

    let minValue = variableValues[0] + interval;
    let breakPoints = [minValue];

    for (let i = 0; i < linesCount; i++) {
      // rows.push(variableValues.filter(value => {return value < minValue}));
      // rows.push([]);
      minValue += interval;
      if (breakPoints.length <= linesCount - 1) {
        breakPoints.push(minValue);
      }
    }

    const filtredValues = [];
    var j = 0;
    for (let i of breakPoints) {
      filtredValues.push(variableValues.filter(value => value < i));
      variableValues.splice(0, filtredValues[j].length);
      j++;
    }

    for (let i = 0; i < filtredValues.length; i++) {
      // rows[i].variableValues = i
      if (i === 0) {
        rows.push(createData(`${filtredValues[i][0]} - ${breakPoints[i]}`));
      } else {
        rows.push(createData(`${breakPoints[i - 1]} - ${breakPoints[i]}`));
      }
      rows[i].simpleFrequency = filtredValues[i].length // Show simple Frequency
      rows[i].relativeFrequency = (filtredValues[i].length / total) * 100;
      if (i === 0) {
        rows[i].accumulatedFrequency = rows[i].simpleFrequency; // Startpoint of accumulator
        rows[i].accumulatedPercentageFrequency = rows[i].relativeFrequency;
      } else {
        rows[i].accumulatedFrequency = rows[i - 1].accumulatedFrequency + rows[i].simpleFrequency;
        rows[i].accumulatedPercentageFrequency = rows[i - 1].accumulatedPercentageFrequency + rows[i].relativeFrequency;
      }
    }

  } else {
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
      return Number((item / total) * 100).toFixed(2);
    });

    simpleFrequencyValues = simpleFrequencyValues.map(item => {
      item = Number(item);
      let parseItem = Math.trunc(item);
      let floatItem = Number((item - parseItem).toFixed(2));
      if (floatItem >= 0.5) {
        return parseItem + 1;
      }
      return parseItem; // Relative Frequency
    });

    for (let i of tableRow) {
      rows.push(createData([i], simpleFrequency[i]));
    }

    for (let i = 0; i < simpleFrequencyValues.length; i++) {
      rows[i].relativeFrequency = simpleFrequencyValues[i];
    }

    accumulatedFrequence = accumulate(accumulatedFrequence);
    let accumulatedPercentageFrequency = accumulate(simpleFrequencyValues);
    

    for (let i = 0; i < rows.length; i++) {
      rows[i].accumulatedFrequency = accumulatedFrequence[i];
      rows[i].accumulatedPercentageFrequency =
        accumulatedPercentageFrequency[i];
      if (rows[i].accumulatedPercentageFrequency > 100) {
        rows[i].accumulatedPercentageFrequency = 100;
      }
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{variableName}</StyledTableCell>
            <StyledTableCell align="right">Frequência simples</StyledTableCell>
            <StyledTableCell align="right">Frequência relativa</StyledTableCell>
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
