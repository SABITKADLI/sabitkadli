export interface BlogSection {
  type: "paragraph" | "h2" | "h3" | "list" | "highlight" | "metric";
  content: string | string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  excerpt: string;
  sections: BlogSection[];
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "api-integration-reduced-call-time",
    title: "How API Integration Cut Our Sales Call Time by 37%",
    date: "2025-03-10",
    readTime: "6 min read",
    category: "API Integration",
    categoryColor: "text-[var(--accent-blue)]",
    excerpt:
      "A real-world walkthrough of integrating Kraken Energy and NBN APIs into a contact centre CRM — and what happened to average handle time.",
    tags: ["API Integration", "CRM", "Telephony", "Kraken API", "Contact Centre", "Sales Efficiency"],
    sections: [
      {
        type: "paragraph",
        content:
          "Sales reps at a broadband comparison platform were spending the first 90 seconds of every call doing one thing: looking up the customer's current energy and internet plan in three separate tabs. By the time they'd found the right package to pitch, the customer had lost interest. The handoff rate was high. The close rate wasn't.",
      },
      {
        type: "h2",
        content: "The Problem With Disconnected Systems",
      },
      {
        type: "paragraph",
        content:
          "The CRM held contact history. The energy portal held Kraken data. The NBN Co lookup tool sat in a third browser tab. None of them talked to each other. According to Salesforce's State of Sales report, sales reps spend nearly 64% of their time on non-selling activities — and disconnected tooling is one of the biggest contributors. In a contact centre selling on inbound volume, every wasted minute is a lost conversion.",
      },
      {
        type: "h2",
        content: "The Integration Architecture",
      },
      {
        type: "paragraph",
        content:
          "The solution was a real-time screen-pop: when a call landed in Genesys Cloud, the system triggered a background API call to Kraken using the customer's phone number as the lookup key, then cross-referenced the NBN Co address API to pre-fetch available plans at their premises. By the time the rep accepted the call, a sidebar panel in the CRM showed: current plan, contract end date, eligible upgrade paths, and the best NBN tier available at the customer's address.",
      },
      {
        type: "list",
        content: [
          "Genesys Cloud EventBridge integration fired on call-accepted webhook",
          "Lambda function orchestrated parallel Kraken API + NBN address API calls",
          "CRM sidebar populated via WebSocket push before rep finished the greeting",
          "Response time: average 340ms end-to-end under normal load",
          "Fallback: graceful degradation to manual lookup if API returned >1s",
        ],
      },
      {
        type: "h2",
        content: "What Changed After Go-Live",
      },
      {
        type: "metric",
        content: "Average handle time dropped from 9.4 minutes to 5.9 minutes — a 37% reduction — in the first 30 days post-deployment.",
      },
      {
        type: "paragraph",
        content:
          "The reps stopped tabbing. Escalations dropped because reps were starting from context instead of asking customers to repeat information they'd already given. The team lead reported that the opening 60 seconds of calls felt 'completely different' — reps were more confident and customers felt recognised.",
      },
      {
        type: "h2",
        content: "Five Lessons From This Integration",
      },
      {
        type: "list",
        content: [
          "Design for the rep's workflow first, not the API's data model. Reps needed one answer, not a JSON blob.",
          "Sub-400ms is the threshold. Slower than that and the data arrives after the greeting — useless.",
          "Build graceful fallbacks before go-live. APIs fail. Reps should never be stuck waiting for a spinner.",
          "Log everything for the first 30 days. Usage patterns revealed three fields nobody looked at — simplified the UI.",
          "Involve the team lead in UAT. They caught three field-labelling issues QA missed because they knew the words reps actually use.",
        ],
      },
      {
        type: "paragraph",
        content:
          "The integration took six weeks from requirements to production, including security review and UAT. The business case paid back within the first billing cycle based on improved conversion alone.",
      },
    ],
  },
  {
    slug: "zero-downtime-crm-migration",
    title: "Zero Downtime: Lessons from Migrating 300+ Users to Cloud CRM",
    date: "2025-02-14",
    readTime: "7 min read",
    category: "Data Migration",
    categoryColor: "text-[var(--accent-green)]",
    excerpt:
      "A behind-the-scenes look at a 300+ user CRM migration that completed without a single minute of lost operational time — and what made that possible.",
    tags: ["Data Migration", "CRM", "Cloud", "Change Management", "Zero Downtime", "Business Analysis"],
    sections: [
      {
        type: "paragraph",
        content:
          "The standard advice for large CRM migrations is to plan for downtime. Take the system offline Friday night, migrate Saturday, test Sunday, go live Monday. That advice exists because most migrations treat 'going live' as the risky moment. Our approach treated every single day of the six-month project as the risky moment — which is why we had zero downtime when it actually mattered.",
      },
      {
        type: "h2",
        content: "Why Most Migrations Fail",
      },
      {
        type: "paragraph",
        content:
          "Gartner data puts the failure rate of large-scale CRM implementations at over 50%. The causes are almost always the same: incomplete data mapping, underestimated user resistance, and a cutover that revealed data quality problems that should have been caught months earlier. We planned for all three from day one.",
      },
      {
        type: "h2",
        content: "The Parallel Running Strategy",
      },
      {
        type: "paragraph",
        content:
          "For eight weeks before cutover, we ran both systems simultaneously. Every transaction entered into the legacy CRM was mirrored into the new cloud platform via a custom sync script. This gave us a live comparison dataset: 300+ users' worth of real operational data, real edge cases, and real reconciliation failures to fix before they became a production incident.",
      },
      {
        type: "list",
        content: [
          "Designed a data mapping matrix covering 47 field types across 12 object categories",
          "Built automated reconciliation reports that ran nightly — flagged mismatches by record type",
          "Set a go/no-go threshold: fewer than 0.5% reconciliation errors for three consecutive days",
          "Ran phased user onboarding: Team A first, monitor for 2 weeks, then Teams B and C",
          "Maintained a live 'migration health' dashboard visible to all project stakeholders",
        ],
      },
      {
        type: "h2",
        content: "Data Quality: The Real Work",
      },
      {
        type: "paragraph",
        content:
          "40% of the project time was spent on data quality — not migration mechanics. The legacy system had 11 years of accumulated records: duplicate contacts, orphaned accounts, inconsistent state fields, and freetext notes that contained structured data no one had ever bothered to formalise. We built validation scripts to surface every anomaly before it was migrated, and worked with team leads to make clean-up decisions on 8,000+ flagged records.",
      },
      {
        type: "metric",
        content: "Final result: 300+ users migrated, zero minutes of operational downtime, 99.98% data integrity validated post-cutover.",
      },
      {
        type: "h2",
        content: "The Human Side",
      },
      {
        type: "paragraph",
        content:
          "Technology was the easy part. The harder work was getting 300 people to trust a new system enough to use it on day one. We ran role-specific training sessions (not generic walkthroughs), created a 'quick reference card' for each team type, and set up a dedicated Slack channel for migration questions — staffed by the project team for the first two weeks. Adoption hit 94% in week one. That number matters more than any technical metric.",
      },
      {
        type: "list",
        content: [
          "Start reconciliation testing the day data mapping is signed off — not after",
          "Treat data quality as a business problem, not a technical one. Business owners need to make the clean-up calls",
          "Parallel running is expensive but it is the only way to eliminate surprise on cutover day",
          "Role-specific training converts faster than generic demos",
          "Define your go/no-go criteria before the project starts, not the week before cutover",
        ],
      },
    ],
  },
  {
    slug: "genesys-cloud-ivr-routing",
    title: "Genesys Cloud IVR Design: Routing Patterns That Actually Reduce Misroutes",
    date: "2025-01-20",
    readTime: "8 min read",
    category: "Telephony",
    categoryColor: "text-[var(--accent-purple)]",
    excerpt:
      "Most IVR misroutes come from the same three design mistakes. Here's how I redesigned a contact centre routing architecture in Genesys Cloud to cut misroutes by over 60%.",
    tags: ["Genesys Cloud", "IVR", "Contact Centre", "Call Routing", "Telephony", "CX Design"],
    sections: [
      {
        type: "paragraph",
        content:
          "A misrouted call costs a contact centre twice: once in the average 4-6 minutes of dead handle time while the customer is transferred, and again in customer trust. NICE CXone data shows that 50% of customers who experience a misroute hang up before reaching the right department. That's not a technology problem — it's a design problem.",
      },
      {
        type: "h2",
        content: "The Three Design Mistakes That Cause Misroutes",
      },
      {
        type: "list",
        content: [
          "Department-first menus: 'Press 1 for Sales, 2 for Support' assumes customers know your org chart. They don't. They know their problem.",
          "Too many layers: every additional menu layer adds a 12-15% abandonment risk. Three layers is the maximum; two is better.",
          "No intent capture: routing callers by DTMF selection without any intent classification means every miskey becomes a misroute.",
        ],
      },
      {
        type: "h2",
        content: "Redesigning for Intent, Not Department",
      },
      {
        type: "paragraph",
        content:
          "The redesign we implemented in Genesys Cloud replaced the department-first tree with an intent-first architecture. Instead of 'Press 1 for Sales', callers heard: 'Are you calling about a new service, an existing account, or something else?' — three options that map to intent, not our internal structure.",
      },
      {
        type: "paragraph",
        content:
          "Under the hood, Genesys Cloud's Architect tool let us build conditional routing flows that evaluated three signals before assigning a queue: the DTMF input, the CRM account type lookup (existing customer vs. prospect), and time-of-day rules. The combination meant that a customer pressing '1' for 'new service' who was already in the CRM got routed to retention, not acquisition sales.",
      },
      {
        type: "h2",
        content: "Skill-Based Routing: The Setup That Actually Works",
      },
      {
        type: "list",
        content: [
          "Define skills at the agent level, not the queue level — a queue is a waiting room, not a capability",
          "Use proficiency scores (1-5) honestly: a '5' should mean the agent converts, not just that they know the product",
          "Build overflow routing with a clear priority cascade — preferred agent → preferred queue → any available → voicemail",
          "Set maximum wait thresholds per queue type. Sales calls should never wait more than 90 seconds — offer callback instead",
          "Review misroute reports weekly for the first 60 days — routing needs tuning against real call patterns",
        ],
      },
      {
        type: "h2",
        content: "Results and What to Monitor",
      },
      {
        type: "metric",
        content: "Misroute rate dropped from 18% to under 6% within 45 days of the redesign going live. First-call resolution improved by 22%.",
      },
      {
        type: "paragraph",
        content:
          "The metrics to watch post-implementation are: misroute rate (transfer rate as a proxy), average speed of answer by queue, and abandonment rate at each IVR menu layer. If abandonment spikes at a particular layer, the menu options at that point don't match how customers describe their problem. That's the feedback loop that keeps routing sharp.",
      },
      {
        type: "h2",
        content: "One Counterintuitive Finding",
      },
      {
        type: "paragraph",
        content:
          "Adding a 'speak to a person' option at every menu level — which we expected to tank self-service rates — actually increased overall satisfaction without meaningfully increasing agent volume. Customers who know they can escalate are more willing to navigate IVR options. The safety net changed the psychology of the interaction.",
      },
    ],
  },
  {
    slug: "bridging-business-and-engineering",
    title: "From Requirements to API: How I Bridge Business and Engineering",
    date: "2024-12-05",
    readTime: "6 min read",
    category: "Business Analysis",
    categoryColor: "text-amber-400",
    excerpt:
      "The gap between what a business needs and what an API delivers is usually a communication problem, not a technical one. Here's how I close it.",
    tags: ["Business Analysis", "API Design", "Requirements", "Solution Architecture", "Agile", "Product"],
    sections: [
      {
        type: "paragraph",
        content:
          "The PMI Pulse of the Profession report consistently finds that poor requirements are among the top three causes of project failure. Not bugs. Not infrastructure. Not bad developers. The failure to translate what a business actually needs into something engineers can build without guessing.",
      },
      {
        type: "paragraph",
        content:
          "I've been on both sides of that table — writing requirements as a Business Analyst, and then building the solution as the developer. The view from both sides taught me something that changed how I work: the gap isn't a technology problem. It's a translation problem.",
      },
      {
        type: "h2",
        content: "The Moment Requirements Break Down",
      },
      {
        type: "paragraph",
        content:
          "The breakdown usually happens at the same point: when a business stakeholder says 'the system should integrate with DocuSign' and the developer interprets that as a scope item, not a design decision. Which DocuSign endpoints? Which envelope events need to trigger CRM updates? What happens if DocuSign is unavailable? Those questions aren't answered in the requirement — and that gap becomes a change request three weeks into development.",
      },
      {
        type: "h2",
        content: "The API Contract as the Handshake Document",
      },
      {
        type: "paragraph",
        content:
          "My preferred approach is to produce an API contract — usually an OpenAPI spec or a structured endpoint description — before a single line of implementation code is written. This document isn't for developers. It's for the business stakeholder. When a stakeholder can see that 'when a contract is signed, the CRM opportunity status changes to Closed-Won' mapped to a specific webhook event and a specific field update, they can validate the logic against their business process — not against a finished system that's expensive to change.",
      },
      {
        type: "list",
        content: [
          "Start with the business event, not the endpoint. 'When a customer signs' is a business event. POST /envelope/signed is the implementation of it.",
          "Map error states early. What should the CRM do if DocuSign returns a 503? The business stakeholder needs to make that call, not the developer.",
          "Use sequence diagrams for integrations with multiple systems. A picture of the data flow catches assumptions that text requirements miss.",
          "Define the 'happy path' and two failure paths before writing a ticket. If you can't describe the failures, the requirement isn't finished.",
          "Sign off on the contract document, not just the feature brief. This is the document that protects both sides.",
        ],
      },
      {
        type: "h2",
        content: "How Being Both Changes the Process",
      },
      {
        type: "paragraph",
        content:
          "When I can both write the requirement and build the proof of concept, the feedback loop collapses from weeks to hours. I can validate whether a requirement is technically feasible in the same meeting where it's defined. I can build a throwaway prototype to show a stakeholder what 'the DocuSign integration' actually looks like before committing the architecture to paper.",
      },
      {
        type: "paragraph",
        content:
          "This isn't about replacing the development team — it's about showing up to that conversation with working code instead of a slide deck. Requirements that come with a prototype get implemented faster, get changed less, and ship closer to what the business actually needed.",
      },
      {
        type: "h2",
        content: "Practical Starting Points for BAs Who Want to Understand APIs",
      },
      {
        type: "list",
        content: [
          "Learn to read an OpenAPI/Swagger spec. You don't need to write one — just understand what endpoints, request bodies, and response codes mean.",
          "Use Postman to call APIs directly. Seeing the actual JSON response demystifies what 'the integration' returns.",
          "Ask developers to show you the API docs for any integration in your backlog. Read them before the refinement session.",
          "When writing acceptance criteria for an integration, always include: what triggers it, what data it sends, what response it expects, and what happens on failure.",
        ],
      },
    ],
  },
  {
    slug: "react-three-fiber-production",
    title: "React Three Fiber in Production: Lessons from Building a 3D Shopping Environment",
    date: "2024-11-08",
    readTime: "7 min read",
    category: "Frontend Engineering",
    categoryColor: "text-[var(--accent-purple)]",
    excerpt:
      "Building a 3D virtual shopping mall with React Three Fiber taught me more about WebGL performance than any tutorial. Here's what I'd do differently — and what worked better than expected.",
    tags: ["React Three Fiber", "Three.js", "WebGL", "3D Web", "Performance", "E-commerce", "React"],
    sections: [
      {
        type: "paragraph",
        content:
          "The brief was ambitious: a 3D virtual shopping mall where users could walk between store fronts, click on products, and proceed to checkout without leaving the WebGL canvas. The tech choice was React Three Fiber — R3F — the React renderer for Three.js. I'd used it in smaller experiments. This was the first time I'd taken it to production at scale.",
      },
      {
        type: "h2",
        content: "Why React Three Fiber Over Raw Three.js",
      },
      {
        type: "paragraph",
        content:
          "The honest answer: the component model. When you're building an environment with 40+ interactive store fronts, each with hover states, click handlers, and product data fetched from an API, the imperative Three.js approach becomes unmaintainable quickly. R3F lets you describe a 3D scene the same way you'd describe a React UI — declaratively, with props and state. A store front becomes a component. Its hover state is just a useState hook.",
      },
      {
        type: "list",
        content: [
          "R3F's useFrame hook replaces requestAnimationFrame with a clean, predictable pattern",
          "useGLTF from @react-three/drei makes model loading feel like an import statement",
          "Suspense boundaries work — wrap a model in <Suspense fallback={<LoadingPlaceholder />}> and you get lazy loading for free",
          "The ecosystem (drei, postprocessing, rapier) is mature enough for production in 2024",
          "react-three-fiber npm downloads exceed 1M/week — the community is active and support is fast",
        ],
      },
      {
        type: "h2",
        content: "The Performance Problems I Did Not Anticipate",
      },
      {
        type: "paragraph",
        content:
          "The first demo ran at 12fps on a mid-range laptop. Every store front was a separate GLTF load. Every product had its own draw call. The scene graph had no concept of distance — objects 200 units away were rendered at the same detail as objects right in front of the camera.",
      },
      {
        type: "list",
        content: [
          "Draco compression on all GLTF models — reduced total scene payload from 48MB to 11MB",
          "Instanced meshes for repeated geometry (store frames, floor tiles, light fittings) — 40 draw calls became 4",
          "Level of Detail (LOD) via drei's <Lod> component — distant stores load at 30% polygon count",
          "Texture atlasing — combined 60 small textures into 4 atlases, eliminated hundreds of texture binds per frame",
          "Frustum culling verification — confirmed Three.js was actually culling off-screen objects (it was; the problem was overdraw, not culling)",
        ],
      },
      {
        type: "metric",
        content: "After optimisation: 58fps on the same mid-range laptop that had run at 12fps. Mobile (iPhone 13) achieved a stable 45fps.",
      },
      {
        type: "h2",
        content: "What Worked Better Than Expected",
      },
      {
        type: "paragraph",
        content:
          "The Suspense-based loading model. By wrapping each store section in its own Suspense boundary, users could enter the mall and start exploring while distant sections were still loading. The progressive reveal felt intentional rather than broken — and it meant time-to-first-interaction dropped from 8 seconds to under 2.",
      },
      {
        type: "paragraph",
        content:
          "The other surprise: click-to-product conversion in the 3D environment outperformed the standard 2D product grid in A/B testing by a meaningful margin. Users spent longer in the 3D view and clicked more products. The engagement data was compelling enough that the client expanded the scope to include a second mall environment.",
      },
      {
        type: "h2",
        content: "When Not to Use 3D",
      },
      {
        type: "paragraph",
        content:
          "3D on the web is not universally better — it is contextually better. If your primary audience is on low-end Android devices on mobile data, a WebGL experience is likely to be a worse experience than a well-designed 2D alternative. Test on your actual device distribution before committing to 3D. Battery drain and thermal throttling on mobile are real constraints that performance benchmarks on desktop don't reveal.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
