'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CampaignContext = createContext();

export function CampaignProvider({ children }) {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const url = user?.role === 'admin' 
          ? '/api/campaigns' 
          : `/api/campaigns?vendorId=${user?.id}`;
        
        const res = await fetch(url);
        const data = await res.json();
        setCampaigns(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to fetch campaigns:', e);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCampaigns();
    } else {
      setCampaigns([]);
      setLoading(false);
    }
  }, [user]);

  const updateCampaign = async (id, updates) => {
    try {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        setCampaigns(prev => prev.map(c => 
          c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
        ));
      }
    } catch (e) {
      console.error('Failed to update campaign:', e);
    }
  };

  const addCampaign = async (campaignData) => {
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData),
      });

      const data = await res.json();
      if (res.ok) {
        const newCampaign = {
          ...campaignData,
          id: data.id,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          analytics: { reach: 0, impressions: 0, clicks: 0, engagementRate: 0 }
        };
        setCampaigns(prev => [newCampaign, ...prev]);
        return data.id;
      }
    } catch (e) {
      console.error('Failed to add campaign:', e);
    }
  };

  return (
    <CampaignContext.Provider value={{ campaigns, updateCampaign, addCampaign, loading }}>
      {children}
    </CampaignContext.Provider>
  );
}

export const useCampaigns = () => useContext(CampaignContext);
