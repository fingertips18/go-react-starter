import { Container, Stack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { AppRoutes } from "@/constants/routes";
import DetailsPage from "@/pages/details";
import RootPage from "@/pages/root";

function App() {
  return (
    <Stack minH="100dvh" overflow="hidden" gap={0} position="relative">
      <Header />
      <Container
        pt={{
          base: "70px",
          sm: "76px",
        }}
        pb={{
          base: "6px",
          sm: "12px",
        }}
        maxWidth="2xl"
        style={{
          minHeight: "calc(100dvh - 34px)",
        }}
      >
        <Routes>
          <Route path={AppRoutes.Root} element={<RootPage />} />
          <Route path={AppRoutes.Details} element={<DetailsPage />} />
        </Routes>
      </Container>
      <Footer />
    </Stack>
  );
}

export default App;
