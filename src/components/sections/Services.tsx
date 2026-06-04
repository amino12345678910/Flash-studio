export default function Services() {
  return (
    <section className="min-h-screen py-32 px-6 md:px-20 bg-background text-foreground" id="services">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-5xl md:text-7xl mb-16 text-gold">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {['Wedding', 'Portrait', 'Model', 'Creative'].map((service) => (
            <div key={service} className="border-t border-foreground/20 pt-8">
              <h3 className="font-serif text-3xl mb-4">{service}</h3>
              <p className="text-sm opacity-60 leading-relaxed">
                Experience luxury {service.toLowerCase()} photography with our signature cinematic style and modern aesthetic.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
