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
  setLanguageCode,
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
            onChange={(e) => setWord(e.target.value)}
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
