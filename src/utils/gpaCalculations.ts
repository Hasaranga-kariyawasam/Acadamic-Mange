import { DegreeClass, Grade, RUHUNA_GRADE_SCALE, ContinuousAssessment, StudyPlanItem } from '../types/academic';

export function gradeToPoint(grade: Grade | string): number {
  const normalized = (grade || '').trim().toUpperCase();
  if (RUHUNA_GRADE_SCALE[normalized]) {
    return RUHUNA_GRADE_SCALE[normalized].point;
  }
  return 0.00;
}

export function isPassingGrade(grade: Grade | string): boolean {
  const pt = gradeToPoint(grade);
  return pt >= 2.0; // In university degree programs, C (2.0) is standard pass
}

export function calculateSGPA(items: { credits: number; grade: Grade | string; isGpaCountable?: boolean }[]): number {
  let totalQualityPoints = 0;
  let totalCredits = 0;

  for (const item of items) {
    if (item.isGpaCountable === false) continue;
    // Withheld or pending grades don't count towards current SGPA
    const g = (item.grade || '').trim().toUpperCase();
    if (g === 'WH' || g === 'MC' || g === 'AC' || !g) continue;

    const point = gradeToPoint(g);
    totalQualityPoints += point * item.credits;
    totalCredits += item.credits;
  }

  if (totalCredits === 0) return 0.00;
  return Number((totalQualityPoints / totalCredits).toFixed(2));
}

export function calculateCGPA(semesters: { sgpa: number | 'WH'; credits: number }[]): number {
  let totalQualityPoints = 0;
  let totalCredits = 0;

  for (const sem of semesters) {
    if (typeof sem.sgpa !== 'number' || sem.credits <= 0) continue;
    totalQualityPoints += sem.sgpa * sem.credits;
    totalCredits += sem.credits;
  }

  if (totalCredits === 0) return 0.00;
  return Number((totalQualityPoints / totalCredits).toFixed(2));
}

export function getDegreeClassification(cgpa: number): {
  title: DegreeClass;
  badgeColor: string;
  minCgpa: number;
  description: string;
} {
  if (cgpa >= 3.70) {
    return {
      title: 'First Class (Honours)',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      minCgpa: 3.70,
      description: 'Outstanding Academic Performance (CGPA ≥ 3.70)'
    };
  }
  if (cgpa >= 3.30) {
    return {
      title: 'Second Class (Upper Division)',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
      minCgpa: 3.30,
      description: 'Very Good Academic Performance (3.30 ≤ CGPA < 3.70)'
    };
  }
  if (cgpa >= 3.00) {
    return {
      title: 'Second Class (Lower Division)',
      badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      minCgpa: 3.00,
      description: 'Good Academic Performance (3.00 ≤ CGPA < 3.30)'
    };
  }
  if (cgpa >= 2.00) {
    return {
      title: 'General Pass',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
      minCgpa: 2.00,
      description: 'Satisfactory Academic Performance (2.00 ≤ CGPA < 3.00)'
    };
  }
  return {
    title: 'Probationary / Unsatisfactory',
    badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
    minCgpa: 0.00,
    description: 'Academic Warning Threshold (CGPA < 2.00)'
  };
}

export function calculateTargetRequirement(
  currentCgpa: number,
  completedCredits: number,
  remainingCredits: number,
  targetCgpa: number
): {
  requiredGpa: number;
  isPossible: boolean;
  surplusDeficit: number;
  recommendedGradeProfile: string;
} {
  const totalDegreeCredits = completedCredits + remainingCredits;
  const targetTotalPoints = targetCgpa * totalDegreeCredits;
  const currentTotalPoints = currentCgpa * completedCredits;
  const neededRemainingPoints = targetTotalPoints - currentTotalPoints;

  if (remainingCredits <= 0) {
    return {
      requiredGpa: 0,
      isPossible: currentCgpa >= targetCgpa,
      surplusDeficit: Number((currentCgpa - targetCgpa).toFixed(2)),
      recommendedGradeProfile: currentCgpa >= targetCgpa ? 'Target Achieved' : 'No remaining credits'
    };
  }

  const requiredGpa = neededRemainingPoints / remainingCredits;
  const roundedRequired = Number(requiredGpa.toFixed(2));
  const isPossible = requiredGpa <= 4.00;

  let recommendedGradeProfile = 'Maintain balanced performance';
  if (requiredGpa > 4.00) {
    recommendedGradeProfile = 'Mathematically impossible even with all A+ (Max remaining is 4.00)';
  } else if (requiredGpa >= 3.70) {
    recommendedGradeProfile = 'Must secure mostly A and A+ grades in all remaining courses';
  } else if (requiredGpa >= 3.30) {
    recommendedGradeProfile = 'Aim for solid A- and B+ grades with zero C grades';
  } else if (requiredGpa >= 3.00) {
    recommendedGradeProfile = 'Aim for minimum B grades across all future modules';
  } else {
    recommendedGradeProfile = 'Easily achievable with standard C+ or B- average performance';
  }

  return {
    requiredGpa: roundedRequired,
    isPossible,
    surplusDeficit: Number((targetCgpa - currentCgpa).toFixed(2)),
    recommendedGradeProfile
  };
}

