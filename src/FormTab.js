// FormTab.js
import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-left: 270px;
  padding: 20px;
  width: calc(100% - 270px);
`;

const FormTab = ({ children }) => {
  return (
    <FormContainer>
      <h2>Personal</h2>
      {children}
    </FormContainer>
  );
};

export default FormTab;
