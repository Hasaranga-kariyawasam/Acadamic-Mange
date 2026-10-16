import { StudentResult, Grade } from '../types/academic';

export interface BatchGazetteRow {
  no: number;
  index: string;
  name: string;
  ict1212: Grade;
  ict1222: Grade;
  ict1232: Grade;
  ict1242: Grade;
  ict1252: Grade;
  ict1261: Grade;
  tcs1212: Grade;
  tms1232: Grade;
  eng1222: Grade;
  sgpa: number | 'WH';
  cgpa: number | 'WH';
}

export const RUHUNA_L1S2_GAZETTE_DATA: BatchGazetteRow[] = [
  { no: 1, index: 'TG/2024/2061', name: 'AMJAD M.H.M.', ict1212: 'B', ict1222: 'B', ict1232: 'B+', ict1242: 'A-', ict1252: 'B+', ict1261: 'B', tcs1212: 'B-', tms1232: 'A', eng1222: 'A-', sgpa: 3.38, cgpa: 3.53 },
  { no: 2, index: 'TG/2024/2062', name: 'KUMARASINGHE K.A.H.W.', ict1212: 'C+', ict1222: 'A-', ict1232: 'B-', ict1242: 'B+', ict1252: 'B-', ict1261: 'B', tcs1212: 'B-', tms1232: 'B-', eng1222: 'B-', sgpa: 2.59, cgpa: 2.60 },
  { no: 3, index: 'TG/2024/2063', name: 'CALDERA H.P.U.M.', ict1212: 'C+', ict1222: 'B', ict1232: 'C+', ict1242: 'B-', ict1252: 'C+', ict1261: 'B-', tcs1212: 'C+', tms1232: 'B-', eng1222: 'B-', sgpa: 2.25, cgpa: 2.52 },
  { no: 4, index: 'TG/2024/2064', name: 'NONIS M.D.R.L.', ict1212: 'B', ict1222: 'A-', ict1232: 'D', ict1242: 'B+', ict1252: 'B', ict1261: 'A-', tcs1212: 'A-', tms1232: 'B+', eng1222: 'A-', sgpa: 3.07, cgpa: 3.09 },
  { no: 5, index: 'TG/2024/2066', name: 'SAMARASINGHE S.V.D.A.', ict1212: 'B+', ict1222: 'B', ict1232: 'B', ict1242: 'A-', ict1252: 'B-', ict1261: 'C', tcs1212: 'C+', tms1232: 'A-', eng1222: 'B', sgpa: 3.35, cgpa: 3.00 },
  { no: 6, index: 'TG/2024/2067', name: 'WIJETHUNGA W.D.D.M.', ict1212: 'C-', ict1222: 'B', ict1232: 'B', ict1242: 'B-', ict1252: 'B-', ict1261: 'B-', tcs1212: 'B-', tms1232: 'B-', eng1222: 'B-', sgpa: 2.25, cgpa: 2.24 },
  { no: 7, index: 'TG/2024/2068', name: 'SUBHASHANA R.M.M.', ict1212: 'B', ict1222: 'A-', ict1232: 'B', ict1242: 'A-', ict1252: 'B-', ict1261: 'A-', tcs1212: 'B+', tms1232: 'A-', eng1222: 'B+', sgpa: 3.38, cgpa: 3.34 },
  { no: 8, index: 'TG/2024/2069', name: 'RANATHUNGA T.T.', ict1212: 'C+', ict1222: 'B', ict1232: 'B-', ict1242: 'A-', ict1252: 'B', ict1261: 'B-', tcs1212: 'B-', tms1232: 'B+', eng1222: 'B+', sgpa: 2.85, cgpa: 2.91 },
  { no: 9, index: 'TG/2024/2070', name: 'METHMADU W.A.P.', ict1212: 'B', ict1222: 'A-', ict1232: 'C', ict1242: 'A', ict1252: 'B', ict1261: 'B+', tcs1212: 'B-', tms1232: 'B+', eng1222: 'A', sgpa: 3.13, cgpa: 3.01 },
  { no: 10, index: 'TG/2024/2071', name: 'KESHAN W.A.G.K.', ict1212: 'B', ict1222: 'A-', ict1232: 'D', ict1242: 'A', ict1252: 'C+', ict1261: 'B', tcs1212: 'B-', tms1232: 'B+', eng1222: 'A-', sgpa: 3.13, cgpa: 2.98 },
  { no: 11, index: 'TG/2024/2073', name: 'GUNAWARDHANE L.R.W.H.S.', ict1212: 'B', ict1222: 'B', ict1232: 'C+', ict1242: 'A-', ict1252: 'B+', ict1261: 'B', tcs1212: 'B+', tms1232: 'A-', eng1222: 'B+', sgpa: 3.30, cgpa: 3.23 },
  { no: 12, index: 'TG/2024/2074', name: 'CHANDRASEKARA W.H.C.', ict1212: 'B-', ict1222: 'B', ict1232: 'B-', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'B-', tms1232: 'B-', eng1222: 'B-', sgpa: 2.47, cgpa: 2.63 },
  { no: 13, index: 'TG/2024/2075', name: 'THISAGI M.M.', ict1212: 'MC', ict1222: 'MC', ict1232: 'B-', ict1242: 'B-', ict1252: 'MC', ict1261: 'B-', tcs1212: 'B-', tms1232: 'B-', eng1222: 'B-', sgpa: 'WH', cgpa: 'WH' },
  { no: 14, index: 'TG/2024/2076', name: 'MARYAM M.H.H.', ict1212: 'C+', ict1222: 'B', ict1232: 'B', ict1242: 'A', ict1252: 'C+', ict1261: 'B', tcs1212: 'B-', tms1232: 'B-', eng1222: 'B-', sgpa: 2.58, cgpa: 2.89 },
  { no: 15, index: 'TG/2024/2077', name: 'PRAMUDITHA R.A.V.', ict1212: 'C+', ict1222: 'MC', ict1232: 'B-', ict1242: 'C+', ict1252: 'BE', ict1261: 'B-', tcs1212: 'B-', tms1232: 'B-', eng1222: 'B-', sgpa: 'WH', cgpa: 'WH' },
  { no: 16, index: 'TG/2024/2078', name: 'NETHMINA B.A.N.', ict1212: 'C-', ict1222: 'B-', ict1232: 'C-', ict1242: 'B-', ict1252: 'C', ict1261: 'B-', tcs1212: 'C-', tms1232: 'B-', eng1222: 'C+', sgpa: 1.89, cgpa: 2.19 },
  { no: 17, index: 'TG/2024/2079', name: 'PERERA K.S.T.', ict1212: 'C', ict1222: 'B-', ict1232: 'C', ict1242: 'C+', ict1252: 'C+', ict1261: 'B-', tcs1212: 'B-', tms1232: 'B-', eng1222: 'B-', sgpa: 2.09, cgpa: 2.59 },
  { no: 18, index: 'TG/2024/2080', name: 'MADUSHANKA A.S.S.', ict1212: 'EE', ict1222: 'C', ict1232: 'EE', ict1242: 'C', ict1252: 'C', ict1261: 'EE', tcs1212: 'C-', tms1232: 'D', eng1222: 'C-', sgpa: 1.16, cgpa: 1.38 },
  { no: 19, index: 'TG/2024/2081', name: 'BANDARA R.M.K.T.', ict1212: 'B', ict1222: 'B', ict1232: 'C', ict1242: 'B', ict1252: 'B+', ict1261: 'C', tcs1212: 'B-', tms1232: 'A-', eng1222: 'B+', sgpa: 2.93, cgpa: 2.72 },
  { no: 20, index: 'TG/2024/2082', name: 'KAWESHA W.D.P.', ict1212: 'B', ict1222: 'A-', ict1232: 'C', ict1242: 'B+', ict1252: 'B+', ict1261: 'B', tcs1212: 'B-', tms1232: 'B+', eng1222: 'C+', sgpa: 2.93, cgpa: 2.72 },
  { no: 21, index: 'TG/2024/2083', name: 'SAMARATHUNGA K.A.B.V.', ict1212: 'B', ict1222: 'B', ict1232: 'B-', ict1242: 'B+', ict1252: 'B+', ict1261: 'B', tcs1212: 'B-', tms1232: 'A', eng1222: 'B+', sgpa: 3.10, cgpa: 3.06 },
  { no: 22, index: 'TG/2024/2085', name: 'HAPUARACHCHI H.H.H.B.', ict1212: 'C', ict1222: 'B', ict1232: 'C', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'C+', tms1232: 'B+', eng1222: 'B-', sgpa: 2.46, cgpa: 2.76 },
  { no: 23, index: 'TG/2024/2086', name: 'JAYALATH J.K.H.D.W.B.', ict1212: 'C-', ict1222: 'EE', ict1232: 'C-', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'C-', tms1232: 'B-', eng1222: 'B-', sgpa: 1.97, cgpa: 2.28 },
  { no: 24, index: 'TG/2024/2087', name: 'GEETHANJANA K.A.M.I.', ict1212: 'B-', ict1222: 'EE', ict1232: 'C+', ict1242: 'B+', ict1252: 'B+', ict1261: 'B', tcs1212: 'B-', tms1232: 'B', eng1222: 'B+', sgpa: 2.37, cgpa: 2.41 },
  { no: 25, index: 'TG/2024/2088', name: 'PERERA W.V.D.M.', ict1212: 'C-', ict1222: 'C', ict1232: 'C-', ict1242: 'C', ict1252: 'C-', ict1261: 'C', tcs1212: 'EE', tms1232: 'C', eng1222: 'B-', sgpa: 1.21, cgpa: 1.72 },
  { no: 26, index: 'TG/2024/2089', name: 'WOSADA T.H.D.', ict1212: 'B-', ict1222: 'EE', ict1232: 'C', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'EE', tms1232: 'B+', eng1222: 'B-', sgpa: 2.17, cgpa: 2.48 },
  { no: 27, index: 'TG/2024/2090', name: 'JAYANETHHI J.K.C.M.G.', ict1212: 'EE', ict1222: 'EE', ict1232: 'C', ict1242: 'B-', ict1252: 'C+', ict1261: 'C', tcs1212: 'C', tms1232: 'C', eng1222: 'B-', sgpa: 1.25, cgpa: 1.73 },
  { no: 28, index: 'TG/2024/2091', name: 'RODRIGO P.D.N.K.', ict1212: 'C', ict1222: 'B-', ict1232: 'C-', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'B-', tms1232: 'B-', eng1222: 'B-', sgpa: 2.13, cgpa: 2.63 },
  { no: 29, index: 'TG/2024/2092', name: 'ABEYWICKRAMA G.V.T.', ict1212: 'B+', ict1222: 'A-', ict1232: 'A', ict1242: 'A-', ict1252: 'A-', ict1261: 'B+', tcs1212: 'B', tms1232: 'A', eng1222: 'A-', sgpa: 3.54, cgpa: 3.40 },
  { no: 30, index: 'TG/2024/2093', name: 'DEVINDI M.K.', ict1212: 'B', ict1222: 'B+', ict1232: 'C+', ict1242: 'A-', ict1252: 'B+', ict1261: 'C+', tcs1212: 'B', tms1232: 'A-', eng1222: 'B', sgpa: 3.23, cgpa: 3.24 },
  { no: 31, index: 'TG/2024/2094', name: 'ZUMRA M.M.F.', ict1212: 'B-', ict1222: 'C', ict1232: 'C-', ict1242: 'C+', ict1252: 'B-', ict1261: 'B', tcs1212: 'B-', tms1232: 'C', eng1222: 'B-', sgpa: 1.97, cgpa: 2.27 },
  { no: 32, index: 'TG/2024/2095', name: 'NIMSARA H.A.I.', ict1212: 'EE', ict1222: 'B-', ict1232: 'C', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'B-', tms1232: 'B-', eng1222: 'B-', sgpa: 2.09, cgpa: 2.37 },
  { no: 33, index: 'TG/2024/2096', name: 'HASARANGA K.H.M.', ict1212: 'B-', ict1222: 'B', ict1232: 'C+', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'B-', tms1232: 'B+', eng1222: 'B-', sgpa: 2.49, cgpa: 2.78 },
  { no: 34, index: 'TG/2024/2097', name: 'PREMATHUNGA I.D.N.S.', ict1212: 'C+', ict1222: 'A', ict1232: 'B', ict1242: 'B+', ict1252: 'B+', ict1261: 'A-', tcs1212: 'B-', tms1232: 'B+', eng1222: 'B+', sgpa: 3.06, cgpa: 2.91 },
  { no: 35, index: 'TG/2024/2098', name: 'NIMASH K.C.', ict1212: 'B+', ict1222: 'A', ict1232: 'B+', ict1242: 'A-', ict1252: 'A-', ict1261: 'B+', tcs1212: 'B', tms1232: 'A-', eng1222: 'A-', sgpa: 3.48, cgpa: 3.39 },
  { no: 36, index: 'TG/2024/2099', name: 'ABEYRATHNA R.R.', ict1212: 'C', ict1222: 'EE', ict1232: 'C-', ict1242: 'C', ict1252: 'C', ict1261: 'EE', tcs1212: 'C-', tms1232: 'D+', eng1222: 'C-', sgpa: 0.75, cgpa: 1.01 },
  { no: 37, index: 'TG/2024/2100', name: 'ARACHCHIGE D.H.H.', ict1212: 'EE', ict1222: 'B-', ict1232: 'EE', ict1242: 'MC', ict1252: 'EE', ict1261: 'B-', tcs1212: 'C-', tms1232: 'EE', eng1222: 'B-', sgpa: 0.49, cgpa: 'WH' },
  { no: 38, index: 'TG/2024/2101', name: 'PASANDUL M.M.M.A.', ict1212: 'C-', ict1222: 'C', ict1232: 'C', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'C', tms1232: 'B-', eng1222: 'B-', sgpa: 2.03, cgpa: 2.80 },
  { no: 39, index: 'TG/2024/2102', name: 'JAYAMINA J.P.S.', ict1212: 'C', ict1222: 'B', ict1232: 'C', ict1242: 'C+', ict1252: 'B-', ict1261: 'B', tcs1212: 'C', tms1232: 'B-', eng1222: 'B-', sgpa: 2.24, cgpa: 2.50 },
  { no: 40, index: 'TG/2024/2104', name: 'AAMIR F.M.A.', ict1212: 'B', ict1222: 'A', ict1232: 'B+', ict1242: 'A-', ict1252: 'A-', ict1261: 'B+', tcs1212: 'B+', tms1232: 'A', eng1222: 'A-', sgpa: 3.42, cgpa: 3.15 },
  { no: 41, index: 'TG/2024/2105', name: 'SHAHIM M.M.', ict1212: 'C+', ict1222: 'B', ict1232: 'C+', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'C+', tms1232: 'B-', eng1222: 'B-', sgpa: 2.55, cgpa: 2.37 },
  { no: 42, index: 'TG/2024/2106', name: 'SANDEEPA K.P.P.', ict1212: 'D', ict1222: 'B', ict1232: 'C', ict1242: 'C', ict1252: 'C', ict1261: 'EE', tcs1212: 'C-', tms1232: 'B-', eng1222: 'B-', sgpa: 2.40, cgpa: 'WH' },
  { no: 43, index: 'TG/2024/2107', name: 'CHAMIKARA P.H.M.', ict1212: 'B', ict1222: 'A-', ict1232: 'C+', ict1242: 'B+', ict1252: 'B+', ict1261: 'B', tcs1212: 'B', tms1232: 'A-', eng1222: 'A-', sgpa: 3.27, cgpa: 3.17 },
  { no: 44, index: 'TG/2024/2108', name: 'HETTIWITHARANA D.H.', ict1212: 'B-', ict1222: 'B', ict1232: 'C+', ict1242: 'B', ict1252: 'B-', ict1261: 'B', tcs1212: 'B-', tms1232: 'B+', eng1222: 'B+', sgpa: 2.31, cgpa: 2.46 },
  { no: 45, index: 'TG/2024/2109', name: 'JAYASANKA M.P.', ict1212: 'C+', ict1222: 'B+', ict1232: 'B-', ict1242: 'B+', ict1252: 'A-', ict1261: 'B', tcs1212: 'B+', tms1232: 'A', eng1222: 'A-', sgpa: 3.27, cgpa: 3.17 },
  { no: 46, index: 'TG/2024/2110', name: 'MADHUSANKHA H.D.', ict1212: 'C-', ict1222: 'C', ict1232: 'C-', ict1242: 'B-', ict1252: 'B-', ict1261: 'C', tcs1212: 'C-', tms1232: 'B-', eng1222: 'B-', sgpa: 2.27, cgpa: 2.01 },
  { no: 47, index: 'TG/2024/2111', name: 'DISSANAYAKA K.G.T.S.', ict1212: 'B', ict1222: 'A-', ict1232: 'C+', ict1242: 'A', ict1252: 'B+', ict1261: 'A-', tcs1212: 'B-', tms1232: 'B+', eng1222: 'B', sgpa: 2.77, cgpa: 2.94 },
  { no: 48, index: 'TG/2024/2112', name: 'NETHSARA H.R.H.', ict1212: 'C-', ict1222: 'C', ict1232: 'C-', ict1242: 'C+', ict1252: 'EE', ict1261: 'C', tcs1212: 'C-', tms1232: 'B-', eng1222: 'B-', sgpa: 1.47, cgpa: 2.01 },
  { no: 49, index: 'TG/2024/2113', name: 'SARATHCHANDRA G.M.S.', ict1212: 'C+', ict1222: 'C', ict1232: 'B-', ict1242: 'B-', ict1252: 'B', ict1261: 'C+', tcs1212: 'B-', tms1232: 'B+', eng1222: 'B+', sgpa: 2.55, cgpa: 2.54 },
  { no: 50, index: 'TG/2024/2114', name: 'PATHIRANA K.P.S.B.', ict1212: 'B', ict1222: 'A-', ict1232: 'B', ict1242: 'A', ict1252: 'B+', ict1261: 'A-', tcs1212: 'B+', tms1232: 'A', eng1222: 'A-', sgpa: 3.47, cgpa: 3.25 },
  { no: 51, index: 'TG/2024/2115', name: 'KAVINDA H.L.S.', ict1212: 'C+', ict1222: 'B-', ict1232: 'C', ict1242: 'B-', ict1252: 'C+', ict1261: 'B', tcs1212: 'C', tms1232: 'B-', eng1222: 'B-', sgpa: 2.40, cgpa: 2.47 },
  { no: 52, index: 'TG/2024/2116', name: 'BHASHITHA W.L.', ict1212: 'B-', ict1222: 'A', ict1232: 'B-', ict1242: 'B+', ict1252: 'B+', ict1261: 'B', tcs1212: 'B-', tms1232: 'A-', eng1222: 'B+', sgpa: 3.47, cgpa: 3.25 },
  { no: 53, index: 'TG/2024/2117', name: 'DILSHAN R.A.G.', ict1212: 'C', ict1222: 'C', ict1232: 'C', ict1242: 'C', ict1252: 'C', ict1261: 'C', tcs1212: 'C', tms1232: 'B-', eng1222: 'B-', sgpa: 2.52, cgpa: 2.42 },
  { no: 54, index: 'TG/2024/2118', name: 'THARUKA W.L.A.W.', ict1212: 'C', ict1222: 'B+', ict1232: 'C+', ict1242: 'B', ict1252: 'B-', ict1261: 'B', tcs1212: 'C+', tms1232: 'B-', eng1222: 'B-', sgpa: 2.52, cgpa: 2.42 },
  { no: 55, index: 'TG/2024/2119', name: 'ISIJAYA S.H.P.', ict1212: 'B-', ict1222: 'B', ict1232: 'C', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'B-', tms1232: 'A', eng1222: 'A', sgpa: 3.21, cgpa: 2.91 },
  { no: 56, index: 'TG/2024/2120', name: 'GUNASINGHA H.T.D.H.', ict1212: 'B-', ict1222: 'B', ict1232: 'C', ict1242: 'B-', ict1252: 'C+', ict1261: 'B', tcs1212: 'B-', tms1232: 'B-', eng1222: 'B-', sgpa: 2.42, cgpa: 2.35 },
  { no: 57, index: 'TG/2024/2121', name: 'SENDIYA T.V.K.', ict1212: 'EE', ict1222: 'C', ict1232: 'EE', ict1242: 'EE', ict1252: 'B-', ict1261: 'EE', tcs1212: 'EE', tms1232: 'C', eng1222: 'C', sgpa: 1.52, cgpa: 1.43 },
  { no: 58, index: 'TG/2024/2122', name: 'DASANAYAKA D.P.N.N.', ict1212: 'C', ict1222: 'B', ict1232: 'C', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'C', tms1232: 'B-', eng1222: 'B-', sgpa: 2.35, cgpa: 2.35 },
  { no: 59, index: 'TG/2024/2123', name: 'ESHAN A.A.', ict1212: 'B-', ict1222: 'B', ict1232: 'B-', ict1242: 'B-', ict1252: 'B-', ict1261: 'B', tcs1212: 'B-', tms1232: 'B+', eng1222: 'B-', sgpa: 2.69, cgpa: 2.66 },
  { no: 60, index: 'TG/2024/2124', name: 'WEERAWARDHANA B.G.N.M.', ict1212: 'A-', ict1222: 'A', ict1232: 'B+', ict1242: 'C+', ict1252: 'A-', ict1261: 'B+', tcs1212: 'B+', tms1232: 'B-', eng1222: 'A', sgpa: 3.38, cgpa: 3.25 },
  { no: 61, index: 'TG/2024/2125', name: 'DULANJANA R.N.', ict1212: 'B', ict1222: 'B', ict1232: 'B+', ict1242: 'B+', ict1252: 'B+', ict1261: 'B', tcs1212: 'B', tms1232: 'A-', eng1222: 'B+', sgpa: 3.27, cgpa: 3.13 },
  { no: 62, index: 'TG/2024/2126', name: 'KUMARI S.A.S.', ict1212: 'B', ict1222: 'B', ict1232: 'C+', ict1242: 'B', ict1252: 'A', ict1261: 'B', tcs1212: 'C', tms1232: 'B+', eng1222: 'B+', sgpa: 2.96, cgpa: 2.89 },
  { no: 63, index: 'TG/2024/2127', name: 'ALUDENIYA A.M.C.K.D.', ict1212: 'B', ict1222: 'B', ict1232: 'C+', ict1242: 'A-', ict1252: 'A', ict1261: 'B', tcs1212: 'B', tms1232: 'B+', eng1222: 'A', sgpa: 3.07, cgpa: 3.21 },
  { no: 64, index: 'TG/2024/2128', name: 'DAHANAYAKA D.S.R.N.', ict1212: 'MC', ict1222: 'HE', ict1232: 'A', ict1242: 'C-', ict1252: 'B', ict1261: 'C+', tcs1212: 'C+', tms1232: 'B', eng1222: 'EE', sgpa: 'WH', cgpa: 'WH' },
  { no: 65, index: 'TG/2024/2129', name: 'AYSHA M.A.', ict1212: 'A', ict1222: 'A', ict1232: 'A', ict1242: 'A', ict1252: 'B+', ict1261: 'B+', tcs1212: 'B+', tms1232: 'A+', eng1222: 'A', sgpa: 3.78, cgpa: 3.62 },
  { no: 66, index: 'TG/2024/2130', name: 'SOMARATHNA R.T.D.', ict1212: 'C', ict1222: 'C', ict1232: 'C', ict1242: 'B-', ict1252: 'C+', ict1261: 'C', tcs1212: 'C-', tms1232: 'C', eng1222: 'C', sgpa: 1.66, cgpa: 'WH' },
  { no: 67, index: 'TG/2024/2131', name: 'RANASINGHE R.A.S.S.K.B.', ict1212: 'C+', ict1222: 'C+', ict1232: 'C+', ict1242: 'B+', ict1252: 'A-', ict1261: 'A-', tcs1212: 'B', tms1232: 'B+', eng1222: 'B', sgpa: 3.35, cgpa: 3.42 },
  { no: 68, index: 'TG/2024/2134', name: 'KAVINDA A.S.S.', ict1212: 'A-', ict1222: 'B', ict1232: 'A', ict1242: 'A-', ict1252: 'B', ict1261: 'B+', tcs1212: 'C+', tms1232: 'A', eng1222: 'A', sgpa: 3.47, cgpa: 3.36 },
  { no: 69, index: 'TG/2024/2136', name: 'DISSANAYAKA K.D.T.', ict1212: 'B-', ict1222: 'EE', ict1232: 'B', ict1242: 'B+', ict1252: 'B', ict1261: 'B', tcs1212: 'B', tms1232: 'A-', eng1222: 'B+', sgpa: 2.37, cgpa: 2.69 },
  { no: 70, index: 'TG/2024/2137', name: 'ILUKKUMBURA I.M.H.B.B.', ict1212: 'B-', ict1222: 'A', ict1232: 'B+', ict1242: 'A', ict1252: 'C+', ict1261: 'EE', tcs1212: 'EE', tms1232: 'B-', eng1222: 'C+', sgpa: 1.07, cgpa: 1.21 },
  { no: 71, index: 'TG/2024/2139', name: 'RAZIM R.M.M.', ict1212: 'B', ict1222: 'A', ict1232: 'B+', ict1242: 'A-', ict1252: 'B+', ict1261: 'B+', tcs1212: 'B+', tms1232: 'A', eng1222: 'A', sgpa: 3.65, cgpa: 3.36 },
  { no: 72, index: 'TG/2024/2140', name: 'HIRUNIKA P.S.R.', ict1212: 'C', ict1222: 'C', ict1232: 'C', ict1242: 'B-', ict1252: 'B-', ict1261: 'C', tcs1212: 'C-', tms1232: 'C', eng1222: 'B', sgpa: 1.33, cgpa: 1.81 },
  { no: 73, index: 'TG/2024/2142', name: 'RASHIKAN M.R.M.', ict1212: 'C', ict1222: 'C', ict1232: 'D', ict1242: 'B', ict1252: 'B', ict1261: 'B', tcs1212: 'B-', tms1232: 'B', eng1222: 'B', sgpa: 2.23, cgpa: 2.65 },
  { no: 74, index: 'TG/2024/2143', name: 'DINANJAYA M.K.V.B.', ict1212: 'B', ict1222: 'B', ict1232: 'B', ict1242: 'B', ict1252: 'B+', ict1261: 'C+', tcs1212: 'B', tms1232: 'B', eng1222: 'B', sgpa: 2.94, cgpa: 2.79 },
  { no: 75, index: 'TG/2024/2144', name: 'KALHARA W.K.C.', ict1212: 'C', ict1222: 'EE', ict1232: 'C', ict1242: 'C+', ict1252: 'B-', ict1261: 'B-', tcs1212: 'C+', tms1232: 'B', eng1222: 'B+', sgpa: 2.18, cgpa: 2.37 },
  { no: 76, index: 'TG/2024/2145', name: 'WICKRAMASOORIYA A.J.C.', ict1212: 'C+', ict1222: 'C', ict1232: 'C', ict1242: 'B', ict1252: 'B', ict1261: 'B', tcs1212: 'B-', tms1232: 'B+', eng1222: 'C', sgpa: 2.15, cgpa: 2.05 },
  { no: 77, index: 'TG/2024/2146', name: 'RATHNAYAKA R.M.G.S.', ict1212: 'EE', ict1222: 'C', ict1232: 'EE', ict1242: 'B-', ict1252: 'B-', ict1261: 'EE', tcs1212: 'C-', tms1232: 'EE', eng1222: 'C', sgpa: 0.93, cgpa: 1.23 },
  { no: 78, index: 'TG/2024/2147', name: 'RANATHUNGA R.A.P.N.', ict1212: 'B-', ict1222: 'C', ict1232: 'C+', ict1242: 'B+', ict1252: 'B', ict1261: 'B', tcs1212: 'C+', tms1232: 'B+', eng1222: 'B-', sgpa: 2.65, cgpa: 2.52 }
];

