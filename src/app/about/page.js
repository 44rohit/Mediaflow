'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker,
  HiOutlineUserGroup, HiOutlineLightningBolt, HiOutlineGlobeAlt, HiOutlineHeart,
} from 'react-icons/hi';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

function AnimatedSection({ children, style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-60px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger} style={style}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const team = [
    { name: 'Arjun Mehra', role: 'CEO & Founder', initial: 'A', color: '#6366f1' },
    { name: 'Sneha Rao', role: 'Head of Marketing', initial: 'S', color: '#8b5cf6' },
    { name: 'Vikram Singh', role: 'Lead Designer', initial: 'V', color: '#f59e0b' },
    { name: 'Priya Desai', role: 'Tech Lead', initial: 'P', color: '#22c55e' },
  ];

  const values = [
    { icon: HiOutlineUserGroup, title: 'Community First', desc: 'We believe in empowering local businesses and strengthening communities through smart digital marketing.' },
    { icon: HiOutlineLightningBolt, title: 'Innovation', desc: 'We leverage the latest marketing technologies and data-driven strategies to deliver exceptional results.' },
    { icon: HiOutlineGlobeAlt, title: 'Transparency', desc: 'Real-time analytics and clear reporting so you always know exactly how your campaigns are performing.' },
    { icon: HiOutlineHeart, title: 'Partnership', desc: 'We treat every vendor as a partner, not just a client. Your success is our success.' },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{
          padding: '160px 24px 100px', position: 'relative', overflow: 'hidden',
        }}>
          <div className="orb animate-float" style={{ width: '500px', height: '500px', background: '#6366f1', top: '-15%', right: '-10%' }} />
          <AnimatedSection style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div variants={fadeUp}>
              <div className="line-accent" style={{ margin: '0 auto 24px' }} />
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', fontFamily: 'Outfit, sans-serif', lineHeight: '1.1', marginBottom: '20px', letterSpacing: '-0.03em' }}>
                ABOUT MEDIAFLOW
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
                We&apos;re on a mission to democratize digital marketing for local businesses. 
                Every small business deserves the same marketing power as the big brands.
              </p>
            </motion.div>
          </AnimatedSection>
        </section>

        {/* Story */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)' }}>
          <AnimatedSection style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="bento-grid-2">
              <motion.div variants={fadeUp}>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '20px' }}>Our Story</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '16px' }}>
                  MediaFlow was born from a simple observation: local businesses create amazing products 
                  and services, but often lack the tools and expertise to reach their full audience online.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '16px' }}>
                  Founded in 2024 in Mumbai, we set out to build a platform that bridges the gap between 
                  talented local vendors and the digital marketing world. Today, we serve over 120 businesses 
                  across India, managing campaigns that have reached millions of people.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                  Our platform makes it easy: submit your product, set your budget, and we handle the rest —
                  from strategy to execution to analytics.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { value: '120+', label: 'Business Partners' },
                  { value: '500+', label: 'Campaigns' },
                  { value: '2M+', label: 'People Reached' },
                  { value: '3×', label: 'Avg ROI' },
                ].map((s, i) => (
                  <div key={i} className="bento-card" style={{ textAlign: 'center', padding: '32px 16px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif', marginBottom: '4px' }} className="gradient-text">{s.value}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </AnimatedSection>
        </section>

        {/* Values */}
        <section style={{ padding: '100px 24px' }}>
          <AnimatedSection style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>OUR VALUES</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="bento-grid-4">
              {values.map((v, i) => (
                <motion.div key={i} variants={fadeUp} className="bento-card" style={{ padding: '32px', textAlign: 'center' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'var(--bg-input)', border: '1px solid var(--border-color)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px', color: 'var(--text-primary)',
                  }}><v.icon size={22} /></div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '10px' }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.7' }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* Team */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)' }}>
          <AnimatedSection style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>MEET THE TEAM</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="bento-grid-4">
              {team.map((t, i) => (
                <motion.div key={i} variants={fadeUp} className="bento-card" style={{ textAlign: 'center', padding: '32px 20px' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '100px',
                    background: t.color, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px', color: 'white',
                    fontSize: '1.3rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif',
                  }}>{t.initial}</div>
                  <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>{t.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.role}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* Contact */}
        <section style={{ padding: '100px 24px' }}>
          <AnimatedSection style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '12px' }}>GET IN TOUCH</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Have questions? We&apos;d love to hear from you.</p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="bento-grid-2">
              {/* Form */}
              <motion.div variants={fadeUp} className="bento-card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <input className="input-field" placeholder="Your Name" />
                  <input className="input-field" placeholder="Your Email" type="email" />
                  <textarea className="input-field" placeholder="Your Message" rows={5} style={{ resize: 'vertical' }} />
                  <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>Send Message</button>
                </div>
              </motion.div>
              {/* Info */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                {[
                  { icon: HiOutlineMail, label: 'Email', value: 'hello@mediaflow.com' },
                  { icon: HiOutlinePhone, label: 'Phone', value: '+91 98765 43210' },
                  { icon: HiOutlineLocationMarker, label: 'Address', value: 'Andheri West, Mumbai, Maharashtra 400053, India' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px', minWidth: '44px',
                      background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--accent-primary)',
                    }}><item.icon size={18} /></div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: '500' }}>{item.label}</div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </AnimatedSection>
        </section>
      </main>
      <Footer />
    </>
  );
}
