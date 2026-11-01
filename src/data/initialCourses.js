export const INITIAL_COURSES = [
  {
    id: "CSE-401",
    title: "Full Stack Web Development",
    department: "Computer Science",
    instructor: "Prof. Vikram Deshmukh",
    instructorId: "INS-2026-108",
    tuitionFee: 24500,
    duration: "14 Weeks",
    capacity: 60,
    enrollmentDeadline: "2026-11-20",
    prerequisites: "HTML, CSS, Modern JavaScript Basics",
    status: "Active",
    level: "Intermediate",
    credits: 4,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80",
    description: "Master modern full-stack web architectures with React, Node.js, RESTful microservices, state management, and cloud deployment pipelines.",
    fullDescription: "An intensive industry-aligned capstone course covering modern web application architecture, front-end optimization with React, component-driven development, asynchronous state synchronization, backend service orchestration with Node.js and Express, database normalization, and Dockerized deployments.",
    learningOutcomes: [
      "Architect component-driven frontend applications using React and modern CSS systems",
      "Develop robust RESTful API endpoints and integrate middleware pipelines",
      "Implement client-side caching, optimistic UI updates, and responsive layouts",
      "Configure automated build tools, linting, and continuous integration flows"
    ],
    highlights: ["Interactive Lab Sandbox", "Industry Mentor Code Reviews", "Final Capstone Portfolio Project", "Enterprise Architecture Certification"],
    dti: {
      baseTuition: 19500,
      techLabSurcharge: 2500,
      digitalLibraryFee: 1200,
      examLevy: 1300
    }
  },
  {
    id: "AIM-502",
    title: "Artificial Intelligence and Machine Learning",
    department: "Artificial Intelligence",
    instructor: "Dr. Priya Raman",
    instructorId: "INS-2026-104",
    tuitionFee: 32000,
    duration: "16 Weeks",
    capacity: 50,
    // Note: Nearly full course (will have 48 active demo enrollments, 2 seats remaining)
    enrollmentDeadline: "2026-11-15",
    prerequisites: "Linear Algebra, Multivariable Calculus, Python Programming",
    status: "Active",
    level: "Advanced",
    credits: 4,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    description: "Deep dive into statistical learning, neural networks, computer vision, natural language processing, and generative AI architectures.",
    fullDescription: "Gain profound theoretical understanding and practical engineering proficiency in machine learning algorithms, deep neural network optimization, transformer architectures, reinforcement learning paradigms, and ethical AI deployment in high-stakes environments.",
    learningOutcomes: [
      "Formulate supervised and unsupervised machine learning problems mathematically",
      "Build and train Convolutional and Transformer neural networks from scratch",
      "Optimize hyperparameters using cross-validation and regularized loss functions",
      "Deploy scalable model inference pipelines using ONNX and containerized runtimes"
    ],
    highlights: ["NVIDIA GPU Compute Cluster Access", "Hands-on PyTorch & HuggingFace Labs", "Real-world Kaggle Style Benchmarks", "Peer-reviewed Paper Presentation"],
    dti: {
      baseTuition: 25000,
      techLabSurcharge: 3800,
      digitalLibraryFee: 1600,
      examLevy: 1600
    }
  },
  {
    id: "CLD-303",
    title: "Cloud Computing with AWS",
    department: "Cloud Computing",
    instructor: "Dr. Ananya Sen",
    instructorId: "INS-2026-112",
    tuitionFee: 26000,
    duration: "10 Weeks",
    capacity: 45,
    enrollmentDeadline: "2026-11-25",
    prerequisites: "Operating Systems, Networking Fundamentals, Linux CLI",
    status: "Active",
    level: "Intermediate",
    credits: 3,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    description: "Design fault-tolerant, scalable, and highly available multi-region cloud infrastructures on Amazon Web Services.",
    fullDescription: "Prepare for enterprise cloud engineering roles. This curriculum delves into AWS IAM policies, VPC subnetting, auto-scaling EC2 clusters, serverless Lambda execution, S3 storage tiers, managed RDS databases, and Terraform Infrastructure as Code (IaC).",
    learningOutcomes: [
      "Design zero-trust cloud network topographies using Amazon VPC, NAT gateways, and Security Groups",
      "Automate cloud resource provisioning using Terraform and CloudFormation",
      "Implement automated failover, load balancing, and autoscaling policies",
      "Formulate enterprise Disaster Recovery (DR) and RPO/RTO mitigation strategies"
    ],
    highlights: ["Official AWS Sandbox Credits", "Live Chaos Engineering Simulations", "Terraform IaC Certification Project", "Industry Security Best Practices"],
    dti: {
      baseTuition: 20500,
      techLabSurcharge: 3000,
      digitalLibraryFee: 1100,
      examLevy: 1400
    }
  },
  {
    id: "CYB-204",
    title: "Cybersecurity Fundamentals",
    department: "Cybersecurity",
    instructor: "Dr. Ananya Sen",
    instructorId: "INS-2026-112",
    tuitionFee: 28500,
    duration: "12 Weeks",
    capacity: 35,
    // Note: Fully booked course (will have 35 active demo enrollments, 0 seats remaining)
    enrollmentDeadline: "2026-11-10",
    prerequisites: "Computer Networks, Cryptography Basics",
    status: "Active",
    level: "Intermediate",
    credits: 3,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    description: "Explore threat modeling, penetration testing, defensive cryptography, network security forensics, and incident mitigation.",
    fullDescription: "Comprehensive training in identifying system vulnerabilities, executing ethical penetration assessments, hardening server endpoints, analyzing intrusion logs, and constructing resilient defense postures against zero-day threats.",
    learningOutcomes: [
      "Identify and remediate OWASP Top 10 web and infrastructure vulnerabilities",
      "Perform passive and active network reconnaissance in isolated virtual labs",
      "Implement public-key infrastructure (PKI), TLS handshake protocols, and cryptographic ciphers",
      "Execute incident response protocols and produce digital forensic evidence reports"
    ],
    highlights: ["Private Capture-the-Flag (CTF) Arena", "Kali Linux & Metasploit Virtual Environments", "Incident Response Simulation Labs", "Certified Defensive Analyst Certificate"],
    dti: {
      baseTuition: 22000,
      techLabSurcharge: 3500,
      digitalLibraryFee: 1500,
      examLevy: 1500
    }
  },
  {
    id: "DSC-305",
    title: "Data Science with Python",
    department: "Data Science",
    instructor: "Dr. Priya Raman",
    instructorId: "INS-2026-104",
    tuitionFee: 23000,
    duration: "12 Weeks",
    capacity: 55,
    enrollmentDeadline: "2026-11-28",
    prerequisites: "Python Syntax, High School Probability & Statistics",
    status: "Active",
    level: "Beginner",
    credits: 3,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "Wrangle massive datasets, extract empirical insights, formulate hypothesis testing, and craft data visual stories using Pandas, NumPy, and Seaborn.",
    fullDescription: "From exploratory data analysis (EDA) to production predictive modeling, this course teaches students how to convert messy real-world datasets into actionable strategic intelligence. Covers statistical inference, regression analysis, feature engineering, and automated ETL pipelines.",
    learningOutcomes: [
      "Clean, transform, and aggregate heterogeneous datasets with Pandas and NumPy",
      "Design publication-quality interactive data visualizations with Seaborn and Plotly",
      "Conduct rigorous statistical hypothesis tests (t-tests, ANOVA, chi-square)",
      "Build scikit-learn predictive pipelines with cross-validation and feature scaling"
    ],
    highlights: ["Real Financial & Healthcare Datasets", "Interactive Jupyter Notebook Workflows", "Live Tableau & PowerBI Workshops", "Graduate Level Research Guidance"],
    dti: {
      baseTuition: 18000,
      techLabSurcharge: 2400,
      digitalLibraryFee: 1300,
      examLevy: 1300
    }
  },
  {
    id: "CSE-206",
    title: "Database Management Systems",
    department: "Computer Science",
    instructor: "Prof. Vikram Deshmukh",
    instructorId: "INS-2026-108",
    tuitionFee: 19500,
    duration: "10 Weeks",
    capacity: 50,
    enrollmentDeadline: "2026-12-05",
    prerequisites: "Discrete Mathematics, Relational Logic",
    status: "Active",
    level: "Intermediate",
    credits: 3,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    description: "Master relational algebra, SQL optimization, ACID transaction management, indexing strategies, and distributed NoSQL systems.",
    fullDescription: "Study the foundational engineering principles of modern database engines. Examine query execution plans, B-tree index structures, write-ahead logging (WAL), distributed consensus protocols, and PostgreSQL vs MongoDB trade-offs in high-concurrency environments.",
    learningOutcomes: [
      "Normalize relational database schemas up to Boyce-Codd Normal Form (BCNF)",
      "Profile and optimize complex SQL joins, subqueries, and window functions",
      "Analyze concurrency conflicts using two-phase locking (2PL) and MVCC",
      "Architect partitioned and replicated NoSQL data stores using MongoDB and Redis"
    ],
    highlights: ["PostgreSQL Query Plan Profiler Labs", "Transaction Concurrency Simulation", "High Volume Stress Testing", "NoSQL Sharding Workshops"],
    dti: {
      baseTuition: 15500,
      techLabSurcharge: 1800,
      digitalLibraryFee: 1000,
      examLevy: 1200
    }
  },
  {
    id: "CSE-107",
    title: "Java Programming & OOP",
    department: "Computer Science",
    instructor: "Prof. Vikram Deshmukh",
    instructorId: "INS-2026-108",
    tuitionFee: 18000,
    duration: "10 Weeks",
    capacity: 65,
    enrollmentDeadline: "2026-12-10",
    prerequisites: "Basic Algorithmic Problem Solving",
    status: "Active",
    level: "Beginner",
    credits: 3,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    description: "Solidify object-oriented programming paradigms, Java memory models, collections framework, multithreading, and design patterns.",
    fullDescription: "An in-depth journey through Java 21 LTS features, solid design patterns, JVM memory management, garbage collection heuristics, concurrent execution with virtual threads, and clean enterprise software engineering.",
    learningOutcomes: [
      "Implement encapsulation, inheritance, polymorphism, and abstraction with precision",
      "Master the Java Collections Framework (HashMaps, ConcurrentLists, Trees)",
      "Develop thread-safe concurrent algorithms using ExecutorService and Locks",
      "Refactor monolithic code using Creational, Structural, and Behavioral Design Patterns"
    ],
    highlights: ["JVM Profiling & Memory Analysis", "Design Pattern Coding Katas", "Virtual Thread Concurrency Labs", "Clean Code Best Practices"],
    dti: {
      baseTuition: 14200,
      techLabSurcharge: 1600,
      digitalLibraryFee: 1000,
      examLevy: 1200
    }
  },
  {
    id: "NET-208",
    title: "Computer Networks & Protocols",
    department: "Computer Science",
    instructor: "Prof. Vikram Deshmukh",
    instructorId: "INS-2026-108",
    tuitionFee: 20000,
    duration: "10 Weeks",
    capacity: 40,
    enrollmentDeadline: "2026-11-30",
    prerequisites: "Computer Architecture",
    status: "Inactive", // Note: Demonstrates Inactive course rule
    level: "Intermediate",
    credits: 3,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "Understand the OSI layer model, TCP/IP socket programming, routing algorithms, DNS resolution, and packet sniffers with Wireshark.",
    fullDescription: "Examine end-to-end data communication across modern telecommunication networks. Covers TCP congestion window dynamics, UDP streaming, BGP routing protocols, software-defined networking (SDN), and deep packet inspection.",
    learningOutcomes: [
      "Dissect network packets at bit-level using Wireshark and tcpdump",
      "Write multi-client TCP/UDP socket programs in C/Python",
      "Simulate routing protocols (OSPF, RIP, BGP) in virtual network topologies",
      "Evaluate network performance metrics (latency, jitter, throughput, packet loss)"
    ],
    highlights: ["Packet Capture Laboratory", "Socket Programming Projects", "Routing Protocol Emulators", "Enterprise Wireshark Training"],
    dti: {
      baseTuition: 16000,
      techLabSurcharge: 1800,
      digitalLibraryFee: 1000,
      examLevy: 1200
    }
  },
  {
    id: "OPS-309",
    title: "Operating Systems Internals",
    department: "Computer Science",
    instructor: "Prof. Vikram Deshmukh",
    instructorId: "INS-2026-108",
    tuitionFee: 21500,
    duration: "12 Weeks",
    capacity: 45,
    enrollmentDeadline: "2026-09-15", // Note: Demonstrates Expired enrollment deadline rule
    prerequisites: "C Programming, Assembly & Computer Architecture",
    status: "Active",
    level: "Advanced",
    credits: 4,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    description: "Process synchronization, Linux kernel architecture, virtual memory pagination, CPU scheduling, and file systems.",
    fullDescription: "Understand what happens beneath your applications. Study system calls, thread context switches, mutexes and semaphores, deadlock detection algorithms, virtual memory paging with TLBs, and ext4 file system disk allocation.",
    learningOutcomes: [
      "Implement POSIX thread synchronization and deadlock avoidance algorithms",
      "Trace system calls and interrupt handlers inside the Linux kernel",
      "Simulate page replacement policies (LRU, FIFO, Clock) and virtual memory mapping",
      "Construct a minimal working file system driver with inode management"
    ],
    highlights: ["Linux Kernel Module Development", "Low-level OS Benchmarks", "xv6 Operating System Labs", "Deadlock Prevention Simulator"],
    dti: {
      baseTuition: 17000,
      techLabSurcharge: 2100,
      digitalLibraryFee: 1100,
      examLevy: 1300
    }
  },
  {
    id: "DOP-410",
    title: "DevOps and CI/CD Automation",
    department: "Cloud Computing",
    instructor: "Dr. Ananya Sen",
    instructorId: "INS-2026-112",
    tuitionFee: 27500,
    duration: "10 Weeks",
    capacity: 40,
    enrollmentDeadline: "2026-12-01",
    prerequisites: "Git, Linux Terminal, Basic Web Application Architecture",
    status: "Active",
    level: "Intermediate",
    credits: 3,
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80",
    description: "Automate build, test, and release cycles with GitHub Actions, Docker containerization, Kubernetes orchestration, and Prometheus monitoring.",
    fullDescription: "Bridge the gap between software development and site reliability engineering. Build production-grade continuous integration and continuous delivery (CI/CD) pipelines, master multi-stage Docker builds, orchestrate Kubernetes pods, and set up real-time Grafana dashboards.",
    learningOutcomes: [
      "Construct production GitHub Actions workflows with automated testing and vulnerability scanning",
      "Create ultra-lightweight multi-stage Docker containers with non-root security",
      "Deploy and manage stateful and stateless services in Kubernetes clusters",
      "Configure Prometheus metric exporters and real-time alert triggers"
    ],
    highlights: ["Multi-cloud CI/CD Sandbox", "Kubernetes Production Cluster Labs", "GitOps with ArgoCD", "Prometheus & Grafana Observability Stack"],
    dti: {
      baseTuition: 21500,
      techLabSurcharge: 3200,
      digitalLibraryFee: 1300,
      examLevy: 1500
    }
  },
  {
    id: "MOB-311",
    title: "Mobile Application Development",
    department: "Computer Science",
    instructor: "Prof. Vikram Deshmukh",
    instructorId: "INS-2026-108",
    tuitionFee: 22500,
    duration: "12 Weeks",
    capacity: 50,
    enrollmentDeadline: "2026-11-28",
    prerequisites: "JavaScript / TypeScript or Kotlin basics",
    status: "Active",
    level: "Intermediate",
    credits: 3,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    description: "Build cross-platform iOS and Android native apps with React Native, state orchestration, device sensors, and offline storage.",
    fullDescription: "Learn to build slick, high-performance mobile applications with native feel. Covers cross-platform navigation, camera and geolocation hardware integration, background synchronization, push notifications, and App Store / Google Play publishing checklists.",
    learningOutcomes: [
      "Develop cross-platform native iOS & Android applications using React Native and Expo",
      "Integrate device hardware APIs (GPS, Camera, Accelerometer, Biometric Auth)",
      "Implement offline-first persistent state synchronization using SQLite and WatermelonDB",
      "Package, optimize bundle sizes, and deploy release binaries"
    ],
    highlights: ["Live Device Emulators", "Biometrics & Camera Hardware Projects", "Offline Synchronization Architecture", "Publishing Portfolio App"],
    dti: {
      baseTuition: 17800,
      techLabSurcharge: 2300,
      digitalLibraryFee: 1100,
      examLevy: 1300
    }
  },
  {
    id: "CS-512",
    title: "Software Engineering & Cloud Architecture",
    department: "Computer Science",
    instructor: "Dean Marcus Vance",
    instructorId: "ADM-2026-001",
    tuitionFee: 29000,
    duration: "14 Weeks",
    capacity: 45,
    enrollmentDeadline: "2026-12-15",
    prerequisites: "Object-Oriented Design, Web Protocols, Database Basics",
    status: "Active",
    level: "Advanced",
    credits: 4,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description: "Enterprise software modeling, microservices communication, message brokers, cloud principles, contract-first API design, and tuition accounting workflows.",
    fullDescription: "Examine enterprise architecture principles that scale across global organizations. Covers modern distributed architecture, loosely coupled integration patterns, Event-Driven Architecture, gRPC and REST contract design, and transactional saga orchestration.",
    learningOutcomes: [
      "Design contract-first microservices utilizing OpenAPI specifications and gRPC schemas",
      "Implement distributed transaction sagas and event choreography with message queues",
      "Evaluate architectural trade-offs versus monolithic and microservices designs",
      "Model institutional workflows and tuition ledger governance"
    ],
    highlights: ["Enterprise Cloud Sandbox", "Event-Driven Saga Labs", "Tuition Modeling", "Cloud Architecture Certification"],
    dti: {
      baseTuition: 22800,
      techLabSurcharge: 3200,
      digitalLibraryFee: 1400,
      examLevy: 1600
    }
  },
  {
    id: "BUS-213",
    title: "Business Analytics & Financial Modeling",
    department: "Business and Management",
    instructor: "Prof. Rohan Mukherjee",
    instructorId: "INS-2026-115",
    tuitionFee: 25000,
    duration: "10 Weeks",
    capacity: 45,
    enrollmentDeadline: "2026-11-22",
    prerequisites: "Basic Financial Concepts, Spreadsheet Proficiency",
    status: "Active",
    level: "Beginner",
    credits: 3,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    description: "Formulate discounted cash flow models, capital budgeting simulations, institutional tuition forecasting, and executive risk dashboards.",
    fullDescription: "Equips students to tackle corporate finance, investment valuation, and institutional operational budgeting. Learn how universities and enterprise SaaS businesses model tuition cash flows, revenue retention, dynamic capacity pricing, and strategic capital allocation.",
    learningOutcomes: [
      "Construct three-statement financial models with dynamic sensitivity tables",
      "Analyze higher education tuition fee elasticities and student retention metrics",
      "Perform Monte Carlo capital budgeting risk simulations",
      "Design executive C-suite KPI dashboards in financial analytics tools"
    ],
    highlights: ["Harvard Business Case Studies", "Institutional Tuition Economics Simulation", "Wall Street Valuation Templates", "Executive Pitch Deck Reviews"],
    dti: {
      baseTuition: 19600,
      techLabSurcharge: 2400,
      digitalLibraryFee: 1400,
      examLevy: 1600
    }
  },
  {
    id: "BCN-414",
    title: "Blockchain & Decentralized Applications",
    department: "Computer Science",
    instructor: "Dr. Ananya Sen",
    instructorId: "INS-2026-112",
    tuitionFee: 31000,
    duration: "12 Weeks",
    capacity: 35,
    enrollmentDeadline: "2026-12-08",
    prerequisites: "Cryptography, JavaScript / Solidy Basics",
    status: "Active",
    level: "Advanced",
    credits: 4,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    description: "Smart contract development with Solidity, zero-knowledge proofs, decentralized ledger protocols, and tokenized academic credentials.",
    fullDescription: "Demystify blockchain architectures from cryptographic hash chains to distributed consensus algorithms (PoW, PoS, PBFT). Build secure smart contracts, conduct static vulnerability audits, and deploy decentralized verification dApps for higher education credential registries.",
    learningOutcomes: [
      "Author gas-optimized Solidity smart contracts adhering to ERC standards",
      "Audit smart contracts for reentrancy, integer overflow, and front-running risks",
      "Deploy dApps interfacing with web3 provider libraries and decentralized storage (IPFS)",
      "Architect zero-knowledge credential verification for academic transcripts"
    ],
    highlights: ["Hardhat & Foundry Smart Contract Testbeds", "Security Audit War Games", "Decentralized Transcript DApp Project", "Ethereum & Layer 2 Gas Profiling"],
    dti: {
      baseTuition: 24200,
      techLabSurcharge: 3600,
      digitalLibraryFee: 1500,
      examLevy: 1700
    }
  }
];
