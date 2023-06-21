const { useState, useMemo } = React;

function App() {
  const [sentence, setSentence] = useState("Hello");
  const [emojiType, setEmojiType] = useState(null);

  const emojified = useMemo(() => {
    const parsed = sentence.split("").flatMap((word) =>
      word.split("").map((letter) => {
        const lowerCaseLetter = letter.toLowerCase();

        if (lowerCaseLetter === " ") {
          return " ";
        }

        if (emojiType === "slack") {
          return `:alphabet-white-${lowerCaseLetter}:`;
        }

        if (emojiType === "discord") {
          return `:regional_indicator_${lowerCaseLetter}: `;
        }

        return `:regional_indicator_${lowerCaseLetter}: `;
      })
    );

  return parsed.join("");
  }, [sentence, emojiType]);

  return React.createElement(
    "section",
    { className: "section" },
   
    React.createElement("h1", { className: "title is-1" }, `Words-to-${emojiType === "slack" ? "Slackmoji" : "Discord-Emoji"}`),
   
    React.createElement(
      "label",
      { className: "label" },
      "Text to emojify",
     
      React.createElement("input", {
        className: "input mb-4",
        type: "text",
        value: sentence,
        onChange: ({ currentTarget }) => {
          setSentence(currentTarget.value);
        },
      })
    ),
    React.createElement("div", { className: "mb-4" },
    React.createElement("strong", { className: "has-text-primary" }, "Emoji type")),
    React.createElement("div", { className: "buttons mb-4" },
    React.createElement(
      "button",
      {
        className: `button ${
          emojiType === "discord" && "is-warning"
        }`,
        type: "button",
        onClick: () =>
          setEmojiType(emojiType === "discord" ? null : "discord"),
      },
      "Discord"
    ),
    React.createElement(
      "button",
      {
        className: `button ${emojiType === "slack" && "is-warning"}`,
        type: "button",
        onClick: () => setEmojiType(emojiType === "slack" ? null : "slack"),
      },
      "Slack"
    )
    ),
    React.createElement("hr", null),
    React.createElement("div", { className: "mb-4" },
    React.createElement("strong", { className: "has-text-info" }, `Copy text below and paste into ${emojiType === "slack" ? "Slack" : "Discord"} for emojified text`)),
    React.createElement("textarea", { className: "textarea", readOnly: true, value: emojified })
  );
}

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App, null));