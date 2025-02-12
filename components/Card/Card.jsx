import React from 'react';
import { Pressable, Text } from 'react-native';

import { styles } from './styled';

export default function Card({ children, ...props }) {
  return (
    <Pressable style={styles.card} {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          style: [styles[child.props.type], child.props.style],
        })
      )}
    </Pressable>
  );
}
