import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#373737"
      d="M14.75 6.247A.86.86 0 0 0 14.142 6a.875.875 0 0 0-.609.247l-3.925 3.831a.86.86 0 0 1-.608.248.877.877 0 0 1-.609-.248l-3.925-3.83A.858.858 0 0 0 3.857 6a.875.875 0 0 0-.608.247.826.826 0 0 0 0 1.18l3.934 3.84C7.665 11.736 8.318 12 9 12c.68 0 1.334-.264 1.816-.734l3.934-3.84a.826.826 0 0 0 0-1.179Z"
    />
  </Svg>
);
export default SvgComponent;
