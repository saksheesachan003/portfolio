// Infinite horizontal ticker. The list is rendered twice and the track slides
// by -50%, so the loop is seamless. Decorative: the same items are listed
// accessibly elsewhere, so it is hidden from screen readers.
export default function Marquee({ items, reverse = false }) {
  return (
    <div className={`marquee ${reverse ? "marquee--reverse" : ""}`} aria-hidden="true">
      <div className="marquee__track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <span className="marquee__star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
