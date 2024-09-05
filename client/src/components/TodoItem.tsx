import {
  Badge,
  Button,
  Flex,
  Skeleton,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Hourglass, Trash2 } from "lucide-react";

import { API } from "../constants/api";

interface TodoItemProps {
  _id: number;
  completed: boolean;
  body: string;
}

const TodoItem = ({ _id, completed, body }: TodoItemProps) => {
  const queryClient = useQueryClient();

  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTodo'"],
    mutationFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL + API.Todos}/${_id}`,
          {
            method: "PATCH",
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Flex gap={2} alignItems="center">
      <Flex
        flex={1}
        alignItems="center"
        border="1px"
        borderColor="gray"
        py={2}
        px={4}
        borderRadius="md"
        justifyContent="space-between"
      >
        <Text
          color={completed ? "green.200" : "yellow.200"}
          textDecoration={completed ? "line-through" : "none"}
        >
          {body}
        </Text>
        <Badge ml="1" colorScheme={completed ? "green" : "yellow"}>
          {completed ? "Completed" : "Pending"}
        </Badge>
      </Flex>
      <Tooltip label={completed ? "Completed" : "Pending"}>
        <Button
          color={completed ? "green.500" : "yellow.500"}
          cursor="pointer"
          disabled={isUpdating}
          onClick={() => updateTodo()}
        >
          {isUpdating ? (
            <Spinner size="sm" />
          ) : completed ? (
            <CheckCircle size={20} />
          ) : (
            <Hourglass size={20} />
          )}
        </Button>
      </Tooltip>
      <Tooltip label="Delete">
        <Button color="red.500" cursor="pointer">
          <Trash2 size={25} />
        </Button>
      </Tooltip>
    </Flex>
  );
};

const TodoItemSkeleton = () => {
  return (
    <Flex gap={2} alignItems="center">
      <Skeleton w="100%" h="38px" borderRadius="md" />
      <Skeleton w="69px" h="38px" borderRadius="md" />
      <Skeleton w="69px" h="38px" borderRadius="md" />
    </Flex>
  );
};

export { TodoItem, TodoItemSkeleton };
