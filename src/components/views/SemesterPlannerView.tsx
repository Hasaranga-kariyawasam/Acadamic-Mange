import React, { useState, useMemo } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  TrendingUp, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Trash2, 
  Calculator,
  ChevronDown,
  ChevronUp,
  Award,
  Target
} from 'lucide-react';
import { Course, Grade, RUHUNA_GRADE_SCALE } from '../../types/academic';
import { SEMESTER_METADATA } from '../../data/defaultCurriculum';
import { calculateSGPA, calculateCGPA, getDegreeClassification, gradeToPoint } from '../../utils/gpaCalculations';

export const SemesterPlannerView: React.FC = () => {
  const { 
    curriculumCourses, 
    activeStudent, 
    predictedGrades, 
    setPredictedGrade, 
    addCourse, 
    deleteCourse 
  } = useAcademic();

  const [expandedSemId, setExpandedSemId] = useState<number>(4); // default to L2 S2

  // Simulation across all 8 Semesters
  const simulation = useMemo(() => {
    let totalQualityPoints = 0;
    let totalCredits = 0;

    const semStats = SEMESTER_METADATA.map(sem => {
      const isConfirmed = sem.id <= 2;
      const courses = curriculumCourses.filter(c => c.semesterId === sem.id && c.isGpaCountable);

      let semPoints = 0;
      let semCredits = 0;

      courses.forEach(c => {
        let gr: Grade = 'B';
        if (isConfirmed) {
          gr = activeStudent?.semesters?.[sem.id]?.grades?.[c.code] || 'B';
        } else {
          gr = predictedGrades[c.code] || 'A';
        }
        const pt = gradeToPoint(gr);
        semPoints += pt * c.credits;
        semCredits += c.credits;
      });

      const semSgpa = semCredits > 0 ? Number((semPoints / semCredits).toFixed(2)) : 0;
      totalQualityPoints += semPoints;
      totalCredits += semCredits;

      return {
        id: sem.id,
        label: sem.label,
        title: sem.title,
        isConfirmed,
        credits: semCredits,
        sgpa: semSgpa
      };
    });

    const projectedCgpa = totalCredits > 0 ? Number((totalQualityPoints / totalCredits).toFixed(2)) : 0;
    const projectedClass = getDegreeClassification(projectedCgpa);

    return {
      projectedCgpa,
      projectedClass,
      semStats,
      totalCredits
    };
  }, [curriculumCourses, activeStudent, predictedGrades]);

  const handleQuickPreset = (grade: Grade) => {
    curriculumCourses
      .filter(c => c.semesterId > 2)
      .forEach(c => setPredictedGrade(c.code, grade));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Top Banner & Live Projection Widget */}
      <div className="glow-card rounded-2xl p-6 bg-white sticky top-4 z-20 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-800 tracking-wider block">
                WHAT-IF 8-SEMESTER PROJECTION
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {simulation.projectedCgpa.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 font-mono">/ 4.00 Final Projected CGPA</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${simulation.projectedClass.badgeColor}`}>
              {simulation.projectedClass.title}
            </span>

            <div className="hidden sm:flex items-center gap-1 text-xs">
              <span className="text-slate-400 mr-1 text-[11px]">Preset:</span>
              <button
                onClick={() => handleQuickPreset('A')}
                className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-mono font-bold cursor-pointer"
              >
                All A
              </button>
              <button
                onClick={() => handleQuickPreset('B+')}
                className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold cursor-pointer"
              >
                All B+
              </button>
            </div>
          </div>
        </div>

        {/* Mini 8-Semester Horizontal Navigator */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-4 pt-3 border-t border-slate-100">
          {simulation.semStats.map((sem) => (
            <button
              key={sem.id}
              onClick={() => setExpandedSemId(sem.id)}
              className={`p-2 rounded-xl text-center transition-all cursor-pointer ${
                expandedSemId === sem.id
                  ? 'bg-emerald-100/90 border border-emerald-400 text-emerald-950 font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700'
              }`}
            >
              <span className="text-[10px] block opacity-75">{sem.label}</span>
              <span className="font-mono font-bold text-xs block tabular-nums">
                {sem.sgpa > 0 ? sem.sgpa.toFixed(2) : '—'}
              </span>
              <span className="text-[9px] block text-slate-400">
                {sem.isConfirmed ? 'Locked' : 'Simulated'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 8-Semester List */}
      <div className="space-y-3">
        {SEMESTER_METADATA.map((sem) => {
          const isExpanded = expandedSemId === sem.id;
          const isConfirmed = sem.id <= 2;
          const courses = curriculumCourses.filter(c => c.semesterId === sem.id);
          const stat = simulation.semStats.find(s => s.id === sem.id);

          return (
            <div 
              key={sem.id}
              className={`glow-card rounded-2xl overflow-hidden bg-white transition-all ${
                isExpanded ? 'border-emerald-300 shadow-sm' : ''
              }`}
            >
              {/* Semester Bar */}
              <div
                onClick={() => setExpandedSemId(isExpanded ? 0 : sem.id)}
                className="p-4 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                    isConfirmed ? 'bg-slate-100 text-slate-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {sem.label}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-bold text-slate-900">{sem.title}</strong>
                      {isConfirmed ? (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-100 text-slate-600 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" />
                          <span>Confirmed Official</span>
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Future What-If
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {courses.length} Courses · {courses.reduce((sum, c) => sum + c.credits, 0)} Credits
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">SGPA</span>
                    <span className="font-mono font-bold text-xs text-slate-900 tabular-nums">
                      {stat?.sgpa.toFixed(2) || '—'}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Courses */}
              {isExpanded && (
                <div className="p-4 pt-0 border-t border-slate-100">
                  <div className="overflow-x-auto mt-3 border border-slate-200/80 rounded-xl">
                    <table className="w-full text-left text-xs divide-y divide-slate-100">
                      <thead className="bg-slate-50 text-slate-700">
                        <tr>
                          <th className="py-2.5 px-3 font-bold">Subject Code & Name</th>
                          <th className="py-2.5 px-3 font-bold text-center font-mono">Credits</th>
                          <th className="py-2.5 px-3 font-bold text-center">
                            {isConfirmed ? 'Confirmed Grade' : 'Predicted Grade'}
                          </th>
                          <th className="py-2.5 px-3 font-bold text-right font-mono">Points</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {courses.map(course => {
                          const gr = isConfirmed 
                            ? (activeStudent?.semesters?.[sem.id]?.grades?.[course.code] || 'B')
                            : (predictedGrades[course.code] || 'A');

                          return (
                            <tr key={course.id} className="hover:bg-slate-50">
                              <td className="py-2 px-3 font-medium text-slate-900">
                                <strong className="font-mono text-emerald-700 mr-2">{course.code}</strong>
                                <span>{course.name}</span>
                              </td>
                              <td className="py-2 px-3 text-center font-mono font-bold text-slate-700">
                                {course.credits} Cr
                              </td>
                              <td className="py-2 px-3 text-center">
                                {isConfirmed ? (
                                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-800 text-xs">
                                    {gr} ({gradeToPoint(gr).toFixed(2)})
                                  </span>
                                ) : (
                                  <select
                                    value={gr}
                                    onChange={(e) => setPredictedGrade(course.code, e.target.value as Grade)}
                                    className="px-2 py-1 rounded-lg glow-input font-mono font-bold text-emerald-800 text-xs cursor-pointer"
                                  >
                                    {Object.keys(RUHUNA_GRADE_SCALE).map(g => (
                                      <option key={g} value={g}>
                                        {g} ({RUHUNA_GRADE_SCALE[g].point.toFixed(2)})
                                      </option>
                                    ))}
                                  </select>
                                )}
                              </td>
                              <td className="py-2 px-3 text-right font-mono font-bold text-slate-800">
                                {(gradeToPoint(gr) * course.credits).toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
