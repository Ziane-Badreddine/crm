import {
  Card,
  CardContent,
} from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
  value: number;
   icon: React.ElementType;
};

export default function DashboardCard({
  title,
  description,
  value,
  icon: Icon,
}: Props) {
  return (
    <Card>
      <CardContent>
        <div className="grid gap-5">
            <div className="flex items-start justify-between">
                <div className="grid gap-1">
                    <p className="text-sm  font-semibold">{title}</p>
                    <h1 className="text-3xl font-thin">{value}</h1>
                </div>
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
