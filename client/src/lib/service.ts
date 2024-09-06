import { baseUrl } from "../constants/api";

export const TodoService = {
  getTodos: async () => {
    try {
      const res = await fetch(baseUrl);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to get all todos");
      }

      return data || [];
    } catch {
      return [];
    }
  },
  getTodo: async (_id: string) => {
    try {
      const res = await fetch(`${baseUrl}/${_id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to get todo");
      }

      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  createTodo: async (todo: string, fn: () => void) => {
    try {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: todo }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to create todo");
      }
      fn();

      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  updateTodo: async (_id: number) => {
    try {
      const res = await fetch(`${baseUrl}/${_id}`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to update todo");
      }

      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  deleteTodo: async (_id: number) => {
    try {
      const res = await fetch(`${baseUrl}/${_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to delete todo");
      }

      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
