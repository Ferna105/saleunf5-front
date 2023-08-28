import React from 'react';
import {IconProps} from './icon.interfaces';
import {Text} from 'components/Text/text.component';
import {View, ViewProps} from 'react-native';

export const Icon = ({name, ...props}: ViewProps & IconProps) => {
  return (
    <View {...props}>
      <Text color="background">{name}</Text>
    </View>
  );
};
