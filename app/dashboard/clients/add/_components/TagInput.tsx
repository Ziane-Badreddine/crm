"use client"

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

const TagInput = ({ value, onChange }: { value: string[], onChange: (value: string[]) => void }) => {

   
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }
  };



  return (
    <div className="flex flex-wrap gap-2">
      <Input
        type="text"
        placeholder="Add a tag..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value?.map((tag, i) => (
        <Badge
          key={i}
          className="h-8"
          variant={"secondary"}
          onClick={() => removeTag(tag)}
        >
          <h1 className="text-base pr-2">{tag}</h1>
          <X className="mt-[2px] w-5 h-5" />
        </Badge>
      ))}
    </div>
  );
};

export default TagInput;