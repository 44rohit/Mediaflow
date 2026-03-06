'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';
import { useCampaigns } from '@/context/CampaignContext';
import { mockVendors } from '@/lib/mockData';
import Link from 'next/link';
import {
  HiOutlineUserGroup, HiOutlineDocumentText, HiOutlineLightningBolt,
  HiOutlineCurrencyRupee, HiOutlineArrowRight
} from 'react-icons/hi';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const statusColors = {
  pending: 'badge-pending', active: 'badge-active', completed: 'badge-completed',
  rejected: 'badge-rejected', approved: 'badge-approved',
};

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { campaigns, updateCampaign, loading: campLoading } = useCampaigns();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) router.push('/login');
  }, [user, authLoading, router]);

  if (authLoading || campLoading || !user) return null;

  const vendors = mockVendors.filter(v => v.role === 'vendor');
  const pendingCampaigns = campaigns.filter(c => c.status === 'pending');
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const totalRevenue = campaigns.reduce((s, c) => s + Number(c.budget), 0);

  const stats = [
    { label: 'Total Vendors', value: vendors.length, icon: HiOutlineUserGroup, color: '#6366f1' },
    { label: 'Pending Requests', value: pendingCampaigns.length, icon: HiOutlineDocumentText, color: '#f59e0b' },
    { label: 'Active Campaigns', value: activeCampaigns.length, icon: HiOutlineLightningBolt, color: '#22c55e' },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: HiOutlineCurrencyRupee, color: '#8b5cf6' },
  ];

  return (
    <div className="dashboard-layout">
      <DashboardSidebar type="admin" />
      <div className="main-content">
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '1100px' }}>
          {/* Header */}
          <motion.div variants={fadeUp} style={{ marginBottom: '36px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage campaigns, vendors, and platform analytics.</p>
          </motion.div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '36px' }} className="bento-grid-4">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="stat-card">
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: `${s.color}15`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: s.color, marginBottom: '16px',
                }}>
                  <s.icon size={20} />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', marginBottom: '4px' }}>{s.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Pending Campaigns */}
          <motion.div variants={fadeUp} style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif' }}>Pending Campaign Requests</h2>
              <Link href="/admin/campaigns" style={{ color: 'var(--accent-primary)', fontSize: '0.82rem', fontWeight: '500', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View All <HiOutlineArrowRight size={14} />
              </Link>
            </div>
            {pendingCampaigns.length === 0 ? (
              <div className="bento-card" style={{ padding: '40px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>No pending campaigns right now. 🎉</p>
              </div>
            ) : (
              <div className="bento-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Product</th>
                      <th>Budget</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingCampaigns.map(c => (
                      <tr key={c.id}>
                        <td>
                          <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{c.vendorName}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.businessName}</div>
                        </td>
                        <td>{c.productName}</td>
                        <td>₹{c.budget.toLocaleString()}</td>
                        <td>{c.createdAt}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => updateCampaign(c.id, { status: 'approved' })} className="btn-primary btn-sm" style={{ padding: '6px 16px', fontSize: '0.75rem' }}>Approve</button>
                            <button onClick={() => updateCampaign(c.id, { status: 'rejected' })} className="btn-secondary btn-sm" style={{ padding: '6px 16px', fontSize: '0.75rem', borderRadius: '100px', color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)' }}>Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* All Campaigns */}
          <motion.div variants={fadeUp}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '20px' }}>All Campaigns</h2>
            <div className="bento-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Vendor</th>
                    <th>Status</th>
                    <th>Budget</th>
                    <th>Reach</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map(c => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{c.productName}</td>
                      <td>{c.vendorName || c.businessName || 'Vendor'}</td>
                      <td><span className={`badge ${statusColors[c.status]}`}>{c.status}</span></td>
                      <td>₹{Number(c.budget).toLocaleString()}</td>
                      <td>{c.analytics?.reach?.toLocaleString() || 0}</td>
                      <td>{c.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