/**
 * Calculates Continuous Assessment (CA) percentage and eligibility
 * Ruhuna University Technology requires CA >= 40% to be eligible to sit for ESA
 */
export function evaluateContinuousAssessment(
  ca: ContinuousAssessment,
  caWeight: number = 30
): {
  caTotal100: number; // CA scaled to 0-100%
  caContribution: number; // Contribution towards final 100% (e.g. out of 30)
  isEligibleForEndExam: boolean;
  quizComponent100: number;
  assignmentComponent100: number;
  miniProjectComponent100: number;
  midTermComponent100: number;
} {
  // 1. Quizzes
  let quizPct = 0;
  if (ca.quizzes && ca.quizzes.length > 0) {
    const validScores = ca.quizzes.filter(q => q.maxScore > 0);
    if (validScores.length > 0) {
      if (ca.quizRule === 'best2' && validScores.length >= 2) {
        const sorted = [...validScores].sort((a, b) => (b.score / b.maxScore) - (a.score / a.maxScore));
        const p1 = (sorted[0].score / sorted[0].maxScore) * 100;
        const p2 = (sorted[1].score / sorted[1].maxScore) * 100;
        quizPct = (p1 + p2) / 2;
      } else if (ca.quizRule === 'best1' && validScores.length >= 1) {
        const sorted = [...validScores].sort((a, b) => (b.score / b.maxScore) - (a.score / a.maxScore));
        quizPct = (sorted[0].score / sorted[0].maxScore) * 100;
      } else {
        const sumPcts = validScores.reduce((acc, q) => acc + (q.score / q.maxScore) * 100, 0);
        quizPct = sumPcts / validScores.length;
      }
    }
  }

  // 2. Assignments
  let assignmentPct = 0;
  if (ca.assignments && ca.assignments.length > 0) {
    const valid = ca.assignments.filter(a => a.maxScore > 0);
    if (valid.length > 0) {
      const sum = valid.reduce((acc, a) => acc + (a.score / a.maxScore) * 100, 0);
      assignmentPct = sum / valid.length;
    }
  }

  // 3. Mini Projects
  let miniProjectPct = 0;
  if (ca.miniProjects && ca.miniProjects.length > 0) {
    const valid = ca.miniProjects.filter(m => m.maxScore > 0);
    if (valid.length > 0) {
      const sum = valid.reduce((acc, m) => acc + (m.score / m.maxScore) * 100, 0);
      miniProjectPct = sum / valid.length;
    }
  }

  // 4. Mid Term
  let midTermPct = 0;
  if (ca.midTerm && ca.midTerm.maxScore > 0) {
    midTermPct = (ca.midTerm.score / ca.midTerm.maxScore) * 100;
  }

  // Weights within CA (Standard Ruhuna split: Mid Exam 30%, Quizzes 30%, Assignments 20%, Mini Project/Lab 20%)
  const hasQuizzes = ca.quizzes && ca.quizzes.length > 0;
  const hasAssign = ca.assignments && ca.assignments.length > 0;
  const hasMiniProj = ca.miniProjects && ca.miniProjects.length > 0;
  const hasMidTerm = Boolean(ca.midTerm && ca.midTerm.maxScore > 0);

  let totalWeight = 0;
  let weightedSum = 0;

  if (hasQuizzes) {
    weightedSum += quizPct * 30;
    totalWeight += 30;
  }
  if (hasAssign) {
    weightedSum += assignmentPct * 20;
    totalWeight += 20;
  }
  if (hasMiniProj) {
    weightedSum += miniProjectPct * 20;
    totalWeight += 20;
  }
  if (hasMidTerm) {
    weightedSum += midTermPct * 30;
    totalWeight += 30;
  }

  const caTotal100 = totalWeight > 0 ? Number((weightedSum / totalWeight).toFixed(1)) : 0;
  const caContribution = Number(((caTotal100 * caWeight) / 100).toFixed(1));
  const isEligibleForEndExam = caTotal100 >= 40.0; // Prescribed minimum CA threshold

  return {
    caTotal100,
    caContribution,
    isEligibleForEndExam,
    quizComponent100: Number(quizPct.toFixed(1)),
    assignmentComponent100: Number(assignmentPct.toFixed(1)),
    miniProjectComponent100: Number(miniProjectPct.toFixed(1)),
    midTermComponent100: Number(midTermPct.toFixed(1))
  };
}

