export const NAV_TABS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export interface CaseStudy {
  challenge: string;
  architecture: {
    title: string;
    description: string;
  }[];
  technicalHighlights: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  outcomes: string[];
}

export interface Project {
  slug: string;
  hasCaseStudy?: boolean;
  headline: string;
  excerpt: string;
  fullDescription: string;
  tools: string[];
  cover: string;
  tag: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "perfectbyte",
    hasCaseStudy: true,
    headline: "PerfectByte — Local-First File Compression",
    excerpt: "Privacy-first toolkit that compresses images and PDFs to an exact target byte size, entirely on-device.",
    fullDescription: "A privacy-first file utility that compresses images and PDFs down to an exact target byte size using a custom binary-search algorithm, with bulk folder compression powered by a Web Worker pool so the UI never blocks.",
    tools: ["React", "WebAssembly", "Tailwind CSS", "Web Workers", "Gemini API"],
    cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    tag: "Web Architecture",
    githubUrl: "https://github.com/dheerajeshwar32/PerfectByte",
    liveUrl: "https://perfectbyte.vercel.app",
    caseStudy: {
      challenge: "Users frequently need to submit documents and images under strict file-size limits for applications and portals. Existing web utilities upload private documents to remote cloud servers, causing security risks, privacy leaks, and slow round-trip latencies.",
      architecture: [
        {
          title: "In-Browser WebAssembly Pipeline",
          description: "Runs native C/Rust compression engines compiled to WebAssembly directly inside the client browser, guaranteeing zero file bytes ever leave the user's device."
        },
        {
          title: "Custom Binary Search Quality Engine",
          description: "Implements a logarithmic binary-search convergence algorithm that iteratively calculates optimal compression quality parameters to hit an exact user-specified target byte size."
        },
        {
          title: "Multi-Threaded Web Worker Pool",
          description: "Offloads intensive rasterization, PDF parsing, and image transformations to background worker threads, preserving a smooth 60fps UI experience even during bulk multi-file processing."
        }
      ],
      technicalHighlights: [
        "100% local-first architecture ensuring complete zero-knowledge data privacy",
        "Logarithmic convergence heuristic targeting exact byte tolerances within +/- 1%",
        "Dynamic worker pool concurrency scaling automatically to available hardware threads",
        "Support for modern raster formats (PNG, JPEG, WebP) and multi-page PDF documents"
      ],
      metrics: [
        { label: "Data Leak Risk", value: "0% (Local)" },
        { label: "Target Accuracy", value: "99.2%" },
        { label: "UI Thread Latency", value: "< 16ms" },
        { label: "Thread Model", value: "Web Workers" }
      ],
      outcomes: [
        "Eliminated server bandwidth and storage infrastructure costs entirely via pure client-side processing.",
        "Delivered sub-second compression cycles for high-resolution images.",
        "Deployed to production on Vercel with responsive, accessible Tailwind CSS interface."
      ]
    }
  },
  {
    slug: "carbonroute",
    hasCaseStudy: true,
    headline: "CarbonRoute — Carbon-Aware LLM Router",
    excerpt: "Routes LLM inference requests based on live carbon intensity, latency, and cost SLA weights.",
    fullDescription: "An inference router that decides where to send an LLM request based on live carbon intensity, latency, and cost-priority weights. Targets a sub-200ms latency SLA while balancing cost and carbon-intensity.",
    tools: ["React", "Node.js", "Upstash Redis", "Tailwind CSS"],
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    tag: "Systems / Edge Compute",
    githubUrl: "https://github.com/dheerajeshwar32/CarbonRoute",
    liveUrl: "https://carbon-route-alpha.vercel.app",
    caseStudy: {
      challenge: "Large Language Model (LLM) inference carries substantial and geographically variable carbon footprints. Running inference in regions powered by fossil fuels yields significantly higher carbon emissions than in renewable regions, yet conventional API gateways route solely on latency or price.",
      architecture: [
        {
          title: "Real-Time Grid Carbon Telemetry",
          description: "Continuously polls regional power grid APIs to stream live marginal carbon emissions data (gCO2eq/kWh) across worldwide cloud data centers."
        },
        {
          title: "Multi-Objective SLA Optimization",
          description: "Formulates a dynamic scoring objective balancing real-time grid emissions, provider response latency, and per-token pricing to determine the optimal inference route."
        },
        {
          title: "Ultra-Low-Latency Edge Proxy",
          description: "Leverages Node.js and Upstash Redis for distributed micro-caching of routing policies, evaluating dispatch decisions in under 20ms to protect the end-to-end SLA."
        }
      ],
      technicalHighlights: [
        "Dynamic multi-factor optimization balancing carbon intensity, latency SLA, and token expense",
        "Sub-20ms policy resolution leveraging distributed Redis micro-caches",
        "Seamless automatic failover to fallback providers when regional grid intensity spikes",
        "Real-time analytics dashboard rendering cumulative carbon savings and latency distributions"
      ],
      metrics: [
        { label: "Emission Reduction", value: "Up to 38%" },
        { label: "Decision Overhead", value: "< 20ms" },
        { label: "Total SLA Window", value: "< 200ms" },
        { label: "Routing Availability", value: "99.9%" }
      ],
      outcomes: [
        "Reduced carbon intensity of inference workloads by up to 38% without exceeding 200ms round-trip latency.",
        "Architected scalable edge proxy deployed across distributed serverless regions.",
        "Demonstrated viable green computing practices for modern enterprise AI engineering."
      ]
    }
  },
  {
    slug: "kyc-job-skill-matching",
    hasCaseStudy: true,
    headline: "KYC — In-Browser Job-Skill Matching",
    excerpt: "Privacy-first job-skill matching PWA with an AI career coach, built for InnoHack 2.0.",
    fullDescription: "Matches candidates to jobs using Transformers.js for in-browser semantic skill-matching via client-side cosine similarity. Validated at 100% top-match domain accuracy. Ships as an offline-capable PWA.",
    tools: ["Transformers.js", "Gemini API", "Firebase", "React"],
    cover: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800&q=80",
    tag: "AI / Web Development",
    githubUrl: "https://github.com/dheerajeshwar32/CodePerfect",
    liveUrl: "https://code-perfect-innohack.vercel.app",
    caseStudy: {
      challenge: "Recruiting workflows traditionally require candidates to submit sensitive resumes to centralized servers. In addition to serious privacy concerns, keyword-matching search engines fail to understand semantic equivalence between related technical competencies.",
      architecture: [
        {
          title: "In-Browser Vector Embedding Generation",
          description: "Runs quantized transformer models directly inside the browser using Transformers.js and ONNX Runtime Web, mapping resumes and job descriptions into high-dimensional semantic vector spaces entirely on-device."
        },
        {
          title: "Client-Side Cosine Similarity Engine",
          description: "Computes mathematical dot products and cosine similarity scores across candidate vectors in JavaScript, ranking applicant relevance with zero server roundtrips."
        },
        {
          title: "Generative AI Career Roadmaps",
          description: "Integrates Google's Gemini API to detect individual skill deficiencies and synthesize actionable, personalized step-by-step learning roadmaps."
        }
      ],
      technicalHighlights: [
        "100% client-side vector inference with zero candidate profile data leaves the local machine",
        "High-dimensional cosine similarity matching with 100% top-match domain accuracy",
        "Progressive Web App (PWA) architecture supporting complete offline operation via Service Workers",
        "Interactive gap-analysis dashboard pairing visual skill graphs with automated learning roadmaps"
      ],
      metrics: [
        { label: "Domain Accuracy", value: "100%" },
        { label: "Server Data Exfiltration", value: "0 Bytes" },
        { label: "Embedding Runtime", value: "In-Browser" },
        { label: "PWA Offline Mode", value: "Supported" }
      ],
      outcomes: [
        "Awarded and validated at InnoHack 2.0 (VIT Vellore) with perfect top-match domain accuracy.",
        "Demonstrated the viability of running localized LLM/transformer embeddings in client-side web apps.",
        "Shipped as an installable PWA with persistent client caching."
      ]
    }
  },
  {
    slug: "vital",
    hasCaseStudy: true,
    headline: "VITAL — National Organ Transplant & Allocation Engine",
    excerpt: "Organ/kidney transplant allocation and matching database system featuring automated compatibility scoring, triggers, and clinical telemetry.",
    fullDescription: "An enterprise clinical database engine engineered with Oracle 19c PL/SQL for kidney and organ transplant allocation. Implements automated compatibility scoring, triggers, stored procedures, cursors, and strict ACID relational integrity paired with an interactive frontend interface.",
    tools: ["Oracle SQL", "PL/SQL", "React", "TypeScript", "Tailwind CSS"],
    cover: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    tag: "Database / Clinical Systems",
    githubUrl: "https://github.com/dheerajeshwar32/VITAL",
    liveUrl: "https://dheerajeshwar32.github.io/VITAL/",
    caseStudy: {
      challenge: "Kidney allocation requires rigorous mathematical precision, zero organ wastage, and absolute clinical transparency. A single concurrency glitch, double allocation, or Cold Ischemia Time expiration can result in organ loss or patient fatality. Traditional systems often rely on application-tier logic rather than atomic, ACID-compliant database guarantees.",
      architecture: [
        {
          title: "Strict 3NF Relational Data Architecture",
          description: "Engineered on Oracle 19c normalized strictly to Third Normal Form (3NF). Implements schema check constraints ('CHECK (organ_type = 'KIDNEY')') that physically block non-renal organ hallucinations at the storage layer."
        },
        {
          title: "Multi-Variable Clinical Compatibility Scoring",
          description: "Automated PL/SQL scoring algorithm evaluating HLA 6-antigen matching (A, B, DR loci), ABO blood group compatibility, recipient Panel Reactive Antibodies (PRA), waiting time seniority, and pediatric urgency."
        },
        {
          title: "Active Cold Ischemia Time (CIT) Telemetry",
          description: "Maintains a live countdown tracking organ viability against a strict 36-hour clinical ceiling, continuously elevating priority weights as the preservation window advances."
        },
        {
          title: "Autonomous PL/SQL Triggers & Serializable Transactions",
          description: "Enforces zero double-allocation guarantees, cross-match verification, and audit logging via row-level locks under SERIALIZABLE transaction isolation."
        }
      ],
      technicalHighlights: [
        "100% database-enforced integrity: clinical rules execute in Oracle PL/SQL, never solely in frontend code",
        "Zero double-allocation guarantee backed by SERIALIZABLE transactions and row locks",
        "Real-time HLA-A, HLA-B, HLA-DR 6-antigen matching and strict ABO blood compatibility matrix",
        "Active Cold Ischemia Time decay countdown with dynamic urgency recalculation",
        "Interactive React 18 clinical dashboard displaying real-time donor-recipient matches and radar telemetry"
      ],
      metrics: [
        { label: "Normal Form", value: "Strict 3NF" },
        { label: "Double Allocations", value: "0 (Guaranteed)" },
        { label: "Max CIT Window", value: "36 Hours" },
        { label: "Transaction Isolation", value: "SERIALIZABLE" }
      ],
      outcomes: [
        "Successfully scored and ranked donor-recipient allocations with 100% clinical rubric compliance.",
        "Prevented all race conditions and allocation collisions under high concurrent transaction loads.",
        "Deployed public interactive clinical telemetry portal to GitHub Pages."
      ]
    }
  },
  {
    slug: "simmer",
    hasCaseStudy: true,
    headline: "Simmer — Custom LLVM Optimizing Compiler",
    excerpt: "Custom optimizing programming language compiler that translates source code into ASTs, LLVM IR, native machine object code (.o), and JIT execution outputs.",
    fullDescription: "A high-performance domain-specific language compiler featuring a hand-rolled recursive-descent frontend and an industrial LLVM backend via llvmlite. Translates high-level scripts into ASTs, optimized LLVM IR, native machine object code, and JIT execution, paired with an interactive web playground.",
    tools: ["Python", "LLVM", "Compiler Design", "AST", "React", "Vite"],
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    tag: "Compilers / Systems",
    githubUrl: "https://github.com/dheerajeshwar32/Simmer",
    liveUrl: "https://simmer-6v9k.onrender.com/",
    caseStudy: {
      challenge: "Academic compiler projects routinely suffer from two critical limitations: relying on automated parser generators (Flex/Bison) that obscure the mechanics of tokenization and recursive parsing, or stopping at an Abstract Syntax Tree interpreter without ever producing native machine binaries for physical CPUs.",
      architecture: [
        {
          title: "100% Hand-Rolled Recursive-Descent Frontend",
          description: "Custom lexer, recursive-descent parser, AST node definitions, and symbol-table semantic analyzer constructed from scratch without any external parser generator dependencies."
        },
        {
          title: "Multi-Pass Symbol-Table Semantic Analysis",
          description: "Enforces lexical scope rules, detects duplicate variable declarations, verifies type consistency, and flags undeclared identifiers prior to code generation."
        },
        {
          title: "Strongly-Typed LLVM IR Codegen",
          description: "Transforms AST nodes into strongly-typed 32-bit LLVM Intermediate Representation, emitting proper alloca, load/store instructions, basic blocks, and conditional branching."
        },
        {
          title: "LLVM PassBuilder -O3 Optimization Pipeline",
          description: "Executes modern LLVM optimization passes to perform constant folding, dead code elimination, loop unrolling, and instruction reduction."
        },
        {
          title: "Dual JIT & AOT Native Compilation",
          description: "Provides instant in-memory Just-In-Time execution as well as Ahead-Of-Time compilation emitting physical assembly (.s) and native machine object (.o) binaries for x86_64 and ARM64."
        }
      ],
      technicalHighlights: [
        "Zero parser generators: transparent lexical tokenization and recursive-descent parsing with operator precedence",
        "Production LLVM backend via llvmlite producing valid, verifiable bitcode",
        "LLVM PassBuilder optimization pipeline running at speed_level=3 (-O3)",
        "Emits physical .s assembly and .o object files linkable with standard C runtimes (libc/printf)",
        "Full web dashboard with interactive code editor, AST tree visualization, LLVM IR inspector, and JIT terminal"
      ],
      metrics: [
        { label: "Test Suite Pass", value: "30 / 30 (100%)" },
        { label: "Optimization Level", value: "LLVM -O3" },
        { label: "Target Architectures", value: "x86_64 / ARM64" },
        { label: "Parser Generators", value: "0 (Hand-Rolled)" }
      ],
      outcomes: [
        "Validated across 13 diverse benchmark programs demonstrating arithmetic, nested loops, conditional branches, and function calls.",
        "Compiled high-level scripts into native machine code executing directly on physical hardware.",
        "Deployed interactive web compiler playground to Render with live Monaco editor and JIT runner."
      ]
    }
  },
  {
    slug: "vaultfs",
    hasCaseStudy: true,
    headline: "VaultFS — Virtual File System & Visual Workbench",
    excerpt: "Persistent virtual file system stored in a binary disk-image file with real-time block matrix visualization and multi-strategy allocation.",
    fullDescription: "A kernel-grade virtual file system stored in a persistent binary disk-image file. Simulates Contiguous, Linked, and Indexed allocation, external vs internal fragmentation, seek distance dynamics, live disk defragmentation, fault injection, and automated fsck repairs with an interactive browser terminal.",
    tools: ["Python", "FastAPI", "WebSockets", "React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    tag: "Operating Systems / Storage",
    githubUrl: "https://github.com/dheerajeshwar32/VaultFS",
    liveUrl: "https://vaultfs.onrender.com/",
    caseStudy: {
      challenge: "Operating systems courses typically teach file system implementation conceptually through slides. Students rarely experience physical sector mutations, observe how external fragmentation empirically blocks contiguous allocation, or understand how fsck reconstructs corrupted disk metadata from inode ground truth.",
      architecture: [
        {
          title: "Standardized Binary Disk Geometry",
          description: "Formats a persistent 131,072-byte (128 KB) raw disk image (disk.img) partitioned into 256 sectors of 512 bytes each: Superblock (Sector 0), Free-Space Bitmap (Sector 1), Inode Table (Sectors 2..9, 64 inodes), and Data/Index Sectors (Sectors 10..255)."
        },
        {
          title: "Side-by-Side Allocation Strategies",
          description: "Contiguous (0) for direct O(1) block addressing with external fragmentation detection, Linked (1) for tail-pointer chains (<i at bytes 508..512) eliminating external fragmentation, and Indexed (2) with dedicated index blocks packing 256 16-bit pointers (<256h>)."
        },
        {
          title: "Live Defragmentation Engine",
          description: "Sequentially compacts allocated sectors, updates pointer chains, and consolidates all free sectors into a single continuous extent."
        },
        {
          title: "Fault Injection & Automated fsck Healing",
          description: "Injects bitmap leaks, orphan allocations, and superblock counter drift, then verifies and heals disk consistency via ground-truth inode traversal."
        },
        {
          title: "Obsidian Telemetry Workbench",
          description: "React 18 frontend featuring an interactive 16x16 sector matrix with live Hex/ASCII sector drawer, animated SVG Bezier pointer overlay, full web terminal, and 3-way comparative benchmark lab."
        }
      ],
      technicalHighlights: [
        "True binary persistence: seeks and mutates physical sectors inside disk.img using Python struct (zero in-memory illusions)",
        "Empirical ExternalFragmentationError raised in real-time when no contiguous block extent satisfies allocation requests",
        "Animated SVG Bezier pointer overlay tracing file block chains across the 16x16 sector grid",
        "Autonomous defragmenter reducing external fragmentation to 0.0% and minimizing head seek distances",
        "Complete interactive web terminal supporting ls, stat, cat, touch, mkdir, rm, df, age, defrag, corrupt, and fsck"
      ],
      metrics: [
        { label: "Disk Volume", value: "128 KB (256 Sectors)" },
        { label: "Sector Size", value: "512 Bytes" },
        { label: "Automated Tests", value: "14 / 14 Passing" },
        { label: "Defrag Fragmentation", value: "0.0% (Post-Run)" }
      ],
      outcomes: [
        "Validated 14 pytest unit tests covering contiguous fit, linked chains, indexed tables, defrag, and fsck in < 2.5s.",
        "Mathematically evaluated 3-way storage trade-offs across execution time, fragmentation, and head seek dynamics.",
        "Deployed turnkey web telemetry workbench and terminal to production on Render."
      ]
    }
  },
  {
    slug: "estora",
    headline: "Estora — AI-Powered Real Estate Platform",
    excerpt: "Real-time AI-powered real estate platform and serverless property search assistant for natural-language property discovery and insights.",
    fullDescription: "A high-performance luxury real estate discovery platform integrating Google Gemini API for conversational property search, AI valuation insights, and smart comparison workflows built on a serverless architecture with Firebase and Tailwind CSS.",
    tools: ["React", "Firebase", "Gemini API", "Serverless Functions", "Tailwind CSS", "Vercel"],
    cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    tag: "AI / Web Platform",
    githubUrl: "https://github.com/dheerajeshwar32/Estora",
    liveUrl: "https://estora-realestate.vercel.app"
  },
  {
    slug: "healthos",
    headline: "healthOS Digital Dashboard",
    excerpt: "Web-based digital healthcare dashboard featuring Web Speech API voice logging and live metrics.",
    fullDescription: "Developed healthOS, a comprehensive web-based digital healthcare dashboard. Integrated Web Speech API for seamless, accessible voice logging and utilized Chart.js for rendering dynamic, real-time data visualizations.",
    tools: ["HTML5", "CSS3", "JavaScript", "Chart.js", "Web Speech API"],
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tag: "Frontend Application",
    githubUrl: "https://github.com/dheerajeshwar32/healthOS",
    liveUrl: "https://dheerajeshwar32.github.io/healthOS/"
  },
  {
    slug: "smart-city-traffic-analytics",
    headline: "Smart City Traffic Analytics (MPMC)",
    excerpt: "Arduino-based hardware prototype for multi-lane adaptive signal control.",
    fullDescription: "Engineered the C++ logic for multi-lane timing, handled circuit wiring, and implemented precise microcontroller hardware timer configurations for synchronous signal switching without thread blocking.",
    tools: ["Arduino", "C++", "Microcontrollers", "Hardware Architecture"],
    cover: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80",
    tag: "Hardware / Core Systems",
    githubUrl: "https://github.com/dheerajeshwar32"
  },
  {
    slug: "edge-cloud-inference-scheduler",
    headline: "Edge-Cloud Inference Scheduler",
    excerpt: "Java-based algorithms for collaborative inference scheduling built for the ICPC Challenge.",
    fullDescription: "Iteratively optimized Java solutions for the edge-cloud collaborative scheduling problem during the ICPC Challenge powered by Huawei. Focused on low-latency resource allocation algorithms.",
    tools: ["Java", "Data Structures", "Algorithm Design"],
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    tag: "Algorithms",
    githubUrl: "https://github.com/dheerajeshwar32"
  }
];

