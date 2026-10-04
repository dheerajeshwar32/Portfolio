export const NAV_TABS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const projects = [
  {
    headline: "PerfectByte — Local-First File Compression",
    excerpt: "Privacy-first toolkit that compresses images and PDFs to an exact target byte size, entirely on-device.",
    fullDescription: "A privacy-first file utility that compresses images and PDFs down to an exact target byte size using a custom binary-search algorithm, with bulk folder compression powered by a Web Worker pool so the UI never blocks.",
    tools: ["React", "WebAssembly", "Tailwind CSS", "Web Workers", "Gemini API"],
    cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    tag: "Web Architecture",
    githubUrl: "https://perfectbyte.vercel.app/"
  },
  {
    headline: "CarbonRoute — Carbon-Aware LLM Router",
    excerpt: "Routes LLM inference requests based on live carbon intensity, latency, and cost SLA weights.",
    fullDescription: "An inference router that decides where to send an LLM request based on live carbon intensity, latency, and cost-priority weights. Targets a sub-200ms latency SLA while balancing cost and carbon-intensity.",
    tools: ["React", "Node.js", "Upstash Redis", "Tailwind CSS"],
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    tag: "Systems / Edge Compute",
    githubUrl: "https://github.com/dheerajeshwar32/CarbonRoute"
  },
  {
    headline: "KYC — In-Browser Job-Skill Matching",
    excerpt: "Privacy-first job-skill matching PWA with an AI career coach, built for InnoHack 2.0.",
    fullDescription: "Matches candidates to jobs using Transformers.js for in-browser semantic skill-matching via client-side cosine similarity. Validated at 100% top-match domain accuracy. Ships as an offline-capable PWA.",
    tools: ["Transformers.js", "Gemini API", "Firebase", "React"],
    cover: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800&q=80",
    tag: "AI / Web Development",
    githubUrl: "https://code-perfect-innohack.vercel.app/"
  },
  {
    headline: "healthOS Digital Dashboard",
    excerpt: "Web-based digital healthcare dashboard featuring Web Speech API voice logging and live metrics.",
    fullDescription: "Developed healthOS, a comprehensive web-based digital healthcare dashboard. Integrated Web Speech API for seamless, accessible voice logging and utilized Chart.js for rendering dynamic, real-time data visualizations.",
    tools: ["HTML5", "CSS3", "JavaScript", "Chart.js", "Web Speech API"],
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tag: "Frontend Application",
    githubUrl: "https://dheerajeshwar32.github.io/healthOS/"
  },
  {
    headline: "Smart City Traffic Analytics (MPMC)",
    excerpt: "Arduino-based hardware prototype for multi-lane adaptive signal control.",
    fullDescription: "Engineered the C++ logic for multi-lane timing, handled circuit wiring, and implemented precise microcontroller hardware timer configurations for synchronous signal switching without thread blocking.",
    tools: ["Arduino", "C++", "Microcontrollers", "Hardware Architecture"],
    cover: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80",
    tag: "Hardware / Core Systems",
    githubUrl: "https://github.com/dheerajeshwar32"
  },
  {
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
