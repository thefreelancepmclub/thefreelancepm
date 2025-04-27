"use client";

import { Loader2, Pencil, Search, Trash } from "lucide-react";
import { useState, useTransition } from "react";

import { deleteSubscription } from "@/action/subscription/delete";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Subscription } from "@prisma/client";
import moment from "moment";
import { toast } from "sonner";
import { AddPlanForm } from "./create-subscription-plan";

interface Props {
  data: Subscription[];
}

export function SubscriptionTableContainer({ data }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  // Apply filters
  const filteredSubscriptions = data.filter((subscription) => {
    const matchesSearch =
      searchQuery === "" ||
      subscription.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const onDelete = (id: string) => {
    startTransition(() => {
      deleteSubscription(id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        setAlertOpen(false);
      });
    });
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Plan Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Renewal Type</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">
                    {subscription.id}
                  </TableCell>
                  <TableCell>{subscription.title}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800`}
                    >
                      Active
                    </span>
                  </TableCell>
                  <TableCell>
                    {moment(subscription.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{subscription.price}</TableCell>
                  <TableCell>{subscription.type}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={pending}>
                              Cancel
                            </AlertDialogCancel>
                            <Button
                              variant="destructive"
                              onClick={() => onDelete(subscription.id)}
                              disabled={pending}
                            >
                              Continue{" "}
                              {pending && <Loader2 className="animate-spin" />}
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <AddPlanForm
                        initialData={subscription}
                        trigger={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
