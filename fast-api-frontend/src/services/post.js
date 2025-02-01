import axios from "axios";
import { getAccessToken } from "../helpers/auth";

export const createPost = async (data) => {
  const url = `${process.env.REACT_APP_API_URL}/posts/create`;
  const access_token = getAccessToken();

  try {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return !response.error ? response.data : response;
  } catch (error) {
    return error;
  }
};

export const fetchPosts = async () => {
  const url = `${process.env.REACT_APP_API_URL}/posts/list`;
  const access_token = getAccessToken();

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return !response.error ? response.data : response;
  } catch (error) {
    return error;
  }
};

export const editPost = async (data) => {
  const url = `${process.env.REACT_APP_API_URL}/posts/update`;
  const access_token = getAccessToken();

  try {
    const response = await axios.patch(url, data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return !response.error ? response.data : response;
  } catch (error) {
    return error;
  }
}

export const deletePost = async (id) => {
  const url = `${process.env.REACT_APP_API_URL}/posts/delete/${id}`;
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