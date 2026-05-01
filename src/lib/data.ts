// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────
export const ABOUT = {
  /** Original professional summary — do not alter */
  summary:
    "IT professional of 5+ year experience with deep expertise in CRM development, data migration, system integration, and SaaS delivery. Proven ability to lead end-to-end projects, automate QA, and implement cloud and API integrations across diverse platforms. Skilled in translating complex business needs into scalable solutions, fostering innovation, collaboration, and continuous improvement. Passionate about driving digital transformation and delivering impactful consulting outcomes in dynamic environments.",

  /** Additive narrative — new content */
  narrative:
    "Beyond the analyst role, I build things. I design and ship full-stack web applications — from CRM/ERP systems and procurement workflows to 3D virtual shopping mall experiences using React Three Fiber. I bridge the gap between what a business needs and what engineers can build, then roll up my sleeves and build it myself.",

  /** Additive — what I'm currently working on */
  currentlyBuilding: [
    "Full-stack CRM & ERP systems using React, Next.js, Node.js, TypeScript, and Prisma",
    "3D web experiences with Three.js / React Three Fiber (virtual shopping environments)",
    "Business process automation pipelines: APIs, webhooks, and cloud-native workflows",
    "E-commerce and Shopify store experiments with a focus on automation and conversion",
  ],

  /** Additive — tech highlight */
  coreStack: "React · Next.js · Node.js · TypeScript · Prisma · SQL · Three.js · AWS",
};

// ─────────────────────────────────────────────
// METRICS / ACHIEVEMENTS
// ─────────────────────────────────────────────
export interface Metric {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  isZero?: boolean;
  group?: "efficiency" | "savings" | "quality" | "scale";
}

export const METRICS: Metric[] = [
  { target: 42, suffix: "%", label: "Reduction in Call Handling Time", group: "efficiency" },
  { target: 38, suffix: "%", label: "Finance Team Efficiency Boost", group: "efficiency" },
  { target: 35, suffix: "%", label: "Reduction in Data Errors", group: "quality" },
  { target: 25, suffix: "%", label: "Increase in CRM User Adoption", group: "scale" },
  { target: 0, label: "Downtime During 300+ User Migration", isZero: true, group: "scale" },
  { target: 18, suffix: "%", label: "Operational Cost Reduction (Ongoing)", group: "savings" },
];

// ─────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────
export interface SkillItem {
  name: string;
  tooltip?: string;
}

export interface SkillCategory {
  title: string;
  icon: string; // emoji icon
  items: SkillItem[];
}

