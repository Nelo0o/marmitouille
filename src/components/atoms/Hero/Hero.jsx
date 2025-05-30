import "./Hero.scss";

export default function Hero({ title, subtitle, backgroundImage }) {
  const defaultStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(255, 107, 107, 0.9) 0%, rgba(255, 107, 107, 0.7) 100%), url('${backgroundImage}')`,
      }
    : {};

  return (
    <section data-testId="heroSection" className="hero" style={defaultStyle}>
      <div className="hero__content">
        <h1 data-testId="heroTitle" className="hero__title">{title}</h1>
        {subtitle && <p data-testId="heroSubTitle" className="hero__subtitle">{subtitle}</p>}
      </div>
    </section>
  );
}
