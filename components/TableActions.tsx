import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useTodoContext } from "@/contexts/TodoContext";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { UpdateDialog } from "./Dialogs";

export const TableActions = ({
  id,
  itemName,
  isFinished,
}: {
  id: number;
  itemName: string;
  isFinished: boolean;
}) => {
  const { deleteTodo, updateTodo, error, setError, isLoading } =
    useTodoContext();
  const { getTodos } = useTodoContext();

  // State to control which dialog is open
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [name, setName] = useState(itemName);

  // Function to handle "Edit" button click
  const handleEdit = async () => {
    try {
      const msg = await updateTodo(id, name, isFinished);
      setError(null);
      await getTodos();
      toast("Success!", {
        description: msg,
      });
    } catch (err) {
      // No need to handle error here, as the hook will update the error state
    }
  };

  const handleDelete = async () => {
    try {
      const msg = await deleteTodo(id);
      setError(null);
      await getTodos();
      toast("Success!", {
        description: msg,
      });
    } catch (err) {
      // No need to handle error here, as the hook will update the error state
    }
  };
  return (
    <>
      <div className="flex gap-5">
        <Button variant={"secondary"} onClick={() => setUpdateDialogOpen(true)}>
          Edit
        </Button>
        <Button variant={"destructive"} onClick={handleDelete}>
          Delete
        </Button>
      </div>
      <Dialog open={isUpdateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <UpdateDialog name={name} setName={setName} handleEdit={handleEdit} />
      </Dialog>
    </>
  );
};
