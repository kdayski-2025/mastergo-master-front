import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgBaloon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#A5AFD4"
      d="M12.333 4A5.34 5.34 0 0 0 7 9.333c0 .883.22 1.758.64 2.535l4.402 7.96a.333.333 0 0 0 .583 0l4.403-7.963c.418-.774.639-1.649.639-2.532A5.34 5.34 0 0 0 12.333 4Zm0 8a2.67 2.67 0 0 1-2.666-2.667 2.67 2.67 0 0 1 2.666-2.666A2.67 2.67 0 0 1 15 9.333 2.67 2.67 0 0 1 12.333 12Z"
    />
  </Svg>
);
export default SvgBaloon;
