import React from 'react';
import { Pressable, View } from 'react-native';
import RightArrow from '../../assets/icons/right-arrow.svg';
import styles from './styled';

export default function Card({ children, state, ...props }) {
  return (
    <Pressable style={[styles.card, styles[state]]} {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          style: [styles[child.props.type], child.props.style],
        })
      )}
      {state === 'target' && (
        <View style={styles.navigate}>
          <RightArrow />
        </View>
      )}
    </Pressable>
  );
}
