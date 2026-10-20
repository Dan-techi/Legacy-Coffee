import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 100, label: 'Farmers Supported', suffix: '+' },
  { value: 50000, label: 'Kg Coffee Produced', suffix: '+' },
  { value: 5, label: 'Districts Covered', suffix: '' },
  { value: 200, label: 'Women Empowered', suffix: '+' },
]

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-[85vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Empowering Farmers.<br />Enriching Communities.
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            We specialize in producing high-quality, sustainably grown coffee while empowering smallholder farmers, youth, and women.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded font-semibold hover:opacity-90 transition-opacity">
              Shop Now
            </Link>
            <Link to="/about" className="border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-brown transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Mission / Core Values / Vision */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Mission', text: 'To deliver premium-quality coffee while transforming lives through fair trade, sustainable farming, and community empowerment.' },
            { title: 'Core Values', text: 'Quality | Fairness | Integrity | Sustainability | Empowerment' },
            { title: 'Vision', text: 'A thriving coffee industry in Uganda where farmers, youth, and women enjoy prosperity, dignity, and opportunity.' },
          ].map(card => (
            <div key={card.title} className="bg-peach-light rounded-xl p-8 text-center">
              <h3 className="text-primary text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-brown text-sm leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us snippet */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"
              alt="Coffee beans"
              className="w-80 h-80 object-cover rounded-full shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-primary text-3xl font-bold mb-4">About Us</h2>
            <p className="text-brown leading-relaxed mb-6">
              Legacy Coffee was founded out of a passion for both great coffee and community transformation.
              Rooted in the fertile soils of Western Uganda, our journey began as a family effort to uplift
              farmers who struggled to earn fair returns from their harvests. Today, we combine tradition,
              innovation, and social impact to create coffee that not only delights but also empowers.
            </p>
            <Link to="/about" className="bg-slate text-white px-6 py-2 rounded hover:opacity-90 transition-opacity inline-block">
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 px-6" style={{ background: 'linear-gradient(135deg, #FCEBD0 0%, #F5C08A 100%)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-primary text-3xl font-bold mb-6">Impact</h2>
            {[
              { title: 'Farmer Empowerment', text: 'We work hand-in-hand with local farmers, providing training in sustainable practices, quality control, and financial literacy.' },
              { title: 'Youth & Women Inclusion', text: 'By offering training, mentorship, and income opportunities, we empower young people and women to thrive in the coffee value chain.' },
              { title: 'Environmental Restoration', text: "Our commitment to nature includes tree planting and wetland restoration projects to safeguard Uganda's environment for future generations." },
            ].map(item => (
              <div key={item.title} className="mb-5">
                <h4 className="text-brown font-semibold text-lg mb-1">{item.title}</h4>
                <p className="text-brown/80 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1611174275735-5a8e4e3e3e3e?w=500"
              alt="Farmer"
              className="w-96 h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Impact in Numbers */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-primary text-3xl font-bold mb-12">Impact In Numbers</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(stat => (
            <div key={stat.label}>
              <div className="text-5xl font-bold text-brown mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-brown/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Coffee */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-primary text-3xl font-bold mb-4">Our Coffee</h2>
            <p className="text-brown leading-relaxed mb-6">
              Uganda's rich soils and high-altitude climate create the perfect conditions for exceptional coffee.
              Legacy Coffee sources directly from smallholder farmers in Kyenjojo, Kabarole, Bunyangabu and
              surrounding areas, ensuring freshness, traceability, and quality.
            </p>
            <Link to="/shop" className="bg-slate text-white px-6 py-2 rounded hover:opacity-90 transition-opacity inline-block">
              Read More
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
              alt="Coffee bag"
              className="w-80 h-96 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-16 px-6" style={{ background: 'linear-gradient(180deg, #FCEBD0 0%, #fff 100%)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-primary text-3xl font-bold mb-4">Partnerships</h2>
          <p className="text-brown max-w-3xl mx-auto mb-10 text-sm leading-relaxed">
            Legacy Coffee welcomes collaborations with Donors, NGOs, restaurants, hotels, exporters, and institutions.
            Whether through bulk orders, corporate gifting, or joint community projects, together we can make a greater impact.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 grayscale opacity-70">
            {['KCCA', 'ImagineHer', 'Tony Elumelu Foundation', 'YonderLife', 'CURAP', 'UNFCU Foundation'].map(p => (
              <div key={p} className="bg-white px-4 py-2 rounded shadow text-brown font-semibold text-sm">{p}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
