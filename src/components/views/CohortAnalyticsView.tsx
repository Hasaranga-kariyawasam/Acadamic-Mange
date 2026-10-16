import React, { useState, useMemo } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  Users, 
  Search, 
  Trophy, 
  ArrowUpDown, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  GitCompare, 
  BarChart3, 
  RefreshCw,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Grade, RUHUNA_GRADE_SCALE } from '../../types/academic';
import { gradeToPoint } from '../../utils/gpaCalculations';

export const CohortAnalyticsView: React.FC = () => {
  const { 
    activeStudentIndex, 
    setActiveStudentIndex, 
    allStudents, 
    loadOfficialRuhunaBatch,
    curriculumCourses,
    upgradeRepeaterGrade
  } = useAcademic();

  const [activeSubTab, setActiveSubTab] = useState<'leaderboard' | 'compare' | 'repeats'>('leaderboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'cgpa' | 'sgpa' | 'index'>('cgpa');

  // Head-to-Head Compare selections
  const [compareStudentA, setCompareStudentA] = useState<string>(activeStudentIndex);
  const [compareStudentB, setCompareStudentB] = useState<string>('TG/2024/2061'); // e.g. AMJAD M.H.M.

  // Repeater upgrade state
  const [repeatCourse, setRepeatCourse] = useState('ICT1232');
  const [repeatGrade, setRepeatGrade] = useState<Grade>('C');

  // Level 1 Sem 2 courses
  const l1s2Courses = curriculumCourses.filter(c => c.semesterId === 2);

  // Ranked students by CGPA
  const rankedStudents = useMemo(() => {
    return [...allStudents].sort((a, b) => {
      const aVal = typeof a.semesters?.[2]?.cgpa === 'number' ? a.semesters[2].cgpa : -1;
      const bVal = typeof b.semesters?.[2]?.cgpa === 'number' ? b.semesters[2].cgpa : -1;
      return bVal - aVal;
    }).map((student, idx) => ({
      ...student,
      rank: idx + 1
    }));
  }, [allStudents]);

  // Display students based on search and sort
  const displayStudents = useMemo(() => {
    let list = [...rankedStudents];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(s => 
        s.studentIndex.toLowerCase().includes(q) || 
        s.studentName.toLowerCase().includes(q)
      );
    }

    if (sortField === 'sgpa') {
      list.sort((a, b) => {
        const aVal = typeof a.semesters?.[2]?.sgpa === 'number' ? a.semesters[2].sgpa : -1;
        const bVal = typeof b.semesters?.[2]?.sgpa === 'number' ? b.semesters[2].sgpa : -1;
        return bVal - aVal;
      });
    } else if (sortField === 'index') {
      list.sort((a, b) => a.studentIndex.localeCompare(b.studentIndex));
    }

    return list;
  }, [rankedStudents, searchQuery, sortField]);

  const studentA = allStudents.find(s => s.studentIndex === compareStudentA) || allStudents[0];
  const studentB = allStudents.find(s => s.studentIndex === compareStudentB) || (allStudents[1] || allStudents[0]);

  const handleApplyRepeaterUpgrade = () => {
    upgradeRepeaterGrade(activeStudentIndex, 2, repeatCourse, repeatGrade);
  };

  const myRank = rankedStudents.find(s => s.studentIndex === activeStudentIndex)?.rank || '—';

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header & Sub-Tab Bar */}
      <div className="glow-card rounded-2xl p-6 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Batch Examination Records & Comparative Standing</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Confirmed Batch Results (Level 1 Semester 2)
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {allStudents.length <= 1 && (
              <button
                onClick={loadOfficialRuhunaBatch}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pre-load Official Ruhuna Batch</span>
              </button>
            )}
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-900">
              Your Rank: #{myRank} of {allStudents.length}
            </div>
          </div>
        </div>

        {/* 3 Clean Sub-Tabs */}
        <div className="flex items-center gap-2 mt-5 p-1 bg-slate-100 rounded-xl w-fit">
          <button
            onClick={() => setActiveSubTab('leaderboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'leaderboard'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Batch Leaderboard ({allStudents.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('compare')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'compare'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Head-to-Head Compare</span>
          </button>

          <button
            onClick={() => setActiveSubTab('repeats')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'repeats'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Repeater Upgrade Tool</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: Batch Leaderboard */}
      {activeSubTab === 'leaderboard' && (
        <div className="glow-card rounded-2xl p-6 bg-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search TG index or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glow-input text-slate-900"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Sort By:</span>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as any)}
                className="px-2.5 py-1.5 text-xs rounded-xl glow-input text-slate-700 font-bold"
              >
                <option value="cgpa">CGPA (Highest)</option>
                <option value="sgpa">SGPA (Highest)</option>
                <option value="index">Index Number</option>
              </select>

              <button
                onClick={() => setSearchQuery(activeStudentIndex)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Find Me
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200/90 rounded-xl">
            <table className="w-full text-left text-xs border-collapse divide-y divide-slate-100">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="py-2.5 px-3 font-bold text-center w-12">Rank</th>
                  <th className="py-2.5 px-3 font-bold">Index & Student Name</th>
                  <th className="py-2.5 px-2 font-bold text-center font-mono">ICT1212</th>
                  <th className="py-2.5 px-2 font-bold text-center font-mono">ICT1222</th>
                  <th className="py-2.5 px-2 font-bold text-center font-mono">ICT1232</th>
                  <th className="py-2.5 px-2 font-bold text-center font-mono">ICT1242</th>
                  <th className="py-2.5 px-2 font-bold text-center font-mono">ICT1252</th>
                  <th className="py-2.5 px-2 font-bold text-center font-mono">ICT1261</th>
                  <th className="py-2.5 px-2 font-bold text-center font-mono">TCS1212</th>
                  <th className="py-2.5 px-2 font-bold text-center font-mono">TMS1232</th>
                  <th className="py-2.5 px-2 font-bold text-center font-mono">ENG1222</th>
                  <th className="py-2.5 px-3 font-bold text-center font-mono">SGPA</th>
                  <th className="py-2.5 px-3 font-bold text-right font-mono">CGPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {displayStudents.map((student) => {
                  const isCurrent = student.studentIndex === activeStudentIndex;
                  const sem2 = student.semesters?.[2];
                  const cgpa = sem2?.cgpa;
                  const sgpa = sem2?.sgpa;
                  const grades = sem2?.grades || {};

                  return (
                    <tr 
                      key={student.studentIndex}
                      className={`transition-colors ${
                        isCurrent ? 'bg-emerald-50/90 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-700">
                        #{student.rank}
                      </td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={() => setActiveStudentIndex(student.studentIndex)}
                          className="font-mono font-bold text-slate-900 hover:text-emerald-700 text-left cursor-pointer"
                        >
                          {student.studentIndex} {isCurrent && '(You)'}
                        </button>
                        <span className="text-[11px] text-slate-500 block truncate max-w-[170px]">
                          {student.studentName}
                        </span>
                      </td>

                      {['ICT1212', 'ICT1222', 'ICT1232', 'ICT1242', 'ICT1252', 'ICT1261', 'TCS1212', 'TMS1232', 'ENG1222'].map(code => (
                        <td key={code} className="py-2.5 px-2 text-center font-mono text-[11px]">
                          <span className={`px-1 py-0.5 rounded font-bold ${
                            grades[code] === 'A' || grades[code] === 'A+' ? 'text-emerald-700 bg-emerald-100' :
                            grades[code]?.startsWith('B') ? 'text-blue-700 bg-blue-50' :
                            grades[code] === 'D' || grades[code] === 'E' || grades[code] === 'EE' ? 'text-rose-700 bg-rose-50' :
                            'text-slate-700'
                          }`}>
                            {grades[code] || '—'}
                          </span>
                        </td>
                      ))}

                      <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-800">
                        {typeof sgpa === 'number' ? sgpa.toFixed(2) : sgpa || '—'}
                      </td>

                      <td className="py-2.5 px-3 text-right font-mono font-extrabold text-emerald-800">
                        {typeof cgpa === 'number' ? cgpa.toFixed(2) : cgpa || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Head-to-Head Compare */}
      {activeSubTab === 'compare' && (
        <div className="glow-card rounded-2xl p-6 bg-white space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 block mb-1">STUDENT 1</span>
              <select
                value={compareStudentA}
                onChange={(e) => setCompareStudentA(e.target.value)}
                className="w-full p-2 text-xs rounded-lg glow-input font-bold text-slate-900"
              >
                {allStudents.map(s => (
                  <option key={s.studentIndex} value={s.studentIndex}>
                    {s.studentIndex} · {s.studentName} {s.studentIndex === activeStudentIndex ? '(You)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-700 block mb-1">STUDENT 2</span>
              <select
                value={compareStudentB}
                onChange={(e) => setCompareStudentB(e.target.value)}
                className="w-full p-2 text-xs rounded-lg glow-input font-bold text-slate-900"
              >
                {allStudents.map(s => (
                  <option key={s.studentIndex} value={s.studentIndex}>
                    {s.studentIndex} · {s.studentName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs divide-y divide-slate-100">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Course</th>
                  <th className="py-2.5 px-3 font-bold text-center text-emerald-800">{studentA?.studentIndex}</th>
                  <th className="py-2.5 px-3 font-bold text-center text-slate-800">{studentB?.studentIndex}</th>
                  <th className="py-2.5 px-3 font-bold text-right">Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {l1s2Courses.map(course => {
                  const grA = studentA?.semesters?.[2]?.grades?.[course.code] || '—';
                  const grB = studentB?.semesters?.[2]?.grades?.[course.code] || '—';
                  const ptA = gradeToPoint(grA);
                  const ptB = gradeToPoint(grB);
                  const diff = Number((ptA - ptB).toFixed(2));

                  return (
                    <tr key={course.code} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        <strong className="font-mono text-emerald-700 mr-2">{course.code}</strong>
                        <span>{course.name}</span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-800">
                        {grA} ({ptA.toFixed(1)})
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-800">
                        {grB} ({ptB.toFixed(1)})
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold">
                        <span className={diff > 0 ? 'text-emerald-700' : diff < 0 ? 'text-rose-600' : 'text-slate-400'}>
                          {diff > 0 ? `+${diff}` : diff < 0 ? `${diff}` : 'Equal'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Repeater Upgrade Tool (Max C Pass) */}
      {activeSubTab === 'repeats' && (
        <div className="glow-card rounded-2xl p-6 bg-white space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-600" />
              <span>Repeater Exam Mark Upgrade Tool</span>
            </h2>
            <p className="text-xs text-slate-500">
              In university regulations, retaking an ineligible or failed module (D, E, EE, EF) awards a maximum grade of C (2.00 Grade Points). Upgrade your grade here to recalculate your new verified SGPA and CGPA.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 max-w-lg space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Course to Upgrade</label>
              <select
                value={repeatCourse}
                onChange={(e) => setRepeatCourse(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl glow-input font-bold"
              >
                {l1s2Courses.map(c => {
                  const currGr = allStudents.find(s => s.studentIndex === activeStudentIndex)?.semesters?.[2]?.grades?.[c.code] || '—';
                  return (
                    <option key={c.code} value={c.code}>
                      {c.code} · {c.name} (Current: {currGr})
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">New Grade (Max C = 2.0)</label>
              <select
                value={repeatGrade}
                onChange={(e) => setRepeatGrade(e.target.value as Grade)}
                className="w-full px-3 py-2 text-xs rounded-xl glow-input font-mono font-bold text-emerald-800"
              >
                <option value="C">C (2.00 Grade Points - Repeat Pass Standard)</option>
                <option value="C+">C+ (2.30 - If Medical Concession MC)</option>
                <option value="B">B (3.00 - If Academic Concession AC)</option>
                <option value="B+">B+ (3.30 - Concession Approved)</option>
                <option value="A">A (4.00 - Full Concession Pass)</option>
              </select>
            </div>

            <button
              onClick={handleApplyRepeaterUpgrade}
              className="w-full py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              Apply Repeater Upgrade & Recalculate GPA
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
