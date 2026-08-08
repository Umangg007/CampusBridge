import React from 'react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { ChevronDown, Cpu } from 'lucide-react';

export const Header = () => {
  const { user, switchRole, healthStatus } = useAuth();

  return (
    <header className="ps-nav-bar">
      
      {/* 1. Main Navbar */}
      <div className="ps-nav-content">
        
        {/* Brand Logo & Name */}
        <div className="ps-brand-logo">
          <div className="ps-logo-quad">
            <div style={{ background: '#F43F5E' }}></div>
            <div style={{ background: '#10B981' }}></div>
            <div style={{ background: '#0284C7' }}></div>
            <div style={{ background: '#8B5CF6' }}></div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                CampusBridge
              </span>
              <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', textTransform: 'uppercase' }}>
                ParentSquare Clone
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>K-12 Family Engagement Platform</p>
          </div>
        </div>

        {/* Navigation Dropdowns */}
        <div className="ps-nav-links">
          <div className="ps-nav-link">
            <span>Platform</span> <ChevronDown size={14} style={{ color: '#94A3B8' }} />
          </div>
          <div className="ps-nav-link">
            <span>Solutions</span> <ChevronDown size={14} style={{ color: '#94A3B8' }} />
          </div>
          <div className="ps-nav-link">
            <span>Resources & Support</span> <ChevronDown size={14} style={{ color: '#94A3B8' }} />
          </div>
          <div className="ps-nav-link">
            <span>Company</span> <ChevronDown size={14} style={{ color: '#94A3B8' }} />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="ps-btn-green">
            Get demo →
          </button>
          <button className="ps-btn-outline">
            Sign in
          </button>
        </div>

      </div>

      {/* 2. Sub-Bar: Role Selector & Tri-DB Engine Info */}
      <div className="ps-subnav-bar">
        <div className="ps-subnav-content">
          
          {/* Role Switcher */}
          <div style={{ display: 'flex', itemsCenter: 'center', gap: '8px' }}>
            <span style={{ color: '#64748B', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>
              Select Role View:
            </span>
            <div className="ps-role-group">
              {Object.keys(DEMO_ACCOUNTS).map((roleKey) => {
                const isSelected = user?.role === roleKey;
                return (
                  <button
                    key={roleKey}
                    onClick={() => switchRole(roleKey)}
                    className={`ps-role-btn ${isSelected ? 'ps-role-btn-active' : 'ps-role-btn-inactive'}`}
                  >
                    {roleKey}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logged-In User Profile */}
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '4px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#047857', color: '#FFFFFF', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                {user.name.charAt(0)}
              </div>
              <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '12px' }}>{user.name}</span>
              <span className="badge badge-academic">{user.role}</span>
            </div>
          )}

          {/* Tri-DB Diagnostics */}
          {healthStatus && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
              <Cpu size={14} style={{ color: '#047857' }} />
              <span style={{ color: '#64748B', fontWeight: 500 }}>Tri-DB Engines:</span>
              <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>SQLite</span>
              <span style={{ backgroundColor: '#E0F2FE', color: '#0369A1', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>MongoDB</span>
              <span style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>Redis 7</span>
            </div>
          )}

        </div>
      </div>

    </header>
  );
};
