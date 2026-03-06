'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { businessCategories } from '@/lib/mockData';
import { HiOutlineSun, HiOutlineMoon, HiOutlineCheck } from 'react-icons/hi';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function SettingsPage() {
  const { user, login, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', businessName: '', businessCategory: '', city: '' });

  useEffect(() => {
    if (!loading && !user) router.push('/login');
    if (user) setForm({
      name: user.name || '', email: user.email || '', phone: user.phone || '',
      businessName: user.businessName || '', businessCategory: user.businessCategory || '', city: user.city || '',
    });
  }, [user, loading, router]);

  if (loading || !user) return null;

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = () => {
    login({ ...user, ...form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar type="vendor" />
      <div className="main-content">
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '600px' }}>
          <motion.div variants={fadeUp} style={{ marginBottom: '36px' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }}>Settings</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Update your profile and preferences.</p>
          </motion.div>

          {/* Profile */}
          <motion.div variants={fadeUp} className="bento-card" style={{ padding: '32px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '24px' }}>Profile Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="input-field" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Business Name</label>
                <input name="businessName" value={form.businessName} onChange={handleChange} className="input-field" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Category</label>
                  <select name="businessCategory" value={form.businessCategory} onChange={handleChange} className="input-field" style={{ cursor: 'pointer' }}>
                    <option value="">Select</option>
                    {businessCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>City</label>
                  <input name="city" value={form.city} onChange={handleChange} className="input-field" />
                </div>
              </div>
              <button className="btn-primary" onClick={handleSave} style={{ alignSelf: 'flex-start' }}>
                {saved ? <><HiOutlineCheck size={16} /> Saved!</> : 'Save Changes'}
              </button>
            </div>
          </motion.div>

          {/* Theme */}
          <motion.div variants={fadeUp} className="bento-card" style={{ padding: '28px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '16px' }}>Appearance</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => theme !== 'light' && toggleTheme()} style={{
                flex: 1, padding: '20px', borderRadius: 'var(--radius)', cursor: 'pointer',
                border: theme === 'light' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                background: '#f0f0f2', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px', transition: 'all 0.2s',
              }}>
                <HiOutlineSun size={22} style={{ color: '#333' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: '500', color: '#333' }}>Light</span>
              </button>
              <button onClick={() => theme !== 'dark' && toggleTheme()} style={{
                flex: 1, padding: '20px', borderRadius: 'var(--radius)', cursor: 'pointer',
                border: theme === 'dark' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                background: '#111116', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px', transition: 'all 0.2s',
              }}>
                <HiOutlineMoon size={22} style={{ color: '#f0f0f0' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: '500', color: '#f0f0f0' }}>Dark</span>
              </button>
            </div>
          </motion.div>

          {/* Password */}
          <motion.div variants={fadeUp} className="bento-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '16px' }}>Change Password</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="password" className="input-field" placeholder="Current Password" />
              <input type="password" className="input-field" placeholder="New Password" />
              <input type="password" className="input-field" placeholder="Confirm New Password" />
              <button className="btn-secondary" style={{ alignSelf: 'flex-start', borderRadius: '100px' }}>Update Password</button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
