import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { api } from "@/services/api";

export type Entry = {
  id: string;
  userId: number;
  type: "receita" | "despesa";
  category?: "poupanca" | "moradia" | "alimentacao" | "transporte" | "lazer" | "saude" | "outros";
  value: number;
  date: string;
  description?: string;
}

// idle: ainda nao realizou requisicoes;
// loading: ta fazendo requisicoes;
// succeeded: requisicoes deram certo; 
// failed: requisicoes deram errado.

type InitialState = {
  entries: Entry[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: InitialState = {
  entries: [],
  status: "idle"
}

// basicamente vamos criar as funcoes com o createAsyncThunk
//  pra fazer as requisicoes pra API, e depois vamos criar o slice 
// com o createSlice, onde vamos definir os reducers pra atualizar o 
// estado de acordo com as acoes que a gente vai disparar.

export const fetchEntries = createAsyncThunk(
  "entry/fetchEntries",

  async(userId: number) => {
    const response = await api.get(`/entries?userId=${userId}`);
    return response.data as Entry[];
  }
);

export const createEntry = createAsyncThunk(
  "entry/createEntry",
  async(entry: Omit<Entry, "id">) => {
    const response = await api.post("/entries", entry);
    return response.data as Entry;
  }
)

export const removeEntry = createAsyncThunk(
  "entry/removeEntry",
  async(id: string) => {
    await api.delete(`/entries/${id}`);
    return id;
  }
)

export const editEntry = createAsyncThunk(
  "entry/editEntry",
  async(entry: Entry) => {
    const response = await api.put(`/entries/${entry.id}`, entry);
    return response.data as Entry;
  } 
)

export const deleteAllEntries = createAsyncThunk(
  "entry/deleteAllEntries",
  async(userId: number) => {
    const response = await api.get(`/entries?userId=${userId}`);
    const entries = response.data as Entry[];
    
    // Deleta todas as entradas do usuário em paralelo
    await Promise.all(
      entries.map((entry) => api.delete(`/entries/${entry.id}`))
    );
    
    return userId;
  }
)

const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {},
    extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchEntries.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entries = action.payload;
      })

      .addCase(fetchEntries.rejected, (state) => {
        state.status = "failed";
      })

      // CREATE
      .addCase(createEntry.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      })

      .addCase(createEntry.rejected, (state) => {
        state.status = "failed";
      })

      // REMOVE
      .addCase(removeEntry.fulfilled, (state, action) => {
        state.entries = state.entries.filter((entry) => entry.id !== action.payload);
      })

      .addCase(removeEntry.rejected, (state) => {
        state.status = "failed";
      })

      // UPDATE
      .addCase(editEntry.fulfilled, (state, action) => {
        state.entries = state.entries.map((entry) => entry.id === action.payload.id ? action.payload : entry);
      })

      .addCase(editEntry.rejected, (state) => {
        state.status = "failed";
      })

      // DELETE ALL
      .addCase(deleteAllEntries.pending, (state) => {
        state.status = "loading";
      })

      .addCase(deleteAllEntries.fulfilled, (state) => {
        state.status = "succeeded";
        state.entries = [];
      })

      .addCase(deleteAllEntries.rejected, (state) => {
        state.status = "failed";
      })
  }
});


// aqui essas funções são os selectors, que são usadas pra pegar partes 
// específicas do estado, nesse caso, as receitas e as despesas. 
// O selectAllRevenues vai pegar todas as entradas que tem o tipo "receita", 
// o selectAllExpenses vai pegar todas as entradas que tem o tipo "despesa",

// Memoizando os selectors para evitar re-renders desnecessários
const selectEntries = (state: RootState) => state.entry.entries;

export const selectAllSavings = createSelector(
  [selectEntries],
  (entries) =>
    entries.filter(
      (entry) => entry.category === "poupanca"
    )
);

export const selectAllRevenues = createSelector(
  [selectEntries],
  (entries) =>
    entries.filter(
      (entry) => entry.type === "receita" && entry.category !== "poupanca"
    )
);

export const selectAllExpenses = createSelector(
  [selectEntries],
  (entries) =>
    entries.filter(
      (entry) => entry.type === "despesa"
    )
);

// export const { } = entrySlice.actions;

export default entrySlice.reducer;