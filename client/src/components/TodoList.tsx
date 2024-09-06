import { Flex, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { TodoItem, TodoItemSkeleton } from "./TodoItem";
import { TodoService } from "../lib/service";
import { Todo } from "../lib/types";

const TodoList = () => {
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: TodoService.getTodos,
  });

  return (
    <>
      <Flex
        gap={2}
        alignItems="center"
        justifyContent="center"
        className="glow-static"
      >
        <Text
          fontSize="4xl"
          textTransform="uppercase"
          fontWeight="black"
          textAlign="center"
          my={6}
          bgGradient={`linear(to-r, ${useColorModeValue(
            "light.foreground",
            "dark.foreground"
          )}, go)`}
          bgClip="text"
        >
          Daily Goals
        </Text>
        <Text fontSize="4xl">🎯</Text>
      </Flex>
      {isLoading && (
        <Stack gap="3" mt={8}>
          <TodoItemSkeleton />
          <TodoItemSkeleton />
          <TodoItemSkeleton />
        </Stack>
      )}
      {!isLoading && todos?.length === 0 && (
        <Stack alignItems="center" gap="3" mt={8}>
          <Text fontSize={"xl"} textAlign="center" fontWeight="semibold">
            All task is done! 🎉
          </Text>
          <Image src="/go.svg" alt="Go logo" width={70} height={70} />
        </Stack>
      )}
      <Stack gap="3" mt={8}>
        {todos?.map((todo) => (
          <TodoItem key={todo._id} {...todo} />
        ))}
      </Stack>
    </>
  );
};

export { TodoList };
