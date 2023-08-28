import React from 'react';
import {SafeAreaView, View} from 'react-native';

import {ReactElement} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {styles} from './container.styles';

interface ContainerProps {
  children: ReactElement | ReactElement[];
  style?: StyleProp<ViewStyle>;
}

export const Container = ({children, style}: ContainerProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[style, styles.container]}>{children}</View>
    </SafeAreaView>
  );
};
