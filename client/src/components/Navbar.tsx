import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

import { AppRoutes } from "../constants/routes";
import { GOTEXT } from "../constants/assets";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box boxShadow="sm" position="relative">
      <Box
        w="100%"
        h="100%"
        bg={useColorModeValue("light.secondary", "dark.secondary")}
        opacity={0.08}
        position="absolute"
      />
      <Container maxW="1024px" px={4} py={2} position="relative" zIndex={10}>
        <Flex h={10} alignItems="center" justifyContent="space-between">
          <Link to={AppRoutes.Root} className="glow-hover">
            <Flex alignItems="center" gap="4px">
              <Image src={GOTEXT} alt="Go" objectFit="contain" boxSize="42px" />
              <Heading as="h2" size="md" fontWeight="extrabold" color="go">
                Starter
              </Heading>
            </Flex>
          </Link>

          <Tooltip label="Mode">
            <Button
              onClick={toggleColorMode}
              bg={useColorModeValue("light.accent", "dark.accent")}
              color="dark.foreground"
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
