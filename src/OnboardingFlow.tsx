import React, { useMemo, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const sample = [
  {
    title: "Title One",
    description: "Description One",
    img: "/assets/expo_logo.png",
  },
  {
    title: "Title Two",
    description: "Description Two",
    img: "/assets/expo_logo.png",
  },
  {
    title: "Title Three",
    description: "Description Three",
    img: "/assets/expo_logo.png",
  },
  {
    title: "Title Four",
    description: "Description Four",
    img: "/assets/expo_logo.png",
  },
];

const OnboardingFlow = (props: any) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View>
        <Screen data={sample} />
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const Screen = ({ data }: { data: Array<Object> }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../assets/expo_logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  img: {
    width: 200,
    height: 200,
  },
});

export default React.memo(OnboardingFlow);
