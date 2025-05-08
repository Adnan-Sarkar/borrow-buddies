import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const [locationSharing, setLocationSharing] = React.useState(true);
  const [activityStatus, setActivityStatus] = React.useState(true);
  const [dataCollection, setDataCollection] = React.useState(true);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.NEUTRAL[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Security</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Location Sharing</Text>
              <Text style={styles.settingDescription}>
                Allow other users to see your approximate location
              </Text>
            </View>
            <Switch
              value={locationSharing}
              onValueChange={setLocationSharing}
              trackColor={{
                false: COLORS.NEUTRAL[300],
                true: COLORS.PRIMARY[300],
              }}
              thumbColor={
                locationSharing ? COLORS.PRIMARY[500] : COLORS.NEUTRAL[100]
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Activity Status</Text>
              <Text style={styles.settingDescription}>
                Show when you were last active on the app
              </Text>
            </View>
            <Switch
              value={activityStatus}
              onValueChange={setActivityStatus}
              trackColor={{
                false: COLORS.NEUTRAL[300],
                true: COLORS.PRIMARY[300],
              }}
              thumbColor={
                activityStatus ? COLORS.PRIMARY[500] : COLORS.NEUTRAL[100]
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Data Collection</Text>
              <Text style={styles.settingDescription}>
                Help improve Borrow Buddies with usage data
              </Text>
            </View>
            <Switch
              value={dataCollection}
              onValueChange={setDataCollection}
              trackColor={{
                false: COLORS.NEUTRAL[300],
                true: COLORS.PRIMARY[300],
              }}
              thumbColor={
                dataCollection ? COLORS.PRIMARY[500] : COLORS.NEUTRAL[100]
              }
            />
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              router.push({
                pathname: "/profile/edit",
                params: { scrollTo: "password" },
              });
            }}
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="lock-closed"
                size={20}
                color={COLORS.PRIMARY[500]}
              />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Change Password</Text>
              <Text style={styles.actionDescription}>
                Update your account password
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.NEUTRAL[400]}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIcon}>
              <Ionicons
                name="phone-portrait"
                size={20}
                color={COLORS.PRIMARY[500]}
              />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Two-Factor Authentication</Text>
              <Text style={styles.actionDescription}>
                Add an extra layer of security
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.NEUTRAL[400]}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIcon}>
              <Ionicons name="list" size={20} color={COLORS.PRIMARY[500]} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Login Activity</Text>
              <Text style={styles.actionDescription}>
                Review your recent logins
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.NEUTRAL[400]}
            />
          </TouchableOpacity>
        </View>

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Data</Text>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIcon}>
              <Ionicons name="download" size={20} color={COLORS.PRIMARY[500]} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Download Your Data</Text>
              <Text style={styles.actionDescription}>
                Get a copy of your Borrow Buddies data
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.NEUTRAL[400]}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionItem, styles.dangerItem]}>
            <View style={[styles.actionIcon, styles.dangerIcon]}>
              <Ionicons name="trash" size={20} color={COLORS.ERROR[500]} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={[styles.actionTitle, styles.dangerText]}>
                Delete Account
              </Text>
              <Text style={styles.actionDescription}>
                Permanently delete your account and data
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.NEUTRAL[400]}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.NEUTRAL[200],
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.NEUTRAL[900],
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.NEUTRAL[900],
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.NEUTRAL[100],
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.NEUTRAL[900],
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: COLORS.NEUTRAL[600],
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.NEUTRAL[100],
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY[50],
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.NEUTRAL[900],
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: COLORS.NEUTRAL[600],
  },
  dangerItem: {
    marginTop: 8,
  },
  dangerIcon: {
    backgroundColor: COLORS.ERROR[50],
  },
  dangerText: {
    color: COLORS.ERROR[500],
  },
});
