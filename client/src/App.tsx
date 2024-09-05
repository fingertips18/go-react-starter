import { Container, Stack } from "@chakra-ui/react";

import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Stack h="100dvh">
      <Navbar />
      <Container>
        <TodoForm />
        <TodoList />
      </Container>
    </Stack>
  );
}

export default App;
