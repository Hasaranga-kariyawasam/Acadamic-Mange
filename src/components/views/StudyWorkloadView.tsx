import React, { useState, useMemo } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { 
  Clock, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  BookOpen,
  Printer,
  Sliders,
  Target
} from 'lucide-react';
import { generateWeeklyStudyPlan, evaluateContinuousAssessment } from '../../utils/gpaCalculations';
import { Grade } from '../../types/academic';

export const StudyWorkloadView: React.FC = () => {
  const { 
    curriculumCourses, 
    assessments, 
    predictedGrades, 
    goalSettings, 
    updateGoalSettings,
    activeSemesterId
  } = useAcademic();

  const [weeklyHours, setWeeklyHours] = useState<number>(goalSettings.weeklyStudyHours || 24);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const activeCourses = curriculumCourses.filter(c => c.semesterId === activeSemesterId);

  // Generate weighted study items
  const studyItems = useMemo(() => {
    const inputCourses = activeCourses.map(course => {
      const ca = assessments[course.code] || {
        courseId: course.id,
        quizzes: [],
        assignments: [],
        miniProjects: [],
        quizRule: 'best2'
      };
      const evalResult = evaluateContinuousAssessment(ca, course.caWeight);
      const targetGrade = (predictedGrades[course.code] || 'A') as Grade;

      return {
        code: course.code,
        name: course.name,
        credits: course.credits,
        targetGrade,
        caScore: evalResult.caTotal100
      };
    });

    return generateWeeklyStudyPlan(weeklyHours, inputCourses);
  }, [activeCourses, assessments, predictedGrades, weeklyHours]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate 7-day routine based on allocated subjects
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dailySchedule = useMemo(() => {
    return daysOfWeek.map((day, idx) => {
      const assignedItem = studyItems[idx % (studyItems.length || 1)];
      const hours = assignedItem ? Math.max(1.5, (assignedItem.allocatedHours / 3)).toFixed(1) : '2.0';
      return {
        day,
        subject: assignedItem?.courseCode || 'ICT Study',
        subjectName: assignedItem?.courseName || 'Core Subject Review',
        focus: assignedItem?.focusAreas || 'Past paper revision & problem sets',
        hours,
        priority: assignedItem?.priority || 'Normal'
      };
    });
  }, [studyItems]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header & Target Study Hours Controller */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Smart Study Workload & Weekly Hours Optimizer</span>
              <span aria-hidden="true">·</span>
              <span>Credit-Weighted Academic Time Distribution</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Weekly Study Goal & Subject Workload Schedule
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Distributes your weekly study hours proportionally according to subject credit weights (3-credit vs 2-credit) and target grade ambitions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Schedule</span>
            </button>
          </div>
        </div>

        {/* Weekly Hours Slider */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Target Weekly Study Hours Budget:</span>
            </span>
            <span className="font-mono font-extrabold text-base text-blue-700 tabular-nums">
              {weeklyHours} Hours / Week
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="50"
            step="2"
            value={weeklyHours}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 24;
              setWeeklyHours(val);
              updateGoalSettings({ weeklyStudyHours: val });
            }}
            className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
            <span>10 hrs (Light Review)</span>
            <span>24 hrs (Recommended Baseline)</span>
            <span>36 hrs (Intensive Target)</span>
            <span>50 hrs (Exam Prep)</span>
          </div>
        </div>
      </div>

      {/* Grid: Subject Allocation Table & 7-Day Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Credit-Weighted Allocation Table */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Course Hour Allocations (Level 2 Sem 2)</span>
            </h2>
            <span className="text-xs font-mono text-slate-500">
              Total: <strong>{weeklyHours} hrs</strong>
            </span>
          </div>

          <div className="space-y-3">
            {studyItems.map((item) => {
              const pctOfTotal = Math.round((item.allocatedHours / weeklyHours) * 100);
              return (
                <div 
                  key={item.courseCode}
                  className="p-4 rounded-xl bg-white/70 border border-slate-200/80 hover:border-slate-300 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-xs text-blue-700 mr-2">
                        {item.courseCode}
                      </span>
                      <strong className="text-xs font-bold text-slate-900">{item.courseName}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.priority === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        item.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {item.priority} Priority
                      </span>
                      <span className="font-mono font-extrabold text-sm text-slate-900 tabular-nums">
                        {item.allocatedHours} hrs
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${pctOfTotal}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>
                      {item.credits} Credits · Target: <strong className="font-mono text-slate-800">{item.targetGrade}</strong>
                    </span>
                    <span className="truncate max-w-[280px] text-slate-600">
                      Focus: {item.focusAreas}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): 7-Day Study Schedule Breakdown */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>7-Day Study Blueprint</span>
            </h2>
            <span className="text-[11px] text-slate-500">Weekly cadence</span>
          </div>

          <div className="space-y-2.5">
            {dailySchedule.map((slot, idx) => {
              const isChecked = !!completedTasks[slot.day];
              return (
                <div 
                  key={slot.day}
                  onClick={() => toggleTask(slot.day)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isChecked 
                      ? 'bg-emerald-50/70 border-emerald-200 opacity-80' 
                      : 'bg-white/70 border-slate-200/80 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                      isChecked ? 'text-emerald-600' : 'text-slate-300'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800">{slot.day}</span>
                        <span className="text-[10px] font-mono font-bold text-blue-700">· {slot.subject}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[190px]">
                        {slot.focus}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-xs text-slate-900 shrink-0">
                    {slot.hours} hrs
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/60 text-xs text-blue-900 space-y-1 mt-3">
            <strong className="block font-semibold">Study Habit Advice:</strong>
            <p className="text-[11px] text-blue-800 leading-snug">
              Consistent 3-hour sessions daily yield higher recall than marathon weekend cramming. Target high-credit subjects (3-credit courses) first to maximize quality points.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
