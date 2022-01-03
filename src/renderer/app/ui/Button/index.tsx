import styled from '@emotion/styled';

export const Button = styled.button`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  box-sizing: border-box;
  padding: 0 16px;
  border-style: none;
  margin: 0;
  background-color: #ea4c89;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 10px;
  list-style: none;
  outline: none;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: color 100ms;
  user-select: none;
  vertical-align: baseline;

  :hover,
  :focus {
    background-color: #f082ac;
  }
`;

Button.defaultProps = { type: 'button' };
