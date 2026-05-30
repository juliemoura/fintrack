import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface BalanceCardProps {
  value: string;
  percentage: number;
}

function BalanceCard({ value, percentage }: BalanceCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-text-muted">Saldo Poupança</h2>
      </div>
      <h3 className="text-3xl font-bold">{value}</h3>{" "}
      <div className="flex items-center space-x-2">
        <Badge type="success">+{percentage}% somente esse mês</Badge>
      </div>
    </Card>
  );
}

export default BalanceCard;
