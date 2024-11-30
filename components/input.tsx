import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const InputTop: React.FC<InputProps> = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: value || isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, isFocused]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const backgroundColor = isFocused || value ? '#121212' : '#292929';
  const borderColor = isFocused || value ? '#007bff' : '#636363';
  const placeholderColor = isFocused || value ? '#007bff' : '#838383';

  const labelStyle = {
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -9],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 14],
    }),
    color: placeholderColor,
    backgroundColor,
  };

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <Animated.Text style={[styles.label, labelStyle]}>{placeholder}</Animated.Text>
      <TextInput
        style={[styles.input, { color: '#fff' }]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: 'relative',
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
  },
  label: {
    position: 'absolute',
    left: 10,
    paddingHorizontal: 4,
    fontFamily: 'sans-serif',
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
});

export default InputTop;
