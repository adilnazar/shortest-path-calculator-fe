import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IShortestPathRequest } from '../../interfaces/request/ShortestPathRequest';


export const getShortestPath = createAsyncThunk(
  'path/fetchPathData',
  async (data : IShortestPathRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://localhost:7030/api/path', data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // Return a specific error message if available
        return rejectWithValue(error.response.data);
      }
      // Return a generic error message
      return rejectWithValue('An error occurred while fetching shortest path data');
    }
  }
);
