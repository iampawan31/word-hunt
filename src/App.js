import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Container } from "@material-ui/core";

import Header from "./components/Headers/Header";

const App = () => {
  const [meanings, setMeanings] = useState([]);
  const [languageCode, setLanguageCode] = useState("en");
  const [word, setWord] = useState("plane");

  const dictionaryApi = useCallback(async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${languageCode}/${word}`
      );

      setMeanings(data.data);
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
        backgroundColor: "#282c34",
        color: "#f3f3f3",
      }}
    >
      <Container
        maxWidth="md"
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Header
          word={word}
          languageCode={languageCode}
          setWord={(word) => setWord(word)}
          setLanguageCode={(language) => setLanguageCode(language)}
        />
      </Container>
    </div>
  );
};

export default App;
