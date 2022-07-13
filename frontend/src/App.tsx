import React from "react";
import { ModalProvider } from "./hooks/useModals";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./hooks/useTheme";
import GlobalStyles from "./styles/GlobalStyles";
import Modal from "./components/Modal";
import Routes from "./routes";

const App: React.FC = () => {
  const { theme } = useTheme();
  return (
    <ModalProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Modal />
        <Routes />
      </ThemeProvider>
    </ModalProvider>
  );
};

export default App;
