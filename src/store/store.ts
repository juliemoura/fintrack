import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
 
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Aqui temos o repositório central. É o objeto onde juntamos todos os slices num único lugar. 
// O Redux funciona com um único "estado global" da aplicação, e o configureStore é quem monta isso. 
// Todo componente que precisar saber se o usuário está logado vai buscar aqui, sem precisar passar props de pai pra filho.