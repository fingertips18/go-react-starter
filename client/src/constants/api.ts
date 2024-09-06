enum API {
  Todos = "/api/todos",
}

export const baseUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BASE_URL + API.Todos
    : API.Todos;
