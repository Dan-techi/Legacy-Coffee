const team = [
  { name: 'Jane Doe', role: 'Founder & CEO' },
  { name: 'John Mukasa', role: 'Head of Farming Operations' },
  { name: 'Sarah Nambi', role: 'Community Outreach Lead' },
]

export default function AboutUs() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-peach py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About Legacy Coffee</h1>
        <p className="text-brown max-w-2xl mx-auto text-lg">
          Rooted in the fertile soils of Western Uganda, we combine tradition, innovation, and social impact.
        </p>
      </section>

      {/* Story */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"
            alt="Our story"
            className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover h-80"
          />
          <div>
            <h2 className="text-primary text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-brown leading-relaxed mb-4">
              Legacy Coffee was founded out of a passion for both great coffee and community transformation.
              Our journey began as a family effort to uplift farmers who struggled to earn fair returns from their harvests.
            </p>
            <p className="text-brown leading-relaxed">
              Today, we work with hundreds of smallholder farmers across Kyenjojo, Kabarole, and Bunyangabu,
              providing training, fair pricing, and access to global markets.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-16 px-6 bg-peach-light">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { title: 'Mission', text: 'To deliver premium-quality coffee while transforming lives through fair trade, sustainable farming, and community empowerment.' },
            { title: 'Core Values', text: 'Quality | Fairness | Integrity | Sustainability | Empowerment' },
            { title: 'Vision', text: 'A thriving coffee industry in Uganda where farmers, youth, and women enjoy prosperity, dignity, and opportunity.' },
          ].map(c => (
            <div key={c.title} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-primary font-bold text-xl mb-3">{c.title}</h3>
              <p className="text-brown text-sm leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-primary text-3xl font-bold mb-10">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map(member => (
              <div key={member.name} className="bg-peach-light rounded-xl p-6">
                <div className="w-20 h-20 rounded-full bg-peach mx-auto mb-4 flex items-center justify-center text-primary font-bold text-2xl">
                  {member.name[0]}
                </div>
                <h4 className="text-brown font-semibold text-lg">{member.name}</h4>
                <p className="text-brown/70 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
