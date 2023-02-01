import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./style.css";

const TagInput = ({ tags, setTags }) => {
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

  const validateTags = (data) => {
    return data.length <= 0;
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
        error={validateTags(tags)}
        helperText={
          validateTags(tags)
            ? "Tags cant be empty "
            : "Please add the book tags"
        }
        type="text"
        label="Book tags"
        className="tags-input"
        placeholder="Type somthing"
      />
    </div>
  );
};

export default TagInput;
