export default function Contact() {
  return (
    <section className="min-h-screen py-32 px-6 md:px-20 bg-background text-foreground flex flex-col justify-center" id="contact">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="font-serif text-6xl md:text-9xl mb-8 text-gold uppercase tracking-tighter">
          Inquire
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-20">
          <div>
            <p className="text-lg opacity-80 mb-8 max-w-md">
              We take on a limited number of commissions each year to ensure the highest level of artistic dedication to our clients.
            </p>
            <p className="uppercase tracking-widest text-sm text-gold mb-2">Email</p>
            <a href="mailto:hello@flashstudio.com" className="text-2xl font-serif">hello@flashstudio.com</a>
          </div>
          <form className="flex flex-col gap-8">
            <input type="text" placeholder="Name" className="bg-transparent border-b border-foreground/20 py-4 outline-none focus:border-gold transition-colors font-serif text-xl" />
            <input type="email" placeholder="Email" className="bg-transparent border-b border-foreground/20 py-4 outline-none focus:border-gold transition-colors font-serif text-xl" />
            <textarea placeholder="Tell us about your event" rows={4} className="bg-transparent border-b border-foreground/20 py-4 outline-none focus:border-gold transition-colors font-serif text-xl resize-none"></textarea>
            <button type="button" className="self-start uppercase tracking-[0.2em] text-sm border border-gold text-gold px-10 py-4 hover:bg-gold hover:text-dark transition-colors mt-4">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
