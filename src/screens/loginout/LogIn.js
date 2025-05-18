import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../stysles/theme";

const FloatingInput = ({ type = "text", label, value, onChange, required = false, secureTextEntry = false, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={label}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholderTextColor={COLORS.gray}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
};

const LoginScreen = () => {
  const { login, loginWithGoogle, resetPassword, user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const userData = await login(username, password);
    console.log("Login response:", userData);
    if (userData && userData.roles) {
      console.log("Phân quyền thành công, điều hướng đến:", userData.roles.includes("ADMIN") ? "Admin" : "Customer");
      if (userData.roles.includes("ADMIN") || userData.roles.includes("ROLE_ADMIN")) {
        navigation.navigate("Admin");
      } else {
        navigation.navigate("Customer");
      }
    } else {
      console.log("User hoặc roles không hợp lệ:", userData);
    }
  } catch (err) {
    console.error("LoginForm - Lỗi đăng nhập:", err);
    setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await loginWithGoogle();
      console.log("LoginForm - Đăng nhập Google thành công:", response);
    } catch (error) {
      console.error("LoginForm - Lỗi đăng nhập Google:", error.response?.data || error.message);
      setError("Đăng nhập Google thất bại: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");
    setLoading(true);

    try {
      await resetPassword(resetEmail);
      setResetMessage("Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư của bạn.");
      setResetEmail("");
      setTimeout(() => setShowResetPassword(false), 3000);
    } catch (error) {
      console.error("LoginForm - Lỗi đặt lại mật khẩu:", error);
      setError(error.message || "Gửi email đặt lại mật khẩu thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("LoginForm - Đối tượng người dùng:", user);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image source={require("../../img/logoDTC.png")} style={styles.logo} />
      <Text style={styles.title}>{showResetPassword ? "Quên mật khẩu" : "Đăng nhập"}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {resetMessage ? <Text style={styles.success}>{resetMessage}</Text> : null}

      {!showResetPassword ? (
        <>
          <FloatingInput
            value={username}
            onChange={setUsername}
            label="Tên đăng nhập"
            required
          />
          <View style={styles.inputContainer}>
            <FloatingInput
              value={password}
              onChange={setPassword}
              label="Mật khẩu"
              required
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "eye" : "eye-slash"}
                size={20}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkboxWrapper}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <Icon
                name={rememberMe ? "check-square-o" : "square-o"}
                size={20}
                color={rememberMe ? COLORS.blue : COLORS.gray}
              />
              <Text style={styles.checkboxLabel}>Nhớ mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowResetPassword(true)}>
              <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.socialText}>Hoặc đăng nhập với</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
              <Icon name="google" size={30} color={COLORS.red} />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.footerLink}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <FloatingInput
            type="email"
            value={resetEmail}
            onChange={setResetEmail}
            label="Email"
            required
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Đang gửi..." : "Gửi email đặt lại"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowResetPassword(false)}>
            <Text style={styles.forgotPassword}>Quay lại đăng nhập</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f7fa",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 20,
  },
  error: {
    color: COLORS.red,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14,
  },
  success: {
    color: "green",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
    position: "relative",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.dark,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    color: COLORS.gray,
    fontSize: 14,
    marginLeft: 8,
  },
  forgotPassword: {
    color: COLORS.blue,
    fontSize: 14,
  },
  button: {
    width: "100%",
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: COLORS.gray,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialText: {
    marginVertical: 20,
    color: COLORS.gray,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialButton: {
    padding: 10,
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  footerText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  footerLink: {
    color: COLORS.blue,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LoginScreen;