'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';
import { useCampaigns } from '@/context/CampaignContext';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const statusColors = {
  pending: 'badge-pending', active: 'badge-active', completed: 'badge-completed',
  rejected: 'badge-rejected', approved: 'badge-approved',
};

export default function CampaignsListPage() {
  const { user, loading: authLoading } = useAuth();
  const { campaigns: contextCampaigns, loading: campLoading } = useCampaigns();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  if (authLoading || campLoading || !user) return null;

  const userCampaigns = contextCampaigns.filter(c => c.vendorId === user?.id || !c.vendorId);

  return (
    <div className="dashboard-layout">
      <DashboardSidebar type="vendor" />
      <div className="main-content">
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '1100px' }}>
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }}>My Campaigns</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{userCampaigns.length} campaign(s) total</p>
            </div>
            <Link href="/dashboard/new-campaign">
              <button className="btn-primary btn-sm">+ New Campaign</button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: 'grid', gap: '16px' }}>
            {userCampaigns.map(c => (
              <Link key={c.id} href={`/dashboard/campaign/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="bento-card" style={{
                  padding: '28px', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', cursor: 'pointer',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif' }}>{c.productName}</h3>
                      <span className={`badge ${statusColors[c.status]}`}>{c.status}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '8px' }}>
                      {c.productDescription.slice(0, 120)}...
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span>Budget: ₹{Number(c.budget).toLocaleString()}</span>
                      <span>Reach: {c.analytics?.reach?.toLocaleString() || 0}</span>
                      <span>Created: {c.createdAt}</span>
                    </div>
                  </div>
                  <HiOutlineArrowRight size={18} style={{ color: 'var(--text-muted)', minWidth: '18px' }} />
                </div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
