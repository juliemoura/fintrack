import { Button } from "@/components/ui/Button/Button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Sheet } from "lucide-react";
import { exportToXLS } from "@/lib/exportHelpers";
import RelatoryList from "@/components/relatory";

const Relatory = () => {
  const entries = useSelector((state: RootState) => state.entry.entries);

  const handleExportXLS = () => {
    if (entries.length === 0) {
      alert("Nenhuma entrada para exportar");
      return;
    }
    exportToXLS(entries);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white mb-3">Relatórios</h2>
        <div className="flex gap-3">
          <Button
            className="bg-green-800 hover:bg-green-700"
            onClick={handleExportXLS}
          >
            <Sheet size={18} />
            Exportar XLS
          </Button>
        </div>
      </div>

      <RelatoryList />
    </div>
  );
};

export default Relatory;
