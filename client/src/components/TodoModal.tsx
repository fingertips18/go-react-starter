import { Button, DialogTitle, Input, Spinner } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { useColorModeValue } from "@/hooks/useColorMode";
import { TodoService } from "@/lib/service";

import { Tooltip } from "./chakra-ui/tooltip";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "./chakra-ui/dialog";

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
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <Tooltip content="Close">
          <DialogCloseTrigger />
        </Tooltip>
        <DialogBody>
          <Input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            autoComplete="off"
            name="todo"
            ref={(input) => (input ? input.focus() : undefined)}
            borderColor="go"
            focusRingColor="go"
            fontSize="medium"
            className="glow-static"
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} mr={2}>
            Close
          </Button>
          <Button
            bg={useColorModeValue("light.accent", "dark.accent")}
            disabled={isSame || isUpdating}
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
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export { TodoModal };
