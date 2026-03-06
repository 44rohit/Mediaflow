'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { businessCategories, mockVendors } from '@/lib/mockData';
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLockClosed, HiOutlineOfficeBuilding, HiOutlineLocationMarker } from 'react-icons/hi';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '',
    businessName: '', businessCategory: '', city: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password || !form.businessName) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        ...form,
        role: 'vendor',
        createdAt: new Date().toISOString().split('T')[0],
      };
      login(newUser);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px', position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb animate-float" style={{ width: '400px', height: '400px', background: '#6366f1', top: '-10%', right: '-10%' }} />
        <div className="orb animate-float-delay" style={{ width: '300px', height: '300px', background: '#8b5cf6', bottom: '-5%', left: '-5%' }} />

        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          style={{
            width: '100%', maxWidth: '520px',
            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)', padding: '48px 40px',
            position: 'relative', zIndex: 1,
          }}
        >
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: 'var(--accent-gradient)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', color: 'white', fontSize: '24px',
              fontWeight: '800', fontFamily: 'Outfit, sans-serif'
            }}>M</div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '8px' }}>Create Your Account</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Join MediaFlow and start growing your business</p>
          </motion.div>

          {error && (
            <motion.div variants={fadeUp} style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: '20px',
              color: '#ef4444', fontSize: '0.85rem',
            }}>{error}</motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div style={{ position: 'relative' }}>
                <HiOutlineUser size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input name="name" placeholder="Full Name *" value={form.name} onChange={handleChange}
                  className="input-field" style={{ paddingLeft: '42px' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <HiOutlinePhone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}
                  className="input-field" style={{ paddingLeft: '42px' }} />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} style={{ position: 'relative', marginBottom: '14px' }}>
              <HiOutlineMail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input name="email" type="email" placeholder="Email Address *" value={form.email} onChange={handleChange}
                className="input-field" style={{ paddingLeft: '42px' }} />
            </motion.div>

            <motion.div variants={fadeUp} style={{ position: 'relative', marginBottom: '14px' }}>
              <HiOutlineLockClosed size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input name="password" type="password" placeholder="Password *" value={form.password} onChange={handleChange}
                className="input-field" style={{ paddingLeft: '42px' }} />
            </motion.div>

            <motion.div variants={fadeUp} style={{ position: 'relative', marginBottom: '14px' }}>
              <HiOutlineOfficeBuilding size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input name="businessName" placeholder="Business Name *" value={form.businessName} onChange={handleChange}
                className="input-field" style={{ paddingLeft: '42px' }} />
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
              <select name="businessCategory" value={form.businessCategory} onChange={handleChange}
                className="input-field" style={{ cursor: 'pointer' }}>
                <option value="">Category</option>
                {businessCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div style={{ position: 'relative' }}>
                <HiOutlineLocationMarker size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input name="city" placeholder="City" value={form.city} onChange={handleChange}
                  className="input-field" style={{ paddingLeft: '42px' }} />
              </div>
            </motion.div>

            <motion.button variants={fadeUp} type="submit" className="btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <motion.p variants={fadeUp} style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
