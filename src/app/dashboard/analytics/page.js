'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';
import { useCampaigns } from '@/context/CampaignContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { HiOutlineEye, HiOutlineCursorClick, HiOutlineFire, HiOutlineTrendingUp } from 'react-icons/hi';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function AnalyticsPage() {
  const { user, loading: authLoading } = useAuth();
  const { campaigns: contextCampaigns, loading: campLoading } = useCampaigns();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  if (authLoading || campLoading || !user) return null;

  const userCampaigns = contextCampaigns.filter(c => c.vendorId === user?.id || !c.vendorId);

  const totalReach = userCampaigns.reduce((s, c) => s + (c.analytics?.reach || 0), 0);
  const totalImpressions = userCampaigns.reduce((s, c) => s + (c.analytics?.impressions || 0), 0);
  const totalClicks = userCampaigns.reduce((s, c) => s + (c.analytics?.clicks || 0), 0);
  const campaignsWithEngagement = userCampaigns.filter(c => (c.analytics?.engagementRate || 0) > 0);
  const avgEngagement = campaignsWithEngagement.length > 0
    ? (campaignsWithEngagement.reduce((s, c) => s + (c.analytics?.engagementRate || 0), 0) / campaignsWithEngagement.length).toFixed(1) : 0;

  const barData = userCampaigns.filter(c => (c.analytics?.reach || 0) > 0).map(c => ({
    name: c.productName.length > 15 ? c.productName.slice(0, 15) + '...' : c.productName,
    reach: c.analytics?.reach || 0,
    clicks: c.analytics?.clicks || 0,
  }));

  const areaData = [
    { month: 'Oct', reach: 12000 }, { month: 'Nov', reach: 28000 },
    { month: 'Dec', reach: 45000 }, { month: 'Jan', reach: 62000 },
    { month: 'Feb', reach: 128000 }, { month: 'Mar', reach: totalReach },
  ];

  const channelData = [
    { name: 'Social Media', value: 45 },
    { name: 'Google Ads', value: 25 },
    { name: 'Influencer', value: 20 },
    { name: 'Local Ads', value: 10 },
  ];
  const COLORS = ['#6366f1', '#8b5cf6', '#f59e0b', '#22c55e'];

  const stats = [
    { label: 'Total Reach', value: totalReach.toLocaleString(), icon: HiOutlineEye, color: '#6366f1', trend: '+12%' },
    { label: 'Impressions', value: totalImpressions.toLocaleString(), icon: HiOutlineTrendingUp, color: '#8b5cf6', trend: '+18%' },
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), icon: HiOutlineCursorClick, color: '#f59e0b', trend: '+8%' },
    { label: 'Avg. Engagement', value: `${avgEngagement}%`, icon: HiOutlineFire, color: '#22c55e', trend: '+2.1%' },
  ];

  const tooltipStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    fontSize: '0.78rem',
    color: 'var(--text-primary)',
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar type={user.role === 'admin' ? 'admin' : 'vendor'} />
      <div className="main-content">
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '1100px' }}>
          <motion.div variants={fadeUp} style={{ marginBottom: '36px' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }}>Analytics</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Track your campaign performance and engagement metrics.</p>
          </motion.div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '36px' }} className="bento-grid-4">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: `${s.color}15`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: s.color,
                  }}>
                    <s.icon size={18} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#22c55e' }}>{s.trend}</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', marginBottom: '2px' }}>{s.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '500' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '36px' }} className="bento-grid-2">
            {/* Area Chart */}
            <motion.div variants={fadeUp} className="bento-card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '24px' }}>Reach Over Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="reach" stroke="#6366f1" strokeWidth={2} fill="url(#reachGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie Chart */}
            <motion.div variants={fadeUp} className="bento-card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '24px' }}>Channel Breakdown</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={channelData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                    {channelData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '12px' }}>
                {channelData.map((entry, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: COLORS[i] }} />
                    {entry.name}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bar Chart */}
          <motion.div variants={fadeUp} className="bento-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '24px' }}>Campaign Comparison</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="reach" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
                <Bar dataKey="clicks" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
