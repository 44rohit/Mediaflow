'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer style={{
      background: theme === 'dark' ? '#040406' : '#fafafa',
      borderTop: '1px solid var(--border-color)',
      padding: '80px 24px 32px',
    }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '64px'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '10px',
                background: 'var(--accent-gradient)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: '800', color: 'white',
                fontFamily: 'Outfit, sans-serif'
              }}>M</div>
              <span style={{ fontSize: '1.15rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>MediaFlow</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.7', maxWidth: '280px' }}>
              Empowering local businesses with smart digital marketing solutions that deliver measurable results.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              {[FaXTwitter, FaLinkedinIn, FaInstagram, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: '36px', height: '36px', borderRadius: '100px',
                  background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', transition: 'all 0.2s', textDecoration: 'none',
                }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Platform', items: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Register', href: '/register' }, { label: 'Login', href: '/login' }] },
            { title: 'Services', items: [{ label: 'Social Media Ads' }, { label: 'Google Advertising' }, { label: 'Influencer Marketing' }, { label: 'Content Creation' }] },
            { title: 'Company', items: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }, { label: 'Support' }, { label: 'Contact' }] },
          ].map(section => (
            <div key={section.title}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-muted)', marginBottom: '20px' }}>{section.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {section.items.map(item => (
                  item.href ? (
                    <Link key={item.label} href={item.href} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}>
                      {item.label}
                    </Link>
                  ) : (
                    <span key={item.label} style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{item.label}</span>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--border-color)', paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            © 2026 MediaFlow. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            Designed with ♥ for local businesses
          </p>
        </div>
      </div>
    </footer>
  );
}
