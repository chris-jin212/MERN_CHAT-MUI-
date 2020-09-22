import styled from 'styled-components';

const PanelTitle = styled.span`
  font-family: Archivo, sans-serif;
  font-size: ${props => props.size}rem;
  font-weight: ${props => (props.weight ? props.weight : 300)};
  text-transform: ${props => (props.transform ? props.transform : 'none')};
  padding: ${props => (props.py ? `${props.py}rem` : `0rem`)}
    ${props => (props.px ? `${props.px}rem` : `0rem`)};
`;

export default PanelTitle;
