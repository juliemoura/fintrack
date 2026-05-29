// Aqui temos o repositório central. É o objeto onde juntamos todos os slices num único lugar. 
// O Redux funciona com um único "estado global" da aplicação, e o configureStore é quem monta isso. 
// Todo componente que precisar saber se o usuário está logado vai buscar aqui, sem precisar passar props de pai pra filho.

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import entryReducer from "./entrySlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    entry: entryReducer
  },
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// vamos usar esse hook no formulário de entradas.

export const useAppSelector = useSelector.withTypes<RootState>();
// vamos usar esse hook pra listar as entradas, pra pegar o estado global 
// e mostrar as entradas que estão lá.