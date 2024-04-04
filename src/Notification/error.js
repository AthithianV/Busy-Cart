import { toast } from "react-toastify";

export const notifyError = (errCode) => {
  switch (errCode) {
    case "auth/email-already-in-use":
      toast.error("Email is already in use");
      break;

    case "auth/weak-password":
      toast.error("Password should be at least 6 characters");
      break;

    case "auth/missing-email":
      toast.error("Please enter Email Id");
      break;

    case "auth/missing-password":
      toast.error("Please Enter password");
      break;

    case "auth/invalid-email":
      toast.error("Please Enter valid Email");
      break;

    case "auth/invalid-password":
      toast.error("Please Enter correct password");
      break;

    case "auth/invalid-credential":
      toast.error("Invalid EmailID or Password");
      break;

    case "unath":
      toast.error("Sign in Required");
      break;

    default:
      toast.error("Oops, Something Went Wrong");
      break;
  }
};
