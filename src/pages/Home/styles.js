import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import background from '../../assets/images/lightPurpleHeader.svg';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  cardWidth: {
    maxWidth: 430,
  },
}));

export const Background = styled.div`
  background-image: url(${background});
  background-size: contain;
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
`;
