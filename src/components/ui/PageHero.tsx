export default function PageHero({ image, title, subtitle }: { image: string; title: string; subtitle?: string }) {
  return (
    <section className="relative text-white overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[var(--color-navy)]/75" />
      <div className="container-wide py-16 md:py-24 relative z-10">
        <div className="w-12 h-[2px] bg-[var(--color-red)] mb-6" />
        <h1 className="text-page-title text-white mb-3">{title}</h1>
        {subtitle && <p className="text-white/50 max-w-xl">{subtitle}</p>}
      </div>
    </section>
  );
}
