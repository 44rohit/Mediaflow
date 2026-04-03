'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  HiOutlineViewGrid, HiOutlineDocumentText, HiOutlinePlusCircle,
  HiOutlineChartBar, HiOutlineCog, HiOutlineLogout, HiOutlineSun, HiOutlineMoon,
  HiOutlineUserGroup, HiOutlineClipboardList, HiOutlineMenu, HiOutlineX
} from 'react-icons/hi';

export default function DashboardSidebar({ type = 'vendor' }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const vendorLinks = [
    { href: '/dashboard', icon: HiOutlineViewGrid, label: 'Overview' },
    { href: '/dashboard/campaigns', icon: HiOutlineDocumentText, label: 'My Campaigns' },
    { href: '/dashboard/new-campaign', icon: HiOutlinePlusCircle, label: 'New Campaign' },
    { href: '/dashboard/analytics', icon: HiOutlineChartBar, label: 'Analytics' },
    { href: '/dashboard/settings', icon: HiOutlineCog, label: 'Settings' },
  ];

  const adminLinks = [
    { href: '/admin', icon: HiOutlineViewGrid, label: 'Overview' },
    { href: '/admin/campaigns', icon: HiOutlineClipboardList, label: 'Campaigns' },
    { href: '/admin/vendors', icon: HiOutlineUserGroup, label: 'Vendors' },
    { href: '/admin/analytics', icon: HiOutlineChartBar, label: 'Analytics' },
  ];

  const links = type === 'admin' ? adminLinks : vendorLinks;

  return (
    <>
      <div className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: 'white', fontFamily: 'Outfit, sans-serif' }}>M</div>
          <span style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>MediaFlow</span>
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '4px' }}>
          {isMobileOpen ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
        </button>
      </div>

      {isMobileOpen && (
        <div onClick={() => setIsMobileOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)', zIndex: 45 }} />
      )}

      <div className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', padding: '0 8px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'var(--accent-gradient)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: '800', color: 'white',
              fontFamily: 'Outfit, sans-serif'
            }}>M</div>
            <span style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>MediaFlow</span>
          </div>
        </Link>

        {/* Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-muted)', padding: '0 12px', marginBottom: '8px' }}>
            Menu
          </div>
          {links.map(link => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }} onClick={() => setIsMobileOpen(false)}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 12px', borderRadius: 'var(--radius)',
                  background: active ? 'rgba(99,102,241,0.1)' : 'transparent',
                  color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: active ? '600' : '500',
                  fontSize: '0.88rem', transition: 'all 0.2s',
                  cursor: 'pointer',
                }}>
                  <link.icon size={19} />
                  {link.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* User Info */}
        {user && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px', borderRadius: 'var(--radius)',
            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            marginBottom: '12px',
          }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '100px',
              background: 'var(--accent-gradient)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '0.8rem', fontWeight: '700',
              fontFamily: 'Outfit, sans-serif',
            }}>{user.name?.[0] || 'U'}</div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
            </div>
          </div>
        )}
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '11px 12px', borderRadius: 'var(--radius)',
            background: 'transparent', border: 'none',
            color: 'var(--text-secondary)', fontSize: '0.88rem',
            fontWeight: '500', cursor: 'pointer', width: '100%',
            fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
          }}
        >
          {theme === 'dark' ? <HiOutlineSun size={19} /> : <HiOutlineMoon size={19} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={() => { logout(); window.location.href = '/'; }}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '11px 12px', borderRadius: 'var(--radius)',
            background: 'transparent', border: 'none',
            color: 'var(--danger)', fontSize: '0.88rem',
            fontWeight: '500', cursor: 'pointer', width: '100%',
            fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
          }}
        >
          <HiOutlineLogout size={19} />
          Logout
        </button>
      </div>
    </div>
    </>
  );
}
