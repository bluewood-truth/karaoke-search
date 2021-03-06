import styled from 'styled-components';

export const RippleButton = styled.button`
  width: fit-content;
  height: fit-content;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;
  border: none;
  background: none;

  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: var(--radius-full);
    transition-duration: 200ms;
  }

  &::before {
    width: 0;
    height: 0;
    background-color: rgba(0, 0, 0, 0.03);
    transition-property: width, height;
  }

  &::after {
    width: 140%;
    height: 140%;
    transition-property: background-color;
  }

  &:not(:disabled):hover {
    &::before {
      width: 140%;
      height: 140%;
    }
  }

  &:not(:disabled):active {
    &::after {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;
