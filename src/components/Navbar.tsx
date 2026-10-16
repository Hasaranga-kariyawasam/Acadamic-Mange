import React, { useState } from 'react';
import { useAcademic } from '../context/AcademicContext';
import { 
  GraduationCap, 
  LayoutDashboard, 
  FileCheck2, 
  Users, 
  CalendarRange, 
  Clock, 
  Upload, 
  Download, 
  Sparkles,
  Search,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'ca-tracker' | 'cohort' | 'planner' | 'workload';
  setActiveTab: (tab: 'dashboard' | 'ca-tracker' | 'cohort' | 'planner' | 'workload') => void;
  onOpenProfileModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenProfileModal }) => {
  const { 
    activeStudentIndex, 
    activeStudent, 
    allStudents, 
    setActiveStudentIndex,
    loadOfficialRuhunaBatch,
    exportJSON
  } = useAcademic();

  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadBackup = () => {
    setIsExporting(true);
    const data = exportJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ruhuna_bict_${activeStudentIndex.replace(/\//g, '_')}_grades.json`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setIsExporting(false), 800);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-200/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          
          {/* Zone 1: Brand Wordmark (Strict Top Bar Contract - 1 clean element) */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap block">
                Ruhuna BICT Hub
              </span>
              <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap block">
                Faculty of Technology · University of Ruhuna
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Single line, whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('ca-tracker')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'ca-tracker'
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>CA Marks Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('cohort')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'cohort'
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Cohort & Peer Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'planner'
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <CalendarRange className="w-4 h-4" />
              <span>8-Sem Predictor</span>
            </button>

            <button
              onClick={() => setActiveTab('workload')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                activeTab === 'workload'
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Study Workload</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Profile Selector Action */}
          <div className="flex items-center gap-2 shrink-0">
            {allStudents.length <= 1 && (
              <button
                onClick={loadOfficialRuhunaBatch}
                title="Load all 78+ batch results from the official gazette sheet"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Load Ruhuna Batch</span>
              </button>
            )}

            <button
              onClick={onOpenProfileModal}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-800 bg-white/90 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-white shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 font-mono text-[10px] font-bold">
                {activeStudentIndex.slice(-3) || 'TG'}
              </div>
              <div className="text-left hidden md:block">
                <span className="font-semibold text-slate-900 block font-mono text-[11px] leading-tight">
                  {activeStudentIndex}
                </span>
                <span className="text-[10px] text-slate-500 truncate max-w-[100px] block leading-tight">
                  {activeStudent?.studentName || 'Student Profile'}
                </span>
              </div>
              <span className="text-slate-400 text-[10px]">▼</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 text-xs no-scrollbar">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('ca-tracker')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'ca-tracker' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            CA Tracker
          </button>
          <button
            onClick={() => setActiveTab('cohort')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'cohort' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Cohort
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'planner' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            8-Sem Planner
          </button>
          <button
            onClick={() => setActiveTab('workload')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 font-medium ${
              activeTab === 'workload' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Study Workload
          </button>
        </div>
      </div>
    </header>
  );
};
