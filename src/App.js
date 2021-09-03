import { useState, useEffect, useCallback } from "react";
import { Container, Switch, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import axios from "axios";

import "./App.css";
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
  const [isSearching, setIsSearching] = useState(false);
  const [meanings, setMeanings] = useState([]);
  const [languageCode, setLanguageCode] = useState("en");
  const [word, setWord] = useState("");

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    setLightMode(!prefersDarkMode);
  }, [prefersDarkMode]);

  const dictionaryApi = useCallback(async () => {
    try {
      if (languageCode && word) {
        const data = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/${languageCode}/${word}`
        );

        setMeanings(data.data);
        setIsSearching(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [languageCode, word]);

  useEffect(() => {
    if (isSearching) {
      dictionaryApi();
    }
  }, [dictionaryApi, isSearching]);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: lightMode ? "#ffffff" : "#282c34",
        color: lightMode ? "#424242" : "#f3f3f3",
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
          setWord={(w) => setWord(w)}
          setMeanings={setMeanings}
          setIsSearching={(isSearch) => setIsSearching(isSearch)}
          setLanguageCode={(lang) => setLanguageCode(lang)}
        />
        {isSearching && (
          <div className="loading">
            <CircularProgress
              style={{ color: lightMode ? "#000000" : "#ffffff" }}
            />
          </div>
        )}
        {meanings && !isSearching && (
          <Definitions
            lightMode={lightMode}
            meanings={meanings}
            word={word}
            isSearching={isSearching}
            languageCode={languageCode}
          />
        )}
        <Footer />
      </Container>
    </div>
  );
};

export default App;
