import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [meanings, setMeanings] = useState([]);
  const [languageCode, setLanguageCode] = useState("en");
  const [word, setWord] = useState("plane");

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_DICTIONARY_API}/${languageCode}/${word}`
      );

      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dictionaryApi();
  }, []);
  return <div>Hello World</div>;
};

export default App;
