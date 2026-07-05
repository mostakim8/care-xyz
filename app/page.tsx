"use client";
import { useState, useEffect } from "react";
import { services } from "@/data/services";
import Link from "next/link";

export default function Home() {
  const images = [
    "/slide2_files/cabine.jpg",
    "/slide2_files/OT.jpg",
    "/slide3_files/waitingroom.jpg",
    "/slide3_files/DoctorRoom.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-black text-white transition-colors duration-300">
      {/*  Banner with Fixed Opacity */}
      <section className="relative h-[85vh] flex items-center justify-center bg-black overflow-hidden px-6 text-center">
        <div className="absolute inset-0 z-0">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentIndex
                  ? "opacity-90 scale-100"
                  : "opacity-0 scale-105"
              } transform transition-transform duration-[3000ms]`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
        </div>

        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -top-20 -left-20 z-10"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] bottom-0 right-0 z-10"></div>

        <div className="relative z-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight ">
            Compassionate <span className="text-blue-500">Care</span> <br />
            Because Family Matters
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 italic drop-shadow-md">
            "To care for those who once cared for us is one of the highest
            honors." Providing professional support with a heart.
          </p>
          <Link
            href="#services"
            className="inline-block bg-blue-400 hover:bg-blue-200 text-white hover:text-black/70 hover:shadow-none px-10 py-4 rounded-full font-bold transition-all transform  shadow-lg shadow-blue-600/30 cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950/40 px-6 border-y border-gray-200/50 dark:border-gray-900 transition-colors duration-300 relative overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] -top-10 -right-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-blue-600 dark:text-blue-500 font-bold tracking-widest uppercase text-xs px-3 py-1 bg-blue-50 dark:bg-blue-950/50 rounded-full border border-blue-200/30 dark:border-blue-800/30">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-4 mb-6 text-gray-950 dark:text-white leading-tight">
                Bridging the Gap Between <br /> Care and Need
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                Care.xyz was founded with a simple mission: to ensure that no
                one has to struggle to find reliable, high-quality care for
                their loved ones. We bring professional healthcare assistance
                directly to your home with trust.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200/60 dark:border-gray-900">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    100% Certified Experts
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Every caregiver is professionally trained and
                    background-verified.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Transparent Booking
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No hidden costs. Track everything right from your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:mt-0 mt-8 flex justify-center">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-3xl blur-xl opacity-70" />

            <div className="relative w-full max-w-[500px] h-[400px] rounded-3xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop"
                alt="Compassionate Caregiving"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 flex items-center space-x-3 max-w-[200px] animate-bounce-slow">
              <span className="text-3xl">🛡️</span>
              <div>
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
                  Trusted By
                </h4>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  500+ Families
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950/40 px-6 border-b border-gray-200/60 dark:border-gray-900 transition-colors duration-300">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Get the best care for your family in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-24">
          {/* Step 1 */}
          <div className="p-8 bg-white dark:bg-gray-900/30 hover:shadow-xl dark:hover:shadow-blue-900/50 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 shadow-sm transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 flex items-center justify-center rounded-full font-bold text-xl mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Select Service
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Choose from Baby care, Elderly care, or Patient care services.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-8 bg-white dark:bg-gray-900/30 hover:shadow-xl dark:hover:shadow-blue-900/50 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 shadow-sm transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 flex items-center justify-center rounded-full font-bold text-xl mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Book Appointment
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Fill up the simple form with dates and preferred requirements.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-8 bg-white dark:bg-gray-900/30 hover:shadow-xl dark:hover:shadow-blue-900/50 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 shadow-sm transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 flex items-center justify-center rounded-full font-bold text-xl mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Get Caregiver
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Our verified professional caregiver will arrive right at your
              doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 bg-gray-50 dark:bg-gray-950/40 px-6 border-b border-gray-200/60 dark:border-gray-900 transition-colors duration-300"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white mb-4">
            Our Specialized Services
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Expert care solutions tailored for every stage of life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-24">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-10 bg-white dark:bg-gray-900/30 border border-gray-200/60 dark:border-gray-800/60 rounded-3xl hover:border-blue-500/50 dark:hover:border-blue-500/30 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 shadow-sm transition-all duration-300 group relative overflow-hidden"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">
                {service.id === "1" ? "👶" : service.id === "2" ? "👴" : "🏥"}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-sm font-medium">
                {service.desc}
              </p>
              <Link
                href={`/service/${service.id}`}
                className="inline-flex items-center text-blue-600 dark:text-blue-500 font-bold hover:translate-x-1 transition-transform cursor-pointer"
              >
                Booking Now <span className="ml-2">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics Section */}
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

      {/* Testimonials / Reviews Section*/}
      <section className="py-24 bg-gray-50 dark:bg-gray-950/40 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black dark:text-gray-50">
              What Our Clients Say
            </h2>
            <p className="text-gray-500">
              Real stories from people who trusted our care services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-gray-800">
              <p className="text-gray-400 italic mb-4">
                "The elderly care service was excellent. The caregiver treated
                my father like her own family."
              </p>
              <h5 className="font-bold text-blue-400">- Rahat Chowdhury</h5>
            </div>
            <div className="p-6 rounded-2xl border border-gray-800">
              <p className="text-gray-400 italic mb-4">
                "Finding a professional babysitter was so stressful until I
                found Care.xyz. Highly recommended!"
              </p>
              <h5 className="font-bold text-blue-400">- Sadia Islam</h5>
            </div>
            <div className="p-6 rounded-2xl border border-gray-800">
              <p className="text-gray-400 italic mb-4">
                "Very transparent and punctual service. The nursing support
                after surgery was highly professional."
              </p>
              <h5 className="font-bold text-blue-400">- Tasnim Ahmed</h5>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
