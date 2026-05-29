const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  top: `${8 + ((index * 13) % 78)}%`,
  left: `${4 + ((index * 19) % 88)}%`,
  size: `${8 + (index % 5) * 5}px`,
  delay: `${(index % 6) * 0.7}s`,
  duration: `${10 + (index % 4) * 4}s`
}));

export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__grid" />
      <div className="ambient__glow ambient__glow--one" />
      <div className="ambient__glow ambient__glow--two" />
      <div className="ambient__glow ambient__glow--three" />
      <div className="ambient__noise" />
      <div className="ambient__scanlines" />
      <div className="ambient__particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="ambient__particle"
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>
    </div>
  );
}
