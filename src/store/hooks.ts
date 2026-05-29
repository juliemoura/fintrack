// Aqui temos os atalhos tipados para o Redux: useDispatch e useSelector são os hooks nativos do Redux, mas sem tipagem eles 
// não sabem nada sobre o formato do seu estado. Os hooks customizados useAppDispatch e useAppSelector resolvem isso, pq o TypeScript 
// passa a autocompletar state.auth.user, state.auth.token etc., e acusa erro se você acessar algo que não existe.

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);

