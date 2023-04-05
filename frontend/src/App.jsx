import { Suspense } from "react";
import { Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { AppShell, Loader, Center } from "@mantine/core";
import routes from "./routes/routes";

const App = () => {
  return (
    <>
      <AppShell padding="md" header={<NavBar />}>
        <Suspense
          fallback={
            <Center>
              <Loader></Loader>
            </Center>
          }
        >
          <Routes>{routes}</Routes>
        </Suspense>
      </AppShell>
    </>
  );
};

export default App;
