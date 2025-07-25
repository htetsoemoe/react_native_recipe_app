import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { authStyles } from "../../assets/styles/auth.styles";
import { COLORS } from "../../constants/colors";
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from "../../redux/auth/authThunks";
import { selectLoading, selectError } from "../../redux/auth/authSelectors";
import { setError } from '../../redux/auth/authSlice';
import Toast from 'react-native-toast-message';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const router = useRouter();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        Toast.show({
          type: "error",
          text1: "Sign-in failed",
          text2: "Please fill in all fields",
          visibilityTime: 10000,
          position: "bottom",
        });
        return;
      }

      if (!emailRegex.test(email)) {
        Toast.show({
          type: "error",
          text1: "Sign-in failed",
          text2: "Invalid email",
          visibilityTime: 10000,
          position: "bottom",
        });
        return;
      }

      if (password.length < 6) {
        Toast.show({
          type: "error",
          text1: "Sign-up failed",
          text2: "Password must be at least 6 characters",
          visibilityTime: 10000,
          position: "bottom",
        });
        return;
      }

      await dispatch(signIn({ email, password })).unwrap();
      router.push('/(tabs)/');

    } catch (error) {
      // console.log(`Sign-in failed:`, error?.message || error);
      setError(null);
      Toast.show({
        type: "error",
        text1: "Sign-in failed",
        text2: error?.message === "Invalid password" || error === "User not found"
          ? "Email or password is incorrect"
          : error?.message || error,
        visibilityTime: 10000,
        position: "bottom",
      });
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
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i1.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Welcome Back</Text>

          {/* FORM CONTAINER */}
          <View style={authStyles.formContainer}>
            {/* Email Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter email"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* PASSWORD INPUT */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>{loading ? "Signing In..." : "Sign In"}</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.push("/(auth)/SignUp")}
            >
              <Text style={authStyles.linkText}>
                Don&apos;t have an account? <Text style={authStyles.link}>Sign up</Text>
              </Text>
            </TouchableOpacity>

            {/* Error Message */}
            {/* {error && (
              <Text style={authStyles.errorText}>
                {error === "Invalid password" || error === "User not found"
                  ? "Email or password is incorrect"
                  : error
                }
              </Text>
            )} */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SignIn