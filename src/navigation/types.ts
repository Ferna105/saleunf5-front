import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

export type RootStackParamList = {
  HomeTabs: NavigatorScreenParams<HomeTabParamList>;
  Login: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
  Home: undefined;
  MatchTabs: undefined;
  Profile: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type HomeTabMatchTabParamList = {
  SearchMatch: undefined;
  CreateMatch: undefined;
};

export type HomeTabSearchTabScreenProps<
  T extends keyof HomeTabMatchTabParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<HomeTabMatchTabParamList, T>,
  BottomTabScreenProps<HomeTabParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
