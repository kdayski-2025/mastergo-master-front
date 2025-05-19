import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import styles from './styled';

const Container = ({ children, pt, pb, pr, pl, safe, bgColor }) => {
  return safe ? (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: pt ? pt : 20,
          paddingBottom: pb ? pb : 0,
          paddingRight: pr ? pr : 15,
          paddingLeft: pl ? pl : 15,
          backgroundColor: bgColor ? bgColor : 'transparent',
        },
      ]}
    >
      {children}
    </SafeAreaView>
  ) : (
    <View
      style={[
        styles.container,
        {
          paddingTop: pt ? pt : 20,
          paddingBottom: pb ? pb : 0,
          paddingRight: pr ? pr : 15,
          paddingLeft: pl ? pl : 15,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default Container;
