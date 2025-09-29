export type Gender = "male" | "female" | "other" | "preferNotToSay";

/**
 * 📦 Full User object as returned from the backend.
 */
export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string; // ISO string (e.g., "1995-09-29T00:00:00.000Z")
  phoneNumber: string;
  address: string;
  gender: Gender;
  token?: string; // Optional - often returned after login/registration
}

/**
 * 📝 Input for registering a new user.
 */
export interface RegisterUserInput {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  phoneNumber: string;
  address: string;
  gender: Gender;
}

/**
 * 🔑 Input for logging in.
 * One of `email` or `username` must be provided.
 */
export interface LoginUserInput {
  username?: string;
  email?: string;
  password: string;
}

/**
 * ✏️ Input for updating user profile fields.
 * All fields are optional — update only what’s provided.
 */
export interface UpdateUserInput {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dob?: string;
  phoneNumber?: string;
  address?: string;
  gender?: Gender;
}

/**
 * 📬 Form data for submitting a complaint.
 */
export type ComplaintFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/**
 * 📂 Full Complaint object returned from the backend.
 */
export interface Complaint extends ComplaintFormData {
  _id: string;
  user: string; // user ID reference
  createdAt: string;
  updatedAt: string;
  status?: "pending" | "in-progress" | "resolved";
}
