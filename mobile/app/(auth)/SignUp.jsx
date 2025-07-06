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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { authStyles } from "../../assets/styles/auth.styles";
import { COLORS } from "../../constants/colors";
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from "../../redux/auth/authThunks";
import { selectLoading, selectError } from "../../redux/auth/authSelectors";
import { setError, setUser } from '../../redux/auth/authSlice';
import Toast from 'react-native-toast-message';

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const router = useRouter();

  const handleSignUp = async () => {
    // name, username, password, confirmPassword, email
    if (!name || !username || !password || !confirmPassword || !email) {
      Toast.show({
        type: "error",
        text1: "Sign-up failed",
        text2: "Please fill in all fields",
        visibilityTime: 10000,
        position: "bottom",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Sign-up failed",
        text2: "Password and confirm password do not match",
        visibilityTime: 10000,
        position: "bottom",
      });
      return;
    }

    const userInfo = {
      name, username, password, confirmPassword, email
    }

    try {
      Keyboard.dismiss();

      await dispatch(signUp(userInfo)).unwrap();
      router.push("/(auth)/VerifyEmail");
      
    } catch (error) {
      // console.log(`Sign-in failed:`, error);
      // console.log('Caught error:', error);
      // console.log('Error type:', typeof error);
      // console.log('Error message:', error);

      let text2 = '';
      if (typeof error === 'string') {
        text2 = error;
      } else if (error?.message === "Password and confirm password do not match") {
        text2 = "Password and confirm password do not match";
      } else if (error?.message === "Email already taken" || error === "Email already taken") {
        text2 = "Email already taken";
      } else if (error?.message === "Username already taken" || error === "Username already taken") {
        text2 = "Username already taken";
      } else {
        text2 = error?.message || "An unknown error occurred";
      }

      Toast.show({
        type: "error",
        text1: "Sign-up failed",
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
          <View style={authStyles.signUpImageContainer}>
            <Image
              source={require("../../assets/images/i2.png")}
              style={authStyles.signUpImage}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Create Account</Text>

          {/* FORM CONTAINER */}
          <View style={authStyles.formContainer}>
            {/* Name Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter name"
                placeholderTextColor={COLORS.textLight}
                value={name}
                onChangeText={setName}
                keyboardType="name-phone-pad"
                autoCapitalize="none"
              />
            </View>

            {/* Username Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter username"
                placeholderTextColor={COLORS.textLight}
                value={username}
                onChangeText={setUsername}
                keyboardType="name-phone-pad"
                autoCapitalize="none"
              />
            </View>

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

            {/* CONFIRM PASSWORD INPUT */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter confirm password"
                placeholderTextColor={COLORS.textLight}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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
              onPress={handleSignUp}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>{loading ? "Signing Up..." : "Sign Up"}</Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.push("/(auth)/SignIn")}
            >
              <Text style={authStyles.linkText}>
                Already have an account? <Text style={authStyles.link}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SignUp