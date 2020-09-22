import styled from 'styled-components';
import media from 'lib/MediaQuery';

const SendButton = styled.div`
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background-color: #007bff;
  padding: 7px;
  margin: 0 10px;
  cursor: pointer;
  ${media.phone`
    width: 27px;
    height: 24px;
    padding: 7px;
    margin: 0px;
  `}
`;

export default SendButton;
