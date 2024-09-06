import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { TodoService } from "../lib/service";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number | undefined;
  body: string | undefined;
}

const TodoModal = ({ isOpen, onClose, id, body }: TodoModalProps) => {
  const [todo, setTodo] = useState(body);

  const queryClient = useQueryClient();

  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      if (!id || !todo) return;
      const res = await TodoService.updateTodo(id, todo);
      onClose();

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      toast.success("Todo updated successfully");
    },
    onError: ({ message }) => toast.error(message || "Unable to update todo"),
  });

  const isSame = todo === body;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Todo</ModalHeader>
        <Tooltip label="Close">
          <ModalCloseButton />
        </Tooltip>
        <ModalBody>
          <Input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            autoComplete="off"
            name="todo"
            ref={(input) => input && input.focus()}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={2}>
            Close
          </Button>
          <Button
            bg={useColorModeValue("light.accent", "dark.accent")}
            isDisabled={isSame || isUpdating}
            _hover={{
              opacity: 0.8,
            }}
            _disabled={{
              opacity: 0.6,
              cursor: "default",
            }}
            onClick={() => updateTodo()}
          >
            {isUpdating ? <Spinner size="sm" /> : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { TodoModal };
