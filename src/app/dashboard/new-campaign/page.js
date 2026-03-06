'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/context/AuthContext';
import { useCampaigns } from '@/context/CampaignContext';
import { businessCategories, channelOptions } from '@/lib/mockData';
import {
  HiOutlineArrowRight, HiOutlineArrowLeft, HiOutlineCheck,
  HiOutlinePhotograph, HiOutlineLightBulb, HiOutlineCloudUpload
} from 'react-icons/hi';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function NewCampaignPage() {
  const { user, loading: authLoading } = useAuth();
  const { addCampaign } = useCampaigns();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    productName: '', productDescription: '', productCategory: '',
    hasIdea: false, ideaDescription: '',
    targetAudience: 25000, budget: 15000,
    startDate: '', endDate: '',
    channels: [], specialNotes: '',
  });

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  if (authLoading || !user) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const toggleChannel = (ch) => {
    setForm(f => ({
      ...f,
      channels: f.channels.includes(ch) ? f.channels.filter(c => c !== ch) : [...f.channels, ch]
    }));
  };

  const handleSubmit = () => {
    const campaignData = {
      ...form,
      vendorId: user.id,
      vendorName: user.name,
      businessName: user.businessName,
      budget: Number(form.budget),
      targetAudience: Number(form.targetAudience),
      timeline: { start: form.startDate, end: form.endDate }
    };
    addCampaign(campaignData);
    setSubmitted(true);
    setTimeout(() => router.push('/dashboard'), 3000);
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  if (submitted) {
    return (
      <div className="dashboard-layout">
        <DashboardSidebar type="vendor" />
        <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ textAlign: 'center', maxWidth: '440px' }}
          >
            <div style={{
              width: '80px', height: '80px', borderRadius: '100px',
              background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', color: '#22c55e',
            }}>
              <HiOutlineCheck size={36} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '12px' }}>Campaign Submitted!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Your marketing campaign request has been submitted successfully. Our team will review it and get back to you shortly.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '16px' }}>Redirecting to dashboard...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <DashboardSidebar type="vendor" />
      <div className="main-content">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ maxWidth: '700px' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginBottom: '8px' }}>New Campaign</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '32px' }}>
            Submit your marketing campaign request in a few simple steps.
          </p>

          {/* Progress Bar */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>Step {step} of {totalSteps}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <motion.div className="progress-bar-fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
            </div>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '24px' }}>Product Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Product Name *</label>
                    <input name="productName" value={form.productName} onChange={handleChange} className="input-field" placeholder="e.g., Weekend Brunch Special" />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Product Description *</label>
                    <textarea name="productDescription" value={form.productDescription} onChange={handleChange} className="input-field" placeholder="Describe your product or service..." rows={4} style={{ resize: 'vertical' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Product Category</label>
                    <select name="productCategory" value={form.productCategory} onChange={handleChange} className="input-field" style={{ cursor: 'pointer' }}>
                      <option value="">Select category</option>
                      {businessCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '24px' }}>Media & Ideas</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Upload Zone */}
                  <div style={{
                    border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-lg)',
                    padding: '48px', textAlign: 'center', cursor: 'pointer',
                    transition: 'all 0.3s', background: 'var(--bg-input)',
                  }}>
                    <HiOutlineCloudUpload size={40} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500', marginBottom: '6px' }}>Drag & drop your images or videos here</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>PNG, JPG, MP4 up to 10MB</p>
                    <button className="btn-secondary btn-sm" style={{ marginTop: '16px', borderRadius: '100px' }}>
                      <HiOutlinePhotograph size={14} /> Browse Files
                    </button>
                  </div>

                  {/* Idea Toggle */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
                    background: 'var(--bg-input)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)',
                  }}>
                    <input type="checkbox" name="hasIdea" checked={form.hasIdea} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-primary)' }} />
                    <div>
                      <p style={{ fontSize: '0.88rem', fontWeight: '500' }}>I have an idea instead of a product</p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Describe your idea and we&apos;ll help bring it to life</p>
                    </div>
                  </div>

                  {form.hasIdea && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                        <HiOutlineLightBulb size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                        Your Idea
                      </label>
                      <textarea name="ideaDescription" value={form.ideaDescription} onChange={handleChange} className="input-field" placeholder="Describe your marketing idea..." rows={4} style={{ resize: 'vertical' }} />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '24px' }}>Campaign Preferences</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Target Audience</label>
                      <input type="number" name="targetAudience" value={form.targetAudience} onChange={handleChange} className="input-field" placeholder="50000" />
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>{Number(form.targetAudience).toLocaleString()} people</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Budget (₹)</label>
                      <input type="number" name="budget" value={form.budget} onChange={handleChange} className="input-field" placeholder="25000" />
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>₹{Number(form.budget).toLocaleString()}</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Start Date</label>
                      <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="input-field" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>End Date</label>
                      <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '10px', display: 'block' }}>Preferred Channels</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {channelOptions.map(ch => (
                        <button key={ch} type="button" onClick={() => toggleChannel(ch)} style={{
                          padding: '8px 18px', borderRadius: '100px', fontSize: '0.82rem',
                          fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s',
                          background: form.channels.includes(ch) ? 'var(--accent-primary)' : 'var(--bg-input)',
                          color: form.channels.includes(ch) ? 'white' : 'var(--text-secondary)',
                          border: `1px solid ${form.channels.includes(ch) ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                          fontFamily: 'Inter, sans-serif',
                        }}>{ch}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Special Notes</label>
                    <textarea name="specialNotes" value={form.specialNotes} onChange={handleChange} className="input-field" placeholder="Any special instructions for the marketing team..." rows={3} style={{ resize: 'vertical' }} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', fontFamily: 'Outfit, sans-serif', marginBottom: '24px' }}>Review & Submit</h3>
                <div className="bento-card" style={{ padding: '32px', marginBottom: '8px' }}>
                  {[
                    { label: 'Product Name', value: form.productName || '—' },
                    { label: 'Description', value: form.productDescription?.slice(0, 100) + (form.productDescription?.length > 100 ? '...' : '') || '—' },
                    { label: 'Category', value: form.productCategory || '—' },
                    { label: 'Target Audience', value: `${Number(form.targetAudience).toLocaleString()} people` },
                    { label: 'Budget', value: `₹${Number(form.budget).toLocaleString()}` },
                    { label: 'Timeline', value: form.startDate && form.endDate ? `${form.startDate} → ${form.endDate}` : '—' },
                    { label: 'Channels', value: form.channels.join(', ') || '—' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                      padding: '14px 0', borderBottom: i < 6 ? '1px solid var(--border-color)' : 'none',
                    }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '500' }}>{item.label}</span>
                      <span style={{ fontSize: '0.88rem', fontWeight: '500', textAlign: 'right', maxWidth: '60%' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '36px', gap: '12px' }}>
            {step > 1 ? (
              <button className="btn-secondary" onClick={() => setStep(s => s - 1)} style={{ borderRadius: '100px' }}>
                <HiOutlineArrowLeft size={16} /> Back
              </button>
            ) : <div />}
            {step < totalSteps ? (
              <button className="btn-primary" onClick={() => setStep(s => s + 1)}>
                Next <HiOutlineArrowRight size={16} />
              </button>
            ) : (
              <button className="btn-primary" onClick={handleSubmit}>
                Submit Campaign <HiOutlineCheck size={16} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
