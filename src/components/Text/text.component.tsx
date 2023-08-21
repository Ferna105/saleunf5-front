import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Text as TextBase, TextProps} from 'react-native';

export const Text = ({style, ...props}: TextProps) => {
  const {colors} = useTheme();

  return <TextBase {...props} style={[style, {color: colors.text}]} />;
};
