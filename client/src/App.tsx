import { Container, Stack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { AppRoutes } from "@/constants/routes";
import { Navbar } from "@/components/Navbar";
import DetailsPage from "@/pages/details";
import RootPage from "@/pages/root";

function App() {
  return (
    <Stack h="100dvh" overflowX="hidden" overflowY="auto">
      <Navbar />
      <Container py={4} maxWidth="2xl">
        <Routes>
          <Route path={AppRoutes.Root} element={<RootPage />} />
          <Route path={AppRoutes.Details} element={<DetailsPage />} />
        </Routes>
      </Container>
    </Stack>
  );
}

export default App;
