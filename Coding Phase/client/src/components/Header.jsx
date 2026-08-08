import React from 'react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { Search, Bell, Plus, Cpu, ChevronDown } from 'lucide-react';

export const Header = () => {
  const { user, switchRole, healthStatus } = useAuth();

  return (
    <header className="ps-header-root">
      
      {/* Top Navigation Bar */}
      <div className="ps-header-main">
        
        {/* Brand Emblem & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', width: '34px', height: '34px', padding: '4px', backgroundColor: '#0F172A', borderRadius: '10px' }}>
            <div style={{ backgroundColor: '#F43F5E', borderRadius: '3px' }}></div>
            <div style={{ backgroundColor: '#10B981', borderRadius: '3px' }}></div>
            <div style={{ backgroundColor: '#0284C7', borderRadius: '3px' }}></div>
            <div style={{ backgroundColor: '#8B5CF6', borderRadius: '3px' }}></div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                CampusBridge
              </span>
              <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', textTransform: 'uppercase' }}>
                ParentSquare Enterprise
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>Greenwood High School District</p>
          </div>
        </div>

        {/* Global Search Input (ParentSquare Signature) */}
        <div className="ps-search-box">
          <Search size={16} style={{ color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search announcements, classes, teachers, or homework..."
            className="ps-search-input"
          />
        </div>

        {/* Action Controls & Profile Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {(user?.role === 'ADMIN' || user?.role === 'TEACHER') && (
            <button className="ps-btn-primary" style={{ fontSize: '12px', padding: '8px 16px' }}>
              <Plus size={14} /> New Post
            </button>
          )}

          {/* Notification Bell */}
          <div style={{ position: 'relative', cursor: 'pointer', padding: '6px' }}>
            <Bell size={20} style={{ color: '#475569' }} />
            <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F43F5E' }}></span>
          </div>

          {/* User Profile */}
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 12px 4px 6px', backgroundColor: '#F8FAFC', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#00A884', color: '#FFFFFF', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {user.name.charAt(0)}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>{user.name}</div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#00A884', textTransform: 'uppercase' }}>{user.role}</div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Sub-Header Bar: Role Selector & Tri-DB Engine Metrics */}
      <div className="ps-sub-header">
        <div className="ps-sub-container">
          
          {/* Role Switcher Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#64748B', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>
              Select Role View:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFFFFF', padding: '3px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
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

          {/* Tri-Database Engine Status */}
          {healthStatus && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
              <Cpu size={14} style={{ color: '#00A884' }} />
              <span style={{ color: '#64748B', fontWeight: 500 }}>Tri-DB Architecture:</span>
              <span style={{ backgroundColor: '#D1FAE5', color: '#065F46', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>SQLite</span>
              <span style={{ backgroundColor: '#E0F2FE', color: '#0369A1', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>MongoDB</span>
              <span style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>Redis 7</span>
            </div>
          )}

        </div>
      </div>

    </header>
  );
};
