'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';
import { useCampaigns } from '@/context/CampaignContext';
import {
  HiOutlineArrowLeft, HiOutlineEye, HiOutlineCursorClick,
  HiOutlineFire, HiOutlineTrendingUp
} from 'react-icons/hi';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const statusColors = {
  pending: 'badge-pending', active: 'badge-active', completed: 'badge-completed',
  rejected: 'badge-rejected', approved: 'badge-approved',
};

export default function CampaignDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const { campaigns, loading: campLoading } = useCampaigns();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  if (authLoading || campLoading || !user) return null;

  const campaign = campaigns.find(c => c.id === params.id);
  if (!campaign) {
    return (
      <div className="dashboard-layout">
        <DashboardSidebar type="vendor" />
        <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Campaign not found.</p>
        </div>
      </div>
    );
  }

  const analytics = [
    { label: 'Total Reach', value: (campaign.analytics?.reach || 0).toLocaleString(), icon: HiOutlineEye, color: '#6366f1' },
    { label: 'Impressions', value: (campaign.analytics?.impressions || 0).toLocaleString(), icon: HiOutlineTrendingUp, color: '#8b5cf6' },
    { label: 'Clicks', value: (campaign.analytics?.clicks || 0).toLocaleString(), icon: HiOutlineCursorClick, color: '#f59e0b' },
    { label: 'Engagement', value: `${campaign.analytics?.engagementRate || 0}%`, icon: HiOutlineFire, color: '#22c55e' },
  ];

  const timeline = [
    { label: 'Submitted', date: campaign.createdAt, done: true },
    { label: 'Under Review', date: '', done: ['approved', 'active', 'completed'].includes(campaign.status) },
    { label: 'Approved', date: '', done: ['approved', 'active', 'completed'].includes(campaign.status) },
    { label: 'Launched', date: '', done: ['active', 'completed'].includes(campaign.status) },
    { label: 'Completed', date: '', done: campaign.status === 'completed' },
  ];

  return (
    <div className="dashboard-layout">
      <DashboardSidebar type="vendor" />
      <div className="main-content">
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '1000px' }}>
          {/* Back */}
          <motion.div variants={fadeUp} style={{ marginBottom: '28px' }}>
            <Link href="/dashboard" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HiOutlineArrowLeft size={16} /> Back to Dashboard
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '8px' }}>{campaign.productName}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span className={`badge ${statusColors[campaign.status]}`}>{campaign.status}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{campaign.productCategory}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>•</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>₹{campaign.budget.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Analytics Cards */}
          {(campaign.analytics?.reach || 0) > 0 && (
            <motion.div variants={fadeUp} style={{ marginBottom: '36px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '16px' }}>Campaign Performance</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="bento-grid-4">
                {analytics.map((a, i) => (
                  <div key={i} className="stat-card">
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      background: `${a.color}15`, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      color: a.color, marginBottom: '14px',
                    }}>
                      <a.icon size={18} />
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', marginBottom: '2px' }}>{a.value}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '500' }}>{a.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }} className="bento-grid-2">
            {/* Details */}
            <motion.div variants={fadeUp} className="bento-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '20px' }}>Campaign Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { label: 'Description', value: campaign.productDescription },
                  { label: 'Target Audience', value: `${campaign.targetAudience.toLocaleString()} people` },
                  { label: 'Budget', value: `₹${campaign.budget.toLocaleString()}` },
                  { label: 'Timeline', value: `${campaign.timeline.start} → ${campaign.timeline.end}` },
                  { label: 'Channels', value: campaign.channels.join(', ') },
                  { label: 'Special Notes', value: campaign.specialNotes || '—' },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '14px 0',
                    borderBottom: i < 5 ? '1px solid var(--border-color)' : 'none',
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.value}</div>
                  </div>
                ))}
              </div>
              {campaign.companyNotes && (
                <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(99,102,241,0.06)', borderRadius: 'var(--radius)', border: '1px solid rgba(99,102,241,0.1)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company Notes</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{campaign.companyNotes}</div>
                </div>
              )}
            </motion.div>

            {/* Activity Timeline */}
            <motion.div variants={fadeUp} className="bento-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '24px' }}>Activity Timeline</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {timeline.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', paddingBottom: i < timeline.length - 1 ? '28px' : '0', position: 'relative' }}>
                    {/* Line */}
                    {i < timeline.length - 1 && (
                      <div style={{
                        position: 'absolute', left: '9px', top: '22px', bottom: '0',
                        width: '2px', background: t.done ? 'var(--accent-primary)' : 'var(--border-color)',
                      }} />
                    )}
                    {/* Dot */}
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '100px', minWidth: '20px',
                      border: `2px solid ${t.done ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                      background: t.done ? 'var(--accent-primary)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {t.done && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: t.done ? '600' : '400', color: t.done ? 'var(--text-primary)' : 'var(--text-muted)' }}>{t.label}</div>
                      {t.date && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.date}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
