'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { mockVendors } from '@/lib/mockData';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
        router.push(data.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        setError(data.error || 'Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px', position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb animate-float" style={{ width: '400px', height: '400px', background: '#8b5cf6', top: '-10%', left: '-10%' }} />
        <div className="orb animate-float-delay" style={{ width: '300px', height: '300px', background: '#6366f1', bottom: '-5%', right: '-5%' }} />

        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          style={{
            width: '100%', maxWidth: '440px',
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
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '8px' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sign in to your MediaFlow account</p>
          </motion.div>

          {error && (
            <motion.div variants={fadeUp} style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 'var(--radius)', padding: '12px 16px', marginBottom: '20px',
              color: '#ef4444', fontSize: '0.85rem',
            }}>{error}</motion.div>
          )}

          {/* Demo Credentials Box */}
          <motion.div variants={fadeUp} style={{
            background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: 'var(--radius)', padding: '16px', marginBottom: '24px',
            fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px'
          }}>
            <strong style={{ color: 'var(--accent-primary)', marginBottom: '4px' }}>Fast Demo Login:</strong>
            <button type="button" onClick={() => { setEmail('rajesh@freshbites.com'); setPassword('vendor123'); }} className="btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
              Login as Vendor
            </button>
            <button type="button" onClick={() => { setEmail('admin@mediaflow.com'); setPassword('admin123'); }} className="btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
              Login as Admin
            </button>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <motion.div variants={fadeUp} style={{ position: 'relative', marginBottom: '14px' }}>
              <HiOutlineMail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}
                className="input-field" style={{ paddingLeft: '42px' }} />
            </motion.div>

            <motion.div variants={fadeUp} style={{ position: 'relative', marginBottom: '24px' }}>
              <HiOutlineLockClosed size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                className="input-field" style={{ paddingLeft: '42px' }} />
            </motion.div>

            <motion.button variants={fadeUp} type="submit" className="btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </form>

          <motion.p variants={fadeUp} style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none' }}>Register</Link>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
