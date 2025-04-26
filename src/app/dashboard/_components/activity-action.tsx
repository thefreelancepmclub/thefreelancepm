import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, FileText } from "lucide-react";

const ActivityAction = () => {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-primary">
              Recent Activity
            </h3>
          </div>
          <ul className="mt-4 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <BarChart3 className="h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">John Doe</span>{" "}
                  registered a new account — April 26, 2025 at 3:45 PM
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-primary">
              Quick Actions
            </h3>
          </div>
          <div className="mt-4 space-y-3">
            <Button className="w-full bg-primary">Add Job Post</Button>
            <Button className="w-full bg-primary">Upload Templates</Button>
            <Button className="w-full bg-primary">Create Course</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityAction;
