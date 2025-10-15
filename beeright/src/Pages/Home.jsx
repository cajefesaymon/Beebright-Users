import React from "react";

export default function Home() {
  return (
    <main className="bg-[#FDFDFD]   text-[#1A1A1A]">
      {/* HERO */}
      <section className="relative bg-white min-h-[620px] flex items-center overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: text – left-aligned, vertically centered */}
          <div>
            <h1 className="text-6xl font-extrabold mb-3 text-[#1A1A1A]">
              Welcome to our learning hive!
            </h1>
            <p className="text-lg mb-7 text-[#1A1A1A]/90 leading-relaxed">
              <strong>Student-loved, parent-approved.</strong><br />
              Welcome to Dagupan City's premier destination for one-on-one academic tutorial and toddlers
              playgroup! We're not just a learning hive — we're a family! 🐝
            </p>
            <button className="bg-[#F9C80E] hover:bg-[#F6AE2D] text-[#1A1A1A] font-semibold px-6 py-3 rounded-xl shadow-[0_6px_16px_rgba(0,0,0,.08)] transition">
              Get Started Today
            </button>
          </div>

          {/* Right: Simple Box Hive */}
          <div className="relative h-[420px] md:h-[500px] select-none" aria-hidden="true">
  {/* Move to the right */}
  <div className="absolute left-[65%] top-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="w-[120px] h-[120px] rounded-2xl border-4 border-black/90 bg-amber-100"></div>
    <div className="w-[120px] h-[120px] rounded-2xl border-4 border-black/90 bg-amber-200 -mt-8 ml-8"></div>
    <div className="w-[120px] h-[120px] rounded-2xl border-4 border-black/90 bg-amber-300 -mt-8 -ml-8"></div>
    <div className="w-[120px] h-[120px] rounded-2xl border-4 border-black/90 bg-amber-400 -mt-8 ml-16"></div>
  </div>
</div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-[1180px] mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Our Services Offered</h2>
        <div className="grid md:grid-cols-3 gap-7">
          {[
            "TODDLERS PLAYGROUP",
            "ACADEMIC TUTORIAL",
            "KINDER QUEST",
            "EXAMINATION PREPARATION",
            "SPED TUTORIAL",
            "READING AND WRITING PROGRAM",
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,.08)] overflow-hidden"
            >
              <div className="h-[200px] bg-gradient-to-br from-[#FFF5C2] to-[#FFFDF4]" />
              <div className="p-5">
                <h4 className="font-semibold text-lg mb-2">{t}</h4>
                <ul className="list-disc ml-5 text-[#6b7280]">
                  <li>Engaging activities, caring mentors</li>
                  <li>Personalized guidance</li>
                  <li>Safe, friendly environment</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="max-w-[1180px] mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-7">
          <Feature icon="👩‍🏫" title="Excellent Teachers" text="Passionate and dedicated mentors who bring out each child's best." />
          <Feature icon="🧾" title="Personalized Worksheets & Activities" text="Every activity fits your child's pace and learning style." />
          <Feature icon="🏫" title="Child-Friendly Environment" text="A safe, cozy, welcoming space that makes learning enjoyable." />
          <Feature icon="📅" title="Flexible Schedules" text="Learning fits seamlessly into your family's routine." />
        </div>
        <p className="text-center text-[#6b7280] mt-6">
          With the right support, children grow more confident and ready to face challenges.
        </p>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="max-w-[1180px] mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Parent Testimonies</h2>
        <div className="grid md:grid-cols-3 gap-7">
          {[
            "It's been amazing to witness how they nurture early literacy...",
            "Thank you BeeBright! My son has shown great improvements since day one...",
            "A big thank you to BeeBright and the amazing teachers. In just a month...",
          ].map((q, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,.08)] p-10 flex flex-col justify-between min-h-[570px]"
            >
              <p className="text-lg italic">"{q}"</p>
              <div className="flex items-center justify-between mt-6">
                <span className="text-2xl">👤</span>
                <div className="text-[#F6AE2D]">★ ★ ★ ★ ★</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-[1180px] mx-auto py-16 px-6">
  <h2 className="text-4xl font-bold text-center mb-8">Ready to Get Started?</h2>
  <div className="grid grid-cols-2 md:grid-cols-2 gap-7 bg-white rounded-2xl p-12 shadow-[0_6px_16px_rgba(0,0,0,.08)] min-h-[550px] items-center justify-center">
    <ContactItem icon="📞" label="(075) 636 8093" />
    <ContactItem icon="✉️" label="beebrightph@gmail.com" />
    <ContactItem icon="📍" label="Room A, 2nd Flr., Teo-Tray Bldg., Tapuac, Dagupan City" />
    <ContactItem icon="📸" label="@beebrighttch_" />
  </div>
</section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex gap-5 bg-white p-10 rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,.08)]">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-lg mb-1">{title}</h4>
        <p className="text-[#6b7280]">{text}</p>
      </div>
    </div>
  );
}

function ContactItem({ icon, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl">{icon}</div>
      <div className="text-[#6b7280] mt-2">{label}</div>
    </div>
  );
}