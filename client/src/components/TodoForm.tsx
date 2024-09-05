import {
  Button,
  Flex,
  Input,
  Spinner,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [loading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        marginTop: "24px",
      }}
    >
      <Flex gap={2}>
        <Input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          disabled={loading}
          autoComplete="off"
          name="search"
          ref={(input) => input && input.focus()}
        />
        <Tooltip label="Add Todo">
          <Button
            mx={2}
            type="submit"
            bg={useColorModeValue("light.primary", "dark.primary")}
            color="dark.foreground"
            _hover={{
              opacity: 0.8,
            }}
            _active={{
              transform: "scale(.98)",
            }}
            disabled={loading}
          >
            {loading ? <Spinner size="xs" /> : <PlusCircle />}
          </Button>
        </Tooltip>
      </Flex>
    </form>
  );
};

export { TodoForm };
