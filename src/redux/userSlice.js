import { createSlice } from '@reduxjs/toolkit';
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from '../services/userService';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create User
      .addCase(createUser.pending, state => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.users = state.users.map(user =>
        //   user.id === action.payload.id ? action.payload : user,
        // );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, state => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
