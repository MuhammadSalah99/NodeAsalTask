import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./style.css";

const TagInput = () => {
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  return (
    <div className="tags-input-container">
      {tags.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => removeTag(index)}>
            &times;
          </span>
        </div>
      ))}
      <TextField
        onKeyDown={handleKeyDown}
        type="text"
        label="Book tags"
        className="tags-input"
        placeholder="Type somthing"
      />
    </div>
  );
};

export default TagInput;
