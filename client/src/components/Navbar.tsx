import { Box, Button, Container, Flex, Image, Span } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

import { useColorMode, useColorModeValue } from "@/hooks/useColorMode";
import { AppRoutes } from "@/constants/routes";
import { GO_TEXT } from "@/constants/assets";

import { Tooltip } from "./chakra-ui/tooltip";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex="docked"
      w="100%"
      backdropFilter="blur(16px)"
      borderBottomWidth="1px"
      borderColor="goOpacity"
      className="blur-performance"
    >
      <Box
        w="100%"
        h="100%"
        bg={useColorModeValue("light.secondary", "dark.secondary")}
        opacity={0.1}
        position="absolute"
      />
      <Container maxW="1024px" px={4} py={2} position="relative" zIndex={10}>
        <Flex h={10} alignItems="center" justifyContent="space-between">
          <Link to={AppRoutes.Root} className="glow-hover">
            <Flex alignItems="center" gap="6px">
              <Image src={GO_TEXT} alt="Go" fit="contain" height="42px" />
              <Span
                fontSize="x-large"
                lineHeight="short"
                fontWeight="extrabold"
                color="go"
              >
                Starter
              </Span>
            </Flex>
          </Link>

          <Tooltip content="Mode">
            <Button
              onClick={toggleColorMode}
              bg={useColorModeValue("light.accent", "dark.accent")}
              color="dark.foreground"
              maxWidth="40px"
              maxHeight="40px"
              _hover={{
                opacity: 0.8,
              }}
            >
              {colorMode === "light" ? <Moon /> : <Sun />}
            </Button>
          </Tooltip>
        </Flex>
      </Container>
    </Box>
  );
};

export { Navbar };
