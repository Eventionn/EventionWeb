import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  username: string;
  phone?: string;
}

export const getUserFromToken = (): DecodedToken | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
