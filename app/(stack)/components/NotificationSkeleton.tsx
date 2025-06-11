import React, { useEffect } from "react";
import { View, Animated, Easing, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const NotificationSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
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
        width,
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

  const renderSkeletonItem = () => (
    <View className="p-4 border-b border-neutral-100">
      <View className="flex-row">
        {/* Profile picture / avatar area */}
        {getShimmerElement(40, 40, 20)}

        <View className="flex-1 ml-3">
          {/* Notification body text - multiple lines */}
          {getShimmerElement(width * 0.8, 16)}
          <View className="h-2" />
          {getShimmerElement(width * 0.9, 16)}
          <View className="h-2" />

          {/* Timestamp */}
          <View className="h-3" />
          {getShimmerElement(80, 12)}
        </View>
      </View>
    </View>
  );

  return (
    <View className="bg-white">
      {Array.from({ length: count }).map((_, index) => (
        <View key={`skeleton-${index}`}>{renderSkeletonItem()}</View>
      ))}
    </View>
  );
};

export default NotificationSkeleton;