export function convertGazetteToStudentResults(): StudentResult[] {
  return RUHUNA_L1S2_GAZETTE_DATA.map((row) => {
    // Estimated Level 1 Sem 1 grades to align with their actual CGPA:
    // (SGPA_1 + SGPA_2) / 2 ≈ CGPA
    let l1s1_sgpa: number | 'WH' = 'WH';
    if (typeof row.cgpa === 'number' && typeof row.sgpa === 'number') {
      l1s1_sgpa = Number((2 * row.cgpa - row.sgpa).toFixed(2));
      if (l1s1_sgpa > 4.0) l1s1_sgpa = 4.0;
      if (l1s1_sgpa < 0) l1s1_sgpa = 0;
    }

    const defaultL1S1Grade: Grade = typeof l1s1_sgpa === 'number'
      ? (l1s1_sgpa >= 3.7 ? 'A' : l1s1_sgpa >= 3.3 ? 'B+' : l1s1_sgpa >= 3.0 ? 'B' : l1s1_sgpa >= 2.5 ? 'B-' : l1s1_sgpa >= 2.0 ? 'C' : 'D+')
      : 'B';

    return {
      studentIndex: row.index,
      studentName: row.name,
      semesters: {
        1: {
          sgpa: l1s1_sgpa,
          cgpa: l1s1_sgpa,
          grades: {
            'ICT1113': defaultL1S1Grade,
            'ICT1122': defaultL1S1Grade,
            'ICT1133': defaultL1S1Grade,
            'ICT1142': defaultL1S1Grade,
            'TCS1112': defaultL1S1Grade,
            'TMS1113': defaultL1S1Grade,
            'ENG1122': defaultL1S1Grade,
          }
        },
        2: {
          sgpa: row.sgpa,
          cgpa: row.cgpa,
          grades: {
            'ICT1212': row.ict1212,
            'ICT1222': row.ict1222,
            'ICT1232': row.ict1232,
            'ICT1242': row.ict1242,
            'ICT1252': row.ict1252,
            'ICT1261': row.ict1261,
            'TCS1212': row.tcs1212,
            'TMS1232': row.tms1232,
            'ENG1222': row.eng1222,
          }
        }
      }
    };
  });
}
