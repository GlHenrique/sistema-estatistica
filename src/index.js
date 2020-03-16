import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#5E35B1'
            },
            secondary: {
                main: '#2E7D32'
            }
        }
    },
);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App/>
    </ThemeProvider>
    , document.getElementById("root")
);
