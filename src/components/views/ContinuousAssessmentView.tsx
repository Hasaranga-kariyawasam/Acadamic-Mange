import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { Course, CourseSemesterMarks } from '../../types/academic';
import { SEMESTER_METADATA } from '../../data/defaultCurriculum';
import { 
  Table2, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ContinuousAssessmentView: React.FC = () => {
  const { 
    curriculumCourses, 
    semesterMarks, 
    updateSemesterMarkCell, 
    activeSemesterId, 
    setActiveSemesterId,
    addCourse,
    deleteCourse
  } = useAcademic();

  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [newSubCredits, setNewSubCredits] = useState(2);
  const [saveToast, setSaveToast] = useState(false);

  // Filter courses for active semester
  const currentSemesterCourses = curriculumCourses.filter(c => c.semesterId === activeSemesterId);

  const handleCellChange = (
    courseCode: string, 
    field: keyof CourseSemesterMarks, 
    valStr: string
  ) => {
    const val = valStr === '' ? undefined : parseFloat(valStr);
    updateSemesterMarkCell(courseCode, field, isNaN(val as any) ? undefined : val);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 1200);
  };

  const handleAddNewSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubCode.trim() || !newSubName.trim()) return;

    const newCourse: Course = {
      id: `custom-sem-${activeSemesterId}-${Date.now()}`,
      code: newSubCode.trim().toUpperCase(),
      name: newSubName.trim(),
      credits: Number(newSubCredits) || 2,
      semesterId: activeSemesterId,
      isGpaCountable: true,
      caWeight: 30,
      esaWeight: 70
    };

    addCourse(newCourse);
    setNewSubCode('');
    setNewSubName('');
    setIsAddSubjectModalOpen(false);
  };

  const activeSemMeta = SEMESTER_METADATA.find(s => s.id === activeSemesterId) || SEMESTER_METADATA[3];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Top Header & Semester Selector */}
      <div className="glow-card rounded-2xl p-6 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <Table2 className="w-4 h-4 text-emerald-600" />
              <span>All-In-One Semester Assessment Table</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Continuous Assessment (CA) & Exam Marks
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter and review Quiz 1, 2, 3, Lab Assignments, Mini-Projects, and Exams for all subjects in one unified view.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Auto-saved</span>
              </span>
            )}

            <button
              onClick={() => setIsAddSubjectModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Subject to {activeSemMeta.label}</span>
            </button>
          </div>
        </div>

        {/* Semester Tabs */}
        <div className="flex items-center gap-1.5 mt-5 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          {SEMESTER_METADATA.map((sem) => (
            <button
              key={sem.id}
              onClick={() => setActiveSemesterId(sem.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSemesterId === sem.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {sem.label}
              <span className="text-[10px] ml-1.5 opacity-80">
                ({curriculumCourses.filter(c => c.semesterId === sem.id).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Unified All-In-One Spreadsheet Table Grid */}
      <div className="glow-card rounded-2xl p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">
              {activeSemMeta.title} ({currentSemesterCourses.length} Subjects)
            </span>
            <span className="text-[11px] text-slate-400">
              · Type scores directly in the cells
            </span>
          </div>
          <span className="text-xs text-emerald-700 font-medium">
            Total Credits: {currentSemesterCourses.reduce((sum, c) => sum + c.credits, 0)}
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200/90 rounded-xl">
          <table className="w-full text-left text-xs border-collapse divide-y divide-slate-100">
            <thead className="bg-slate-50/90 text-slate-700">
              <tr>
                <th className="py-3 px-3 font-bold w-48">Subject Code & Name</th>
                <th className="py-3 px-2 font-bold text-center w-14 font-mono">Credits</th>
                <th className="py-3 px-2 font-bold text-center w-20">Quiz 1</th>
                <th className="py-3 px-2 font-bold text-center w-20">Quiz 2</th>
                <th className="py-3 px-2 font-bold text-center w-20">Quiz 3</th>
                <th className="py-3 px-2 font-bold text-center w-24">Lab / Assign</th>
                <th className="py-3 px-2 font-bold text-center w-24">Mini Project</th>
                <th className="py-3 px-2 font-bold text-center w-20">Mid Exam</th>
                <th className="py-3 px-2 font-bold text-center w-20">End Exam</th>
                <th className="py-3 px-2 font-bold text-right w-12">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {currentSemesterCourses.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    No subjects in this semester yet. Click "Add Subject" to configure subjects and credits.
                  </td>
                </tr>
              ) : (
                currentSemesterCourses.map((course) => {
                  const marks = semesterMarks[course.code] || { courseCode: course.code };
                  return (
                    <tr key={course.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Course Name */}
                      <td className="py-2.5 px-3">
                        <strong className="font-mono text-emerald-700 font-bold block text-xs">
                          {course.code}
                        </strong>
                        <span className="text-[11px] text-slate-600 truncate block max-w-[180px]">
                          {course.name}
                        </span>
                      </td>

                      {/* Credits */}
                      <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-800">
                        {course.credits}
                      </td>

                      {/* Quiz 1 */}
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.5"
                          placeholder="—"
                          value={marks.quiz1 !== undefined ? marks.quiz1 : ''}
                          onChange={(e) => handleCellChange(course.code, 'quiz1', e.target.value)}
                          className="w-16 px-1.5 py-1 text-xs rounded-lg glow-input text-center font-mono font-bold text-slate-800"
                        />
                      </td>

                      {/* Quiz 2 */}
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.5"
                          placeholder="—"
                          value={marks.quiz2 !== undefined ? marks.quiz2 : ''}
                          onChange={(e) => handleCellChange(course.code, 'quiz2', e.target.value)}
                          className="w-16 px-1.5 py-1 text-xs rounded-lg glow-input text-center font-mono font-bold text-slate-800"
                        />
                      </td>

                      {/* Quiz 3 */}
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.5"
                          placeholder="—"
                          value={marks.quiz3 !== undefined ? marks.quiz3 : ''}
                          onChange={(e) => handleCellChange(course.code, 'quiz3', e.target.value)}
                          className="w-16 px-1.5 py-1 text-xs rounded-lg glow-input text-center font-mono font-bold text-slate-800"
                        />
                      </td>

                      {/* Lab / Assignment */}
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="—"
                          value={marks.assignment !== undefined ? marks.assignment : ''}
                          onChange={(e) => handleCellChange(course.code, 'assignment', e.target.value)}
                          className="w-18 px-1.5 py-1 text-xs rounded-lg glow-input text-center font-mono font-bold text-slate-800"
                        />
                      </td>

                      {/* Mini Project */}
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="—"
                          value={marks.miniProject !== undefined ? marks.miniProject : ''}
                          onChange={(e) => handleCellChange(course.code, 'miniProject', e.target.value)}
                          className="w-18 px-1.5 py-1 text-xs rounded-lg glow-input text-center font-mono font-bold text-slate-800"
                        />
                      </td>

                      {/* Mid Exam */}
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="—"
                          value={marks.midExam !== undefined ? marks.midExam : ''}
                          onChange={(e) => handleCellChange(course.code, 'midExam', e.target.value)}
                          className="w-16 px-1.5 py-1 text-xs rounded-lg glow-input text-center font-mono font-bold text-slate-800"
                        />
                      </td>

                      {/* End Exam */}
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="—"
                          value={marks.endExam !== undefined ? marks.endExam : ''}
                          onChange={(e) => handleCellChange(course.code, 'endExam', e.target.value)}
                          className="w-16 px-1.5 py-1 text-xs rounded-lg glow-input text-center font-mono font-bold text-emerald-800 bg-emerald-50/50"
                        />
                      </td>

                      {/* Action */}
                      <td className="py-2.5 px-2 text-right">
                        <button
                          onClick={() => deleteCourse(course.id)}
                          className="p-1 text-slate-300 hover:text-rose-600 transition-colors"
                          title="Remove subject"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Subject Modal */}
      {isAddSubjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md glow-card rounded-2xl p-6 shadow-xl border border-slate-200 bg-white">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Add Subject to {activeSemMeta.label}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter course code, name, and credits according to your faculty timetable.
            </p>

            <form onSubmit={handleAddNewSubject} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Course Code</label>
                <input
                  type="text"
                  placeholder="e.g. ICT2233"
                  value={newSubCode}
                  onChange={(e) => setNewSubCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl glow-input font-mono uppercase font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Course Name</label>
                <input
                  type="text"
                  placeholder="e.g. Server-Side Web Application Development"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl glow-input"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Credits</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={newSubCredits}
                  onChange={(e) => setNewSubCredits(parseInt(e.target.value) || 2)}
                  className="w-full px-3 py-2 text-xs rounded-xl glow-input font-mono font-bold"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddSubjectModalOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                >
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
