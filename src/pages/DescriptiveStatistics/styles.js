import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  media: {
    height: 140,
  },
  formControl: {
    marginTop: '8px',
  },
  cardSize: {
    width: '100%',
    maxWidth: '600px',
  },
  cardActions: {
    padding: 0,
    marginTop: 16,
  },
}));

export const GridItem = styled(Grid)`
  max-width: 100%;
  margin: 32px 0 32px 64px;
  @media (max-width: 600px) {
    margin: 0;
  }
`;

export const FabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 60px;
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 2;
  @media (max-width: 600px) {
    right: 10px;
    bottom: 10px;
  }
`;

export const SelectContainer = styled.div`
  margin: 8px 0 8px 0;
`;

export const SliderContainer = styled.div`
  margin: 32px 8px;
`;
