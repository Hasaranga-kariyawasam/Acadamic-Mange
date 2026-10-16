import React, { useState } from 'react';
import { AcademicProvider } from './context/AcademicContext';
import { Sidebar } from './components/Sidebar';
import { StudentProfileModal } from './components/StudentProfileModal';
import { DashboardView } from './components/views/DashboardView';
import { ContinuousAssessmentView } from './components/views/ContinuousAssessmentView';
import { CohortAnalyticsView } from './components/views/CohortAnalyticsView';
import { SemesterPlannerView } from './components/views/SemesterPlannerView';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ca-table' | 'batch' | 'predictor'>('dashboard');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <AcademicProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans selection:bg-emerald-100 selection:text-emerald-900">
        
        {/* Subtle Ambient Emerald Glow */}
        <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-100/60 rounded-full blur-3xl" />
        </div>

        {/* Desktop Sidebar (Left panel navigation) */}
        <div className="hidden md:flex">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-slate-900/40 backdrop-blur-xs">
            <div className="relative w-64 bg-white flex flex-col justify-between h-full shadow-2xl">
              <Sidebar 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsMobileSidebarOpen(false);
                }} 
                onOpenProfile={() => {
                  setIsProfileModalOpen(true);
                  setIsMobileSidebarOpen(false);
                }}
              />
              <button 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute top-3 right-3 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1" onClick={() => setIsMobileSidebarOpen(false)} />
          </div>
        )}

        {/* Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 z-10">
          
          {/* Mobile Top Header */}
          <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-extrabold text-slate-900 text-sm">GradePulse Ruhuna</span>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-xs font-bold font-mono text-emerald-800 bg-emerald-100 px-2 py-1 rounded"
            >
              Profile
            </button>
          </div>

          {/* Main Views Container */}
          <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {activeTab === 'dashboard' && (
              <DashboardView onNavigateTab={(tab) => setActiveTab(tab)} />
            )}

            {activeTab === 'ca-table' && (
              <ContinuousAssessmentView />
            )}

            {activeTab === 'batch' && (
              <CohortAnalyticsView />
            )}

            {activeTab === 'predictor' && (
              <SemesterPlannerView />
            )}
          </main>

        </div>

        {/* Profile Switcher Modal */}
        <StudentProfileModal 
          isOpen={isProfileModalOpen} 
          onClose={() => setIsProfileModalOpen(false)} 
        />

      </div>
    </AcademicProvider>
  );
}
