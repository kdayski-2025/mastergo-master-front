import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Loader = ({ height, width, color, mb, mt }) => {
  const styles = StyleSheet.create({
    map: {
      height: height || 'auto',
      width: width || 'auto',
      marginBottom: mb || 0,
      marginTop: mt || 0,
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={[styles.map, styles.loading]}>
      <ActivityIndicator size="large" color={color || 'green'} />
    </View>
  );
};

export default Loader;
