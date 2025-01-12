import { Toaster } from "sonner";

import { useColorModeValue } from "@/src/hooks/useColorMode";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const colorMode = useColorModeValue("light", "dark");

  return (
    <>
      <Toaster richColors position="bottom-center" theme={colorMode} />
      {children}
    </>
  );
};

export default ToastProvider;
