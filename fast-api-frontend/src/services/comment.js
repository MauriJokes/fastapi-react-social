import axios from "axios";
import { getAccessToken } from "../helpers/auth";

export const createComment = async (commentData) => {
  const url = `${process.env.REACT_APP_API_URL}/comments/create`;
  const access_token = getAccessToken();

  try {
    const response = await axios.post(url, commentData, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return !response.error ? response.data : response;
  } catch (error) {
    return error;
  }
};

export const fetchComments = async () => {
  const url = `${process.env.REACT_APP_API_URL}/comments/list/`;
  const access_token = getAccessToken();

  try {
    const response = await axios.post(url, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return !response.error ? response.data : response;
  } catch (error) {
    return error;
  }
};

export const deleteComment = async (commentID) => {
  const url = `${process.env.REACT_APP_API_URL}/comments/delete/${commentID}`;
  const access_token = getAccessToken();

  try {
    const response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return !response.error ? response.data : response;
  } catch (error) {
    return error;
  }
};

export const editComment = async (data) => {
  const url = `${process.env.REACT_APP_API_URL}/comments/update`;
  const access_token = getAccessToken();

  try {
    const response = await axios.put(url, data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return !response.error ? response.data : response;
  } catch (error) {
    return error;
  }
};
