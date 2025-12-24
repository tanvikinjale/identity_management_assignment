import { toast } from "react-hot-toast";
import { apiConnector } from "../Connector";
import {userEndpoints } from "../Apis";
const { GET_PROFILE, SET_USER_PROFILE } = userEndpoints;


// ---------------- GET PROFILE ----------------
export async function getUserProfile(navigate) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return null;
    }

    const response = await apiConnector(
      "GET",
      GET_PROFILE,
      {},
      { Authorization: `Bearer ${user.token}` }
    );

    return response.data.data;
  } catch (error) {
    toast.error("Error fetching profile");
    navigate("/");
  }
}

// ---------------- UPDATE PROFILE ----------------
export async function setUserProfile(profileData) {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const response = await apiConnector(
      "PUT",
      SET_USER_PROFILE,
      profileData,
      { Authorization: `Bearer ${user.token}` }
    );

    if (response.status) {
      toast.success("Profile updated");
    }
  } catch (error) {
    toast.error("Profile update failed");
  }
}

