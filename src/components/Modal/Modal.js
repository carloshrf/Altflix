import styled, { css } from 'styled-components';

const Modal = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  color: black;

  ${({ show }) => {
    if (show) {
      return css`
        transform: translateY(0);
        opacity: 1;
      `;
    }

    return css`
        transform: translateY(-100vh);
        opacity: 0;
      `;
  }}
`;

export default Modal;
