import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    media: {
        height: 140,
    },
    formControl: {
        margin: '24px 0 24px 0px'
    },
    cardSize: {
        width: '100%',
        maxWidth: '600px'
    },
    cardActions: {
        padding: 0
    }
}));

export const GridItem = styled(Grid)`
  max-width: 100%;
  margin: 32px 0 32px 64px;
  @media(max-width: 600px) {
  margin: 0;
  }
`;
