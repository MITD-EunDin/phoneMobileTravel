import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, introspectToken, getMyInfo } from "../api/Api";
import { saveTokenToStorage, getTokenFromStorage, removeTokenFromStorage } from "../utils/auth";
// import { signInWithGoogle, sendPasswordReset } from "../firebase/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const checkToken = (token) => {
    if (!token || typeof token !== "string") {
      throw new Error("InvalidTokenError: Invalid token specified: must be a string");
    }
    return true;
  };

  const loginUser = async (username, password) => {
    try {
      // Gọi API đăng nhập
      const authResponse = await login(username, password);
      if (authResponse.token) {
        // Lưu token vào AsyncStorage
        await saveTokenToStorage(authResponse.token);
        setToken(authResponse.token);
        console.log("token :", token);

        // Giải mã token
        const decoded = jwtDecode(authResponse.token);
        console.log("Token giải mã từ đăng nhập:", decoded);

        // Lấy thông tin người dùng
        const userInfo = await getMyInfo(authResponse.token);
        console.log("Thông tin người dùng từ đăng nhập:", userInfo);

        // Lưu userInfo vào AsyncStorage (tùy chọn, để tối ưu sau này)
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

        // Chuyển scope thành roles (mảng)
        const scope = decoded.scope || userInfo.scope || "USER";
        const roles = scope.split(" ").filter(Boolean);
        const userData = { ...userInfo, roles };
        console.log("Dữ liệu người dùng từ đăng nhập:", userData);

        // Cập nhật trạng thái user
        setUser(userData);

        // Trả về userData để sử dụng (ví dụ, để điều hướng)
        return userData;
      }
      throw new Error("Không nhận được token từ backend.");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      throw new Error("Đăng nhập thất bại: " + (error.message || "Thông tin đăng nhập không hợp lệ."));
    }
  };

  const logout = async () => {
    try {
      await removeTokenFromStorage(); // Đảm bảo xóa token hoàn tất
      await AsyncStorage.removeItem("userInfo"); // Xóa userInfo nếu có
      setToken(null);
      setUser(null);
      return true; // Xác nhận đăng xuất thành công
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error.message);
      throw new Error(`Đăng xuất thất bại: ${error.message}`);
    }
  };

  // useEffect để kiểm tra token khi khởi động
  useEffect(() => {
    const checkStoredToken = async () => {
      try {
        const storedToken = await getTokenFromStorage(); // Sử dụng await
        if (storedToken && typeof storedToken === "string") {
          checkToken(storedToken);
          const decoded = jwtDecode(storedToken);
          if (__DEV__) {
            console.log("Check token decoded:", decoded); // Chỉ log trong dev
          }

          // Kiểm tra userInfo trong AsyncStorage trước
          const storedUserInfo = await AsyncStorage.getItem("userInfo");
          if (storedUserInfo) {
            const userInfo = JSON.parse(storedUserInfo);
            const scope = decoded.scope || userInfo.scope || "USER";
            const roles = scope.split(" ").filter(Boolean);
            const userData = { ...userInfo, roles };
            if (__DEV__) {
              console.log("Check token userData from AsyncStorage:", userData);
            }
            setUser(userData);
            setToken(storedToken);
            return;
          }

          // Nếu không có userInfo, gọi API
          const introspectResponse = await introspectToken(storedToken);
          if (introspectResponse.valid && decoded.exp * 1000 > Date.now()) {
            const userInfo = await getMyInfo(storedToken);
            if (__DEV__) {
              console.log("Check token userInfo from API:", userInfo);
            }
            await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
            const scope = decoded.scope || userInfo.scope || "USER";
            const roles = scope.split(" ").filter(Boolean);
            const userData = { ...userInfo, roles };
            if (__DEV__) {
              console.log("Check token userData from API:", userData);
            }
            setUser(userData);
            setToken(storedToken);
          } else {
            await logout();
          }
        } else {
          if (__DEV__) {
            console.log("Không có token hợp lệ trong AsyncStorage:", storedToken);
          }
          await logout();
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra token:", error.message);
        await logout();
      }
    };

    checkStoredToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login: loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);