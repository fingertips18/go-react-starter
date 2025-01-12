import { Flex, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { useColorModeValue } from "@/hooks/useColorMode";
import { TodoService } from "@/lib/service";
import { Todo } from "@/lib/types";

import { TodoItem, TodoItemSkeleton } from "./TodoItem";

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
        justify="center"
        className="glow-static"
        my={{
          base: 6,
          sm: 10,
        }}
      >
        <Text
          fontSize={{
            base: "2xl",
            sm: "4xl",
          }}
          textTransform="uppercase"
          fontWeight="black"
          textAlign="center"
          bgGradient="to-r"
          gradientFrom={useColorModeValue(
            "light.foreground",
            "dark.foreground"
          )}
          gradientTo="go"
          bgClip="text"
        >
          Daily Goals
        </Text>
        <Text
          fontSize={{
            base: "2xl",
            sm: "4xl",
          }}
        >
          🎯
        </Text>
      </Flex>
      {isLoading && (
        <VStack
          gap="3"
          alignItems="start"
          mt={{
            base: 0,
            sm: 6,
          }}
        >
          <TodoItemSkeleton />
          <TodoItemSkeleton />
          <TodoItemSkeleton />
        </VStack>
      )}
      {!isLoading && todos?.length === 0 && (
        <Stack
          alignItems="center"
          gap="3"
          mt={{
            base: 0,
            sm: 6,
          }}
        >
          <Text fontSize={"xl"} textAlign="center" fontWeight="semibold">
            All task is done! 🎉
          </Text>
          <Image src="/go.svg" alt="Go logo" width={70} height={70} />
        </Stack>
      )}
      <VStack
        gap="3"
        mt={{
          base: 0,
          sm: 6,
        }}
        alignItems="start"
      >
        {todos?.map((todo) => (
          <TodoItem key={todo._id} {...todo} />
        ))}
      </VStack>
    </>
  );
};

export { TodoList };