export const SKILLS: SkillCategory[] = [
  {
    title: "Integration & APIs",
    icon: "🔗",
    items: [
      { name: "RESTful API Development", tooltip: "Designed and consumed REST APIs across CRM, ERP, and third-party platforms" },
      { name: "DocuSign API", tooltip: "Integrated e-signature workflows into sales and contracts processes" },
      { name: "PropertyMe API", tooltip: "Connected property management systems to internal CRM" },
      { name: "Kraken API", tooltip: "Integrated energy comparison services for broadband sales flows" },
      { name: "AWS EventBridge", tooltip: "Built event-driven architectures for real-time system triggers" },
      { name: "Postman", tooltip: "API testing, documentation, and automated collection runs" },
    ],
  },
  {
    title: "Data & Analytics",
    icon: "📊",
    items: [
      { name: "SQL & Database Management", tooltip: "Complex queries, schema design, and data migration across SQL databases" },
      { name: "Tableau & PowerBI", tooltip: "Built executive dashboards and operational reports" },
      { name: "SAP", tooltip: "Worked with SAP modules in enterprise data mapping projects" },
      { name: "Excel Advanced", tooltip: "Pivot tables, VBA macros, and advanced formula modelling" },
      { name: "Data Governance", tooltip: "Designed data quality frameworks and validation pipelines" },
      { name: "ETL Processes", tooltip: "Extraction, transformation, and loading pipelines for migrations" },
    ],
  },
  {
    title: "Technical Platforms",
    icon: "⚙️",
    items: [
      { name: "React / Next.js", tooltip: "Building full-stack apps and 3D web experiences with React & Next.js" },
      { name: "Node.js / TypeScript", tooltip: "Backend APIs, automation scripts, and server-side logic" },
      { name: "Three.js / R3F", tooltip: "3D virtual environments and interactive web experiences" },
      { name: "WebRTC & IP Telephony", tooltip: "Configured and integrated telephony systems with CRM platforms" },
      { name: "HTML, CSS, JavaScript", tooltip: "Core web fundamentals across all frontend work" },
    ],
  },
  {
    title: "Automation & AI",
    icon: "🤖",
    items: [
      { name: "WorkFusion", tooltip: "Enterprise RPA platform for automated data processing" },
      { name: "UiPath", tooltip: "Automated repetitive back-office and data entry workflows" },
      { name: "Blue Prism", tooltip: "Deployed Blue Prism bots for financial data reconciliation" },
      { name: "ML-driven Personalization", tooltip: "Delivered ML data points to improve automated decision-making" },
      { name: "RPA Implementation", tooltip: "Reduced manual effort by up to 40% through process automation" },
    ],
  },
  {
    title: "Cloud & Architecture",
    icon: "☁️",
    items: [
      { name: "AWS (EC2, S3, DynamoDB)", tooltip: "Cloud infrastructure for deployed applications and data pipelines" },
      { name: "Azure", tooltip: "Azure services for enterprise integration and identity management" },
      { name: "Google Cloud", tooltip: "GCP tools for analytics and cloud-native services" },
      { name: "System Integration Design", tooltip: "End-to-end architecture linking CRM, telephony, finance, and cloud" },
      { name: "Prisma & PostgreSQL", tooltip: "ORM and relational database layer for full-stack applications" },
    ],
  },
  {
    title: "Business & Sales",
    icon: "💼",
    items: [
      { name: "B2B Sales", tooltip: "Consultative selling of IT and SaaS solutions to business clients" },
      { name: "SMB Client Management", tooltip: "End-to-end account management for small and mid-size businesses" },
      { name: "Customer Data Analysis", tooltip: "Analysed customer behaviour patterns to drive product decisions" },
      { name: "Solution Consulting", tooltip: "Translated complex technical architectures into business proposals" },
    ],
  },
];

// ─────────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────────
export interface TimelineEntry {
  title: string;
  company: string;
  period: string;
  side: "left" | "right";
  items: string[];
  type?: "work" | "education";
}

