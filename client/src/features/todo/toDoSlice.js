import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchToDos = createAsyncThunk("todo/fetchToDos", async () => {
  const response = await fetch("/api/todo");
  return response.json();
});

export const addToDo = createAsyncThunk("todo/addToDo", async (data) => {
  const response = await fetch("/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
});

export const updateToDo = createAsyncThunk("todo/updateToDo", async (data) => {
  const response = await fetch("/api/todo", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
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
    builder
      .addCase(addToDo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addToDo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.toDos.push(action.payload);
      })
      .addCase(addToDo.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
    builder
      .addCase(updateToDo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateToDo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.toDos = action.payload;
      })
      .addCase(updateToDo.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
      });
  },
});

export default toDoSlice.reducer;
export const selectToDos = (state) => state.todo.toDos;
