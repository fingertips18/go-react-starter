import {
  Flex,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

import { TodoItem } from "./TodoItem";

const todos = [
  {
    _id: 1,
    body: "Buy groceries",
    completed: true,
  },
  {
    _id: 2,
    body: "Walk the dog",
    completed: false,
  },
  {
    _id: 3,
    body: "Do laundry",
    completed: false,
  },
  {
    _id: 4,
    body: "Cook dinner",
    completed: true,
  },
];

const TodoList = () => {
  const [loading] = useState(false);

  return (
    <>
      <Flex
        gap={2}
        alignItems="center"
        justifyContent="center"
        className="glow-static"
      >
        <Text
          fontSize={"4xl"}
          textTransform={"uppercase"}
          fontWeight={"black"}
          textAlign={"center"}
          my={6}
          bgGradient={`linear(to-r, ${useColorModeValue(
            "light.foreground",
            "dark.foreground"
          )}, go)`}
          bgClip="text"
        >
          Daily Goals
        </Text>
        <Text fontSize={"4xl"}>🎯</Text>
      </Flex>
      {loading && (
        <Flex justifyContent={"center"} my={4}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!loading && todos?.length === 0 && (
        <Stack alignItems={"center"} gap="3">
          <Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
            All tasks completed! 🤞
          </Text>
          <img src="/go.png" alt="Go logo" width={70} height={70} />
        </Stack>
      )}
      <Stack gap={3}>
        {todos?.map((todo) => (
          <TodoItem key={todo._id} {...todo} />
        ))}
      </Stack>
    </>
  );
};

export { TodoList };
