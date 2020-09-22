import styled from 'styled-components';
import media from 'lib/MediaQuery';

const FileAttatch = styled.label`
  cursor: pointer;
  &: hover {
    color: #007bff;
  }
  ${media.phone`
    position: absolute;
    right: 52px;
    z-index: 3;
  `}
`;

export default FileAttatch;
