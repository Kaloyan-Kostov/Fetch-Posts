import { FETCH_URL } from "../helpers/constants";

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${FETCH_URL}/posts`);
    const postData = await response.json();
    return postData;
  } catch (e) {
    console.log("Error fetching posts..", e);
  }
};

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${FETCH_URL}/users`);
    const userData = await response.json();
    return userData;
  } catch (e) {
    console.log("Error fetching users..", e);
  }
};
