import "./Header.css";
import {
  TextField,
  createTheme,
  ThemeProvider,
  MenuItem,
} from "@material-ui/core";

import languages from "../../data/languages";

const Header = ({
  lightMode,
  word,
  languageCode,
  setWord,
  setIsSearching,
  setLanguageCode,
  setMeanings,
}) => {
  const darkTheme = createTheme({
    palette: {
      primary: { main: "#f3f3f3" },
      type: lightMode ? "light" : "dark",
    },
  });

  const handleChange = (language) => {
    setLanguageCode(language);
    setWord("");
    setMeanings([]);
  };

  const handleWordChange = (value) => {
    setWord(value);
    if (value.length === 0) {
      setMeanings([]);
    }
  };

  const handleWordInput = (e) => {
    if (e.keyCode === 13) {
      setIsSearching(true);
    }
  };

  return (
    <div className="header">
      <span className="title"> {word ? word : "Word Hunt"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            label="Search Word..."
            value={word}
            onKeyDown={handleWordInput}
            onChange={(e) => handleWordChange(e.target.value)}
            helperText="Press enter to search..."
          />
          <TextField
            className="select"
            select
            value={languageCode}
            onChange={(e) => handleChange(e.target.value)}
            label="Language"
          >
            {languages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
