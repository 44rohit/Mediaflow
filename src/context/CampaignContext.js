'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { mockCampaigns as initialMockCampaigns } from '@/lib/mockData';

const CampaignContext = createContext();

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('mediaflow-campaigns');
    if (saved) {
      try {
        setCampaigns(JSON.parse(saved));
      } catch (e) {
        setCampaigns(initialMockCampaigns);
      }
    } else {
      setCampaigns(initialMockCampaigns);
      localStorage.setItem('mediaflow-campaigns', JSON.stringify(initialMockCampaigns));
    }
    setLoading(false);
  }, []);

  const updateCampaign = (id, updates) => {
    setCampaigns(prev => {
      const next = prev.map(c => 
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : c
      );
      localStorage.setItem('mediaflow-campaigns', JSON.stringify(next));
      return next;
    });
  };

  const addCampaign = (campaignData) => {
    setCampaigns(prev => {
      const newCampaign = {
        ...campaignData,
        id: 'c' + Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        analytics: { reach: 0, impressions: 0, clicks: 0, engagementRate: 0 }
      };
      const next = [newCampaign, ...prev];
      localStorage.setItem('mediaflow-campaigns', JSON.stringify(next));
      return next;
    });
  };

  return (
    <CampaignContext.Provider value={{ campaigns, updateCampaign, addCampaign, loading }}>
      {children}
    </CampaignContext.Provider>
  );
}

export const useCampaigns = () => useContext(CampaignContext);
