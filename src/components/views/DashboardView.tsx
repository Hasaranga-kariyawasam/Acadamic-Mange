import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  Pin, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Target,
  Sparkles,
  CalendarCheck,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { Grade, TargetNote } from '../../types/academic';
import { getDegreeClassification } from '../../utils/gpaCalculations';

interface DashboardViewProps {
  onNavigateTab: (tab: 'dashboard' | 'ca-table' | 'batch' | 'predictor') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigateTab }) => {
  const { 
    activeStudentIndex, 
    activeStudent, 
    allStudents, 
    targetNotes, 
    addTargetNote, 
    deleteTargetNote, 
    togglePinTargetNote,
    curriculumCourses,
    predictedGrades
  } = useAcademic();

  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [noteSubjectCode, setNoteSubjectCode] = useState('ICT2213');
  const [noteSubjectName, setNoteSubjectName] = useState('Advanced Database Systems');
  const [noteCredits, setNoteCredits] = useState(3);
  const [noteTargetGrade, setNoteTargetGrade] = useState<Grade>('A');
  const [noteTargetMarks, setNoteTargetMarks] = useState(85);
  const [noteText, setNoteText] = useState('');
  const [goalViewMode, setGoalViewMode] = useState<'pinned' | 'future'>('pinned');

  // Confirmed stats
  const sem1 = activeStudent?.semesters?.[1];
  const sem2 = activeStudent?.semesters?.[2];

  const currentCgpa = typeof sem2?.cgpa === 'number' 
    ? sem2.cgpa 
    : typeof sem1?.cgpa === 'number' 
      ? sem1.cgpa 
      : 2.72;

  const latestSgpa = typeof sem2?.sgpa === 'number'
    ? sem2.sgpa
    : typeof sem1?.sgpa === 'number'
      ? sem1.sgpa
      : 2.93;

  const sem1Sgpa = typeof sem1?.sgpa === 'number' ? sem1.sgpa : 2.51;
  const degreeClass = getDegreeClassification(currentCgpa);

  // Batch Ranking
  const ranked = [...allStudents].sort((a, b) => {
    const aVal = typeof a.semesters?.[2]?.cgpa === 'number' ? a.semesters[2].cgpa : -1;
    const bVal = typeof b.semesters?.[2]?.cgpa === 'number' ? b.semesters[2].cgpa : -1;
    return bVal - aVal;
  });

  const rankIdx = ranked.findIndex(s => s.studentIndex === activeStudentIndex);
  const currentRank = rankIdx !== -1 ? rankIdx + 1 : 20;
  const totalStudents = Math.max(allStudents.length, 78);

  // Future semester courses with predicted targets from 8-sem planner
  const futureTargetCourses = curriculumCourses
    .filter(c => c.semesterId > 2)
    .slice(0, 7)
    .map(c => ({
      code: c.code,
      name: c.name,
      credits: c.credits,
      targetGrade: (predictedGrades[c.code] || 'A') as Grade
    }));

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    addTargetNote({
      subjectCode: noteSubjectCode.toUpperCase(),
      subjectName: noteSubjectName,
      credits: Number(noteCredits) || 2,
      targetGrade: noteTargetGrade,
      targetMarks: Number(noteTargetMarks) || 80,
      noteText: noteText.trim(),
      isPinned: true
    });
    setNoteText('');
    setIsAddNoteOpen(false);
  };

  const handleCourseSelectChange = (code: string) => {
    setNoteSubjectCode(code);
    const found = curriculumCourses.find(c => c.code === code);
    if (found) {
      setNoteSubjectName(found.name);
      setNoteCredits(found.credits);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Student Welcome Header Card */}
      <div className="glow-card rounded-2xl p-5 sm:p-6 bg-white relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Faculty of Technology · University of Ruhuna</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {activeStudent?.studentName || 'Student Profile'}
            </h1>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 pt-0.5">
              <span className="font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                {activeStudentIndex}
              </span>
              <span className="text-emerald-700 font-semibold font-mono">
                BICT (Hons)
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold glow-badge-emerald">
                {degreeClass.title.replace(' (Honours)', '')}
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('ca-table')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
          >
            <span>CA Marks Grid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Clean Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Column 1 (Left - 7 cols): Stats & Confirmed Semesters */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* 3 Core Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            {/* CGPA */}
            <div className="glow-card rounded-2xl p-4.5 bg-white">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>CGPA</span>
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {currentCgpa.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 font-mono">/ 4.00</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 block mt-1.5">
                Official Senate Confirmed
              </span>
            </div>

            {/* Latest SGPA */}
            <div className="glow-card rounded-2xl p-4.5 bg-white">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>SGPA (L1 S2)</span>
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {latestSgpa.toFixed(2)}
                </span>
                <span className="text-xs text-emerald-600 font-bold font-mono">
                  +{Math.max(0, latestSgpa - sem1Sgpa).toFixed(2)}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1.5">
                June/July 2026 Gazette
              </span>
            </div>

            {/* Batch Rank */}
            <div className="glow-card rounded-2xl p-4.5 bg-white">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Rank</span>
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  #{currentRank}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  / {totalStudents}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1.5 font-medium">
                Top {Math.max(1, Math.round((currentRank / totalStudents) * 100))}% in Cohort
              </span>
            </div>

          </div>

          {/* Dedicated Confirmed Semester Results Section */}
          <div className="glow-card rounded-2xl p-5 sm:p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                  Confirmed Semester Results
                </h2>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md font-bold">
                Senate Verified
              </span>
            </div>

            {/* Two Side-by-Side Elegant Minimalist Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Level 1 Semester 1 Card */}
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 hover:border-slate-300 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200/80 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-slate-300/80 transition-colors">
                    <GraduationCap className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-snug">
                      Level 1 Semester 1
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono block">
                      17 Credits · Verified
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono block font-medium">SGPA</span>
                  <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums leading-none">
                    {sem1Sgpa.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Level 1 Semester 2 Card */}
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 hover:border-emerald-300 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-emerald-200 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-snug">
                      Level 1 Semester 2
                    </span>
                    <span className="text-[11px] text-emerald-700 font-mono block">
                      17 Credits · Official Gazette
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-600 font-mono block font-medium">SGPA</span>
                  <span className="text-2xl font-extrabold text-emerald-700 font-mono tabular-nums leading-none">
                    {latestSgpa.toFixed(2)}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Column 2 (Right - 5 cols): Pinned Goals & Gradient Target Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="gradient-card-target rounded-2xl p-5 sm:p-6 space-y-4">
            
            {/* Header with Title and Mode Switcher */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-target-badge flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-tight">Pinned Goals & Targets</h2>
                  <span className="text-[11px] text-slate-500">Academic Target Focus</span>
                </div>
              </div>

              <button
                onClick={() => setIsAddNoteOpen(true)}
                className="px-2.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 border border-emerald-300 rounded-xl transition-colors flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Goal</span>
              </button>
            </div>

            {/* Sub-tabs: Pinned vs 8-Sem Future Targets */}
            <div className="flex items-center gap-1 p-1 bg-white/80 rounded-xl border border-emerald-200/80 text-xs">
              <button
                onClick={() => setGoalViewMode('pinned')}
                className={`flex-1 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  goalViewMode === 'pinned'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pinned Notes ({targetNotes.length})
              </button>
              <button
                onClick={() => setGoalViewMode('future')}
                className={`flex-1 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  goalViewMode === 'future'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                8-Sem Targets
              </button>
            </div>

            {/* Content: Mode 1 - Pinned Notes */}
            {goalViewMode === 'pinned' && (
              <div className="space-y-3">
                {targetNotes.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-emerald-200 rounded-xl bg-white/60">
                    No target notes pinned yet. Click "+ Add Goal" to set subject targets.
                  </div>
                ) : (
                  targetNotes.map((note) => (
                    <div 
                      key={note.id}
                      className="p-3.5 rounded-xl bg-white border border-emerald-200/80 hover:border-emerald-300 shadow-xs transition-all space-y-2 relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-emerald-800">
                              {note.subjectCode}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold">
                              {note.credits} Credits
                            </span>
                          </div>
                          <strong className="text-xs font-bold text-slate-900 block mt-0.5 line-clamp-1">
                            {note.subjectName}
                          </strong>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => togglePinTargetNote(note.id)}
                            className={`p-1 rounded transition-colors cursor-pointer ${
                              note.isPinned ? 'text-emerald-600' : 'text-slate-300 hover:text-slate-500'
                            }`}
                            title={note.isPinned ? 'Unpin' : 'Pin to top'}
                          >
                            <Pin className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteTargetNote(note.id)}
                            className="p-1 text-slate-300 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Clean Target Row with Gradient Badge */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                        <span className="text-slate-500 text-[11px] font-medium">Goal Target:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold px-2 py-0.5 rounded-md gradient-target-badge text-xs">
                            {note.targetGrade}
                          </span>
                          {note.targetMarks && (
                            <span className="font-mono font-bold text-emerald-800 text-xs">
                              ≥{note.targetMarks}%
                            </span>
                          )}
                        </div>
                      </div>

                      {note.noteText && (
                        <p className="text-[11px] text-slate-600 leading-snug bg-slate-50 p-2 rounded-lg border border-slate-100">
                          {note.noteText}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Content: Mode 2 - Targets from 8-Sem Planner */}
            {goalViewMode === 'future' && (
              <div className="space-y-2.5">
                <div className="text-[11px] text-slate-500 pb-1 flex items-center justify-between">
                  <span>Synced from 8-Sem Planner:</span>
                  <button
                    onClick={() => onNavigateTab('predictor')}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    Edit All in Predictor
                  </button>
                </div>

                {futureTargetCourses.map((c) => (
                  <div 
                    key={c.code}
                    className="p-3 rounded-xl bg-white border border-emerald-200/80 flex items-center justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-emerald-800">
                          {c.code}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                          {c.credits} Cr
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-600 block truncate max-w-[170px] mt-0.5">
                        {c.name}
                      </span>
                    </div>

                    <span className="font-mono font-bold px-2.5 py-0.5 rounded-md gradient-target-badge text-xs">
                      {c.targetGrade}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Add Target Note Modal */}
      {isAddNoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md glow-card rounded-2xl p-6 shadow-xl border border-slate-200 bg-white">
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>Add Target Goal Note</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Pin a subject with its credits and target mark directly on your dashboard.
            </p>

            <form onSubmit={handleCreateNote} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Subject</label>
                <select
                  value={noteSubjectCode}
                  onChange={(e) => handleCourseSelectChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl glow-input text-slate-900 font-medium"
                >
                  {curriculumCourses.map(c => (
                    <option key={c.id} value={c.code}>
                      {c.code} · {c.name} ({c.credits} Cr)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">Target Grade</label>
                  <select
                    value={noteTargetGrade}
                    onChange={(e) => setNoteTargetGrade(e.target.value as Grade)}
                    className="w-full px-3 py-2 text-xs rounded-xl glow-input font-mono font-bold"
                  >
                    {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 mb-1 block">Target Marks</label>
                  <input
                    type="number"
                    min="30"
                    max="100"
                    value={noteTargetMarks}
                    onChange={(e) => setNoteTargetMarks(parseInt(e.target.value) || 80)}
                    className="w-full px-3 py-2 text-xs rounded-xl glow-input font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Focus / Strategy Note (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 3-Credit high impact. Focus on past papers and practical assignments..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl glow-input text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddNoteOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs cursor-pointer"
                >
                  Pin to Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
