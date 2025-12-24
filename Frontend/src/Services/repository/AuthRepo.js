import { toast } from "react-hot-toast";
import { apiConnector } from "../Connector";
import { authEndpoints } from "../Apis";

const { LOGIN_API, REGISTER_API } = authEndpoints;

// ---------------- LOGIN ----------------
export async function login(email, password, navigate) {
  try {
    const response = await apiConnector("PUT", LOGIN_API, {
      email,
      password,
    });

    if (response.data.success) {
      const userData = {
        token: response.data.token,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/dashboard");
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  } 
}

// ---------------- REGISTER ----------------
export async function register(formData, navigate) {
  const toastId = toast.loading("Registering...");
  try {
    
    const {
      first_name,
      middle_name,
      last_name,
      email,
      contact_number,
      password,
      birthdate,
      gender,
      state,
      aadhar_id,
      avatar,
    } = formData;
  
    
    const payload = new FormData();
    payload.append("first_name", first_name);
    payload.append("middle_name", middle_name || "");
    payload.append("last_name", last_name);
    payload.append("email", email);
    payload.append("contact_number", contact_number);
    payload.append("password", password);
    payload.append("birthdate", birthdate);
    payload.append("gender", gender);
    payload.append("state", state);
    payload.append("aadhar_id", aadhar_id);
    
    if (avatar) {
      payload.append("avatar", avatar);
    }
    
    console.log("Reg repo payload: ", payload.get);

    // ---------------- API CALL ----------------
    const response = await apiConnector(
      "POST",
      REGISTER_API,
      payload,
      {
        "Content-Type": "multipart/form-data",
      }
    );

    if (response.data.success) {
      toast.success("Registration successful");
      navigate("/");
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    toast.error(error.message || "Registration failed");
  } finally {
    toast.dismiss(toastId);
  }
}

// ---------------- LOGOUT ----------------
export function logout(navigate) {
  localStorage.removeItem("user");
  navigate("/");
}
