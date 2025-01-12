import { Box, Container, Flex, Span } from "@chakra-ui/react";

import { useColorModeValue } from "@/hooks/useColorMode";

export function Footer() {
  return (
    <Box
      width="full"
      boxShadow="sm"
      borderTopWidth="1px"
      borderColor="goOpacity"
      position="relative"
    >
      <Box
        width="full"
        height="full"
        bg={useColorModeValue("light.secondary", "dark.secondary")}
        opacity={0.1}
        position="absolute"
      />
      <Container maxW="lg" px={4} py={2}>
        <Flex
          alignItems="center"
          justify="center"
          gap={1}
          lineHeight="short"
          fontSize="xs"
          color="fg.muted"
          fontWeight="medium"
        >
          &copy; {new Date().getFullYear()}
          <Span
            color={useColorModeValue("light.foreground", "dark.foreground")}
          >
            Fingertips
          </Span>
          . All rights reserved.
        </Flex>
      </Container>
    </Box>
  );
}
