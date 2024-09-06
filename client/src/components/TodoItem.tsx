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
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { toast } from "sonner";

import { TodoService } from "../lib/service";

interface TodoItemProps {
  _id: number;
  completed: boolean;
  body: string;
}

const TodoItem = ({ _id, completed, body }: TodoItemProps) => {
  const queryClient = useQueryClient();

  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationKey: ["updateStatus'"],
    mutationFn: async () => await TodoService.updateStatus(_id, !completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo status updated successfully");
    },
    onError: ({ message }) =>
      toast.error(message || "Unable to update todo status"),
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => await TodoService.deleteTodo(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully");
    },
    onError: ({ message }) => toast.error(message || "Unable to delete todo"),
  });

  return (
    <Flex gap={2} alignItems="center">
      <ChakraLink as={ReactRouterLink} to={`${_id}`} flex={1} overflow="hidden">
        <Flex
          alignItems="center"
          border="1px"
          borderColor="go"
          py={2}
          px={4}
          borderRadius="md"
          justifyContent="space-between"
          gap={8}
          bg="goOpacity"
        >
          <Text
            textDecoration={completed ? "line-through" : "none"}
            isTruncated
            fontWeight="bold"
            maxWidth="80%"
          >
            {body}
          </Text>
          <Badge ml="1" colorScheme={completed ? "green" : "yellow"}>
            {completed ? "Completed" : "Pending"}
          </Badge>
        </Flex>
      </ChakraLink>
      <Tooltip label={completed ? "Completed" : "Pending"}>
        <Button
          color={completed ? "green.500" : "yellow.500"}
          cursor="pointer"
          disabled={isUpdating}
          onClick={() => updateStatus()}
          flexShrink={0}
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
        <Button
          color="red.500"
          cursor="pointer"
          disabled={isDeleting}
          onClick={() => deleteTodo()}
          flexShrink={0}
        >
          {isDeleting ? <Spinner size="sm" /> : <Trash2 size={20} />}
        </Button>
      </Tooltip>
    </Flex>
  );
};

const TodoItemSkeleton = () => {
  return (
    <Flex gap={2} alignItems="center">
      <Skeleton flex={1} h="40px" borderRadius="md" />
      <Skeleton w="52px" h="40px" borderRadius="md" />
      <Skeleton w="52px" h="40px" borderRadius="md" />
    </Flex>
  );
};

export { TodoItem, TodoItemSkeleton };
