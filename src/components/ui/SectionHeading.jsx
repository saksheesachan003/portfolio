export default function SectionHeading({ index, title, kicker }) {
  return (
    <header className="section-heading reveal">
      <span className="section-index">{index}</span>
      <div>
        <h2>{title}</h2>
        {kicker && <p className="section-kicker">{kicker}</p>}
      </div>
    </header>
  );
}
