import React from 'react';
import { useAcademic } from '../context/AcademicContext';
import { 
  LayoutDashboard, 
  Table2, 
  Users, 
  TrendingUp, 
  Sparkles, 
  User, 
  ChevronRight,
  LogOut,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'ca-table' | 'batch' | 'predictor';
  setActiveTab: (tab: 'dashboard' | 'ca-table' | 'batch' | 'predictor') => void;
  onOpenProfile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onOpenProfile }) => {
  const { activeStudentIndex, activeStudent, allStudents, loadOfficialRuhunaBatch } = useAcademic();

  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: LayoutDashboard,
      desc: 'Overview & Goals'
    },
    {
      id: 'ca-table' as const,
      label: 'CA Marks Grid',
      icon: Table2,
      desc: 'Semester Marks Table'
    },
    {
      id: 'batch' as const,
      label: 'Batch & Compare',
      icon: Users,
      desc: 'Rankings & Repeats'
    },
    {
      id: 'predictor' as const,
      label: '8-Sem Predictor',
      icon: TrendingUp,
      desc: 'Future What-If GPA'
    }
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200/90 flex flex-col justify-between min-h-screen sticky top-0 z-30 shadow-xs">
      
      {/* Top Branding Section */}
      <div>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-base block leading-tight flex items-center gap-1.5">
                <span>GradePulse</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold font-mono block">
                RUHUNA · BICT
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items (Clean Icon + Short text) */}
        <nav className="p-3 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/25 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <div className="flex-1 truncate">
                  <span className="text-xs block leading-tight">{item.label}</span>
                  <span className={`text-[10px] block leading-tight ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {item.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Batch Gazette Quick-load if not loaded */}
        {allStudents.length <= 1 && (
          <div className="mx-3 mt-4 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
            <span className="text-[11px] font-bold text-emerald-900 block">
              Official Ruhuna Gazette
            </span>
            <span className="text-[10px] text-emerald-700 block mt-0.5 mb-2 leading-snug">
              78+ students results sheet
            </span>
            <button
              onClick={loadOfficialRuhunaBatch}
              className="w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Batch Results</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom User Profile Section */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60">
        <button
          onClick={onOpenProfile}
          className="w-full p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 transition-all text-left flex items-center justify-between shadow-xs cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold text-xs shrink-0">
              {activeStudentIndex.slice(-3) || 'TG'}
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-slate-900 font-mono block truncate">
                {activeStudentIndex}
              </span>
              <span className="text-[10px] text-slate-500 block truncate">
                {activeStudent?.studentName || 'Student Profile'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
        </button>
      </div>

    </aside>
  );
};
