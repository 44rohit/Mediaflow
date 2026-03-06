'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/ThemeContext';
import {
  HiOutlineUserAdd, HiOutlinePencilAlt, HiOutlinePlay, HiOutlineChartBar,
  HiOutlineSpeakerphone, HiOutlineGlobeAlt, HiOutlinePhotograph,
  HiOutlineTrendingUp, HiOutlineChatAlt2, HiOutlineLightningBolt,
  HiOutlineStar, HiOutlineArrowRight, HiOutlineCheck, HiOutlineArrowNarrowRight
} from 'react-icons/hi';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

function AnimatedSection({ children, style, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-60px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger} className={className} style={style}>
      {children}
    </motion.div>
  );
}

// ============ HERO ============
function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '140px 24px 80px',
    }}>
      {/* Background Effects */}
      <div className="orb animate-float" style={{ width: '600px', height: '600px', background: '#6366f1', top: '-15%', left: '-15%' }} />
      <div className="orb animate-float-delay" style={{ width: '500px', height: '500px', background: '#a855f7', bottom: '-10%', right: '-10%' }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '800px', height: '800px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial="hidden" animate="visible" variants={stagger}
        style={{ textAlign: 'center', maxWidth: '900px', position: 'relative', zIndex: 1 }}
      >
        {/* Tag */}
        <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
          <span className="tag-pill">
            <HiOutlineLightningBolt size={14} />
            The #1 Marketing Platform for Local Businesses
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={fadeUp} style={{
          fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          fontWeight: '800', lineHeight: '1.05', marginBottom: '28px',
          fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.03em',
        }}>
          Smart Media<br />
          <span className="gradient-text">Marketing</span> Platform
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={fadeUp} style={{
          fontSize: '1.1rem', color: 'var(--text-secondary)',
          maxWidth: '560px', margin: '0 auto 44px', lineHeight: '1.7',
        }}>
          Connect with our expert marketing team, launch targeted campaigns, 
          and grow your business with real-time analytics and performance tracking.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register">
            <button className="btn-primary" style={{ padding: '16px 44px', fontSize: '0.95rem' }}>
              Start Your Campaign <HiOutlineArrowRight size={18} />
            </button>
          </Link>
          <Link href="/about">
            <button className="btn-secondary" style={{ padding: '16px 44px', fontSize: '0.95rem' }}>
              Learn More
            </button>
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.div variants={fadeUp} style={{ marginTop: '72px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '-8px' }}>
            {['R', 'P', 'A', 'S', 'M'].map((letter, i) => (
              <div key={i} style={{
                width: '36px', height: '36px', borderRadius: '100px',
                background: `hsl(${240 + i * 30}, 70%, ${50 + i * 5}%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '0.75rem', fontWeight: '700',
                border: '2px solid var(--bg-primary)',
                marginLeft: i > 0 ? '-8px' : '0',
                fontFamily: 'Outfit, sans-serif',
              }}>{letter}</div>
            ))}
            <span style={{ marginLeft: '12px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              120+ Partners
            </span>
          </div>
          <div style={{ display: 'flex', gap: '4px', color: '#f59e0b' }}>
            {[...Array(5)].map((_, i) => <HiOutlineStar key={i} size={16} />)}
            <span style={{ marginLeft: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>4.9/5 rating</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============ MARQUEE ============
function MarqueeSection() {
  const items = ['Social Media Ads', 'Google Advertising', 'Content Creation', 'Influencer Marketing', 'Local SEO', 'Analytics', 'Brand Strategy', 'Video Marketing'];
  return (
    <div className="marquee-container" style={{ opacity: 0.35 }}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase',
            letterSpacing: '2px', color: 'var(--text-primary)', whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============ ABOUT SECTION ============
function AboutSection() {
  return (
    <section style={{ padding: '120px 24px' }}>
      <AnimatedSection style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="bento-grid-2">
          <div>
            <motion.div variants={fadeUp}>
              <div className="line-accent" style={{ marginBottom: '20px' }} />
              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: '700', marginBottom: '20px', fontFamily: 'Outfit, sans-serif', lineHeight: '1.1' }}>
                ABOUT<br />MEDIAFLOW
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '16px' }}>
                MediaFlow is a forward-thinking media marketing company dedicated to transforming 
                your local business into a digital success. We specialize in creating impactful 
                marketing campaigns tailored to your unique audience.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '32px' }}>
                Whether you&#39;re a startup or an established business, we&#39;re here to amplify 
                your brand reach through smart, data-driven marketing strategies.
              </p>
              <Link href="/about">
                <button className="btn-secondary btn-sm" style={{ borderRadius: '100px' }}>
                  Learn More <HiOutlineArrowNarrowRight size={16} />
                </button>
              </Link>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {[
              { value: '100+', label: 'projects' },
              { value: '32', label: 'partners' },
              { value: '3', label: 'offices' },
            ].map((stat, i) => (
              <div key={i} className="bento-card" style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif', marginBottom: '4px' }}>{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}

// ============ SERVICES / BENTO GRID ============
function ServicesSection() {
  const services = [
    { icon: HiOutlineSpeakerphone, title: 'Social Media Marketing', desc: 'Targeted campaigns on Facebook, Instagram, and YouTube designed to maximize your reach and drive conversions with data-driven approach.', span: true },
    { icon: HiOutlineTrendingUp, title: 'Digital Marketing Strategies', desc: 'Harness the power of targeted digital campaigns to transform your online and offline conversions.', span: false },
    { icon: HiOutlinePhotograph, title: 'Creative Design Service', desc: 'Eye-catching visuals to intuitive user experiences, our creative design services are tailored to your brand.', span: false },
    { icon: HiOutlineGlobeAlt, title: 'E-Commerce', desc: 'Elevate your online retail experience with our comprehensive e-commerce solutions.', span: false },
    { icon: HiOutlineChatAlt2, title: 'Influencer Marketing', desc: 'Partner with local influencers who resonate with your target market.', span: false },
    { icon: HiOutlineChartBar, title: 'Analytics & Reporting', desc: 'Detailed performance reports with actionable insights for growth.', span: true },
  ];

  return (
    <section style={{ padding: '120px 24px', background: 'var(--bg-secondary)' }}>
      <AnimatedSection style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="line-accent" style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '700', fontFamily: 'Outfit, sans-serif', lineHeight: '1.1' }}>
              OUR SERVICES
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px', marginTop: '16px', lineHeight: '1.7' }}>
              Explore our array of services, from web development to e-commerce solutions, 
              designed to elevate your online presence.
            </p>
          </div>
          <Link href="/about">
            <button className="btn-secondary btn-sm" style={{ borderRadius: '100px' }}>
              Contact Us <HiOutlineArrowNarrowRight size={16} />
            </button>
          </Link>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="bento-grid-3">
          {services.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className={`bento-card ${s.span ? 'bento-span-2' : ''}`} style={{
              padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: '200px',
            }}>
              <div>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: 'var(--bg-input)', border: '1px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '24px', color: 'var(--text-primary)',
                }}>
                  <s.icon size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '10px', fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.7' }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

// ============ HOW IT WORKS ============
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Register', desc: 'Sign up as a vendor partner and share your business details with us.' },
    { num: '02', title: 'Submit Campaign', desc: 'Upload your product details, set your budget, and define your marketing goals.' },
    { num: '03', title: 'We Market', desc: 'Our expert team launches targeted campaigns across multiple digital platforms.' },
    { num: '04', title: 'Track Results', desc: 'Monitor real-time analytics — reach, clicks, engagement, and ROI from your dashboard.' },
  ];

  return (
    <section style={{ padding: '120px 24px' }}>
      <AnimatedSection style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="line-accent" style={{ margin: '0 auto 20px' }} />
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>
            HOW IT WORKS
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px', margin: '16px auto 0' }}>
            Four simple steps to transform your local business into a digital success story.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="bento-grid-4">
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeUp} className="bento-card" style={{
              padding: '36px 28px', textAlign: 'left',
              background: i === 1 ? 'var(--accent-primary)' : undefined,
              borderColor: i === 1 ? 'transparent' : undefined,
            }}>
              <div style={{
                fontSize: '0.85rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif',
                color: i === 1 ? 'rgba(255,255,255,0.6)' : 'var(--accent-primary)',
                marginBottom: '24px',
              }}>{step.num}.</div>
              <h3 style={{
                fontSize: '1.3rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif',
                marginBottom: '12px',
                color: i === 1 ? 'white' : 'var(--text-primary)',
              }}>{step.title}</h3>
              <p style={{
                fontSize: '0.88rem', lineHeight: '1.7',
                color: i === 1 ? 'rgba(255,255,255,0.75)' : 'var(--text-secondary)',
              }}>{step.desc}</p>
              {i === 1 && (
                <div style={{ marginTop: '24px' }}>
                  <Link href="/register" style={{ color: 'white', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Learn More <HiOutlineArrowNarrowRight size={16} />
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

// ============ STATS BAR ============
function StatsBar() {
  const stats = [
    { value: '500+', label: 'Campaigns Launched' },
    { value: '120+', label: 'Local Partners' },
    { value: '3×', label: 'Average ROI' },
    { value: '2M+', label: 'People Reached' },
  ];

  return (
    <section style={{
      padding: '64px 24px',
      background: 'var(--accent-gradient)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-50%', right: '-20%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)', filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />
      <AnimatedSection style={{
        maxWidth: '1320px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px',
      }}>
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: '800', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.03em' }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.75, fontWeight: '500', marginTop: '4px' }}>{s.label}</div>
          </motion.div>
        ))}
      </AnimatedSection>
    </section>
  );
}

// ============ TESTIMONIALS ============
function Testimonials() {
  const testimonials = [
    { name: 'Rajesh Kumar', business: 'Fresh Bites Restaurant', quote: 'MediaFlow transformed our weekday foot traffic. The social media campaign brought in 40% more customers in just one month.' },
    { name: 'Priya Sharma', business: 'Style Haus Boutique', quote: 'As a small boutique, we never thought we could run professional marketing campaigns. MediaFlow made it effortless.' },
    { name: 'Arjun Patel', business: 'FitHub Gym', quote: 'The analytics dashboard is a game-changer. Our membership sign-ups doubled in two months! Incredible platform.' },
  ];

  return (
    <section style={{ padding: '120px 24px', background: 'var(--bg-secondary)' }}>
      <AnimatedSection style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>
              Trusted platform<br />anytime & anywhere.
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '4px', color: '#f59e0b' }}>
            {[...Array(5)].map((_, i) => <HiOutlineStar key={i} size={20} />)}
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="bento-grid-3">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp} className="bento-card" style={{ padding: '36px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '32px' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '100px',
                  background: `hsl(${240 + i * 40}, 60%, 55%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: '700', fontSize: '0.85rem',
                  fontFamily: 'Outfit, sans-serif',
                }}>{t.name[0]}</div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{t.business}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

// ============ PRICING ============
function Pricing() {
  const plans = [
    { name: 'Starter', price: '₹9,999', period: '/campaign', desc: 'Perfect for getting started.', features: ['1 Campaign', 'Social Media Ads', 'Basic Analytics', 'Email Support', '7-day Campaign'], popular: false },
    { name: 'Growth', price: '₹24,999', period: '/month', desc: 'Ideal for growing businesses.', features: ['3 Campaigns/mo', 'Multi-Channel Ads', 'Advanced Analytics', 'Priority Support', '30-day Campaigns', 'Influencer Outreach'], popular: true },
    { name: 'Enterprise', price: '₹49,999', period: '/month', desc: 'Dominate your market.', features: ['Unlimited Campaigns', 'All Channels', 'Real-time Dashboard', 'Dedicated Manager', 'Custom Strategy', 'Content Creation'], popular: false },
  ];

  return (
    <section style={{ padding: '120px 24px' }}>
      <AnimatedSection style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '16px' }}>
            SPECIAL OFFER<br />FOR NEW CLIENTS
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>
            Choose the plan that fits your business goals. No hidden fees.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="bento-grid-3">
          {plans.map((plan, i) => (
            <motion.div key={i} variants={fadeUp} className="bento-card" style={{
              padding: '40px 32px', position: 'relative',
              border: plan.popular ? '1px solid var(--accent-primary)' : undefined,
            }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'var(--accent-gradient)', color: 'white', padding: '4px 12px',
                  borderRadius: '100px', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase',
                }}>Popular</div>
              )}
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '6px', fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>{plan.name}</h3>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '2.8rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.03em' }}>{plan.price}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{plan.period}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '28px' }}>{plan.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <HiOutlineCheck size={16} style={{ color: 'var(--accent-primary)', minWidth: '16px' }} /> {f}
                  </div>
                ))}
              </div>
              <Link href="/register">
                <button className={plan.popular ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', justifyContent: 'center' }}>
                  Get Started
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

// ============ CTA ============
function CTABanner() {
  return (
    <section style={{ padding: '40px 24px 120px' }}>
      <AnimatedSection style={{
        maxWidth: '1100px', margin: '0 auto', textAlign: 'center',
        background: 'var(--accent-gradient)', borderRadius: 'var(--radius-2xl)',
        padding: '80px 40px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-40%', right: '-20%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />
        <motion.h2 variants={fadeUp} style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700',
          color: 'white', marginBottom: '16px', fontFamily: 'Outfit, sans-serif',
          position: 'relative', zIndex: 1, letterSpacing: '-0.02em',
        }}>
          Ready to Grow Your Business?
        </motion.h2>
        <motion.p variants={fadeUp} style={{
          color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: '480px',
          margin: '0 auto 36px', lineHeight: '1.7', position: 'relative', zIndex: 1,
        }}>
          Join 120+ local businesses already thriving with MediaFlow. Start your first campaign today.
        </motion.p>
        <motion.div variants={fadeUp} style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/register">
            <button style={{
              background: 'white', color: '#6366f1', padding: '16px 44px',
              borderRadius: '100px', fontWeight: '700', fontSize: '0.95rem',
              border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Inter, sans-serif',
            }}>
              Start Now <HiOutlineArrowRight size={18} />
            </button>
          </Link>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}

// ============ MAIN PAGE ============
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <HowItWorks />
        <StatsBar />
        <Testimonials />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
