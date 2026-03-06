'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';
import { useCampaigns } from '@/context/CampaignContext';
import { HiOutlineSearch, HiOutlineX, HiOutlinePencil } from 'react-icons/hi';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const statusColors = {
  pending: 'badge-pending', active: 'badge-active', completed: 'badge-completed',
  rejected: 'badge-rejected', approved: 'badge-approved',
};

export default function AdminCampaignsPage() {
  const { user, loading: authLoading } = useAuth();
  const { campaigns: contextCampaigns, updateCampaign, loading: campLoading } = useCampaigns();
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editCampaign, setEditCampaign] = useState(null);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) router.push('/login');
  }, [user, authLoading, router]);

  if (authLoading || campLoading || !user) return null;

  let campaigns = [...contextCampaigns];
  if (filter !== 'all') campaigns = campaigns.filter(c => c.status === filter);
  if (search) campaigns = campaigns.filter(c =>
    c.productName.toLowerCase().includes(search.toLowerCase()) ||
    c.vendorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <DashboardSidebar type="admin" />
      <div className="main-content">
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '1100px' }}>
          <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }}>Campaign Manager</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Review, approve, and manage all campaign requests.</p>
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '100px', padding: '4px', flexWrap: 'wrap' }}>
              {['all', 'pending', 'approved', 'active', 'completed', 'rejected'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '8px 18px', borderRadius: '100px', fontSize: '0.78rem',
                  fontWeight: '500', border: 'none', cursor: 'pointer',
                  background: filter === f ? 'var(--accent-primary)' : 'transparent',
                  color: filter === f ? 'white' : 'var(--text-secondary)',
                  fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}>{f}</button>
              ))}
            </div>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <HiOutlineSearch size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} className="input-field"
                placeholder="Search campaigns..." style={{ paddingLeft: '40px' }} />
            </div>
          </motion.div>

          {/* Table */}
          <motion.div variants={fadeUp} className="bento-card" style={{ padding: '0', overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Vendor</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Timeline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{c.productName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.productCategory}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '500' }}>{c.vendorName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.businessName}</div>
                    </td>
                    <td><span className={`badge ${statusColors[c.status]}`}>{c.status}</span></td>
                    <td>₹{c.budget.toLocaleString()}</td>
                    <td style={{ fontSize: '0.82rem' }}>{c.timeline.start}<br />{c.timeline.end}</td>
                    <td>
                      <button onClick={() => setEditCampaign(c)} style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem',
                        fontWeight: '500', border: '1px solid var(--border-color)',
                        background: 'transparent', color: 'var(--text-secondary)',
                        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                      }}>
                        <HiOutlinePencil size={12} /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {campaigns.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No campaigns found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        </motion.div>

        {/* Edit Slide-over */}
        <AnimatePresence>
          {editCampaign && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setEditCampaign(null)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100 }}
              />
              <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                style={{
                  position: 'fixed', top: 0, right: 0, bottom: 0, width: '440px',
                  background: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)',
                  zIndex: 101, padding: '32px', overflow: 'auto',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif' }}>Edit Campaign</h3>
                  <button onClick={() => setEditCampaign(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <HiOutlineX size={20} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Product Name</label>
                    <input className="input-field" value={editCampaign.productName} onChange={e => setEditCampaign({...editCampaign, productName: e.target.value})} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Status</label>
                    <select className="input-field" value={editCampaign.status} onChange={e => setEditCampaign({...editCampaign, status: e.target.value})} style={{ cursor: 'pointer' }}>
                      {['pending', 'approved', 'active', 'completed', 'rejected'].map(s => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Budget (₹)</label>
                    <input type="number" className="input-field" value={editCampaign.budget} onChange={e => setEditCampaign({...editCampaign, budget: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Company Notes</label>
                    <textarea className="input-field" value={editCampaign.companyNotes || ''} onChange={e => setEditCampaign({...editCampaign, companyNotes: e.target.value})} rows={3} style={{ resize: 'vertical' }} />
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '8px 0' }} />
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif' }}>Update Analytics</h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Reach</label>
                      <input type="number" className="input-field" value={editCampaign.analytics?.reach || 0} onChange={e => setEditCampaign({...editCampaign, analytics: {...editCampaign.analytics, reach: Number(e.target.value)}})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Impressions</label>
                      <input type="number" className="input-field" value={editCampaign.analytics?.impressions || 0} onChange={e => setEditCampaign({...editCampaign, analytics: {...editCampaign.analytics, impressions: Number(e.target.value)}})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Clicks</label>
                      <input type="number" className="input-field" value={editCampaign.analytics?.clicks || 0} onChange={e => setEditCampaign({...editCampaign, analytics: {...editCampaign.analytics, clicks: Number(e.target.value)}})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Engagement %</label>
                      <input type="number" step="0.1" className="input-field" value={editCampaign.analytics?.engagementRate || 0} onChange={e => setEditCampaign({...editCampaign, analytics: {...editCampaign.analytics, engagementRate: Number(e.target.value)}})} />
                    </div>
                  </div>

                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
                    onClick={() => {
                      updateCampaign(editCampaign.id, editCampaign);
                      setEditCampaign(null);
                    }}>
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
