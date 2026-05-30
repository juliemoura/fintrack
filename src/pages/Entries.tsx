import EntryForm from "@/components/entries/EntryForm";
import EntryList from "@/components/entries/EntryList";
import { Button } from "@/components/ui/Button/Button";
import { resetEntries, addEntry } from "@/store/entrySlice";
import { useAppDispatch } from "@/store/store";
import { generateRandomEntries } from "@/lib/utils";
import { BadgeX, Sparkles } from "lucide-react";

const Entries = () => {
  const dispatch = useAppDispatch();

  const resetAllEntries = () => {
    dispatch(resetEntries());
  };

  const handleGenerateRandomEntries = () => {
    const entries = generateRandomEntries();
    entries.forEach((entry) => dispatch(addEntry(entry)));
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
