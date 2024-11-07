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

export const postRequest = async ({
  title = "",
  body = "",
  userId = 10,
} = {}) => {
  try {
    const response = await fetch(`${FETCH_URL}/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Error creating post:", e);
  }
};
