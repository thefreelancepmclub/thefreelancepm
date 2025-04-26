import { BarChart3, FileText, ShoppingBag, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const Stats = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Active Users
            </p>
            <h3 className="mt-2 text-3xl font-bold text-primary">XXX</h3>
          </div>
          <div className="rounded-full bg-blue-50 p-3">
            <Users className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Monthly Revenue
            </p>
            <h3 className="mt-2 text-3xl font-bold text-primary">$XX,XXX</h3>
          </div>
          <div className="rounded-full bg-blue-50 p-3">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Job Posts
            </p>
            <h3 className="mt-2 text-3xl font-bold text-primary">XXX</h3>
          </div>
          <div className="rounded-full bg-blue-50 p-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Courses</p>
            <h3 className="mt-2 text-3xl font-bold text-primary">XXX</h3>
          </div>
          <div className="rounded-full bg-blue-50 p-3">
            <FileText className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
