export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#writing" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Mantaka Mahir",
  headline: "AI Systems Expert",
  subheadline:
    "I help businesses design and implement agentic AI systems, automation infrastructure, and production workflows that reduce manual work and create measurable revenue impact.",
  snapshot: [
    { label: "Role", value: "AI Systems Expert" },
    { label: "Location", value: "Dhaka (Remote)" },
    { label: "Work Model", value: "Full-time / Contract" },
    { label: "Core Stack", value: "Python, FastAPI, Next.js, n8n, LangChain" },
  ],
};

export const about = {
  body: "Goal-driven AI Systems Expert building RAG systems, AI agents, and production automation workflows. I focus on shipping measurable systems that reduce manual work, improve decision-making, and turn complex operations into scalable business outcomes.",
};

export const experience = [
  {
    role: "AI Automation Engineer",
    org: "Deep Loom",
    period: "Nov 2025 - Present",
    type: "Contract",
    highlights: [
      "Build agentic workflows and automation systems using FastAPI and GCP",
      "Design document-intelligence workflows processing 1,000+ docs/month",
      "Orchestrate Claude Opus and GPT-Codex workflows (12 min → 3 min runtime)",
    ],
  },
  {
    role: "AI System Developer",
    org: "Momentum AI Consulting",
    period: "Jan 2026 - Present",
    type: "Contract",
    highlights: [
      "Build Next.js interfaces and FastAPI/Django backend systems",
      "Deliver service pipelines, CRM workflows, and reporting systems",
      "Full-stack AI implementation with clean client handoff",
    ],
  },
  {
    role: "AI Automation Developer",
    org: "Upwork — Freelance",
    period: "Feb 2025 - Present",
    type: "Freelance",
    highlights: [
      "Rising Talent, 100% Job Success",
      "Diagnosed 20+ workflow issues: context loss, data-formatting, handoffs",
      "Built automation workflows using n8n, APIs, Python, and LLM tools",
    ],
  },
  {
    role: "Mobile Application Developer",
    org: "Flutter iOS and Android",
    period: "2023 - 2025",
    type: "Cross-platform",
    highlights: [
      "Built cross-platform mobile applications with Flutter",
      "Developed and shipped iOS and Android app experiences",
    ],
  },
];

export const projects = [
  {
    name: "Multi-agent email attachment processing",
    description:
      "Multi-agent pipeline for high-volume attachment processing with structured outputs and error-resistant data handling.",
    techStack: "Python · LangChain · n8n · API design",
    metric: "6-8 min → 8-12 sec · $23k-37k annual saved",
    tags: ["40x ROI", "high-volume processing"],
    demoHref: "https://mantakamahir.github.io/projects",
    githubHref: "#",
  },
  {
    name: "AI avatar video generation",
    description:
      "Automated avatar video production from script to final output. Async polling, multi-API orchestration with HeyGen, Submagic, and OpenAI.",
    techStack: "Next.js · HeyGen · OpenAI · n8n",
    metric: "2-4 hrs → 3-5 min · $31k-34k annual saved",
    tags: ["async polling", "script-to-video"],
    demoHref: "https://mantakamahir.github.io/projects",
    githubHref: "#",
  },
  {
    name: "Content repurposing pipeline",
    description:
      "Turns long-form videos into platform-specific social clips at scale. 100+ videos per month with 22x ROI.",
    techStack: "Python · AI APIs · n8n · Automation",
    metric: "45-90 min → 4-8 min · $29k-32k annual saved",
    tags: ["100+ videos/month", "22x ROI"],
    demoHref: "https://mantakamahir.github.io/projects",
    githubHref: "#",
  },
  {
    name: "Social distribution + lead capture",
    description:
      "Automated scheduling, captions, comments, DMs, and lead capture with 5,000+ automated responses per month.",
    techStack: "n8n · ManyChat · API integrations · Next.js",
    metric: "15-30 min → 2 min/post · $23k-25k annual saved",
    tags: ["5,000+ responses/month", "20x ROI"],
    demoHref: "https://mantakamahir.github.io/projects",
    githubHref: "#",
  },
  {
    name: "Real Estate AI Video Engine",
    description:
      "Converts one source video into eight platform-ready assets in approximately three minutes.",
    techStack: "n8n · AI APIs · Video processing",
    metric: "1 source → 8 platform assets",
    tags: ["3 min runtime", "multi-platform"],
    demoHref: "https://mantakamahir.github.io/projects",
    githubHref: "#",
  },
];

