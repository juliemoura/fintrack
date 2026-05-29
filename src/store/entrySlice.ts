import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Entry = {
  id: string;
  type: "receita" | "despesa";
  category?: "moradia" | "alimentacao" | "transporte" | "lazer" | "saude" | "outros";
  value: number;
  date: string;
  description?: string;
}

type InitialState = {
  entries: Entry[];
}

const initialState: InitialState = {
  entries: [],
}

const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {
    addEntry: (state, {payload}: PayloadAction<Entry>) => {
      state.entries.push(payload); 
      // basicamente o que eu to fazendo aqui é pegar o estado atual,
      // que é um array de entradas, e adicionar a nova entrada que veio no 
      // payload. O redux usa o immer por baixo dos panos, então eu 
      // posso escrever código "mutável" como esse, e ele vai cuidar de criar 
      // uma nova cópia do estado de forma imutável
    },
    deleteEntry: (state, {payload}: PayloadAction<string>) => { 
      state.entries = state.entries.filter((user) => user.id !== payload);
      // aqui eu to pegando o estado atual, que é um array de entradas,
      // e filtrando ele pra remover a entrada que tem o id igual ao payload.
      // O payload nesse caso é o id da entrada que eu quero deletar. 
      // Novamente, o redux vai cuidar de criar uma nova cópia do 
      // estado de forma imutável
    },
    updateEntry: (state, {payload}: PayloadAction<Entry>) => {
      state.entries = state.entries.map((entry) => entry.id === payload.id ? payload : entry);
      // aqui eu to pegando o estado atual, que é um array de entradas,
      // e mapeando ele pra atualizar a entrada que tem o id igual ao payload.id.
      // O payload nesse caso é a entrada atualizada, que tem o mesmo id da 
      // entrada que eu quero atualizar. Novamente, o redux vai cuidar de criar 
      // uma nova cópia do estado de forma imutável
    },
    
    resetEntries: (state) => {
      state.entries = []
      // aqui eu to pegando o estado atual, que é um array de entradas,
      // e resetando ele pra um array vazio. Novamente, o redux vai cuidar de criar 
      // uma nova cópia do estado de forma imutável
    }
  }
});

export const {
  addEntry,
  deleteEntry,
  updateEntry,
  resetEntries
} = entrySlice.actions;
export default entrySlice.reducer;