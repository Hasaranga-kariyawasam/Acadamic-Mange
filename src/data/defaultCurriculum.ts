import { Course, SemesterInfo } from '../types/academic';

export const SEMESTER_METADATA: SemesterInfo[] = [
  { id: 1, level: 1, semester: 1, label: 'L1 S1', title: 'Level 1 Semester I', isCompleted: true },
  { id: 2, level: 1, semester: 2, label: 'L1 S2', title: 'Level 1 Semester II (June/July 2026)', isCompleted: true },
  { id: 3, level: 2, semester: 1, label: 'L2 S1', title: 'Level 2 Semester I', isCompleted: false },
  { id: 4, level: 2, semester: 2, label: 'L2 S2', title: 'Level 2 Semester II (Current Semester)', isCompleted: false },
  { id: 5, level: 3, semester: 1, label: 'L3 S1', title: 'Level 3 Semester I', isCompleted: false },
  { id: 6, level: 3, semester: 2, label: 'L3 S2', title: 'Level 3 Semester II (Industrial Internship)', isCompleted: false },
  { id: 7, level: 4, semester: 1, label: 'L4 S1', title: 'Level 4 Semester I', isCompleted: false },
  { id: 8, level: 4, semester: 2, label: 'L4 S2', title: 'Level 4 Semester II (Final Research Project)', isCompleted: false },
];

