'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';
import { mockVendors, mockCampaigns } from '@/lib/mockData';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function AdminVendorsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) router.push('/login');
  }, [user, loading, router]);

  if (loading || !user) return null;

  const vendors = mockVendors.filter(v => v.role === 'vendor');

  return (
    <div className="dashboard-layout">
      <DashboardSidebar type="admin" />
      <div className="main-content">
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '1100px' }}>
          <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }}>Vendor Management</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{vendors.length} registered vendor(s)</p>
          </motion.div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {vendors.map(v => {
              const vendorCampaigns = mockCampaigns.filter(c => c.vendorId === v.id);
              return (
                <motion.div key={v.id} variants={fadeUp} className="bento-card" style={{
                  padding: '28px', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', flexWrap: 'wrap', gap: '16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '50px', height: '50px', borderRadius: '100px',
                      background: 'var(--accent-gradient)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: '1.1rem', fontWeight: '700',
                      fontFamily: 'Outfit, sans-serif',
                    }}>{v.name[0]}</div>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '2px' }}>{v.name}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{v.businessName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{v.email} • {v.city}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.3rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>{vendorCampaigns.length}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Campaigns</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.3rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>{v.businessCategory}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.3rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif' }}>{v.createdAt}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Joined</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
