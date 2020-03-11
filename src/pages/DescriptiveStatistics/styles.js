import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 600,
    },
    media: {
        height: 140,
    },
    formControl: {
        margin: '24px 0 24px 8px'
    },
}));

export const AvaliationMethod = styled.div`
    padding: 16px 0 16px 0;
`;
