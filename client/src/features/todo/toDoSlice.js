import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchToDos = createAsyncThunk("todo/fetchToDos", async () => {
  const response = await fetch("/api/todo");
  return response.json();
});

const toDoSlice = createSlice({
  name: "todo",
  initialState: {
    toDos: [],
    isLoading: false,
    isRejected: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToDos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchToDos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.toDos = action.payload;
      })
      .addCase(fetchToDos.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
  },
});

export default toDoSlice.reducer;
export const selectToDos = (state) => state.todo.toDos;
