import {
  Button,
  Flex,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft, PencilLine } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Tooltip } from "@/src/components/chakra-ui/tooltip";
import { useColorModeValue } from "@/hooks/useColorMode";
import { TodoModal } from "@/components/TodoModal";
import { AppRoutes } from "@/constants/routes";
import { TodoService } from "@/lib/service";
import { Todo } from "@/lib/types";

const DetailsPage = () => {
  const { id } = useParams();
  const { open, onOpen, onClose } = useDisclosure();

  const { data, isLoading } = useQuery<Todo>({
    queryKey: ["todo"],
    queryFn: async () => {
      try {
        if (!id) {
          throw new Error("ID is undefined");
        }

        return await TodoService.getTodo(id);
      } catch {
        return null;
      }
    },
    enabled: id !== undefined,
  });

  const backColor = useColorModeValue("light.accent", "dark.accent");
  const editColor = useColorModeValue("yellow.500", "yellow.200");

  if (isLoading) {
    return (
      <Stack gap={8}>
        <Flex alignItems="center" justifyContent="space-between">
          <Skeleton width="40px" height="40px" bgColor={backColor} />
          <Skeleton width="40px" height="40px" bgColor={editColor} />
        </Flex>
        <Skeleton height="40px" width="2/5" />
        <VStack gapY={1} width="full" alignItems="start">
          <Skeleton height="24px" width="4/5" />
          <Skeleton height="24px" width="full" />
          <Skeleton height="24px" width="1/2" />
        </VStack>
      </Stack>
    );
  }

  return (
    <>
      <Stack gap={8}>
        <Flex alignItems="center" justifyContent="space-between">
          <Link to={AppRoutes.Root}>
            <Tooltip
              content="Back"
              contentProps={{
                bgColor: backColor,
              }}
              openDelay={0}
              closeDelay={0}
            >
              <Button width="40px" height="40px" bg={backColor}>
                <ArrowLeft size={20} />
              </Button>
            </Tooltip>
          </Link>
          <Tooltip
            content="Edit"
            contentProps={{
              bgColor: editColor,
            }}
            openDelay={0}
            closeDelay={0}
          >
            <Button
              width="40px"
              height="40px"
              bgColor={editColor}
              onClick={onOpen}
            >
              <PencilLine size={20} />
            </Button>
          </Tooltip>
        </Flex>

        <Flex alignItems="center" gap={2}>
          <Text fontSize="2xl" fontWeight="bold">
            Status:
          </Text>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color={data?.completed ? "green.400" : "yellow"}
            css={{
              "--glow-color": data?.completed ? "#22c55e" : "#eab308",
            }}
            className="glow-static"
          >
            {data?.completed ? "Completed" : "Pending"}
          </Text>
        </Flex>

        <Text fontSize="lg" fontWeight="medium">
          {data?.body}
        </Text>
      </Stack>

      <TodoModal
        isOpen={open}
        onClose={onClose}
        id={data?._id}
        body={data?.body}
      />
    </>
  );
};

export default DetailsPage;
