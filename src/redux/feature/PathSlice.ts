import { createSlice } from '@reduxjs/toolkit';
import { getShortestPath } from './PathThunk';
import { IPathSlice } from '../../interfaces/slices/PathSLice';


const initialState: IPathSlice = {
  shortestPathResponse: null,
  shortestPathLoading: false,
  shortestPathError: null,
}

const PathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    clearShotestPathData: (state) => {
      state.shortestPathResponse = null;
      state.shortestPathLoading = false;
      state.shortestPathError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShortestPath.pending, (state) => {
        state.shortestPathLoading = true;
        state.shortestPathError = null;
      })
      .addCase(getShortestPath.fulfilled, (state, action) => {
        state.shortestPathLoading = false;
        state.shortestPathResponse = action.payload;
      })
      .addCase(getShortestPath.rejected, (state, action) => {
        state.shortestPathLoading = false;
        state.shortestPathError = action.payload;
      });
  },
});

export const PathActions = PathSlice.actions;
export default PathSlice.reducer;
