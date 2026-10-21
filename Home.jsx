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

      {/* From Farm to Future */}
      <section className="relative overflow-hidden bg-peach-light px-5 py-16 md:px-8 md:py-14">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full" style={{ background: '#C4581A' }} />
        <div className="absolute -left-36 -top-36 h-80 w-80 rounded-full border-2 border-peach-mid/60" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full" style={{ background: '#C4581A' }} />
        <div className="absolute -bottom-36 -right-36 h-80 w-80 rounded-full border-2 border-peach-mid/60" />
        <div className="relative z-10 mx-auto max-w-[1380px]">
          <div className="mb-8 text-center md:mb-7">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.42em] text-brown md:text-sm">Our Focus</p>
            <div className="mx-auto mb-3 h-[3px] w-12 bg-primary" />
            <h2 className="mb-2 font-black leading-tight text-brown" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              From Farm to Future
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-brown/80 md:text-xl">
              We work across the entire coffee value chain — supporting farmers, improving quality, and creating sustainable opportunities.
            </p>
          </div>

          <div className="grid items-start gap-8 md:grid-cols-3 md:gap-12">
            <div className="group relative md:-translate-y-6">
              <div
                className="relative flex min-h-[320px] flex-col overflow-hidden transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:rotate-[1deg] motion-reduce:transition-none"
                style={{ background: 'linear-gradient(135deg, #351a08 0%, #48240e 100%)', border: '1px solid rgba(245, 200, 150, 0.7)', borderRadius: '38px 54px 48px 44px', boxShadow: '0 22px 48px rgba(75,42,16,0.25)' }}
              >
                <svg className="absolute bottom-0 right-0 h-[58%] w-[68%] transition-transform duration-700 ease-out motion-safe:group-hover:-translate-x-2 motion-safe:group-hover:scale-110 motion-reduce:transition-none" viewBox="0 0 260 260" preserveAspectRatio="none" aria-hidden="true">
                  <path fill="#E8B07A" d="M260,260 L80,260 C80,260 20,250 10,200 C0,150 30,110 70,90 C110,70 160,80 200,60 C240,40 260,0 260,0 Z" />
                </svg>
                <svg className="absolute bottom-0 right-0 h-[46%] w-[52%]" viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true">
                  <path fill="#F5C896" d="M200,200 L60,200 C60,200 10,188 5,148 C0,108 28,78 65,62 C102,46 148,58 175,38 C202,18 200,0 200,0 Z" />
                </svg>
                <svg className="absolute bottom-0 right-0 h-[58%] w-[68%]" viewBox="0 0 260 260" preserveAspectRatio="none" aria-hidden="true">
                  <path fill="none" stroke="#C8922A" strokeWidth="1.5" d="M260,140 C220,155 180,170 140,185 C110,196 85,205 60,215 C40,222 20,240 0,260" />
                </svg>
                <div className="relative z-10 flex h-full flex-col p-7 xl:p-9">
                  <h3 className="mb-4 font-bold leading-[1.04] text-[#E5A547]" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 2.4vw, 2.4rem)' }}>Mission</h3>
                  <p className="max-w-[290px] text-base leading-[1.5] text-white/80 md:text-lg">
                    To deliver premium-quality coffee while transforming lives through fair trade, sustainable farming, and community empowerment.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative md:mt-2">
              <div
                className="relative flex min-h-[320px] flex-col overflow-hidden transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:-rotate-[1deg] motion-reduce:transition-none"
                style={{ background: 'linear-gradient(135deg, #D94D08 0%, #F17816 100%)', border: '1px solid rgba(255, 225, 180, 0.75)', borderRadius: '42px 100px 40px 44px', boxShadow: '0 22px 48px rgba(163,77,23,0.22)' }}
              >
                <svg className="absolute right-0 top-0 h-[35%] w-[48%] transition-transform duration-700 ease-out motion-safe:group-hover:translate-x-2 motion-safe:group-hover:scale-110 motion-reduce:transition-none" viewBox="0 0 200 150" preserveAspectRatio="none" aria-hidden="true">
                  <path fill="#F3A33F" fillOpacity="0.48" d="M0,0 H200 V150 C148,136 132,118 100,92 C68,66 38,20 0,0 Z" />
                </svg>
                <svg className="absolute bottom-0 left-0 h-[42%] w-full" viewBox="0 0 380 200" preserveAspectRatio="none" aria-hidden="true">
                  <path fill="#F7A94F" d="M0,200 L0,120 C30,95 70,140 120,118 C160,100 190,75 230,85 C270,95 310,130 380,100 L380,200 Z" />
                </svg>
                <svg className="absolute bottom-0 left-0 h-[34%] w-full" viewBox="0 0 380 200" preserveAspectRatio="none" aria-hidden="true">
                  <path fill="#FFB84F" fillOpacity="0.82" d="M0,200 L0,148 C40,128 85,162 130,145 C170,130 205,108 248,118 C290,128 330,155 380,138 L380,200 Z" />
                </svg>
                <div className="relative z-10 flex h-full flex-col p-7 xl:p-9">
                  <h3 className="mb-4 font-bold leading-[1.04] text-white" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 2.4vw, 2.4rem)' }}>Core Values</h3>
                  <p className="max-w-[290px] text-base leading-[1.5] text-white/85 md:text-lg">
                    Quality | Fairness | Integrity | Sustainability | Empowerment
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative md:mt-2">
              <div
                className="relative flex min-h-[320px] flex-col overflow-hidden transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:rotate-[1deg] motion-reduce:transition-none"
                style={{ background: 'linear-gradient(135deg, #FFF9ED 0%, #FAF1E1 100%)', border: '1px solid rgba(164, 104, 55, 0.48)', borderRadius: '44px 84px 46px 42px', boxShadow: '0 22px 48px rgba(92,58,30,0.14)' }}
              >
                <svg className="absolute bottom-0 right-0 h-[62%] w-[62%] transition-transform duration-700 ease-out motion-safe:group-hover:-translate-x-2 motion-safe:group-hover:scale-110 motion-reduce:transition-none" viewBox="0 0 240 240" preserveAspectRatio="none" aria-hidden="true">
                  <path fill="#C4783A" d="M240,240 L70,240 C70,240 15,228 8,182 C0,136 32,100 72,82 C112,64 158,76 192,54 C226,32 240,0 240,0 Z" />
                </svg>
                <svg className="absolute bottom-0 right-0 h-[46%] w-[46%]" viewBox="0 0 180 180" preserveAspectRatio="none" aria-hidden="true">
                  <path fill="#E8A86A" fillOpacity="0.6" d="M180,180 L55,180 C55,180 12,170 6,136 C0,102 26,74 58,60 C90,46 130,54 155,36 C180,18 180,0 180,0 Z" />
                </svg>
                <svg className="absolute bottom-0 right-0 h-[62%] w-[62%]" viewBox="0 0 240 240" preserveAspectRatio="none" aria-hidden="true">
                  <path fill="none" stroke="#7A3A18" strokeWidth="1.2" strokeOpacity="0.5" d="M240,110 C200,128 162,148 124,166 C96,180 70,192 44,206 C28,214 14,228 0,240" />
                  <path fill="none" stroke="#7A3A18" strokeWidth="1" strokeOpacity="0.3" d="M240,140 C205,155 168,172 132,188 C104,200 76,212 48,224 C32,230 16,236 0,240" />
                </svg>
                <div className="relative z-10 flex h-full flex-col p-7 xl:p-9">
                  <h3 className="mb-4 font-bold leading-[1.04] text-[#A95720]" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 2.4vw, 2.4rem)' }}>Vision</h3>
                  <p className="max-w-[290px] text-base leading-[1.5] text-[#2C1A0E]/80 md:text-lg">
                    A thriving coffee industry in Uganda where farmers, youth, and women enjoy prosperity, dignity, and opportunity.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
