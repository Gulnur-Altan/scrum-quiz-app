import { MantineProvider } from "@mantine/core";
import HomePage from "./pages/Homepage";

function App() {
  return (
    <MantineProvider>
      <HomePage />
    </MantineProvider>
  );
}

export default App;