/**
 * Predicts final grade from CA + End Exam marks
 */
export function estimateFinalGrade(caContribution: number, esaMarkOutOf100: number, esaWeight: number = 70): {
  totalMark: number;
  projectedGrade: Grade;
} {
  const esaContribution = (esaMarkOutOf100 * esaWeight) / 100;
  const totalMark = Math.min(100, Math.round(caContribution + esaContribution));

  let projectedGrade: Grade = 'E';
  if (totalMark >= 85) projectedGrade = 'A+';
  else if (totalMark >= 75) projectedGrade = 'A';
  else if (totalMark >= 70) projectedGrade = 'A-';
  else if (totalMark >= 65) projectedGrade = 'B+';
  else if (totalMark >= 60) projectedGrade = 'B';
  else if (totalMark >= 55) projectedGrade = 'B-';
  else if (totalMark >= 50) projectedGrade = 'C+';
  else if (totalMark >= 45) projectedGrade = 'C';
  else if (totalMark >= 40) projectedGrade = 'C-';
  else if (totalMark >= 35) projectedGrade = 'D+';
  else if (totalMark >= 30) projectedGrade = 'D';
  else projectedGrade = 'E';

  return { totalMark, projectedGrade };
}

/**
 * Distributes weekly study hours across current/target courses based on credits and goal intensity
 */
export function generateWeeklyStudyPlan(
  targetWeeklyHours: number,
  courses: { code: string; name: string; credits: number; targetGrade: Grade; caScore?: number }[]
): StudyPlanItem[] {
  if (!courses || courses.length === 0) return [];

  // Calculate weight factor = credits * gradeDifficultyFactor * needFactor
  const items = courses.map(c => {
    const pt = gradeToPoint(c.targetGrade);
    const difficultyFactor = pt >= 3.7 ? 1.4 : pt >= 3.3 ? 1.2 : pt >= 3.0 ? 1.0 : 0.8;
    // If CA score is below 50%, increase urgency
    const urgency = (c.caScore !== undefined && c.caScore < 50) ? 1.3 : 1.0;
    const rawWeight = c.credits * difficultyFactor * urgency;

    return {
      course: c,
      rawWeight,
      priority: (urgency > 1.2 || pt >= 3.7) ? 'High' : (pt >= 3.0) ? 'Medium' : 'Normal' as 'High' | 'Medium' | 'Normal'
    };
  });

  const totalRawWeight = items.reduce((sum, item) => sum + item.rawWeight, 0);

  return items.map(item => {
    const fraction = totalRawWeight > 0 ? item.rawWeight / totalRawWeight : 1 / items.length;
    const allocatedHours = Math.max(1, Math.round(fraction * targetWeeklyHours));
    
    let focusAreas = 'Core lecture theory and past paper exercises';
    if (item.course.name.toLowerCase().includes('database')) {
      focusAreas = 'SQL queries, ER diagrams, normalization & indexing drills';
    } else if (item.course.name.toLowerCase().includes('programming') || item.course.name.toLowerCase().includes('data structure')) {
      focusAreas = 'Algorithm implementations, edge case debugging, coding lab practice';
    } else if (item.course.name.toLowerCase().includes('web') || item.course.name.toLowerCase().includes('application')) {
      focusAreas = 'Project milestone development, API endpoints, reactive components';
    } else if (item.course.name.toLowerCase().includes('mathematics') || item.course.name.toLowerCase().includes('statistics')) {
      focusAreas = 'Problem sets, proofs, distribution calculations & discrete graph theory';
    } else if (item.course.name.toLowerCase().includes('network') || item.course.name.toLowerCase().includes('security')) {
      focusAreas = 'Subnet calculations, OSI packet flow, encryption ciphers & protocol specs';
    }

    return {
      courseCode: item.course.code,
      courseName: item.course.name,
      credits: item.course.credits,
      targetGrade: item.course.targetGrade,
      allocatedHours,
      focusAreas,
      priority: item.priority
    };
  });
}
