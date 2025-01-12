import {
  Badge,
  Button,
  Center,
  Flex,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Hourglass, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { useColorModeValue } from "@/hooks/useColorMode";
import { TodoService } from "@/lib/service";

import { Skeleton } from "./chakra-ui/skeleton";
import { Tooltip } from "./chakra-ui/tooltip";

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
    <HStack gap={2} width="full">
      <Link to={`${_id}`} style={{ width: "100%" }}>
        <Flex
          alignItems="center"
          justify="space-between"
          boxShadow="inset 0px 0px 0px 0.5px #00add8"
          _hover={{
            boxShadow: "inset 0px 0px 0px 1px #00add8",
            scale: 1,
          }}
          _focus={{
            boxShadow: "inset 0px 0px 0px 1px #00add8",
          }}
          py={2}
          px={4}
          borderRadius="md"
          gap={{
            base: 2,
            sm: 8,
          }}
          bgColor="goOpacity"
          className="glow-hover"
        >
          <Text
            textDecoration={completed ? "line-through" : "none"}
            fontWeight="bold"
            fontSize={{
              base: "sm",
              sm: "initial",
            }}
            lineClamp={1}
          >
            {body}
          </Text>
          <Badge colorPalette={completed ? "green" : "yellow"}>
            {completed ? "Completed" : "Pending"}
          </Badge>
        </Flex>
      </Link>
      <Tooltip
        content={completed ? "Completed" : "Pending"}
        contentProps={{
          bgColor: completed ? "green.500" : "yellow.500",
        }}
        openDelay={0}
        closeDelay={0}
      >
        <Button
          color={completed ? "green.500" : "yellow.500"}
          bgColor={useColorModeValue(
            completed ? "green.100" : "yellow.100",
            completed ? "green.950" : "yellow.950"
          )}
          width="40px"
          height="40px"
          css={{
            "--glow-color": completed ? "#22c55e" : "#eab308",
          }}
          style={{
            boxShadow: `0px 0px 0px 0.5px ${completed ? "#22c55e" : "#eab308"}`,
          }}
          _hover={{
            boxShadow: `0px 0px 0px 1px ${completed ? "#22c55e" : "#eab308"}`,
          }}
          _focus={{
            boxShadow: `0px 0px 0px 1px ${completed ? "#22c55e" : "#eab308"}`,
          }}
          className="glow-hover"
          disabled={isUpdating}
          onClick={() => updateStatus()}
        >
          {isUpdating ? (
            <Center>
              <Spinner size="sm" />
            </Center>
          ) : completed ? (
            <CheckCircle size={20} />
          ) : (
            <Hourglass size={20} />
          )}
        </Button>
      </Tooltip>
      <Tooltip
        content="Delete"
        contentProps={{
          bgColor: "red.500",
        }}
        openDelay={0}
        closeDelay={0}
      >
        <Button
          color="red.500"
          bgColor={useColorModeValue("red.100", "red.950")}
          width="40px"
          height="40px"
          css={{
            "--glow-color": "#ef4444",
          }}
          style={{
            boxShadow: "0px 0px 0px 0.5px #ef4444",
          }}
          _hover={{
            boxShadow: "0px 0px 0px 1px #ef4444",
          }}
          _focus={{
            boxShadow: "0px 0px 0px 1px #ef4444",
          }}
          className="glow-hover"
          disabled={isDeleting}
          onClick={() => deleteTodo()}
        >
          {isDeleting ? (
            <Center>
              <Spinner size="sm" />
            </Center>
          ) : (
            <Trash2 size={20} />
          )}
        </Button>
      </Tooltip>
    </HStack>
  );
};

const TodoItemSkeleton = () => {
  return (
    <Flex gap={2} alignItems="center" width="full">
      <Skeleton flex={1} h="40px" borderRadius="md" bgColor="goOpacity" />
      <Skeleton
        w="40px"
        h="40px"
        borderRadius="md"
        bgColor={useColorModeValue("green.100", "green.950")}
      />
      <Skeleton
        w="40px"
        h="40px"
        borderRadius="md"
        bgColor={useColorModeValue("red.100", "red.950")}
      />
    </Flex>
  );
};

export { TodoItem, TodoItemSkeleton };
