import axios from "axios";

import {
  actionLoginError,
  actionLoginLoading,
  actionLoginSuccess,
  actionsignUpLoading,
  actionsingUpError,
  actionsingUpSuccess,
} from "./actionType";

let baseURL = "http://localhost:5000/";

export const loginFetch = (value) => (dispatch) => {
  dispatch(actionLoginLoading());
  return axios
    .post(`${baseURL}users/login`, value)
    .then((res) => {
      dispatch(actionLoginSuccess(res.data));

    })
    .catch((err) => {
      dispatch(actionLoginError(err?.response.data.msg));
      console.log(err);
    });
};

export const signUpFetch = (value) => (dispatch) => {
  dispatch(actionsignUpLoading());

  return axios
    .post(`${baseURL}users/register`, value)
    .then((res) => {
      dispatch(actionsingUpSuccess());
      return { success: true, message: "SignUp Successful" }; // ✅ Return success response
    })
    .catch((err) => {
      const errorMessage = err.response?.data.msg || "SignUp Failed";
      dispatch(actionsingUpError(errorMessage));
      return { success: false, message: errorMessage }; // ✅ Return error response
    });
};


// conver 1 letter to upper case and rest to lower
export function capitalizeFirstLetter(string) {
  const words = string?.split(" ");
  const capitalizedWords = words?.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return capitalizedWords?.join(" ");
}


export function writeLocalStorage(key,data){
    localStorage.setItem(key,JSON.stringify(data))
}