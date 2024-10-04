"use client";

import { TodoItem } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { TableActions } from "@/components/TableActions";
import { useTodoContext } from "@/contexts/TodoContext";
import { toast } from "sonner";
import { formatDate } from "@/utils/dateUtil";

export const columns: ColumnDef<TodoItem>[] = [
  {
    header: "Toggle",
    cell: ({ row }) => {
      const { id, name, isFinished } = row.original;
      const [checkInput, setCheckInput] = useState(isFinished);
      const { updateTodo, getTodos, setError } = useTodoContext();

      const handleToggle = async () => {
        try {
          setCheckInput(!checkInput);
          const msg = await updateTodo(id, name, !checkInput);
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
        <div className="ml-3">
          <input
            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            type="checkbox"
            name="task"
            id="task"
            onChange={handleToggle}
            checked={checkInput}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isFinished",
    header: "Status",
    cell: ({ getValue }) => {
      const isFinished = getValue() as boolean;
      return isFinished ? "Done" : "Not Done";
    },
  },
  {
    accessorKey: "created_at",
    header: "Date Created",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const formattedDate = formatDate(value);

      return formattedDate;
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const { id, name, isFinished } = row.original;
      return <TableActions id={id} itemName={name} isFinished={isFinished} />;
    },
  },
];
