import { Container, Stack, useColorModeValue } from "@chakra-ui/react";

import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Stack
      h="100dvh"
      bg={useColorModeValue("light.background", "dark.background")}
    >
      <Navbar />
      <Container>
        {/* <TodoForm />
        <TodoList /> */}
      </Container>
    </Stack>
  );
}

export default App;
