'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';
import { useCampaigns } from '@/context/CampaignContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { HiOutlineEye, HiOutlineCursorClick, HiOutlineFire, HiOutlineTrendingUp } from 'react-icons/hi';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function AdminAnalyticsPage() {
  const { user, loading: authLoading } = useAuth();
  const { campaigns, loading: campLoading } = useCampaigns();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) router.push('/login');
  }, [user, authLoading, router]);

  if (authLoading || campLoading || !user) return null;

  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'completed');
  const totalReach = activeCampaigns.reduce((s, c) => s + (c.analytics?.reach || 0), 0);
  const totalImpressions = activeCampaigns.reduce((s, c) => s + (c.analytics?.impressions || 0), 0);
  const totalClicks = activeCampaigns.reduce((s, c) => s + (c.analytics?.clicks || 0), 0);
  const campaignsWithEngagement = activeCampaigns.filter(c => (c.analytics?.engagementRate || 0) > 0);
  const avgEng = campaignsWithEngagement.length > 0
    ? (campaignsWithEngagement.reduce((s, c) => s + (c.analytics?.engagementRate || 0), 0) / campaignsWithEngagement.length).toFixed(1)
    : '0.0';

  const stats = [
    { label: 'Total Reach', value: totalReach.toLocaleString(), icon: HiOutlineEye, color: '#6366f1', trend: '+24%' },
    { label: 'Impressions', value: totalImpressions.toLocaleString(), icon: HiOutlineTrendingUp, color: '#8b5cf6', trend: '+32%' },
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), icon: HiOutlineCursorClick, color: '#f59e0b', trend: '+15%' },
    { label: 'Avg Engagement', value: `${avgEng}%`, icon: HiOutlineFire, color: '#22c55e', trend: '+3.2%' },
  ];

  // Generate dynamic chart data based on campaigns
  const revenueData = [];
  const monthlyData = {};
  
  campaigns.forEach(c => {
    const month = new Date(c.createdAt).toLocaleString('default', { month: 'short' });
    if (!monthlyData[month]) monthlyData[month] = { month: month, revenue: 0, campaigns: 0 };
    monthlyData[month].revenue += Number(c.budget);
    monthlyData[month].campaigns += 1;
  });
  
  Object.values(monthlyData).forEach(d => revenueData.push(d));
  if (revenueData.length === 0) {
    revenueData.push({ month: 'Jan', revenue: 0, campaigns: 0 });
  }

  // Generate category distribution
  const categoryCount = {};
  campaigns.forEach(c => {
    const cat = c.productCategory || 'Other';
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });
  const categoryData = Object.keys(categoryCount).map((key, i) => ({
    name: key,
    value: categoryCount[key]
  }));
  if (categoryData.length === 0) categoryData.push({ name: 'None', value: 1 });
  const COLORS = ['#6366f1', '#8b5cf6', '#f59e0b', '#22c55e', '#06b6d4'];

  const tooltipStyle = {
    background: 'var(--bg-card)', border: '1px solid var(--border-color)',
    borderRadius: '8px', fontSize: '0.78rem', color: 'var(--text-primary)',
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar type="admin" />
      <div className="main-content">
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '1100px' }}>
          <motion.div variants={fadeUp} style={{ marginBottom: '36px' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '6px' }}>Platform Analytics</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Overview of all campaign performance across the platform.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '36px' }} className="bento-grid-4">
            {stats.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: `${s.color}15`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: s.color,
                  }}><s.icon size={18} /></div>
                  <span style={{ fontSize: '0.72rem', fontWeight: '600', color: '#22c55e' }}>{s.trend}</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', marginBottom: '2px' }}>{s.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '500' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '36px' }} className="bento-grid-2">
            <motion.div variants={fadeUp} className="bento-card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '24px' }}>Revenue & Campaigns Over Time</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={32} />
                  <Bar dataKey="campaigns" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
            <motion.div variants={fadeUp} className="bento-card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '24px' }}>By Business Category</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '12px' }}>
                {categoryData.map((e, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '2px', background: COLORS[i] }} /> {e.name}
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
