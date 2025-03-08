import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../services/apiClient';

// Fetch Users
export const fetchUsers = createAsyncThunk(
  'fetchUsersData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to fetch users';
      return rejectWithValue(errorMessage);
    }
  },
);

// Create User
export const createUser = createAsyncThunk(
  'createUserData',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await apiClient.post('/users', userData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to create user';
      return rejectWithValue(errorMessage);
    }
  },
);

// Update User
export const updateUser = createAsyncThunk(
  'updateUsersData',
  async ({id, userData}, {rejectWithValue}) => {
    try {
      const response = await apiClient.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update user';
      return rejectWithValue(errorMessage);
    }
  },
);

// Delete User
export const deleteUser = createAsyncThunk(
  'deleteUsersData',
  async (id, {rejectWithValue}) => {
    try {
      await apiClient.delete(`/users/${id}`);
      return id;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to delete user';
      return rejectWithValue(errorMessage);
    }
  },
);
