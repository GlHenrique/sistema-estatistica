import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5E35B1',
    },
    secondary: {
      main: '#2E7D32',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
