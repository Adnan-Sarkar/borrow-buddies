import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const getCurrentUserDetails = async (): Promise<UserDetails | null> => {
  try {
    const userJson = await AsyncStorage.getItem("user");

    if (!userJson) {
      return null;
    }

    const user: UserDetails = JSON.parse(userJson);
    return user;
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return null;
  }
};

export const isCurrentUserOwner = async (ownerId: string): Promise<boolean> => {
  try {
    const user = await getCurrentUserDetails();
    return user?.id === ownerId;
  } catch (error) {
    console.error("Error checking if user is owner:", error);
    return false;
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("Error retrieving auth token:", error);
    return null;
  }
};

export default getCurrentUserDetails;
