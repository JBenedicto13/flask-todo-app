// contexts/todoContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { TodoItem } from "@/utils/types";
import { useTodo } from "@/hooks/useTodo"; // Import your existing useTodo hook

interface TodoContextProps {
  todos: TodoItem[];
  isLoading: boolean;
  error: string | null;
  getTodos: () => void;
  addTodo: (name: string) => Promise<Object>;
  deleteTodo: (id: number) => Promise<string>;
  updateTodo: (
    id: number,
    name?: string,
    isFinished?: boolean
  ) => Promise<string>;
  setError: (error: string | null) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const {
    todos,
    isLoading,
    error,
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    setError,
  } = useTodo(); // Get all the functions and state from useTodo hook

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        error,
        getTodos,
        addTodo,
        deleteTodo,
        updateTodo,
        setError,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
