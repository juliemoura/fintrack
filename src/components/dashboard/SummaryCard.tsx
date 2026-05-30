import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  percentage: number;
  type: "success" | "error";
}

function SummaryCard({
  icon,
  title,
  value,
  percentage,
  type,
}: SummaryCardProps) {
  const iconStyles = {
    success: "border-emerald-500 text-emerald-400",
    error: "border-red-500 text-red-400",
  };

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex gap-5 items-center">
        <div
          className={`flex items-center justify-center rounded-full border p-3 ${iconStyles[type]}`}
        >
          {icon}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-text-muted">{title}</h2>
          <h3 className="text-2xl font-bold">{value}</h3>
          <Badge type={type}>
            {percentage > 0 ? "+ " : "- "}
            {Math.abs(percentage)}%
          </Badge>
        </div>
      </div>
    </Card>
  );
}

export default SummaryCard;
