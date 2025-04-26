import { Card, CardContent } from "@/components/ui/card";

interface ContentStatsProps {
  stats: {
    title: string;
    value: string;
  }[];
}

export function ContentStats({ stats }: ContentStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </p>
            <h3 className="mt-2 text-3xl font-bold text-primary">
              {stat.value}
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
