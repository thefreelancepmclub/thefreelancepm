"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";

interface UserData {
  name: string;
  email: string;
  plan: string;
  status: string;
}

export default function DeleteUserModal() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // Sample user data
  const userData: UserData = {
    name: "John Doe",
    email: "john@example.com",
    plan: "Freelance Elite",
    status: "Active",
  };

  const handleDelete = () => {
    if (confirmText === "DELETE") {
      // Handle deletion logic here
      console.log("User deleted");
      setOpen(false);
      setConfirmText("");
    }
  };

  return (
    <div className="p-4">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Delete user
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden max-w-md rounded-lg">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-semibold text-blue-700">
                Delete User
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Confirmation message */}
            <div className="py-2">
              <p className="text-lg">
                Are you sure you want to delete {userData.name} (
                {userData.email})?
              </p>
            </div>

            {/* User details */}
            <div className="bg-gray-100 rounded-md p-4 space-y-2">
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-medium">Name:</span>
                <span>{userData.name}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-medium">Email:</span>
                <span>{userData.email}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-medium">Plan:</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-0.5 rounded-full font-medium">
                  {userData.plan}
                </Badge>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center">
                <span className="font-medium">Status:</span>
                <span>{userData.status}</span>
              </div>
            </div>

            {/* Confirmation input */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="confirm" className="block">
                  Type <span className="font-bold text-orange-500">DELETE</span>{" "}
                  to confirm permanent deletion:
                </Label>
                <Input
                  id="confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="mt-2 border-gray-300 focus-visible:ring-blue-500"
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-3 pt-2">
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleDelete}
                  disabled={confirmText !== "DELETE"}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
