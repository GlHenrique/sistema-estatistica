import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  border: 1px dashed;
  border-radius: 4px;
  border-color: ${(props) => (props.dragActive ? '#2E7D32' : '#E91E63')};
  width: 100%;
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const Content = styled.div`
  display: block;
  padding: 8px;
`;

export const ListFile = styled.div`
  border-bottom: 1px dashed #515151;
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;

export const TextFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TextFile = styled.p`
  color: black;
  font-size: 14px;
`;
