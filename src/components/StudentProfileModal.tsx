import React, { useState } from 'react';
import { useAcademic } from '../context/AcademicContext';
import { UserCheck, X, Search, Sparkles, Upload, FileText, CheckCircle2, UserPlus } from 'lucide-react';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({ isOpen, onClose }) => {
  const { 
    activeStudentIndex, 
    setActiveStudentIndex, 
    allStudents, 
    addNewStudent,
    loadOfficialRuhunaBatch,
    importCSV,
    importJSON,
    resetToCleanState
  } = useAcademic();

  const [searchQuery, setSearchQuery] = useState('');
  const [newTgIndex, setNewTgIndex] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [importNotice, setImportNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = allStudents.filter(s => 
    s.studentIndex.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTgIndex.trim()) return;

    const trimmedIdx = newTgIndex.trim().toUpperCase();
    const trimmedName = newStudentName.trim() || `Student ${trimmedIdx}`;

    addNewStudent({
      studentIndex: trimmedIdx,
      studentName: trimmedName,
      semesters: {
        1: { sgpa: 3.00, cgpa: 3.00, grades: {} },
        2: { sgpa: 3.00, cgpa: 3.00, grades: {} }
      }
    });

    setActiveStudentIndex(trimmedIdx);
    setNewTgIndex('');
    setNewStudentName('');
    setImportNotice(`Registered profile ${trimmedIdx} successfully!`);
    setTimeout(() => {
      setImportNotice(null);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-lg glow-card rounded-2xl shadow-xl overflow-hidden border border-slate-200 bg-white">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Student Profile & TG Register</h3>
              <p className="text-xs text-slate-500">Switch profile or register your TG number</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {importNotice && (
          <div className="mx-6 mt-4 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{importNotice}</span>
          </div>
        )}

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Quick Registration with TG Number */}
          <form onSubmit={handleRegister} className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5 text-emerald-700" />
              <span>Register New Student with TG Number</span>
            </span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="TG Number (e.g. TG/2024/2082)"
                value={newTgIndex}
                onChange={(e) => setNewTgIndex(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl glow-input font-mono font-bold uppercase text-slate-900"
                required
              />
              <input
                type="text"
                placeholder="Full Name / Initials"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl glow-input text-slate-900 font-medium"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              Register & Switch to this Profile
            </button>
          </form>

          {/* Quick Search & Switch Student from Cohort */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Switch Student Profile ({allStudents.length} profiles)
              </label>
              {allStudents.length <= 1 && (
                <button
                  type="button"
                  onClick={loadOfficialRuhunaBatch}
                  className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Load 78 Batchmates
                </button>
              )}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search TG Number or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glow-input text-slate-900"
              />
            </div>

            <div className="mt-2 max-h-48 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white">
              {filtered.map(student => {
                const isSelected = student.studentIndex === activeStudentIndex;
                const sem2 = student.semesters[2];
                return (
                  <button
                    key={student.studentIndex}
                    onClick={() => {
                      setActiveStudentIndex(student.studentIndex);
                      onClose();
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected ? 'bg-emerald-50 text-emerald-950 font-bold' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div>
                      <span className="font-mono font-bold text-slate-900 mr-2">{student.studentIndex}</span>
                      <span className="text-slate-500">{student.studentName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {sem2?.cgpa !== undefined && (
                        <span className="font-mono font-bold text-emerald-700 text-[11px]">
                          CGPA: {sem2.cgpa}
                        </span>
                      )}
                      {isSelected && (
                        <span className="text-[10px] font-bold bg-emerald-600 text-white px-1.5 py-0.2 rounded">
                          Active
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset Clean State */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Data stored privately in your browser storage.</span>
            <button
              onClick={() => {
                if (window.confirm('Reset all marks back to initial clean state?')) {
                  resetToCleanState();
                  onClose();
                }
              }}
              className="text-slate-400 hover:text-rose-600 transition-colors text-[11px] cursor-pointer"
            >
              Reset Data
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
