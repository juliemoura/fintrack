import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginSchema } from "../components/auth/schema";

const MOCK_USERS = [
  { email: "admin@email.com", password: "senha123", name: "Admin" },
  { email: "teste@gmail.com", password: "senha123", name: "Usuário Teste" },
  { email: "julie.moura@gmail.com", password: "senha123", name: "Julie Moura" }
];

export interface AuthUser {
  email: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const loginUser = createAsyncThunk<
  { user: AuthUser; token: string },
  LoginSchema,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // estamos simulando a latencia de uma requisição real

  const found = MOCK_USERS.find(
    (u) =>
      u.email === credentials.email && u.password === credentials.password
  );

  if (!found) {
    return rejectWithValue("E-mail ou senha incorretos.");
  }

  const token = btoa(`${found.email}:${Date.now()}`); // gerando meu token falso, pois não temos backend ainda

  return {
    user: { email: found.email, name: found.name },
    token,
  };
});

const initialState: AuthState = {
  user: null,
  token: null,
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

// Aqui basicamente temos o coração da autenticação. É aqui que fica toda a lógica de estado do login.
// O createAsyncThunk define o fluxo assíncrono (a "chamada de API"), e o slice cuida automaticamente dos três estados possíveis: 
// loading, succeeded e failed. Sem ele, teríamos que gerenciar esses estados manualmente em cada componente com useState, 
// o que vira um caos quando a mesma informação de "usuário logado" precisa aparecer em vários lugares ao mesmo tempo. :)