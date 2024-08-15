import React from "react";

const InputBox = ({ value, onValueChange = () => {}, placeHolder, title }) => {
  return (
    <div>
      <p>{title}</p>
      <input
        style={{ outlineStyle: "none" }}
        className="border rounded-md py-1 px-3"
        value={value}
        placeholder={placeHolder ?? title}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
};

export const TextInput = React.memo(InputBox);
