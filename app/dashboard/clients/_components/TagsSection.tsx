import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TagsSectionProps {
  tags: string[];
  filtredTags: string[];
  setFiltredTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TagsSection({
  tags,
  filtredTags,
  setFiltredTags,
}: TagsSectionProps) {
  const [showAllTags, setShowAllTags] = useState(false);
  const maxVisibleTags = 6;

  const visibleTags = showAllTags ? tags : tags.slice(0, maxVisibleTags);
  const hasMoreTags = tags.length > maxVisibleTags;

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 mad:gap-0 justify-center ">
      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag, i) => (
          <Button
            variant={filtredTags.includes(tag) ? "default" : "outline"}
            className=" cursor-pointer"
            key={i}
            onClick={() =>
              setFiltredTags((prev) =>
                prev.includes(tag)
                  ? prev.filter((v) => v !== tag)
                  : [...prev, tag]
              )
            }
          >
            {tag}
          </Button>
        ))}
      </div>

      {hasMoreTags && (
        <Button
          className="mr-auto border-primary border"
          variant="ghost"
          onClick={() => setShowAllTags(!showAllTags)}
        >
          {showAllTags ? (
            <>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />({tags.length - maxVisibleTags}{" "}
              more)
            </>
          )}
        </Button>
      )}
    </div>
  );
}
