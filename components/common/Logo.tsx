import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Logo = () => {
  return (
    <View className="flex-row items-center">
      <View className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-lg items-center justify-center mr-3">
        <FontAwesome5 name="hands-helping" size={18} color="white" />
      </View>
      <Text className="text-xl font-bold text-white">BorrowBuddies</Text>
    </View>
  );
};

export default Logo;