export const technicalProjects = [
  {
    name: "RAG Document Q&A",
    description:
      "PDF Q&A with hybrid retrieval, optional reranking, source-grounded answers. 37/37 backend tests passing, streaming telemetry, structured LLM logs.",
    techStack: "FastAPI · LangChain · ChromaDB · Gemini · Next.js · pytest",
    githubHref: "https://github.com/MantakaMahir",
  },
  {
    name: "AI Job Matcher",
    description:
      "Resume-to-job matching with parsing, skill extraction, semantic scoring, and gap analysis.",
    techStack: "FastAPI · SQLAlchemy · Sentence-Transformers · Next.js",
    githubHref: "https://github.com/MantakaMahir",
  },
  {
    name: "Multimodal Model Comparison Workbench",
    description:
      "Model comparison for OpenAI, Gemini, and Ollama with multimodal inputs, SSE streaming, provider adapters, and BYOK security.",
    techStack: "Next.js · OpenAI · Gemini · Ollama · SSE · BYOK",
    githubHref: "https://github.com/MantakaMahir",
  },
];

export const skills = {
  core: {
    title: "Core",
    items: [
      "Python",
      "C++",
      "Java",
      "JavaScript",
      "TypeScript",
      "FastAPI",
      "Next.js",
      "Django",
      "Node.js",
      "SQL",
      "Docker",
      "GCP",
    ],
  },
  groups: [
    {
      title: "AI / ML",
      items: [
        "LangChain",
        "LangGraph",
        "RAG",
        "Prompt engineering",
        "Embeddings",
        "Sentence-Transformers",
        "Claude",
        "GPT",
        "Gemini",
        "PyTorch",
        "Scikit-learn",
        "Hugging Face",
        "Pandas",
        "NumPy",
      ],
    },
    {
      title: "Automation & Engineering",
      items: [
        "n8n",
        "Make",
        "API design",
        "CI/CD",
        "GitHub",
        "Firebase",
        "Vercel",
        "MLOps",
        "System design",
        "Data structures & algorithms",
      ],
    },
  ],
};

export const writing = [
  {
    title: "n8n Verified Creator",
    detail: "Recognized for practical workflow and automation execution.",
    href: "https://n8n.io/creators/mantakamahir",
  },
  {
    title: "Stanford ML — Supervised Machine Learning",
    detail: "Regression and classification fundamentals.",
    href: "#",
  },
  {
    title: "AI Automation with Claude",
    detail: "Anthropic-certified Claude workflow design and deployment.",
    href: "#",
  },
  {
    title: "Claude Code in Action",
    detail: "Agentic coding with Claude Code for production systems.",
    href: "#",
  },
  {
    title: "MCP Advanced Topics",
    detail: "Model Context Protocol for agentic system design.",
    href: "#",
  },
  {
    title: "Google IT Automation",
    detail: "Python, Git/GitHub, and cloud operations training.",
    href: "#",
  },
  {
    title: "IBM AI Agents",
    detail: "AI agent fundamentals and orchestration.",
    href: "#",
  },
];

export const now = {
  line1: "Making AI systems that should exist but usually get stuck at the prototype stage. Simple is hard, measurable is harder, but both are worth it.",
  line2: "If you're deciding between a single-model workflow and a multi-agent system, that's usually where I do my best work.",
};

export const contact = {
  cta: "Let's connect. I'm open to AI Systems Expert roles, contract work, and collaboration on production AI systems.",
  links: [
    { label: "Email", href: "mailto:mantakamahir@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mantakamahir/" },
    { label: "GitHub", href: "https://github.com/MantakaMahir" },
    { label: "Book a Call", href: "https://calendly.com/mantakamahir-ai-automation/30min" },
  ],
};
