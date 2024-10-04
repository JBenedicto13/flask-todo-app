import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type ConfirmDialogProps = {
  handleConfirm: () => void;
};

type UpdateDialogProps = {
  name: string;
  setName: (name: string) => void;
  handleEdit: () => void;
};

export const ConfirmDialog = ({ handleConfirm }: ConfirmDialogProps) => {
  const processConfirm = () => {
    handleConfirm();
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogDescription>
          Please click confirm to proceed with the action
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button variant="default" onClick={processConfirm}>
            Confirm
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export const UpdateDialog = ({
  name,
  setName,
  handleEdit,
}: UpdateDialogProps) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Update Todo</DialogTitle>
        <DialogDescription>
          Please enter the new name for the todo item.
        </DialogDescription>
      </DialogHeader>
      <div>
        <form action="#">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="New Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button variant="default" onClick={handleEdit}>
            Confirm
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
