import { Badge, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { CheckCircle, Trash2 } from "lucide-react";

interface TodoItemProps {
  _id: number;
  completed: boolean;
  body: string;
}

const TodoItem = ({ _id, completed, body }: TodoItemProps) => {
  return (
    <Flex gap={2} alignItems={"center"}>
      <Flex
        flex={1}
        alignItems={"center"}
        border={"1px"}
        borderColor={"gray.600"}
        p={2}
        borderRadius={"lg"}
        justifyContent={"space-between"}
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
      <Flex gap={2} alignItems={"center"}>
        <Tooltip label="Done">
          <Button color={"green.500"} cursor={"pointer"}>
            <CheckCircle size={20} />
          </Button>
        </Tooltip>
        <Tooltip label="Delete">
          <Button color={"red.500"} cursor={"pointer"}>
            <Trash2 size={25} />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export { TodoItem };
