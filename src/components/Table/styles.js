import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TableRow, TableCell } from '@material-ui/core';

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#5E35B1',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
