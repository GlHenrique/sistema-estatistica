import React, { useRef } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloudUploadRoundedIcon from '@material-ui/icons/CloudUploadRounded';
import { Typography } from '@material-ui/core';
import { Container, Content } from './styles';

export default function Upload(props) {
  const { handleUploadFile } = props;
  const inputElement = useRef(null);
  return (
    <Container>
      <ButtonBase
        focusRipple
        style={{ width: '100%', backgroundColor: '#fff6f6', display: 'block' }}
        onClick={() => inputElement.current.click()}
      >
        <Content>
          <CloudUploadRoundedIcon color="secondary" fontSize="large" />
          <Typography color="textPrimary" variant="body1">
            Click para enviar um arquivo XLSX
          </Typography>
          <input
            hidden
            onChange={handleUploadFile}
            type="file"
            name="upload"
            accept=".xlsx, .xls"
            ref={inputElement}
          />
        </Content>
      </ButtonBase>
    </Container>
  );
}
