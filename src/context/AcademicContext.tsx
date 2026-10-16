import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, ContinuousAssessment, StudentResult, GoalSettings, Grade, TargetNote, CourseSemesterMarks } from '../types/academic';
import { DEFAULT_CURRICULUM_COURSES, SEMESTER_METADATA } from '../data/defaultCurriculum';
import { convertGazetteToStudentResults, RUHUNA_L1S2_GAZETTE_DATA } from '../data/ruhunaBatchGazette';
import { calculateSGPA, calculateCGPA } from '../utils/gpaCalculations';

interface AcademicContextType {
  activeStudentIndex: string;
  setActiveStudentIndex: (index: string) => void;
  activeStudent: StudentResult | undefined;
  allStudents: StudentResult[];
  curriculumCourses: Course[];
  assessments: Record<string, ContinuousAssessment>;
  semesterMarks: Record<string, CourseSemesterMarks>;
  targetNotes: TargetNote[];
  predictedGrades: Record<string, Grade>;
  goalSettings: GoalSettings;
  activeSemesterId: number;
  setActiveSemesterId: (semId: number) => void;
  
  // Actions
  updateAssessment: (courseId: string, assessment: ContinuousAssessment) => void;
  updateSemesterMarkCell: (courseCode: string, field: keyof CourseSemesterMarks, value: number | undefined) => void;
  addTargetNote: (note: Omit<TargetNote, 'id' | 'createdAt'>) => void;
  deleteTargetNote: (id: string) => void;
  togglePinTargetNote: (id: string) => void;
  upgradeRepeaterGrade: (studentIndex: string, semesterId: number, courseCode: string, newGrade: Grade) => void;
  updateCourse: (course: Course) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  setPredictedGrade: (courseCode: string, grade: Grade) => void;
  updateGoalSettings: (settings: Partial<GoalSettings>) => void;
  updateStudentGrade: (semesterId: number, courseCode: string, grade: Grade) => void;
  addNewStudent: (student: StudentResult) => void;
  loadOfficialRuhunaBatch: () => void;
  resetToCleanState: () => void;
  exportJSON: () => string;
  importJSON: (jsonString: string) => boolean;
  importCSV: (csvString: string) => boolean;
}

const STORAGE_KEY = 'ruhuna_bict_marks_suite_v2';

// Initial clean user record (TG/2024/2082 - KAWESHA W.D.P.)
const INITIAL_STUDENT: StudentResult = {
  studentIndex: 'TG/2024/2082',
  studentName: 'KAWESHA W.D.P.',
  semesters: {
    1: {
      sgpa: 2.51,
      cgpa: 2.51,
      grades: {
        'ICT1113': 'B',
        'ICT1122': 'B+',
        'ICT1133': 'B-',
        'ICT1142': 'B',
        'TCS1112': 'B-',
        'TMS1113': 'C+',
        'ENG1122': 'B',
      }
    },
    2: {
      sgpa: 2.93,
      cgpa: 2.72,
      grades: {
        'ICT1212': 'B',
        'ICT1222': 'A-',
        'ICT1232': 'C',
        'ICT1242': 'B+',
        'ICT1252': 'B+',
        'ICT1261': 'B',
        'TCS1212': 'B-',
        'TMS1232': 'B+',
        'ENG1222': 'C+',
      }
    }
  }
};

const INITIAL_SEMESTER_MARKS: Record<string, CourseSemesterMarks> = {
  'ICT2213': { courseCode: 'ICT2213', quiz1: 18, quiz2: 19, quiz3: 16, assignment: 88, miniProject: 85, midExam: 76, endExam: 80 },
  'ICT2222': { courseCode: 'ICT2222', quiz1: 19, quiz2: 20, quiz3: 18, assignment: 95, miniProject: 92, midExam: 84, endExam: 85 },
  'ICT2233': { courseCode: 'ICT2233', quiz1: 17, quiz2: 19, quiz3: 18, assignment: 94, miniProject: 90, midExam: 82, endExam: 82 },
  'ICT2242': { courseCode: 'ICT2242', quiz1: 16, quiz2: 18, quiz3: 17, assignment: 90, miniProject: 86, midExam: 78, endExam: 78 },
  'ICT2252': { courseCode: 'ICT2252', quiz1: 15, quiz2: 17, quiz3: 16, assignment: 85, miniProject: 80, midExam: 72, endExam: 75 },
  'TCS2212': { courseCode: 'TCS2212', quiz1: 18, quiz2: 17, quiz3: 19, assignment: 88, miniProject: 84, midExam: 80, endExam: 82 },
  'ENG2222': { courseCode: 'ENG2222', quiz1: 16, quiz2: 17, quiz3: 18, assignment: 82, miniProject: 80, midExam: 76, endExam: 78 },
};

