import { useColorMode } from "@chakra-ui/react";
import { Toaster } from "sonner";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Toaster richColors position="bottom-center" theme={colorMode} />
      {children}
    </>
  );
};

export default ToastProvider;
