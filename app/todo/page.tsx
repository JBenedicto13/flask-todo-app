// TodoPage.tsx

"use client";
import React, { useEffect, useState } from "react";
import { TodoItem } from "@/utils/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import ErrorOverlay from "@/components/ErrorOverlay";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddTodo from "./add-todo";
import { useTodoContext, TodoProvider } from "@/contexts/TodoContext"; // Import the context and provider

// This is your main content component that uses the context
function TodoContent() {
  const { todos, error, isLoading } = useTodoContext(); // Use context
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      {error ? (
        <ErrorOverlay error={error} />
      ) : (
        <Tabs defaultValue="Todo List" className="w-full">
          <TabsList>
            <TabsTrigger value="Todo List">Todo List</TabsTrigger>
            <TabsTrigger value="Add Todo">Add Todo</TabsTrigger>
          </TabsList>
          <TabsContent value="Todo List">
            <DataTable columns={columns} data={todoList} />
          </TabsContent>
          <TabsContent value="Add Todo">
            <AddTodo />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

// Your main TodoPage component
export default function TodoPage() {
  return (
    <TodoProvider>
      <TodoContent />
    </TodoProvider>
  );
}
