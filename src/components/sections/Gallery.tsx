export default function Gallery() {
  return (
    <section className="min-h-screen py-32 bg-dark text-foreground" id="gallery">
      <div className="px-6 md:px-20 mb-16">
        <h2 className="font-serif text-5xl md:text-7xl text-gold">Selected Works</h2>
      </div>
      <div className="w-full flex overflow-x-auto gap-8 px-6 md:px-20 pb-10 snap-x">
        {/* Placeholders for horizontal scroll gallery */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="min-w-[80vw] md:min-w-[40vw] h-[60vh] bg-foreground/5 snap-center rounded-sm"></div>
        ))}
      </div>
    </section>
  );
}
