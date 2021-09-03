import "./Definitions.css";

const Definitions = ({
  lightMode,
  meanings,
  word,
  languageCode,
  isSearching,
}) => {
  const audioSource =
    languageCode === "en" &&
    meanings &&
    meanings.length > 0 &&
    meanings[0].phonetics &&
    meanings[0].phonetics[0].audio
      ? meanings[0].phonetics[0].audio.replace("//", "https://")
      : null;

  return isSearching ? (
    ""
  ) : (
    <div className="meanings">
      {audioSource !== null && (
        <audio
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 10,
            width: "100%",
          }}
          preload="auto"
          controls
        >
          <source src={audioSource} type="audio/mp3" />
          Your browser doesn't support audio.
        </audio>
      )}

      {word === "" ? (
        <span className="subtitle">Start by typing a word in search</span>
      ) : (
        meanings.map((mean) => {
          return mean.meanings.map((item) => {
            return item.definitions.map((def, index) => (
              <div
                key={index}
                className="singleMean"
                style={{
                  backgroundColor: lightMode ? "#424242" : "#ffffff",
                  color: lightMode ? "#f3f3f3" : "#424242",
                }}
              >
                <b>{`${index + 1}. ${def.definition}`}</b>
                <hr style={{ backgroundColor: "#424242", width: "100%" }} />
                {def.example && (
                  <span>
                    <b>Example:</b> {def.example}
                  </span>
                )}
                {def.synonyms && def.synonyms.length > 0 && (
                  <span>
                    <b>Synonyms:</b> {def.synonyms.join(", ")}.
                  </span>
                )}
                {def.antonyms && def.antonyms.length > 0 && (
                  <span>
                    <b>Antonyms:</b> {def.antonyms.join(", ")}.
                  </span>
                )}
              </div>
            ));
          });
        })
      )}
    </div>
  );
};

export default Definitions;