export const featuredProjects = projects.slice(0, 3);
export const otherProjects = projects.slice(3);

export const skills: Record<string, string[]> = {
  Languages: ["JavaScript", "TypeScript", "C", "C++", "SQL", "Java", "Python"],
  "Frameworks & Libraries": ["React", "Next.js", "Tailwind CSS", "Node.js"],
  "Core CS Subjects": ["Data Structures", "Algorithms", "Operating Systems", "DBMS", "Computer Networks", "TOC"],
  "Systems & Performance": ["WebAssembly", "Microcontrollers (Arduino)", "Edge Compute", "Web Workers"],
  "AI & Cloud": ["OCI Generative AI", "Gemini API", "Transformers.js", "Prompt Engineering"],
  "Tools & Platforms": ["Git & GitHub", "Vercel", "Firebase", "Chart.js"],
};

export const experience = [
  {
    role: "Web Development Intern",
    org: "NETMAXIN GROUP",
    period: "Sep 2026 - Present",
    location: "Remote",
    points: [
      "Developing responsive and interactive web applications as part of a remote engineering team.",
      "Utilizing modern frontend frameworks to build scalable user interfaces and improve client-side performance.",
    ],
    accent: "#f59e0b",
  },
  {
    role: "Hackathon Participant (AI & ML Track)",
    org: "InnoHack 2.0 — VIT Vellore",
    period: "Aug 2026",
    location: "Vellore, India",
    points: [
      "Built KYC, an offline in-browser AI job-skill matching application.",
      "Implemented in-browser semantic skill-matching with Transformers.js and client-side cosine similarity.",
      "Added an AI career coach using the Gemini API to generate personalized learning roadmaps.",
    ],
    accent: "#3b82f6",
  },
];

