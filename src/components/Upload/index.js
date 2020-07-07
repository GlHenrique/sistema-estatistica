import React, { useRef, useCallback } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloudUploadRoundedIcon from '@material-ui/icons/CloudUploadRounded';
import { Typography } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { Container, Content } from './styles';

export default function Upload(props) {
  const { handleUploadFile } = props;
  const inputElement = useRef(null);
  const onDrop = useCallback((acceptedFiles) => {
    handleUploadFile(null, acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Container dragActive={isDragActive} {...getRootProps({})}>
      <ButtonBase
        focusRipple
        style={{ width: '100%', backgroundColor: '#fff6f6', display: 'block' }}
        onClick={() => inputElement.current.click()}
      >
        <Content>
          <CloudUploadRoundedIcon color="primary" fontSize="large" />
          <Typography color="textPrimary" variant="body1">
            Click ou arraste para enviar um arquivo XLSX
          </Typography>
          <input
            {...getInputProps()}
            hidden
            onChange={handleUploadFile}
            type="file"
            name="upload"
            accept=".xlsx"
            ref={inputElement}
          />
        </Content>
      </ButtonBase>
    </Container>
  );
}
