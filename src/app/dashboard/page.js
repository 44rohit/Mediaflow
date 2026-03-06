'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';
import { mockCampaigns } from '@/lib/mockData';
import { useCampaigns } from '@/context/CampaignContext';
import {
  HiOutlineDocumentText, HiOutlineLightningBolt, HiOutlineEye,
  HiOutlineCurrencyRupee, HiOutlineArrowRight, HiOutlinePlusCircle
} from 'react-icons/hi';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function VendorDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { campaigns: contextCampaigns, loading: campLoading } = useCampaigns();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  if (authLoading || campLoading || !user) return null;

  const campaigns = contextCampaigns.filter(c => c.vendorId === user?.id || !c.vendorId);
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const totalReach = activeCampaigns.reduce((s, c) => s + (c.analytics?.reach || 0), 0);
  const totalSpent = campaigns.reduce((s, c) => s + (Number(c.budget) || 0), 0);

  const stats = [
    { label: 'Total Campaigns', value: campaigns.length, icon: HiOutlineDocumentText, color: '#6366f1' },
    { label: 'Active Campaigns', value: activeCampaigns.length, icon: HiOutlineLightningBolt, color: '#22c55e' },
    { label: 'Total Reach', value: totalReach.toLocaleString(), icon: HiOutlineEye, color: '#f59e0b' },
    { label: 'Total Spend', value: `₹${totalSpent.toLocaleString()}`, icon: HiOutlineCurrencyRupee, color: '#8b5cf6' },
  ];

  const statusColors = {
    pending: 'badge-pending', active: 'badge-active', completed: 'badge-completed',
    rejected: 'badge-rejected', approved: 'badge-approved',
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar type="vendor" />
      <div className="main-content">
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '1100px' }}>
          {/* Header */}
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }}>
                Welcome back, {user.name?.split(' ')[0]} 👋
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Here&apos;s what&apos;s happening with your campaigns today.
              </p>
            </div>
            <Link href="/dashboard/new-campaign">
              <button className="btn-primary btn-sm">
                <HiOutlinePlusCircle size={16} /> New Campaign
              </button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '36px' }} className="bento-grid-4">
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    background: `${stat.color}15`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: stat.color,
                  }}>
                    <stat.icon size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px' }} className="bento-grid-2">
            <Link href="/dashboard/new-campaign" style={{ textDecoration: 'none' }}>
              <div className="bento-card" style={{ padding: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }}>Submit New Campaign</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Launch a new marketing campaign for your product</p>
                </div>
                <HiOutlineArrowRight size={20} style={{ color: 'var(--text-muted)' }} />
              </div>
            </Link>
            <Link href="/dashboard/analytics" style={{ textDecoration: 'none' }}>
              <div className="bento-card" style={{ padding: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }}>View Analytics</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Track performance and engagement metrics</p>
                </div>
                <HiOutlineArrowRight size={20} style={{ color: 'var(--text-muted)' }} />
              </div>
            </Link>
          </motion.div>

          {/* Recent Campaigns */}
          <motion.div variants={fadeUp}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif' }}>Recent Campaigns</h2>
              <Link href="/dashboard/campaigns" style={{ color: 'var(--accent-primary)', fontSize: '0.82rem', fontWeight: '500', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View All <HiOutlineArrowRight size={14} />
              </Link>
            </div>
            <div className="bento-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Status</th>
                    <th>Budget</th>
                    <th>Reach</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map(campaign => (
                    <tr key={campaign.id}>
                      <td>
                        <Link href={`/dashboard/campaign/${campaign.id}`} style={{ color: 'var(--text-primary)', fontWeight: '500', textDecoration: 'none' }}>
                          {campaign.productName}
                        </Link>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{campaign.productCategory}</div>
                      </td>
                      <td>
                        <span className={`badge ${statusColors[campaign.status]}`}>{campaign.status}</span>
                      </td>
                      <td>₹{Number(campaign.budget).toLocaleString()}</td>
                      <td>{(campaign.analytics?.reach || 0).toLocaleString()}</td>
                      <td>{campaign.createdAt}</td>
                    </tr>
                  ))}
                  {campaigns.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No campaigns yet. <Link href="/dashboard/new-campaign" style={{ color: 'var(--accent-primary)' }}>Create your first campaign</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