const INITIAL_TARGET_NOTES: TargetNote[] = [
  {
    id: 'note-1',
    subjectCode: 'ICT2213',
    subjectName: 'Advanced Database Systems',
    credits: 3,
    targetGrade: 'A',
    targetMarks: 85,
    noteText: 'Aim for A grade. High credit weight (3 Cr). Master indexing and query plans.',
    isPinned: true,
    createdAt: '2026-10-15'
  },
  {
    id: 'note-2',
    subjectCode: 'ICT2233',
    subjectName: 'Server-Side Web App Dev',
    credits: 3,
    targetGrade: 'A',
    targetMarks: 80,
    noteText: 'Aim for A grade. Complete REST API milestone early and review middleware.',
    isPinned: true,
    createdAt: '2026-10-15'
  },
  {
    id: 'note-3',
    subjectCode: 'ICT2222',
    subjectName: 'Rapid Application Development',
    credits: 2,
    targetGrade: 'A+',
    targetMarks: 90,
    noteText: 'Aim for A+. Maximize score on component UI practicum.',
    isPinned: false,
    createdAt: '2026-10-15'
  }
];

const INITIAL_PREDICTIONS: Record<string, Grade> = {
  'ICT2213': 'A',
  'ICT2222': 'A',
  'ICT2233': 'A',
  'ICT2242': 'A-',
  'ICT2252': 'B+',
  'TCS2212': 'A-',
  'ENG2222': 'B+',
  'ICT3113': 'A',
  'ICT3123': 'A-',
  'ICT3132': 'B+',
  'ICT3142': 'A',
  'ICT3152': 'A',
  'ICT3162': 'A+',
  'TMS3112': 'B+',
  'ICT3216': 'A+',
  'ICT3222': 'A',
  'ICT4113': 'A',
  'ICT4123': 'B+',
  'ICT4133': 'A-',
  'ICT4143': 'A',
  'ICT4153': 'A',
  'ICT4216': 'A+',
  'ICT4223': 'A',
  'ICT4232': 'A'
};

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

