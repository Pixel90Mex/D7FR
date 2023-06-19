import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  isLoading: false,
 };
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (postData, { rejectWithValue }) => {
    try {
      console.log("Adding post...");
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
     return await response.json()
    } catch (error) {
      console.error("Error adding post:", error);
      return rejectWithValue(error);
    }
  }
);
const addNewpostsSlice = createSlice({
    name: "newPost",
    initialState, 
    extraReducers: (builder) => {
      builder
        .addCase(addNewPost.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          console.log("addNewPost.fulfilled - payload:", action.payload);
          state.isLoading = false;
          state.response = action.payload;
        
        })
        .addCase(addNewPost.rejected, (state) => {
          state.isLoading = false;
          state.error = "Failed to save the post";
        });
    },
  });
export const newPostResponse = (state) => state.createPostState.response;
export const newPostsLoading = (state) => state.createPostState.isLoading;
export const newPostsArray = (state) => state.createPostState.posts;
export default addNewpostsSlice.reducer;
