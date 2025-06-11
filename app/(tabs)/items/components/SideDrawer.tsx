import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MenuItemType = {
  icon: string;
  label: string;
  route: string;
  badge?: number;
};

type MenuSectionType = {
  title: string;
  items: MenuItemType[];
};

type SideDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
};

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.8;

const SideDrawer = ({ isVisible, onClose }: SideDrawerProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, slideAnim]);

  const menuSections: MenuSectionType[] = [
    {
      title: "Browse",
      items: [
        {
          icon: "home-outline",
          label: "Home",
          route: "/items",
        },
        {
          icon: "search-outline",
          label: "Explore Items",
          route: "/items/allItems",
        },
        {
          icon: "apps-outline",
          label: "Categories",
          route: "/items/categories",
        },
      ],
    },
    {
      title: "My Items",
      items: [
        {
          icon: "cube-outline",
          label: "My Listings",
          route: "/items/my-items",
        },
      ],
    },
    {
      title: "Requests & Transactions",
      items: [
        {
          icon: "arrow-down-outline",
          label: "Borrowing Requests",
          route: "/items/my-requests",
          badge: 2,
        },
        {
          icon: "arrow-up-outline",
          label: "Lending Requests",
          route: "/items/lend-requests",
          badge: 1,
        },
        {
          icon: "time-outline",
          label: "Transaction History",
          route: "/items/history",
        },
      ],
    },
  ];

  const handleNavigate = (route: string) => {
    onClose();
    router.push(route as any);
  };

  if (!isVisible) return null;

  return (
    <View
      className="absolute inset-0 z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose}>
        <Animated.View
          className="absolute top-0 left-0 bottom-0 bg-white z-50"
          style={[
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              paddingTop:
                insets.top > 0 ? insets.top : StatusBar.currentHeight || 20,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => {
              e.stopPropagation();
            }}
            style={{ flex: 1 }}
          >
            <View className="flex-1">
              {/* Header  */}
              <View className="flex-row items-center justify-between px-5 py-3 border-b border-neutral-100">
                <Text className="text-xl font-bold text-primary-600">
                  Borrow Buddies
                </Text>
                <TouchableOpacity
                  onPress={onClose}
                  hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={COLORS.NEUTRAL[700]}
                  />
                </TouchableOpacity>
              </View>

              {/* Menu sections */}
              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
              >
                {menuSections.map((section, sectionIndex) => (
                  <View
                    key={section.title}
                    className={sectionIndex > 0 ? "mt-5" : "mt-2"}
                  >
                    <Text className="px-5 py-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                      {section.title}
                    </Text>
                    {section.items.map((item) => (
                      <TouchableOpacity
                        key={item.label}
                        className="flex-row items-center py-3.5 px-5 active:bg-neutral-50"
                        onPress={() => handleNavigate(item.route)}
                      >
                        <View className="w-9 h-9 rounded-full bg-primary-50 items-center justify-center">
                          <Ionicons
                            name={item.icon as any}
                            size={22}
                            color={COLORS.PRIMARY[600]}
                          />
                        </View>
                        <Text className="text-neutral-800 font-medium text-base ml-3 flex-1">
                          {item.label}
                        </Text>
                        {item.badge ? (
                          <View className="bg-primary-500 rounded-full min-w-6 h-6 px-1.5 items-center justify-center">
                            <Text className="text-white text-xs font-bold">
                              {item.badge}
                            </Text>
                          </View>
                        ) : (
                          <Ionicons
                            name="chevron-forward"
                            size={18}
                            color={COLORS.NEUTRAL[300]}
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SideDrawer;
