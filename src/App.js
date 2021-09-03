import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Container, Switch } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Header from "./components/Headers/Header";
import Definitions from "./components/Definitions/Definitions";
import Footer from "./components/Footer/Footer";

const ToggleDarkMode = withStyles({
  switchBase: {
    color: grey[300],
    "&$checked": {
      color: grey[500],
    },
    "&$checked + $track": {
      backgroundColor: grey[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const App = () => {
  const [lightMode, setLightMode] = useState(false);
  const [meanings, setMeanings] = useState([]);
  const [languageCode, setLanguageCode] = useState("en");
  const [word, setWord] = useState("");

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    console.log(prefersDarkMode);
    setLightMode(!prefersDarkMode);
  }, [prefersDarkMode]);

  const dictionaryApi = useCallback(async () => {
    try {
      if (languageCode && word) {
        const data = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/${languageCode}/${word}`
        );

        setMeanings(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [languageCode, word]);

  useEffect(() => {
    dictionaryApi();
  }, [word, languageCode, dictionaryApi]);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: lightMode ? "#ffffff" : "#282c34",
        color: lightMode ? "#000000" : "#f3f3f3",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 15,
            paddingTop: 10,
          }}
        >
          {lightMode ? "Light Mode" : "Dark Mode"}
          <ToggleDarkMode
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>
        <Header
          lightMode={lightMode}
          word={word}
          languageCode={languageCode}
          setWord={(word) => setWord(word)}
          setLanguageCode={(language) => setLanguageCode(language)}
        />
        {meanings && (
          <Definitions
            lightMode={lightMode}
            meanings={meanings}
            word={word}
            languageCode={languageCode}
          />
        )}
        <Footer />
      </Container>
    </div>
  );
};

export default App;
