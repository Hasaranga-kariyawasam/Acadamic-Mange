export type Grade = 
  | 'A+' 
  | 'A' 
  | 'A-' 
  | 'B+' 
  | 'B' 
  | 'B-' 
  | 'C+' 
  | 'C' 
  | 'C-' 
  | 'D+' 
  | 'D' 
  | 'E' 
  | 'WH' 
  | 'MC' 
  | 'AC' 
  | 'EF' 
  | 'EE' 
  | 'EC' 
  | 'EB'
  | 'BE'
  | 'HE';

export interface GradeMeta {
  grade: Grade;
  point: number;
  marksRange: string;
  description: string;
  colorClass: string;
}

export const RUHUNA_GRADE_SCALE: Record<string, { point: number; range: string; color: string }> = {
  'A+': { point: 4.00, range: '85 - 100', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  'A':  { point: 4.00, range: '75 - 84',  color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  'A-': { point: 3.70, range: '70 - 74',  color: 'text-teal-700 bg-teal-50 border-teal-200' },
  'B+': { point: 3.30, range: '65 - 69',  color: 'text-blue-700 bg-blue-50 border-blue-200' },
  'B':  { point: 3.00, range: '60 - 64',  color: 'text-blue-700 bg-blue-50 border-blue-200' },
  'B-': { point: 2.70, range: '55 - 59',  color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
  'C+': { point: 2.30, range: '50 - 54',  color: 'text-amber-700 bg-amber-50 border-amber-200' },
  'C':  { point: 2.00, range: '45 - 49',  color: 'text-amber-700 bg-amber-50 border-amber-200' },
  'C-': { point: 1.70, range: '40 - 44',  color: 'text-orange-700 bg-orange-50 border-orange-200' },
  'D+': { point: 1.30, range: '35 - 39',  color: 'text-rose-700 bg-rose-50 border-rose-200' },
  'D':  { point: 1.00, range: '30 - 34',  color: 'text-rose-700 bg-rose-50 border-rose-200' },
  'E':  { point: 0.00, range: '< 30',    color: 'text-red-700 bg-red-50 border-red-200' },
  'WH': { point: 0.00, range: 'Withheld', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  'MC': { point: 0.00, range: 'Medical Concession', color: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
  'AC': { point: 0.00, range: 'Academic Concession', color: 'text-sky-700 bg-sky-50 border-sky-200' },
  'BE': { point: 0.00, range: 'Absent for ESA while passing CA', color: 'text-amber-800 bg-amber-100 border-amber-300' },
  'HE': { point: 0.00, range: 'Concession Withheld', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  'EF': { point: 0.00, range: 'Absent / Below Min CA', color: 'text-red-800 bg-red-100 border-red-300' },
  'EE': { point: 0.00, range: 'Both CA & ESA Below Min', color: 'text-red-800 bg-red-100 border-red-300' },
  'EC': { point: 0.00, range: 'Failed CA', color: 'text-red-800 bg-red-100 border-red-300' },
  'EB': { point: 0.00, range: 'Only CA Below Min', color: 'text-red-800 bg-red-100 border-red-300' },
};

export type DegreeClass = 
  | 'First Class (Honours)' 
  | 'Second Class (Upper Division)' 
  | 'Second Class (Lower Division)' 
  | 'General Pass' 
  | 'Probationary / Unsatisfactory';

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semesterId: number; // 1 to 8
  isGpaCountable: boolean;
  caWeight: number; // e.g. 30, 40
  esaWeight: number; // e.g. 70, 60
  syllabusTopic?: string;
}

export interface SemesterInfo {
  id: number;
  level: number;
  semester: number;
  label: string;
  title: string;
  isCompleted: boolean;
  targetGPA?: number;
}

export interface ScoreItem {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  weight?: number;
  date?: string;
}

export interface ContinuousAssessment {
  courseId: string;
  quizzes: ScoreItem[]; // Quiz 1, 2, 3
  assignments: ScoreItem[]; // Assignment 1, 2
  miniProjects: ScoreItem[]; // Mini project
  midTerm?: ScoreItem; // Mid Semester Exam
  endExam?: ScoreItem; // End Semester Assessment
  targetGrade?: Grade;
  notes?: string;
  quizRule: 'average' | 'best2' | 'best1' | 'sum';
}

export interface StudentResult {
  studentIndex: string;
  studentName: string;
  semesters: {
    [semesterId: number]: {
      sgpa: number | 'WH';
      cgpa: number | 'WH';
      grades: Record<string, Grade>;
    };
  };
}

export interface GoalSettings {
  targetCGPA: number;
  weeklyStudyHours: number;
  prioritySubjects: string[];
}

export interface StudyPlanItem {
  courseCode: string;
  courseName: string;
  credits: number;
  targetGrade: Grade;
  allocatedHours: number;
  focusAreas: string;
  priority: 'High' | 'Medium' | 'Normal';
}

export interface TargetNote {
  id: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  targetGrade: Grade;
  targetMarks?: number;
  noteText?: string;
  isPinned: boolean;
  createdAt: string;
}

export interface CourseSemesterMarks {
  courseCode: string;
  quiz1?: number;
  quiz2?: number;
  quiz3?: number;
  assignment?: number;
  miniProject?: number;
  midExam?: number;
  endExam?: number;
}
