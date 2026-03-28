import { services } from "@/data/services";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white transition-colors duration-300">
      {/* Banner with Caregiving Motivation */}
      <section className="relative h-[85vh] flex items-center justify-center bg-black overflow-hidden px-6 text-center">
        {/* Futuristic Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -top-20 -left-20"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] bottom-0 right-0"></div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Compassionate <span className="text-blue-500">Care</span> <br />
            Because Family Matters
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 italic">
            "To care for those who once cared for us is one of the highest
            honors." Providing professional support with a heart.
          </p>
          <Link
            href="#services"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* About Section: Platform Mission */}
      <section className="py-24 bg-gray-950 px-6 border-y border-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-blue-500 font-semibold tracking-widest uppercase mb-4">
            Our Mission
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Bridging the Gap Between Care and Need
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Care.xyz was founded with a simple mission: to ensure that no one
            has to struggle to find reliable, high-quality care for their loved
            ones. Whether it's a newborn, an elderly parent, or a recovering
            patient, we bring professional healthcare assistance directly to
            your home with trust and transparency.
          </p>
        </div>
      </section>

      {/* Services Overview: Baby Care, Elderly Service, Sick People Service */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Our Specialized Services
          </h2>
          <p className="text-gray-500">
            Expert care solutions tailored for every stage of life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-10 bg-gray-900/50 border border-gray-800 rounded-3xl hover:border-blue-500/50 hover:bg-gray-900 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Service Icon */}
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">
                {service.id === "1" ? "👶" : service.id === "2" ? "👴" : "🏥"}
              </div>
              <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {service.desc}
              </p>

              <Link
                href={`/service/${service.id}`}
                className="inline-flex items-center text-blue-500 font-bold hover:gap-2 transition-all"
              >
                Booking Now <span className="ml-2">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Success Metrics / Testimonials */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <h4 className="text-5xl font-black text-white mb-2">500+</h4>
            <p className="text-blue-100 font-bold uppercase tracking-wider">
              Happy Families
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <h4 className="text-5xl font-black text-white mb-2">120+</h4>
            <p className="text-blue-100 font-bold uppercase tracking-wider">
              Certified Caregivers
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <h4 className="text-5xl font-black text-white mb-2">10k+</h4>
            <p className="text-blue-100 font-bold uppercase tracking-wider">
              Service Hours
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
