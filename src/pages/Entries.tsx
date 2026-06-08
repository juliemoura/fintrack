import EntryForm from "@/components/entries/EntryAddForm";
import EntryList from "@/components/entries";
import { Button } from "@/components/ui/Button/Button";
import { deleteAllEntries, createEntry } from "@/store/entrySlice";
import { useAppDispatch } from "@/store/store";
import { generateRandomEntries } from "@/lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { BadgeX, Sparkles } from "lucide-react";

const Entries = () => {
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const resetAllEntries = () => {
    if (!userId) {
      alert("Usuário não identificado");
      return;
    }
    dispatch(deleteAllEntries(userId));
  };

  const handleGenerateRandomEntries = () => {
    if (!userId) {
      alert("Usuário não identificado");
      return;
    }
    const entries = generateRandomEntries(userId);
    entries.forEach((entry) => dispatch(createEntry(entry)));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Lista de Entradas
        </h2>
        <div className="flex gap-3">
          <EntryForm />
          <Button
            className="bg-blue-800 hover:bg-blue-700"
            onClick={handleGenerateRandomEntries}
          >
            <Sparkles size={18} />
            Gerar aleatórias
          </Button>
          <Button className="bg-red-800" onClick={resetAllEntries}>
            <BadgeX />
            Apagar tudo
          </Button>
        </div>
      </div>

      <EntryList />
    </div>
  );
};

export default Entries;