export const AcademicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeStudentIndex, setActiveStudentIndex] = useState<string>('TG/2024/2082');
  const [allStudents, setAllStudents] = useState<StudentResult[]>([INITIAL_STUDENT]);
  const [curriculumCourses, setCurriculumCourses] = useState<Course[]>(DEFAULT_CURRICULUM_COURSES);
  const [assessments, setAssessments] = useState<Record<string, ContinuousAssessment>>({});
  const [semesterMarks, setSemesterMarks] = useState<Record<string, CourseSemesterMarks>>(INITIAL_SEMESTER_MARKS);
  const [targetNotes, setTargetNotes] = useState<TargetNote[]>(INITIAL_TARGET_NOTES);
  const [predictedGrades, setPredictedGrades] = useState<Record<string, Grade>>(INITIAL_PREDICTIONS);
  const [goalSettings, setGoalSettings] = useState<GoalSettings>({
    targetCGPA: 3.30,
    weeklyStudyHours: 24,
    prioritySubjects: ['ICT2213', 'ICT2233']
  });
  const [activeSemesterId, setActiveSemesterId] = useState<number>(4); // Level 2 Sem 2

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeStudentIndex) setActiveStudentIndex(parsed.activeStudentIndex);
        if (parsed.allStudents?.length > 0) setAllStudents(parsed.allStudents);
        if (parsed.curriculumCourses?.length > 0) setCurriculumCourses(parsed.curriculumCourses);
        if (parsed.assessments) setAssessments(parsed.assessments);
        if (parsed.semesterMarks) setSemesterMarks(parsed.semesterMarks);
        if (parsed.targetNotes) setTargetNotes(parsed.targetNotes);
        if (parsed.predictedGrades) setPredictedGrades(parsed.predictedGrades);
        if (parsed.goalSettings) setGoalSettings(parsed.goalSettings);
        if (parsed.activeSemesterId) setActiveSemesterId(parsed.activeSemesterId);
      }
    } catch (e) {
      console.error('Failed to load local storage', e);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      const payload = {
        activeStudentIndex,
        allStudents,
        curriculumCourses,
        assessments,
        semesterMarks,
        targetNotes,
        predictedGrades,
        goalSettings,
        activeSemesterId
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [activeStudentIndex, allStudents, curriculumCourses, assessments, semesterMarks, targetNotes, predictedGrades, goalSettings, activeSemesterId]);

  const activeStudent = allStudents.find(s => s.studentIndex === activeStudentIndex) || allStudents[0];

  const updateAssessment = (courseCodeOrId: string, assessment: ContinuousAssessment) => {
    setAssessments(prev => ({
      ...prev,
      [courseCodeOrId]: assessment
    }));
  };

  const updateSemesterMarkCell = (courseCode: string, field: keyof CourseSemesterMarks, value: number | undefined) => {
    setSemesterMarks(prev => {
      const existing = prev[courseCode] || { courseCode };
      return {
        ...prev,
        [courseCode]: {
          ...existing,
          [field]: value
        }
      };
    });
  };

  const addTargetNote = (note: Omit<TargetNote, 'id' | 'createdAt'>) => {
    const newNote: TargetNote = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTargetNotes(prev => [newNote, ...prev]);
  };

  const deleteTargetNote = (id: string) => {
    setTargetNotes(prev => prev.filter(n => n.id !== id));
  };

  const togglePinTargetNote = (id: string) => {
    setTargetNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const upgradeRepeaterGrade = (studentIndex: string, semesterId: number, courseCode: string, newGrade: Grade) => {
    setAllStudents(prev => prev.map(student => {
      if (student.studentIndex !== studentIndex) return student;

      const semData = student.semesters[semesterId] || { sgpa: 0, cgpa: 0, grades: {} };
      const updatedGrades = { ...semData.grades, [courseCode]: newGrade };

      const semCourses = curriculumCourses.filter(c => c.semesterId === semesterId && c.isGpaCountable);
      const gradeItems = semCourses.map(c => ({
        credits: c.credits,
        grade: updatedGrades[c.code] || 'C',
        isGpaCountable: true
      }));
      const newSgpa = calculateSGPA(gradeItems);

      const updatedSemesters = {
        ...student.semesters,
        [semesterId]: {
          ...semData,
          grades: updatedGrades,
          sgpa: newSgpa,
          cgpa: newSgpa
        }
      };

      const semList = Object.keys(updatedSemesters).map(sId => {
        const idNum = Number(sId);
        const credits = curriculumCourses
          .filter(c => c.semesterId === idNum && c.isGpaCountable)
          .reduce((sum, c) => sum + c.credits, 0);
        return {
          sgpa: updatedSemesters[idNum].sgpa,
          credits: credits > 0 ? credits : 17
        };
      });
      const newCgpa = calculateCGPA(semList);
      updatedSemesters[semesterId].cgpa = newCgpa;

      return {
        ...student,
        semesters: updatedSemesters
      };
    }));
  };

  const updateCourse = (course: Course) => {
    setCurriculumCourses(prev => prev.map(c => c.id === course.id ? course : c));
  };

  const addCourse = (course: Course) => {
    setCurriculumCourses(prev => [...prev, course]);
  };

  const deleteCourse = (courseId: string) => {
    setCurriculumCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const setPredictedGrade = (courseCode: string, grade: Grade) => {
    setPredictedGrades(prev => ({
      ...prev,
      [courseCode]: grade
    }));
  };

  const updateGoalSettings = (settings: Partial<GoalSettings>) => {
    setGoalSettings(prev => ({
      ...prev,
      ...settings
    }));
  };

  const updateStudentGrade = (semesterId: number, courseCode: string, grade: Grade) => {
    setAllStudents(prev => prev.map(student => {
      if (student.studentIndex !== activeStudentIndex) return student;

      const semData = student.semesters[semesterId] || { sgpa: 0, cgpa: 0, grades: {} };
      const updatedGrades = { ...semData.grades, [courseCode]: grade };

      const semCourses = curriculumCourses.filter(c => c.semesterId === semesterId);
      const gradeItems = semCourses.map(c => ({
        credits: c.credits,
        grade: updatedGrades[c.code] || 'B',
        isGpaCountable: c.isGpaCountable
      }));
      const newSgpa = calculateSGPA(gradeItems);

      const updatedSemesters = {
        ...student.semesters,
        [semesterId]: {
          ...semData,
          grades: updatedGrades,
          sgpa: newSgpa,
          cgpa: newSgpa
        }
      };

      const semList = Object.keys(updatedSemesters).map(sId => {
        const idNum = Number(sId);
        const credits = curriculumCourses
          .filter(c => c.semesterId === idNum && c.isGpaCountable)
          .reduce((sum, c) => sum + c.credits, 0);
        return {
          sgpa: updatedSemesters[idNum].sgpa,
          credits: credits > 0 ? credits : 17
        };
      });
      const newCgpa = calculateCGPA(semList);
      updatedSemesters[semesterId].cgpa = newCgpa;

      return {
        ...student,
        semesters: updatedSemesters
      };
    }));
  };

  const addNewStudent = (student: StudentResult) => {
    setAllStudents(prev => {
      const filtered = prev.filter(s => s.studentIndex !== student.studentIndex);
      return [...filtered, student];
    });
  };

  const loadOfficialRuhunaBatch = () => {
    const gazetteStudents = convertGazetteToStudentResults();
    setAllStudents(gazetteStudents);
    const found = gazetteStudents.find(s => s.studentIndex === 'TG/2024/2082');
    if (found) {
      setActiveStudentIndex('TG/2024/2082');
    } else if (gazetteStudents.length > 0) {
      setActiveStudentIndex(gazetteStudents[0].studentIndex);
    }
  };

  const resetToCleanState = () => {
    setActiveStudentIndex(INITIAL_STUDENT.studentIndex);
    setAllStudents([INITIAL_STUDENT]);
    setCurriculumCourses(DEFAULT_CURRICULUM_COURSES);
    setAssessments({});
    setSemesterMarks(INITIAL_SEMESTER_MARKS);
    setTargetNotes(INITIAL_TARGET_NOTES);
    setPredictedGrades(INITIAL_PREDICTIONS);
    setGoalSettings({
      targetCGPA: 3.30,
      weeklyStudyHours: 24,
      prioritySubjects: ['ICT2213', 'ICT2233']
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportJSON = (): string => {
    return JSON.stringify({
      activeStudentIndex,
      allStudents,
      curriculumCourses,
      semesterMarks,
      targetNotes,
      predictedGrades,
      goalSettings,
      exportedAt: new Date().toISOString()
    }, null, 2);
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.allStudents && Array.isArray(data.allStudents)) setAllStudents(data.allStudents);
      if (data.activeStudentIndex) setActiveStudentIndex(data.activeStudentIndex);
      if (data.curriculumCourses) setCurriculumCourses(data.curriculumCourses);
      if (data.semesterMarks) setSemesterMarks(data.semesterMarks);
      if (data.targetNotes) setTargetNotes(data.targetNotes);
      if (data.predictedGrades) setPredictedGrades(data.predictedGrades);
      if (data.goalSettings) setGoalSettings(data.goalSettings);
      return true;
    } catch (e) {
      console.error('Invalid JSON import file', e);
      return false;
    }
  };

  const importCSV = (csvString: string): boolean => {
    try {
      const lines = csvString.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length < 2) return false;

      const header = lines[0].split(',').map(h => h.trim().toLowerCase());
      const idxIndex = header.findIndex(h => h.includes('index') || h.includes('reg') || h.includes('id'));
      const nameIndex = header.findIndex(h => h.includes('name'));
      const sgpaIndex = header.findIndex(h => h.includes('sgpa') || h.includes('gpa'));
      const cgpaIndex = header.findIndex(h => h.includes('cgpa'));

      if (idxIndex === -1) return false;

      const importedStudents: StudentResult[] = [];

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        if (cols.length <= idxIndex) continue;

        const indexNo = cols[idxIndex];
        const studentName = nameIndex !== -1 && cols[nameIndex] ? cols[nameIndex] : `Student ${indexNo}`;
        const rawSgpa = sgpaIndex !== -1 ? parseFloat(cols[sgpaIndex]) : 2.50;
        const rawCgpa = cgpaIndex !== -1 ? parseFloat(cols[cgpaIndex]) : rawSgpa;

        const sgpa = isNaN(rawSgpa) ? 'WH' : Number(rawSgpa.toFixed(2));
        const cgpa = isNaN(rawCgpa) ? 'WH' : Number(rawCgpa.toFixed(2));

        importedStudents.push({
          studentIndex: indexNo,
          studentName,
          semesters: {
            2: {
              sgpa,
              cgpa,
              grades: {}
            }
          }
        });
      }

      if (importedStudents.length > 0) {
        setAllStudents(prev => {
          const map = new Map<string, StudentResult>();
          prev.forEach(s => map.set(s.studentIndex, s));
          importedStudents.forEach(s => map.set(s.studentIndex, s));
          return Array.from(map.values());
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to parse CSV', e);
      return false;
    }
  };

  return (
    <AcademicContext.Provider
      value={{
        activeStudentIndex,
        setActiveStudentIndex,
        activeStudent,
        allStudents,
        curriculumCourses,
        assessments,
        semesterMarks,
        targetNotes,
        predictedGrades,
        goalSettings,
        activeSemesterId,
        setActiveSemesterId,
        updateAssessment,
        updateSemesterMarkCell,
        addTargetNote,
        deleteTargetNote,
        togglePinTargetNote,
        upgradeRepeaterGrade,
        updateCourse,
        addCourse,
        deleteCourse,
        setPredictedGrade,
        updateGoalSettings,
        updateStudentGrade,
        addNewStudent,
        loadOfficialRuhunaBatch,
        resetToCleanState,
        exportJSON,
        importJSON,
        importCSV,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
};
