import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import * as Linking from "expo-linking";

export default function SupportScreen() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubject("");
      setMessage("");
      alert(
        "Your support request has been submitted. We'll get back to you soon."
      );
    }, 1500);
  };

  const handleContactSupport = () => {
    Linking.openURL("mailto:support@borrowbuddies.com");
  };

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
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.supportSection}>
            <View style={styles.supportIntro}>
              <View style={styles.supportIconContainer}>
                <Ionicons
                  name="headset"
                  size={32}
                  color={COLORS.PRIMARY[500]}
                />
              </View>
              <Text style={styles.supportTitle}>How can we help you?</Text>
              <Text style={styles.supportDescription}>
                Our support team is here to assist you with any questions or
                issues you may have with Borrow Buddies.
              </Text>
            </View>

            <View style={styles.formContainer}>
              {/* Subject input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Subject</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Brief description of your issue"
                  value={subject}
                  onChangeText={setSubject}
                  maxLength={100}
                />
              </View>

              {/* Message input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Message</Text>
                <TextInput
                  style={[styles.input, styles.messageInput]}
                  placeholder="Please describe your issue in detail"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  textAlignVertical="top"
                  maxLength={1000}
                />
                <Text style={styles.charCount}>{message.length}/1000</Text>
              </View>

              {/* Submit button */}
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (!subject.trim() || !message.trim()) &&
                    styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!subject.trim() || !message.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit Request</Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Alternative contact methods */}
              <View style={styles.alternativeContact}>
                <Text style={styles.alternativeText}>
                  Need immediate assistance?
                </Text>

                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={handleContactSupport}
                >
                  <Ionicons name="mail" size={20} color={COLORS.PRIMARY[500]} />
                  <Text style={styles.contactButtonText}>
                    Email Support Team
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
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
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: COLORS.NEUTRAL[100],
  },
  activeTab: {
    backgroundColor: COLORS.PRIMARY[500],
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.NEUTRAL[600],
  },
  activeTabText: {
    color: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  supportSection: {
    paddingVertical: 16,
  },
  supportIntro: {
    alignItems: "center",
    marginBottom: 32,
  },
  supportIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.PRIMARY[50],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.NEUTRAL[900],
    marginBottom: 8,
  },
  supportDescription: {
    fontSize: 15,
    textAlign: "center",
    color: COLORS.NEUTRAL[600],
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  formContainer: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.NEUTRAL[800],
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.NEUTRAL[50],
    borderWidth: 1,
    borderColor: COLORS.NEUTRAL[200],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.NEUTRAL[900],
  },
  messageInput: {
    minHeight: 150,
    paddingTop: 12,
  },
  charCount: {
    fontSize: 12,
    color: COLORS.NEUTRAL[500],
    alignSelf: "flex-end",
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: COLORS.PRIMARY[500],
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.NEUTRAL[300],
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.NEUTRAL[200],
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: COLORS.NEUTRAL[500],
  },
  alternativeContact: {
    alignItems: "center",
  },
  alternativeText: {
    fontSize: 15,
    color: COLORS.NEUTRAL[700],
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY[500],
    backgroundColor: COLORS.PRIMARY[50],
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.PRIMARY[500],
    marginLeft: 8,
  },
  faqSection: {
    paddingVertical: 16,
    paddingBottom: 32,
  },
  faqItem: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: COLORS.NEUTRAL[50],
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.NEUTRAL[100],
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.NEUTRAL[100],
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.NEUTRAL[900],
    flex: 1,
    paddingRight: 8,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 12,
  },
  faqAnswerText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.NEUTRAL[700],
  },
  moreHelpButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginTop: 8,
  },
  moreHelpText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.PRIMARY[500],
    marginRight: 6,
  },
});
