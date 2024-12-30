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
  Extrapolation,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const _indicatorSize = 4;
const _spacing = 14;
const _buttonSize = 64;

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
      <AnimatedFlatList
        data={sample}
        renderItem={({ item, index }) => <Screen item={item} index={index} />}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        bounces={false}
        horizontal
      />
    </GestureHandlerRootView>
  );
};

const Screen = ({ item, index }: { item: any; index: number }) => {
  //* Build Zoom Animation
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.x;
  });
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(scrollY.value, [0, width], [1, 0.5]) }],
    };
  });

  return (
    <Animated.View style={[styles.container, stylez]}>
      <Image style={styles.img} source={require("../assets/expo_logo.png")} />
      <Pagination data={sample} scrollY={scrollY} />
      <Text>{item.title}</Text>
    </Animated.View>
  );
};

const PaginationDot = ({ scrollY, index }: { scrollY: any; index: number }) => {
  const stylez = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [_indicatorSize, _indicatorSize * 6, _indicatorSize],
        Extrapolation.CLAMP
      ),
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: _indicatorSize,
          height: _indicatorSize,
          borderRadius: _indicatorSize / 2,
          backgroundColor: "black",
          marginBottom: _indicatorSize / 2,
        },
        stylez,
      ]}
    />
  );
};

const Pagination = ({
  data,
  scrollY,
}: {
  data: Array<Object>;
  scrollY?: any;
}) => {
  return (
    <View style={{ position: "absolute", left: _spacing }}>
      {data.map((_, index) => (
        <PaginationDot index={index} scrollY={scrollY} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
  },
  img: {
    width: 200,
    height: 200,
  },
});

export default React.memo(OnboardingFlow);
