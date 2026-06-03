import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginSchema } from "../components/login/schema";
import { api } from "../services/api";

export interface AuthUser {
  id: number;
  email: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Recupera dados salvos no localStorage para manter o usuário logado após recarregar a página
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

export const loginUser = createAsyncThunk<
  { user: AuthUser; token: string },
  LoginSchema,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.get(
      `/users?email=${credentials.email}&password=${credentials.password}`
    );

    const found = response.data[0];

    if (!found) {
      return rejectWithValue("E-mail ou senha incorretos.");
    }

    const token = btoa(`${found.email}:${Date.now()}`);

    // salva login no navegador
    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: Number(found.id),
        email: found.email,
        name: found.name,
      })
    );

    return {
      user: {
        id: Number(found.id),
        email: found.email,
        name: found.name,
      },
      token,
    };
  } catch {
    return rejectWithValue("Erro ao realizar login.");
  }
});

const initialState: AuthState = {
  // recupera do localStorage ao iniciar a aplicação
  user: savedUser 
    ? {
        ...JSON.parse(savedUser),
        id: Number(JSON.parse(savedUser).id) // Garante que id é número
      }
    : null,
  token: savedToken,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Erro desconhecido.";
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;