export const DEFAULT_CURRICULUM_COURSES: Course[] = [
  // Level 1 Semester 1
  {
    id: 'l1s1-ict1113',
    code: 'ICT1113',
    name: 'Fundamentals of Computer Programming',
    credits: 3,
    semesterId: 1,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'C Programming, Data types, Control structures, Pointers, Functions'
  },
  {
    id: 'l1s1-ict1122',
    code: 'ICT1122',
    name: 'Programming Practicum',
    credits: 2,
    semesterId: 1,
    isGpaCountable: true,
    caWeight: 50,
    esaWeight: 50,
    syllabusTopic: 'Hands-on laboratory programming assignments and lab test'
  },
  {
    id: 'l1s1-ict1133',
    code: 'ICT1133',
    name: 'Computer Hardware and Architecture',
    credits: 3,
    semesterId: 1,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'Digital logic, CPU organization, Memory hierarchy, I/O systems'
  },
  {
    id: 'l1s1-ict1142',
    code: 'ICT1142',
    name: 'Computer Systems Practicum',
    credits: 2,
    semesterId: 1,
    isGpaCountable: true,
    caWeight: 50,
    esaWeight: 50,
    syllabusTopic: 'PC assembly, OS installation, basic hardware troubleshooting'
  },
  {
    id: 'l1s1-tcs1112',
    code: 'TCS1112',
    name: 'Principles of Communication',
    credits: 2,
    semesterId: 1,
    isGpaCountable: true,
    caWeight: 40,
    esaWeight: 60,
    syllabusTopic: 'Interpersonal skills, Technical presentations, Report writing'
  },
  {
    id: 'l1s1-tms1113',
    code: 'TMS1113',
    name: 'Mathematics for Computing',
    credits: 3,
    semesterId: 1,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'Calculus, Linear algebra, Matrix operations, Vectors'
  },
  {
    id: 'l1s1-eng1122',
    code: 'ENG1122',
    name: 'English I',
    credits: 2,
    semesterId: 1,
    isGpaCountable: true,
    caWeight: 40,
    esaWeight: 60,
    syllabusTopic: 'Grammar, Reading comprehension, Academic writing essentials'
  },

  // Level 1 Semester 2 (From University of Ruhuna Official Gazette Sheet)
  {
    id: 'l1s2-ict1212',
    code: 'ICT1212',
    name: 'Database Management Systems',
    credits: 2,
    semesterId: 2,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'Relational model, SQL, Normalization, ER diagrams, Transactions'
  },
  {
    id: 'l1s2-ict1222',
    code: 'ICT1222',
    name: 'Database Management Systems Practicum',
    credits: 2,
    semesterId: 2,
    isGpaCountable: true,
    caWeight: 50,
    esaWeight: 50,
    syllabusTopic: 'MySQL / PostgreSQL queries, Database design practical implementation'
  },
  {
    id: 'l1s2-ict1232',
    code: 'ICT1232',
    name: 'Web Development',
    credits: 2,
    semesterId: 2,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'HTML5, CSS3, JavaScript, Web architectures, DOM manipulation'
  },
  {
    id: 'l1s2-ict1242',
    code: 'ICT1242',
    name: 'Web Development Practicum',
    credits: 2,
    semesterId: 2,
    isGpaCountable: true,
    caWeight: 50,
    esaWeight: 50,
    syllabusTopic: 'Full-stack client UI development, Responsive web lab project'
  },
  {
    id: 'l1s2-ict1252',
    code: 'ICT1252',
    name: 'Operating Systems Concepts and Application',
    credits: 2,
    semesterId: 2,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'Process scheduling, Concurrency, Virtual memory, File systems'
  },
  {
    id: 'l1s2-ict1261',
    code: 'ICT1261',
    name: 'System Programming Fundamentals and Linux',
    credits: 1,
    semesterId: 2,
    isGpaCountable: true,
    caWeight: 40,
    esaWeight: 60,
    syllabusTopic: 'Linux bash scripting, Shell utilities, GCC compilation, System calls'
  },
  {
    id: 'l1s2-tcs1212',
    code: 'TCS1212',
    name: 'Fundamentals of Management',
    credits: 2,
    semesterId: 2,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'Organizational structures, Leadership, Human resource management'
  },
  {
    id: 'l1s2-tms1232',
    code: 'TMS1232',
    name: 'Discrete Mathematics',
    credits: 2,
    semesterId: 2,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'Set theory, Logic, Graph theory, Combinatorics, Relations & Trees'
  },
  {
    id: 'l1s2-eng1222',
    code: 'ENG1222',
    name: 'English II',
    credits: 2,
    semesterId: 2,
    isGpaCountable: true,
    caWeight: 40,
    esaWeight: 60,
    syllabusTopic: 'Technical documentation, Academic essay writing, Professional communication'
  },

  // Level 2 Semester 1
  {
    id: 'l2s1-ict2113',
    code: 'ICT2113',
    name: 'Data Structures and Algorithms',
    credits: 3,
    semesterId: 3,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'Trees, Graphs, Sorting algorithms, Complexity analysis, Big-O'
  },
  {
    id: 'l2s1-ict2122',
    code: 'ICT2122',
    name: 'Data Structures and Algorithms Practicum',
    credits: 2,
    semesterId: 3,
    isGpaCountable: true,
    caWeight: 50,
    esaWeight: 50,
    syllabusTopic: 'C++ / Java implementations of dynamic memory data structures'
  },
  {
    id: 'l2s1-ict2133',
    code: 'ICT2133',
    name: 'Object-Oriented Analysis and Design',
    credits: 3,
    semesterId: 3,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'UML diagrams, Design patterns, SOLID principles, Clean code'
  },
  {
    id: 'l2s1-ict2142',
    code: 'ICT2142',
    name: 'Software Engineering Practicum',
    credits: 2,
    semesterId: 3,
    isGpaCountable: true,
    caWeight: 50,
    esaWeight: 50,
    syllabusTopic: 'Agile team project, Git version control, Jira, CI/CD pipeline'
  },
  {
    id: 'l2s1-ict2153',
    code: 'ICT2153',
    name: 'Computer Networks',
    credits: 3,
    semesterId: 3,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'OSI 7 layers, TCP/IP, IP subnetting, Routing protocols, Socket API'
  },
  {
    id: 'l2s1-tms2112',
    code: 'TMS2112',
    name: 'Probability and Statistics',
    credits: 2,
    semesterId: 3,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'Random variables, Distributions, Hypothesis testing, Regression'
  },
  {
    id: 'l2s1-eng2122',
    code: 'ENG2122',
    name: 'English III',
    credits: 2,
    semesterId: 3,
    isGpaCountable: true,
    caWeight: 40,
    esaWeight: 60,
    syllabusTopic: 'Professional technical proposals, Conference presentation delivery'
  },

  // Level 2 Semester 2 (User's Current Semester - active assessment tracking)
  {
    id: 'l2s2-ict2213',
    code: 'ICT2213',
    name: 'Advanced Database Systems',
    credits: 3,
    semesterId: 4,
    isGpaCountable: true,
    caWeight: 35,
    esaWeight: 65,
    syllabusTopic: 'Query optimization, Distributed databases, NoSQL, Indexing strategies'
  },
  {
    id: 'l2s2-ict2222',
    code: 'ICT2222',
    name: 'Rapid Application Development',
    credits: 2,
    semesterId: 4,
    isGpaCountable: true,
    caWeight: 50,
    esaWeight: 50,
    syllabusTopic: 'Modern framework prototyping, React/Next.js, Component architectures'
  },
  {
    id: 'l2s2-ict2233',
    code: 'ICT2233',
    name: 'Server-Side Web Application Development',
    credits: 3,
    semesterId: 4,
    isGpaCountable: true,
    caWeight: 35,
    esaWeight: 65,
    syllabusTopic: 'Node.js, Express, RESTful APIs, Authentication & Session tokens'
  },
  {
    id: 'l2s2-ict2242',
    code: 'ICT2242',
    name: 'Mobile Application Development',
    credits: 2,
    semesterId: 4,
    isGpaCountable: true,
    caWeight: 50,
    esaWeight: 50,
    syllabusTopic: 'Flutter / React Native, Mobile lifecycle, Sensors & offline storage'
  },
  {
    id: 'l2s2-ict2252',
    code: 'ICT2252',
    name: 'Information Security Essentials',
    credits: 2,
    semesterId: 4,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'Cryptography, PKI, OWASP Top 10, Network defenses, Risk assessment'
  },
  {
    id: 'l2s2-tcs2212',
    code: 'TCS2212',
    name: 'Entrepreneurship and Leadership',
    credits: 2,
    semesterId: 4,
    isGpaCountable: true,
    caWeight: 40,
    esaWeight: 60,
    syllabusTopic: 'Tech startup ideation, Pitch decks, Lean canvas, Business law'
  },
  {
    id: 'l2s2-eng2222',
    code: 'ENG2222',
    name: 'Professional Communication & Career Skills',
    credits: 2,
    semesterId: 4,
    isGpaCountable: true,
    caWeight: 40,
    esaWeight: 60,
    syllabusTopic: 'Mock interviews, Technical resume building, Industry etiquette'
  },

  // Level 3 Semester 1
  {
    id: 'l3s1-ict3113',
    code: 'ICT3113',
    name: 'Cloud Computing & Distributed Architecture',
    credits: 3,
    semesterId: 5,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'AWS/GCP architectures, Microservices, Containers & Kubernetes'
  },
  {
    id: 'l3s1-ict3123',
    code: 'ICT3123',
    name: 'Artificial Intelligence & Machine Learning',
    credits: 3,
    semesterId: 5,
    isGpaCountable: true,
    caWeight: 35,
    esaWeight: 65,
    syllabusTopic: 'Supervised/unsupervised models, Neural nets, Scikit-learn, NLP'
  },
  {
    id: 'l3s1-ict3132',
    code: 'ICT3132',
    name: 'IT Project Management',
    credits: 2,
    semesterId: 5,
    isGpaCountable: true,
    caWeight: 40,
    esaWeight: 60,
    syllabusTopic: 'Scrum, Sprint planning, Cost estimation, Risk mitigation'
  },
  {
    id: 'l3s1-ict3142',
    code: 'ICT3142',
    name: 'DevOps & Continuous Deployment',
    credits: 2,
    semesterId: 5,
    isGpaCountable: true,
    caWeight: 50,
    esaWeight: 50,
    syllabusTopic: 'Docker containers, GitHub Actions, Terraform IaC, Observability'
  },
  {
    id: 'l3s1-ict3152',
    code: 'ICT3152',
    name: 'Human-Computer Interaction (HCI)',
    credits: 2,
    semesterId: 5,
    isGpaCountable: true,
    caWeight: 40,
    esaWeight: 60,
    syllabusTopic: 'Usability testing, Cognitive walkthroughs, Wireframing in Figma'
  },
  {
    id: 'l3s1-ict3162',
    code: 'ICT3162',
    name: 'Software Technology Mini Project',
    credits: 2,
    semesterId: 5,
    isGpaCountable: true,
    caWeight: 60,
    esaWeight: 40,
    syllabusTopic: 'Full semester real-world industry application delivery'
  },
  {
    id: 'l3s1-tms3112',
    code: 'TMS3112',
    name: 'Research Methodology & Scientific Writing',
    credits: 2,
    semesterId: 5,
    isGpaCountable: true,
    caWeight: 40,
    esaWeight: 60,
    syllabusTopic: 'Literature review, Experimental design, IEEE format citation'
  },

  // Level 3 Semester 2 (Industrial Internship)
  {
    id: 'l3s2-ict3216',
    code: 'ICT3216',
    name: 'Industrial Internship / Training',
    credits: 6,
    semesterId: 6,
    isGpaCountable: true,
    caWeight: 60,
    esaWeight: 40,
    syllabusTopic: '6 months full-time software engineering industry placement'
  },
  {
    id: 'l3s2-ict3222',
    code: 'ICT3222',
    name: 'Professional Ethics & Intellectual Property',
    credits: 2,
    semesterId: 6,
    isGpaCountable: true,
    caWeight: 30,
    esaWeight: 70,
    syllabusTopic: 'Sri Lankan cyber laws, GDPR, Software licensing, Patents'
  },

  // Level 4 Semester 1
  {
    id: 'l4s1-ict4113',
    code: 'ICT4113',
    name: 'Big Data Analytics & Data Warehousing',
    credits: 3,
    semesterId: 7,
    isGpaCountable: true,
    caWeight: 35,
    esaWeight: 65,
    syllabusTopic: 'Apache Spark, Hadoop, ETL pipelines, Star/Snowflake schemas'
  },
  {
    id: 'l4s1-ict4123',
    code: 'ICT4123',
    name: 'Advanced Network Engineering & Penetration Testing',
    credits: 3,
    semesterId: 7,
    isGpaCountable: true,
    caWeight: 40,
    esaWeight: 60,
    syllabusTopic: 'Ethical hacking, Vulnerability scanning, Firewall config, SIEM'
  },
  {
    id: 'l4s1-ict4133',
    code: 'ICT4133',
    name: 'Internet of Things (IoT) Systems',
    credits: 3,
    semesterId: 7,
    isGpaCountable: true,
    caWeight: 45,
    esaWeight: 55,
    syllabusTopic: 'ESP32, MQTT protocols, Edge AI, Industrial IoT gateways'
  },
  {
    id: 'l4s1-ict4143',
    code: 'ICT4143',
    name: 'Enterprise Architecture & Domain-Driven Design',
    credits: 3,
    semesterId: 7,
    isGpaCountable: true,
    caWeight: 35,
    esaWeight: 65,
    syllabusTopic: 'CQRS, Event-driven systems, Clean architecture, Message brokers'
  },
  {
    id: 'l4s1-ict4153',
    code: 'ICT4153',
    name: 'Final Year Research Project Phase I',
    credits: 3,
    semesterId: 7,
    isGpaCountable: true,
    caWeight: 70,
    esaWeight: 30,
    syllabusTopic: 'Research proposal, Comprehensive literature survey, Prototype design'
  },

  // Level 4 Semester 2
  {
    id: 'l4s2-ict4216',
    code: 'ICT4216',
    name: 'Final Year Research Project Phase II & Dissertation',
    credits: 6,
    semesterId: 8,
    isGpaCountable: true,
    caWeight: 60,
    esaWeight: 40,
    syllabusTopic: 'Thesis completion, Viva-voce defense, Research paper submission'
  },
  {
    id: 'l4s2-ict4223',
    code: 'ICT4223',
    name: 'Emerging Technologies & Industry Trends',
    credits: 3,
    semesterId: 8,
    isGpaCountable: true,
    caWeight: 35,
    esaWeight: 65,
    syllabusTopic: 'Quantum computing fundamentals, Blockchain smart contracts, GenAI'
  },
  {
    id: 'l4s2-ict4232',
    code: 'ICT4232',
    name: 'Technology Commercialization & Venture Creation',
    credits: 2,
    semesterId: 8,
    isGpaCountable: true,
    caWeight: 50,
    esaWeight: 50,
    syllabusTopic: 'Venture capital pitching, Product-market fit, Legal incorporation'
  },
];
