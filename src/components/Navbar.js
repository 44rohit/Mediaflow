'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { HiOutlineSun, HiOutlineMoon, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ];

  return (
    <>
      {/* Inline styles for responsive overrides since Tailwind utility classes 
          get overridden by inline style={{ display: 'flex' }} */}
      <style jsx global>{`
        .nav-desktop { display: none !important; }
        .nav-mobile-btn { display: flex !important; }
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-btn { display: none !important; }
        }
      `}</style>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 clamp(16px, 3vw, 48px)',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled
            ? theme === 'dark' ? 'rgba(6,6,8,0.85)' : 'rgba(255,255,255,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Logo — Left */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px',
              background: 'var(--accent-gradient)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: '800', color: 'white',
              fontFamily: 'Outfit, sans-serif'
            }}>M</div>
            <span style={{
              fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)',
              fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em'
            }}>MediaFlow</span>
          </div>
        </Link>

        {/* Center Pill Nav — Desktop */}
        <div
          className="nav-desktop"
          style={{
            alignItems: 'center',
            gap: '8px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            borderRadius: '100px', padding: '4px',
          }}>
            {navLinks.map(link => (
              <Link key={link.label} href={link.href} style={{
                color: 'var(--text-secondary)', textDecoration: 'none',
                fontSize: '0.85rem', fontWeight: '500', padding: '8px 20px',
                borderRadius: '100px', transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}>
                {link.label}
              </Link>
            ))}
            {user && (
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} style={{
                color: 'var(--text-secondary)', textDecoration: 'none',
                fontSize: '0.85rem', fontWeight: '500', padding: '8px 20px',
                borderRadius: '100px', transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}>
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Right Actions — Desktop */}
        <div
          className="nav-desktop"
          style={{
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0,
          }}
        >
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '100px', width: '40px', height: '40px', cursor: 'pointer',
              color: 'var(--text-primary)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0,
            }}
          >
            {theme === 'dark' ? <HiOutlineSun size={16} /> : <HiOutlineMoon size={16} />}
          </button>
          {user ? (
            <button onClick={logout} className="btn-secondary btn-sm" style={{ borderRadius: '100px', whiteSpace: 'nowrap' }}>
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <span style={{
                  color: 'var(--text-secondary)', fontSize: '0.85rem',
                  fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap',
                }}>Login</span>
              </Link>
              <Link href="/register" style={{ textDecoration: 'none' }}>
                <button className="btn-primary btn-sm" style={{ whiteSpace: 'nowrap' }}>
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none', border: 'none', color: 'var(--text-primary)',
            cursor: 'pointer', alignItems: 'center', justifyContent: 'center',
            padding: '8px',
          }}
        >
          {mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute', top: '72px', left: '16px', right: '16px',
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)', padding: '20px',
                display: 'flex', flexDirection: 'column', gap: '4px',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              {navLinks.map(link => (
                <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} style={{
                  color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500',
                  padding: '12px 16px', borderRadius: 'var(--radius)', transition: 'background 0.2s',
                  fontSize: '0.95rem',
                }}>{link.label}</Link>
              ))}
              {user ? (
                <>
                  <Link href={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMobileOpen(false)} style={{
                    color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500',
                    padding: '12px 16px', borderRadius: 'var(--radius)', fontSize: '0.95rem',
                  }}>Dashboard</Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} style={{
                    color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', fontWeight: '500', padding: '12px 16px', fontSize: '0.95rem',
                    fontFamily: 'Inter, sans-serif',
                  }}>Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} style={{
                    color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500',
                    padding: '12px 16px', borderRadius: 'var(--radius)', fontSize: '0.95rem',
                  }}>Login</Link>
                  <div style={{ padding: '8px 0 0' }}>
                    <Link href="/register" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none' }}>
                      <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get Started</button>
                    </Link>
                  </div>
                </>
              )}
              <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '8px', paddingTop: '12px' }}>
                <button onClick={toggleTheme} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '12px 16px', borderRadius: 'var(--radius)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {theme === 'dark' ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
