import { useState } from "react";

export interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onSearch: (query: string) => void;
}

export function SearchBar({
  value = "",
  placeholder = "Search photos...",
  onSearch
}: SearchBarProps) {
  const [query, setQuery] = useState(value);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        value={query}
        placeholder={placeholder}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        aria-label="Search media"
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}