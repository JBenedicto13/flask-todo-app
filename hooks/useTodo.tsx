import { TodoItem } from "@/utils/types";
import { useState, useEffect } from "react";

export const useTodo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTodos = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/todo");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const res = await response.json();
      const data: TodoItem[] = res.data;
      setTodos(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async (name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const res = await response.json();
      await getTodos();
      return res.message;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/todo?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const res = await response.json();
      await getTodos();
      return res.message;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id: number, name?: string, status?: boolean) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/todo?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          isFinished: status,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const res = await response.json();
      await getTodos();
      return res.message;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    todos,
    error,
    setError,
    isLoading,
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
  };
};
