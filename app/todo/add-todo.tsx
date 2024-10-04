import { ConfirmDialog } from "@/components/Dialogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useContext, useState } from "react";
import { useTodo } from "@/hooks/useTodo";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/spinner";
import ErrorOverlay from "@/components/ErrorOverlay";
import { useTodoContext } from "@/contexts/TodoContext";

export default function AddTodo() {
  const [name, setName] = useState("");
  const { addTodo, error, setError, isLoading } = useTodo();
  const { getTodos } = useTodoContext();

  const handleConfirm = async () => {
    try {
      const message = await addTodo(name);
      setError(null);
      setName("");
      await getTodos();
      toast("Success!", {
        description: message,
      });
    } catch (err) {
      // No need to handle error here, as the hook will update the error state
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <Dialog>
        {error ? (
          <ErrorOverlay error={error} />
        ) : (
          <form action="#" onSubmit={(e) => e.preventDefault()}>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <DialogTrigger asChild>
                <Button type="submit">Submit</Button>
              </DialogTrigger>
            </div>
          </form>
        )}
        <ConfirmDialog handleConfirm={handleConfirm} />
      </Dialog>
    </div>
  );
}
