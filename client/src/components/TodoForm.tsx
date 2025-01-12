import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Center, Flex, Input, Spinner } from "@chakra-ui/react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useColorModeValue } from "@/hooks/useColorMode";
import { TodoService } from "@/lib/service";

import { Tooltip } from "./chakra-ui/tooltip";

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

  const disabled = isCreating || todo === "";

  return (
    <form onSubmit={onSubmit}>
      <Flex gap={2}>
        <Input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          disabled={isCreating}
          autoComplete="off"
          name="search"
          borderColor="go"
          focusRingColor="go"
          className="glow-static"
          ref={(input) => input && input.focus()}
        />
        <Tooltip content="Add Todo">
          <Button
            ml={2}
            type="submit"
            bg={useColorModeValue("light.primary", "dark.primary")}
            color="dark.foreground"
            width="40px"
            height="40px"
            _active={{
              transform: "scale(.98)",
            }}
            disabled={disabled}
            style={{
              pointerEvents: disabled ? "none" : undefined,
            }}
            className="glow-hover"
          >
            {isCreating ? (
              <Center>
                <Spinner size="sm" />
              </Center>
            ) : (
              <PlusCircle />
            )}
          </Button>
        </Tooltip>
      </Flex>
    </form>
  );
};

export { TodoForm };
