import React, { useState } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { authStyles } from "../../assets/styles/auth.styles";
import { COLORS } from "../../constants/colors";
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectError } from "../../redux/auth/authSelectors";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../common/commons';
import { setError, setUser } from '../../redux/auth/authSlice';
import { verifyOTP } from "../../redux/auth/authThunks";

const VerifyEmail = () => {
  const router = useRouter()
  const [code, setCode] = useState("")
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();


  const handleVerification = async () => {
    try {
      if (!code) {
        Toast.show({
          type: "error",
          text1: "Verification failed",
          text2: "Please enter a code",
          visibilityTime: 10000,
          position: "bottom",
        });
        return;
      }

      Keyboard.dismiss();
      // Unwrap the promise to get the result, 
      // always need to check your thunk to return the needed values, so that unwrap() gets a defined result
      await dispatch(verifyOTP(code)).unwrap(); 
      router.push("/(tabs)/");

    } catch (error) {
      // console.log('Caught error:', error?.message || error);
      // console.log('Error type:', typeof error);
      // console.log('Error message:', error)
      // console.log(`isTrue: ${error === "Invalid OTP"}`);

      let text2 = '';
      if (typeof error === 'string') {
        text2 = error;
      } else if (error?.message === "Invalid OTP") {
        text2 = "Invalid OTP";
      } else if (error?.message === "OTP expired" || error === "OTP expired") {
        text2 = "OTP expired";
      }  else {
        text2 = error?.message || "An unknown error occurred";
      }

      Toast.show({
        type: "error",
        text1: "Verification failed",
        text2: text2,
        visibilityTime: 10000,
        position: "bottom",
      });
      setError(null);
    }
  }

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Container */}
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i3.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          {/* Title */}
          <Text style={authStyles.title}>Verify Your Email</Text>
          <Text style={authStyles.subtitle}>We&apos;ve sent a verification code to email</Text>

          <View style={authStyles.formContainer}>
            {/* Verification Code Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter verification code"
                placeholderTextColor={COLORS.textLight}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleVerification}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>{loading ? "Verifying..." : "Verify Email"}</Text>
            </TouchableOpacity>

            {/* Back to Sign Up */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.push("/(auth)/SignUp")}
            >
              <Text style={authStyles.linkText}>
                <Text style={authStyles.link}>Back to Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default VerifyEmail