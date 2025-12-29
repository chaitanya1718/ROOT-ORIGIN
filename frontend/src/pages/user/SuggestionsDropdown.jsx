const normalize = (str = "") =>
  str.toLowerCase().replace(/[\s-]/g, "");

const eventSuggestions = [
  "Events",
  "Birthday",
  "Marriage",
  "Wedding",
];

const SuggestionsDropdown = ({
  query,
  products,
  onSelect,
}) => {
  if (!query) return null;

  const normalizedQuery = normalize(query);

  // 🔹 Product suggestions (top 5)
  const productSuggestions = products
    .filter((p) =>
      normalize(p.name).includes(normalizedQuery)
    )
    .slice(0, 5);

  // 🔹 Unique tags
  const tags = [...new Set(products.map((p) => p.tag))];

  return (
    <div className="search-dropdown">
      {/* 🔹 PRODUCTS */}
      {productSuggestions.length > 0 && (
        <div className="dropdown-section">
          <p className="dropdown-title">Products</p>

          {productSuggestions.map((p) => (
            <div
              key={p._id}
              className="dropdown-item"
              onClick={() => onSelect(p.name)}
            >
              {p.name}
            </div>
          ))}
        </div>
      )}

      {/* 🔹 TAG BUTTONS */}
      <div className="dropdown-section">
        <p className="dropdown-title">Categories</p>

        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <button
              key={tag}
              className="suggestion-chip"
              onClick={() => onSelect(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 EVENT BUTTONS */}
      <div className="dropdown-section">
        <p className="dropdown-title">Events</p>

        <div className="flex gap-2 flex-wrap">
          {eventSuggestions.map((event) => (
            <button
              key={event}
              className="suggestion-chip bg-purple-100 border-purple-500"
              onClick={() => onSelect(event)}
            >
              {event}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionsDropdown;
