import React, { useEffect } from "react";
import { View, Animated, Easing, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const PostSkeleton: React.FC = () => {
  const shimmerAnimation = new Animated.Value(0);

  useEffect(() => {
    const loopAnimation = Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );

    loopAnimation.start();

    return () => loopAnimation.stop();
  }, []);

  const shimmerTranslate = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const getShimmerElement = (
    width: number,
    height: number,
    radius: number = 4
  ) => (
    <View
      className="overflow-hidden bg-neutral-100"
      style={{
        width: width,
        height,
        borderRadius: radius,
      }}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.5)",
          transform: [{ translateX: shimmerTranslate }],
        }}
      />
    </View>
  );

  return (
    <View className="bg-white mb-4 mx-5 rounded-xl overflow-hidden border border-neutral-100">
      <View className="p-4">
        {/* Author section */}
        <View className="flex-row items-center mb-3.5">
          {getShimmerElement(40, 40, 20)}
          <View className="ml-3 flex-1">
            {getShimmerElement(120, 16)}
            <View className="h-2" />
            {getShimmerElement(80, 12)}
          </View>
        </View>

        {/* Content */}
        <View>
          {getShimmerElement(320, 22)}
          <View className="h-3" />
          {getShimmerElement(320, 14)}
          <View className="h-2" />
          {getShimmerElement(320, 14)}
          <View className="h-2" />
          {getShimmerElement(150, 14)}
          <View className="h-3" />
        </View>

        {/* Interaction footer */}
        <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-neutral-100">
          <View className="flex-row items-center">
            {/* Like button */}
            <View className="flex-row items-center mr-4">
              {getShimmerElement(20, 20, 10)}
              <View className="w-1.5" />
              {getShimmerElement(30, 16)}
            </View>

            {/* Comment count */}
            <View className="flex-row items-center">
              {getShimmerElement(18, 18, 9)}
              <View className="w-1.5" />
              {getShimmerElement(25, 16)}
            </View>
          </View>

          {/* View details button */}
          {getShimmerElement(100, 30, 15)}
        </View>
      </View>
    </View>
  );
};

export default PostSkeleton;
