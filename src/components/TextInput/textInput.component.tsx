import React from 'react';
import {TextInput as TextInputBase, TextInputProps, View} from 'react-native';
import {useStyles} from './textInput.styles';

export const TextInput = ({style, ...props}: TextInputProps) => {
  const {styles} = useStyles();

  return (
    <View style={styles.textInputContainer}>
      <TextInputBase {...props} style={[style, styles.textInput]} />
    </View>
  );
};
