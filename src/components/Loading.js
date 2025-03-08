import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loading = ({isVisible}) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default Loading;
