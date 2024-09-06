import {
  Button,
  Flex,
  Input,
  Spinner,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { TodoService } from "../lib/service";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const queryClient = useQueryClient();

  const { mutate: onSubmit, isPending: isCreating } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();
      await TodoService.createTodo(todo, () => setTodo(""));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo created successfully");
    },
    onError: ({ message }) => toast.error(message || "Unable to create todo"),
  });

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
          disabled={isCreating}
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
            disabled={isCreating}
          >
            {isCreating ? <Spinner size="xs" /> : <PlusCircle />}
          </Button>
        </Tooltip>
      </Flex>
    </form>
  );
};

export { TodoForm };
