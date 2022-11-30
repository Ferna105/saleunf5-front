import React from 'react';
import {View} from 'react-native';

import {ReactElement} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {styles} from './styles';

interface ContainerProps {
  children: ReactElement | ReactElement[];
  style?: StyleProp<ViewStyle>;
}

export const Container = ({children, style}: ContainerProps) => {
  return <View style={[style, styles.container]}>{children}</View>;
};