export const certifications = [
  { title: "OCI 2025 Certified Generative AI Professional", org: "Oracle", id: "ID: 329728285OCI25GAIOCP", url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=7B2126EC6B5F86CE8B7B468F5845A682E7195E9FDEC54299A5C8D6F553258C29" },
  { title: "Deloitte Technology Job Simulation", org: "Forage", id: "ID: uoD2eFweqoHbeQne8", url: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_6a3f35a39bd7724d459ee4d6_1782549561128_completion_certificate.pdf" },
  { title: "Software Test Engineer Certificate", org: "MSDE Skill India & NASSCOM", id: "Issued: Jul 2026", url: "https://skill-india-dev.s3.ap-south-1.amazonaws.com/certificate_generic/uploaded_elements/2026071403084459/certificate_5c5ad779-6513-4b77-aee9-18e061cd3be2.pdf?response-content-disposition=inline&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260915T151533Z&X-Amz-SignedHeaders=host&X-Amz-Expires=2000&X-Amz-Credential=AKIA3OJCFBJTPLAN4OGU%2F20260915%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=a904cdbe9728d0109cfaf92e524160fe888d29d21dfcce602e8d23d7ee2f2520" },
  { title: "INNOHACK 2.0 Certificate of Participation", org: "Institution's Innovation Council, VIT Vellore", id: "ID: INOHAC260004441", url: "https://innovation-vit-innohack-participants.web.app/verify/INOHAC260004441.4bdb2a7e923ed9b7" },
];
