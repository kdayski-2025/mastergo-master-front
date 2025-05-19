import React, { useEffect, useState, useRef } from 'react';
import { Text, View } from 'react-native';
import styles from '../styled';
import useNeural from '../../../hooks/useNeural';

export default function TypingIndicator(props) {
  const { typing } = useNeural();
  const [dots, setDots] = useState('');
  const animationRef = useRef(null);

  useEffect(() => {
    let count = 0;
    animationRef.current = setInterval(() => {
      count = (count + 1) % 4;
      setDots('.'.repeat(count));
    }, 500);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  if (props.typing || typing)
    return (
      <View style={styles.connectionStatus}>
        <Text style={styles.connectionStatusText}>Печатает{dots}</Text>
      </View>
    );
  else return null;
}