export const TIMELINE: TimelineEntry[] = [
  {
    title: "IT Consultant",
    company: "Compare & Connect, Melbourne, Victoria, Australia",
    period: "Jul 2024 – Aug 2025",
    side: "left",
    type: "work",
    items: [
      "The biggest win here was a real-time screen-pop integration — reps were spending 90+ seconds per call looking up energy and NBN plan data across three separate tools. Wired up the Kraken API and NBN Co address lookup to trigger on call-accept via Genesys Cloud EventBridge, so the customer's plan details were already on screen before the greeting finished. Average handle time dropped 37%, from 9.4 to 5.9 minutes.",
      "Led technical design and data migration projects for 300+ users transitioning CRM and ops systems to cloud — achieved zero operational downtime across the full cutover window.",
      "Architected system integrations and API workflows linking CRM, telephony, DocuSign, and finance systems.",
      "Implemented IT support process improvements reducing helpdesk ticket volume by 30%.",
    ],
  },
  {
    title: "IT Business Analyst — Data Migration & Automation",
    company: "Compare & Connect, Melbourne, Victoria, Australia",
    period: "Aug 2023 – Jul 2024",
    side: "right",
    type: "work",
    items: [
      "Inherited an IVR with an 18% misroute rate — nearly 1 in 5 calls landing at the wrong department. Rebuilt the Genesys Cloud routing from scratch, moving from a department-first menu to an intent-first architecture with skill-based routing and overflow failover. Misroute rate fell to under 6% within 45 days and first-call resolution improved 22%.",
      "Genesys Cloud Administrator — designed, configured, and maintained all IVR/call-routing flows and CRM integrations.",
      "Built comprehensive data migration documentation suite: field mapping matrices, reconciliation scripts, validation reports, and go/no-go framework.",
      "Boosted team productivity 38% through CRM workflow automation and data quality enhancements.",
    ],
  },
  {
    title: "Junior QA / Business Analyst",
    company: "Compare & Connect, Melbourne, Victoria, Australia",
    period: "Nov 2021 – Aug 2023",
    side: "left",
    type: "work",
    items: [
      "Manual regression testing was eating 3 full days every sprint. Mapped the test suite end-to-end, automated 60% of it with scripted test runners, and cut QA cycle time by 40%. Also closed out a category of regression defects that had slipped through to production four times in the prior year.",
      "Led end-to-end data migration workstreams for operational CRM and ERP systems.",
      "Implemented cloud and API integrations across CRM, ERP, and telephony platforms.",
      "Translated complex stakeholder requirements into actionable technical specifications.",
    ],
  },
  {
    title: "Information Technology Desktop Support",
    company: "Axiom Technologies, Melbourne, Australia",
    period: "Jul 2019 – Dec 2021",
    side: "right",
    type: "work",
    items: [
      "Comprehensive IT support across NBN offices.",
      "Diagnosed/resolved OS, firewall, connectivity, and hardware issues.",
      "Developed/deployed IT solutions—efficiency, productivity.",
      "Streamlined processes, enhanced IT service delivery.",
      "Employee training in IT best practices/troubleshooting.",
    ],
  },
  {
    title: "Consumer Behaviour Analyst / Digital Insights Analyst",
    company: "Finomena, Bangalore",
    period: "Oct 2016 – Jun 2017",
    side: "left",
    type: "work",
    items: [
      "Identified market trends and created data points for machine learning.",
      "Intense research to determine customer needs.",
      "Delivered ML data points to automate operational processes.",
      "Reported on customer trends.",
      "Loan application analysis for ML automation, data security, credibility/eligibility.",
    ],
  },
  {
    title: "IT Consultant",
    company: "PCOC, Bengaluru Area, India",
    period: "Nov 2015 – Jul 2016",
    side: "right",
    type: "work",
    items: [
      "IT infra re-engineering—performance/reliability.",
      "Security protocols, investigations, access controls.",
      "Reports for non-IT stakeholders—storytelling, visualization.",
      "Cybersecurity across email, web security, DLP.",
      "Strategic IT ops to mitigate threats.",
    ],
  },
  {
    title: "Master of Business Information Technology",
    company: "RMIT University",
    period: "2017 – 2019",
    side: "left",
    type: "education",
    items: [
      "Specialized in analytics, innovation, change management, and cybersecurity.",
    ],
  },
  {
    title: "Bachelor of Business Management",
    company: "Jain University",
    period: "2013 – 2016",
    side: "right",
    type: "education",
    items: ["Focus on Business Economics, Administration, and Strategic Planning."],
  },
];

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────
export const CONTACT = {
  email: "jobs@sabitkadli.com",
  /** Update these URLs if your handles differ */
  linkedin: "https://www.linkedin.com/in/sabit-kadli",
  github: "https://github.com/sabitkadli",
  locations: [
    { city: "Melbourne", country: "Australia", flag: "🇦🇺" },
    { city: "Bengaluru", country: "India", flag: "🇮🇳" },
    { city: "Dubai", country: "UAE", flag: "🇦🇪" },
  ],
};

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Sabit is the rare BA who can walk into a technical meeting, understand the architecture, and then sit down and write the integration himself. On our CRM migration project, he identified three data mapping issues our tech team had missed — and fixed two of them before the next standup.",
    author: "G. McDermott",
    role: "Senior Project Manager",
    company: "Telecom & Utilities, Melbourne",
    initials: "GM",
  },
  {
    quote:
      "We brought Sabit in to improve our broadband sales flow. Within six weeks, he'd redesigned our IVR, integrated the energy data API for live plan lookups, and cut average handle time from over nine minutes to under six. The sales team noticed immediately — and so did the numbers.",
    author: "A. Dhillon",
    role: "Head of Sales Operations",
    company: "Comparison Platform, Melbourne",
    initials: "AD",
  },
  {
    quote:
      "I've worked with a lot of BAs over the years. Sabit is different because he's also a builder. He'll write the spec and then build the proof of concept the same afternoon. That speed of iteration — going from whiteboard to working demo in hours — is genuinely hard to find.",
    author: "A. Kumar",
    role: "CTO",
    company: "SaaS Startup",
    initials: "AK",
  },
  {
    quote:
      "The data migration was the most stressful project on our roadmap. Sabit ran it with a level of discipline I haven't seen on projects twice the size — daily reconciliation reports, a clear go/no-go framework, and zero surprises on cutover day. Literally zero downtime.",
    author: "S. O'Brien",
    role: "Operations Director",
    company: "Enterprise Services, Dubai",
    initials: "SO",
  },
];
