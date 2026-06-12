const state = {
  eventType: "hackathon",
  goal: "product",
  filter: "all",
  package: "lead",
  refreshPage: 0,
  detailTab: "snapshot",
  selectedSponsorId: "lovable",
  lumaLearning: true,
  lumaSynced: false,
  modalOpen: false
};

const PAGE_SIZE = 9;

const eventProfiles = {
  hackathon: {
    label: "AI hackathon",
    defaultName: "Women Build AI Hackathon",
    defaultAudience: "women founders, AI builders, and engineers",
    defaultDescription: "A hands-on build day for women founders and technical builders shipping AI prototypes, meeting mentors, and demoing finished projects.",
    firstAsk: 18000,
    angle: "Builder adoption",
    line: "Sell a branded build track with shipped projects and qualified follow-up.",
    lanes: ["AI devtools", "app infrastructure", "workflow automation"],
    offer: "Lead build partner",
    proof: "Projects shipped, demos completed, opt-in founder interest.",
    proofPack: ["Project count and public demo links", "Tool usage by team", "Challenge track participation"],
    sponsorIds: [
      "lovable", "vercel", "n8n", "cursor", "replit", "modal", "openai", "figma", "supabase",
      "gamma", "granola", "pinecone", "langchain", "clerk", "posthog", "sentry", "elevenlabs", "runway", "microsoft"
    ]
  },
  dinner: {
    label: "founder dinner",
    defaultName: "Women in AI Founder Dinner",
    defaultAudience: "women AI founders, operators, investors, and ecosystem leaders",
    defaultDescription: "An intimate founder dinner for women building AI companies, with curated peer introductions, investor conversations, and operating-stack discussion.",
    firstAsk: 12000,
    angle: "Founder access",
    line: "Sell a curated room of high-quality founders instead of raw attendee volume.",
    lanes: ["startup finance", "founder tools", "investor networks"],
    offer: "Hosted founder table",
    proof: "Founder stage, company count, warm intro requests, post-dinner opt-ins.",
    proofPack: ["Founder stage and company count", "Curated intro map", "Opt-in follow-up list"],
    sponsorIds: [
      "mercury", "ramp", "brex", "carta", "cooley", "granola", "luma", "notion", "gamma",
      "openai", "lovable", "anthropic", "vercel", "n8n", "cursor", "microsoft"
    ]
  },
  workshop: {
    label: "AI workshop",
    defaultName: "Women Operators AI Workshop",
    defaultAudience: "women founders, operators, marketers, and technical team leads",
    defaultDescription: "A practical AI workshop where women founders and operators learn hands-on workflows, leave with templates, and apply tools to real business problems.",
    firstAsk: 10000,
    angle: "Product education",
    line: "Sell applied learning, templates, and activated teams who keep using the sponsor's tool.",
    lanes: ["workflow tools", "collaboration", "no-code systems"],
    offer: "Hands-on enablement partner",
    proof: "Templates created, workflows launched, attendees activated, training content reused.",
    proofPack: ["Workshop completions", "Templates or workflows created", "Activated accounts or trial interest"],
    sponsorIds: [
      "n8n", "miro", "airtable", "notion", "clay", "gamma", "vercel", "cursor", "figma",
      "replit", "supabase", "langchain", "pinecone", "modal", "lovable", "openai", "anthropic", "microsoft"
    ]
  },
  demo: {
    label: "AI demo night",
    defaultName: "Women Build AI Demo Night",
    defaultAudience: "women founders, product builders, operators, investors, and early customers",
    defaultDescription: "A demo night where women founders launch AI products, pitch to a curated room, and turn prototypes into public momentum.",
    firstAsk: 15000,
    angle: "Launch signal",
    line: "Sell the sponsor a visible launch moment with founder stories, content, and qualified follow-up.",
    lanes: ["demo storytelling", "audience growth", "creative AI"],
    offer: "Demo and launch partner",
    proof: "Launch assets, founder stories, product demos, audience signups, sponsor mentions.",
    proofPack: ["Demo videos and launch assets", "Founder story content", "Audience opt-ins and follow-up meetings"],
    sponsorIds: [
      "gamma", "figma", "beehiiv", "luma", "lovable", "runway", "elevenlabs", "granola", "vercel",
      "cursor", "replit", "openai", "anthropic", "supabase", "n8n", "mercury", "microsoft"
    ]
  }
};

const goalProfiles = {
  product: {
    label: "Ship product",
    angle: "Tool adoption",
    offer: "builder challenge",
    askMultiplier: 1,
    tags: ["builder", "ai"],
    lanes: ["AI builders", "devtools", "infrastructure"],
    proof: "teams using the product in public, repos shipped, and demos completed",
    proofPack: ["Sponsor tool usage by team", "Finished projects or public demos", "Builder opt-ins for follow-up"],
    boosts: {
      lovable: 10,
      vercel: 9,
      cursor: 8,
      replit: 8,
      n8n: 7,
      modal: 7,
      supabase: 7,
      figma: 5
    }
  },
  capital: {
    label: "Meet investors",
    angle: "Founder quality",
    offer: "founder access package",
    askMultiplier: 0.92,
    tags: ["capital", "ops"],
    lanes: ["startup finance", "legal", "investor network"],
    proof: "company stage, founder count, warm intros, and qualified post-event meetings",
    proofPack: ["Founder stage and funding status", "Company count and roles", "Warm intro or opt-in list"],
    boosts: {
      mercury: 16,
      ramp: 15,
      brex: 14,
      carta: 14,
      cooley: 13,
      granola: 3,
      luma: 5,
      notion: 4
    }
  },
  growth: {
    label: "Launch audience",
    angle: "Audience growth",
    offer: "launch content package",
    askMultiplier: 1.05,
    tags: ["creative", "ops", "ai"],
    lanes: ["content", "community", "creative AI"],
    proof: "launch assets, recap content, attendee signups, and creator distribution",
    proofPack: ["Launch assets and recap clips", "Audience growth or attendee opt-ins", "Founder stories featuring sponsor usage"],
    boosts: {
      gamma: 11,
      beehiiv: 10,
      runway: 9,
      elevenlabs: 8,
      figma: 8,
      luma: 7,
      granola: 6,
      clay: 5
    }
  },
  hiring: {
    label: "Hire builders",
    angle: "Talent pipeline",
    offer: "mentor and hiring package",
    askMultiplier: 0.95,
    tags: ["builder", "ops"],
    lanes: ["technical talent", "developer community", "team workflows"],
    proof: "builder roles, project quality, mentor conversations, and opt-in hiring signals",
    proofPack: ["Attendee roles and seniority", "Project quality and skills demonstrated", "Opt-in talent or mentor follow-up"],
    boosts: {
      cursor: 10,
      replit: 9,
      vercel: 8,
      figma: 8,
      n8n: 6,
      supabase: 6,
      sentry: 5,
      posthog: 5
    }
  }
};

const lumaSignals = [
  {
    title: "AI agent build nights",
    type: "hackathon",
    goals: ["product", "hiring"],
    city: "San Francisco",
    sponsors: ["vercel", "cursor", "modal", "supabase"],
    note: "Comparable Luma calendars show devtool sponsors clustering around hands-on AI build events.",
    strength: 8
  },
  {
    title: "Founder operating dinners",
    type: "dinner",
    goals: ["capital"],
    city: "San Francisco",
    sponsors: ["mercury", "ramp", "brex", "carta", "cooley"],
    note: "Founder dinners tend to attract finance, legal, and startup infrastructure sponsors.",
    strength: 9
  },
  {
    title: "AI operator workshops",
    type: "workshop",
    goals: ["product", "growth"],
    city: "New York",
    sponsors: ["n8n", "notion", "airtable", "clay", "miro"],
    note: "Workshop-style events create reusable templates and workflow adoption proof.",
    strength: 8
  },
  {
    title: "Demo and launch nights",
    type: "demo",
    goals: ["growth"],
    city: "San Francisco",
    sponsors: ["gamma", "figma", "beehiiv", "runway", "luma"],
    note: "Launch events give creative and audience-growth tools visible founder stories.",
    strength: 9
  },
  {
    title: "Women in AI community series",
    type: "all",
    goals: ["product", "capital", "growth", "hiring"],
    city: "Remote",
    sponsors: ["openai", "anthropic", "microsoft", "granola", "luma"],
    note: "Recurring women-in-AI programs support longer-term partner asks, not just one-off sponsorship.",
    strength: 7
  }
];

const sponsors = {
  lovable: {
    name: "Lovable",
    category: "AI app builder",
    score: 97,
    ask: "$12k-$20k",
    tags: ["builder", "ai"],
    reach: "Community Partnerships, Founder Community, Growth, or the team running Lovable community events.",
    fit: "They are already organizing builder meetups, workshops, hackathons, and community-led events. A women-led AI hackathon gives them real product usage and creator stories.",
    signals: [
      "Lovable's community page points to 160k+ builders and explicitly invites community leaders to host events like hackathons, workshops, and build nights.",
      "Their community-leader path includes events and hackathons, so sponsorship can be framed as a growth channel instead of a generic brand spend."
    ],
    officialTitle: "Community and partner path",
    officialNote: "Use the community route, then ask for the person who owns founder events, hackathons, or community-led growth.",
    link: "https://lovable.dev/community"
  },
  vercel: {
    name: "Vercel",
    category: "AI app deployment",
    score: 94,
    ask: "$12k-$20k",
    tags: ["builder", "ai"],
    reach: "Developer Relations, Startup Partnerships, AI SDK or v0 Product Marketing, or regional startup/community field marketing.",
    fit: "The event will create deployable AI apps. Vercel can win the first deploy, then keep those teams on its startup and AI developer stack.",
    signals: [
      "Vercel has a startup program and clear developer surfaces around Vercel AI SDK, v0, templates, and deployment.",
      "A hackathon produces measurable outcomes Vercel can report: deployed projects, new teams, template usage, and public demos."
    ],
    officialTitle: "Startup path",
    officialNote: "Use the startup page as the entry point, then route the sponsorship ask to DevRel, AI SDK, v0, or startup partnerships.",
    link: "https://vercel.com/startups"
  },
  n8n: {
    name: "n8n",
    category: "AI workflow automation",
    score: 91,
    ask: "$8k-$15k",
    tags: ["builder", "ops", "ai"],
    reach: "Community, Developer Relations, Creator Partnerships, Events, or Growth Marketing.",
    fit: "A hackathon can showcase AI agents and workflow automation in public, with teams building real automations during the event.",
    signals: [
      "n8n reports 500+ integrations, 200k+ community members, and 192k GitHub stars on its site, which makes developer activation measurable.",
      "The event can create workflow templates, demo videos, and community examples that n8n can reuse after the event."
    ],
    officialTitle: "Community and events path",
    officialNote: "Pitch a sponsored automation challenge with workflow templates, demo videos, and post-event reuse.",
    link: "https://n8n.io/events/"
  },
  openai: {
    name: "OpenAI",
    category: "AI platform",
    score: 89,
    ask: "$15k-$25k",
    tags: ["ai", "builder"],
    reach: "Startups team, Developer Relations, community/events, or a VC partner connected to the OpenAI startup network.",
    fit: "The event creates new OpenAI API builders, startup demos, and stories from women founders using AI to ship products.",
    signals: [
      "OpenAI has an official startups route, so the ask can be tied to founder adoption and portfolio/community activation.",
      "The recap can include number of teams using OpenAI, demos built, API credit interest, and follow-on founder meetings."
    ],
    officialTitle: "Startup path",
    officialNote: "Use the startup program route, then ask for the DevRel or startup community owner for builder events.",
    link: "https://openai.com/startups/"
  },
  gamma: {
    name: "Gamma",
    category: "AI presentations and websites",
    score: 87,
    ask: "$8k-$14k",
    tags: ["ai", "ops"],
    reach: "Growth, Creator Partnerships, Community, Product Marketing, or startup/education partnerships.",
    fit: "Every hackathon team needs a pitch, demo story, and shareable project page. Gamma can own the demo narrative layer.",
    signals: [
      "Gamma's site positions the product for presentations, websites, social content, and API workflows, which maps directly to demo-day needs.",
      "A women-founder event gives Gamma reusable examples: before/after pitch decks, project pages, and winner stories."
    ],
    officialTitle: "Product and contact path",
    officialNote: "Frame the ask around demo-day storytelling, founder decks, and shareable project pages.",
    link: "https://gamma.app/"
  },
  granola: {
    name: "Granola",
    category: "AI meeting notes",
    score: 84,
    ask: "$6k-$12k",
    tags: ["ops", "ai"],
    reach: "Startup Program, Student Program, Events, Partnerships, or Growth.",
    fit: "Women founders and operators spend the event meeting mentors, users, investors, and teammates. Granola can own the follow-up memory layer.",
    signals: [
      "Granola has official startup, student, and events routes, which makes a founder/community event a natural channel.",
      "The measurable sponsor report can include activated teams, founder meeting recaps, and post-event follow-up workflows."
    ],
    officialTitle: "Startup or events path",
    officialNote: "Pitch the event as founder workflow adoption: mentor notes, investor conversations, and cleaner follow-up.",
    link: "https://www.granola.ai/"
  },
  microsoft: {
    name: "Microsoft",
    category: "Azure, GitHub, Copilot",
    score: 82,
    ask: "$18k-$25k",
    tags: ["builder", "ai"],
    reach: "Azure AI Developer Relations, Microsoft for Startups, Reactor community lead, or startup field marketing.",
    fit: "Microsoft can connect Azure, GitHub Copilot, and startup programs to a room of AI builders shipping prototypes.",
    signals: [
      "Microsoft has formal startup and developer community routes, so there is budget logic beyond a one-off event.",
      "Sponsor proof can include Azure/GitHub usage, project count, founder stage, and opt-in follow-up interest."
    ],
    officialTitle: "Developer community path",
    officialNote: "Use Reactor or startup channels first, then route to the local or startup field marketing owner.",
    link: "https://reactor.microsoft.com/"
  },
  anthropic: {
    name: "Anthropic",
    category: "Claude and AI safety",
    score: 80,
    ask: "$10k-$18k",
    tags: ["ai", "builder"],
    reach: "Claude Startups, Developer Relations, Partnerships, or startup community lead.",
    fit: "A responsible AI build track gives Anthropic a useful way to help technical founders build safer AI products.",
    signals: [
      "Claude has a startup program, which lets the sponsor ask connect to founder adoption and credits.",
      "A judging rubric around useful, safe AI gives Anthropic a differentiated role at the event."
    ],
    officialTitle: "Startup path",
    officialNote: "Position the event as a Claude builder track with a practical responsible AI rubric.",
    link: "https://claude.com/programs/startups"
  },
  supabase: {
    name: "Supabase",
    category: "Open source backend",
    score: 78,
    ask: "$8k-$15k",
    tags: ["builder"],
    reach: "Developer Relations, Community, Launch Week, Startup Partnerships, or Growth.",
    fit: "AI hackathon teams need auth, database, realtime, and storage fast. Supabase can own the backend track.",
    signals: [
      "The event can produce public starter repos and shipped apps, which are useful developer proof points.",
      "Supabase has a strong developer community and open source story, making the sponsorship credible for builders."
    ],
    officialTitle: "Community path",
    officialNote: "Ask for a backend challenge, starter kit, or post-event project gallery sponsor.",
    link: "https://supabase.com/community"
  },
  cursor: {
    name: "Cursor",
    category: "AI coding assistant",
    score: 92,
    ask: "$10k-$18k",
    tags: ["builder", "ai"],
    reach: "Developer Relations, Community, Growth, or AI product marketing.",
    fit: "Hackathons are a natural proof moment for AI coding tools: teams can build faster, compare workflows, and show finished repos.",
    signals: [
      "The event can report number of teams using Cursor, repos created, build velocity, and demo completion rate.",
      "A sponsored AI coding track gives Cursor concrete founder and developer stories instead of broad awareness."
    ],
    officialTitle: "Developer path",
    officialNote: "Route the ask through community, DevRel, or growth. Pitch a coding sprint or fastest-shipped-prototype award.",
    link: "https://cursor.com/"
  },
  replit: {
    name: "Replit",
    category: "Browser-based app builder",
    score: 90,
    ask: "$8k-$16k",
    tags: ["builder", "ai"],
    reach: "Community, Developer Relations, Education, Startups, or Growth.",
    fit: "A builder event can turn ideas into runnable apps in one day, which gives Replit visible product adoption and project artifacts.",
    signals: [
      "The sponsor report can include apps created, deployed demos, team count, and templates reused after the event.",
      "Replit can own the beginner-friendly build path for founders who want to ship without local setup friction."
    ],
    officialTitle: "Community path",
    officialNote: "Pitch a build-in-browser challenge, beginner founder track, or demo gallery sponsor.",
    link: "https://replit.com/"
  },
  modal: {
    name: "Modal",
    category: "AI compute infrastructure",
    score: 88,
    ask: "$8k-$15k",
    tags: ["builder", "ai"],
    reach: "Developer Relations, AI Infrastructure Partnerships, Community, or Growth.",
    fit: "Teams building AI prototypes often need hosted compute, batch jobs, model endpoints, or lightweight infrastructure quickly.",
    signals: [
      "A hackathon can create clear infrastructure proof: model demos, workloads run, and teams needing deployment support.",
      "Modal can sponsor a best deployed AI backend or fastest production-ready prototype track."
    ],
    officialTitle: "Developer path",
    officialNote: "Route through DevRel or infrastructure partnerships and frame it as applied AI compute adoption.",
    link: "https://modal.com/"
  },
  pinecone: {
    name: "Pinecone",
    category: "Vector database",
    score: 86,
    ask: "$8k-$15k",
    tags: ["builder", "ai"],
    reach: "Developer Advocacy, AI Partnerships, Community, or Product Marketing.",
    fit: "AI hackathon teams often build search, memory, RAG, and knowledge-base products that need vector infrastructure.",
    signals: [
      "The event can report RAG projects, datasets indexed, templates used, and finalist demos using retrieval.",
      "Pinecone can own a best AI search, memory, or knowledge assistant track."
    ],
    officialTitle: "Developer path",
    officialNote: "Pitch a RAG challenge track with starter templates and a post-event project gallery.",
    link: "https://www.pinecone.io/"
  },
  langchain: {
    name: "LangChain",
    category: "AI app framework",
    score: 85,
    ask: "$8k-$15k",
    tags: ["builder", "ai"],
    reach: "Developer Relations, Community, Partnerships, or Product Marketing.",
    fit: "A hackathon can create agent, RAG, evaluation, and orchestration examples that fit LangChain's builder audience.",
    signals: [
      "The event can produce reusable agent patterns, public repos, and demo writeups for applied AI teams.",
      "LangChain can sponsor a best agent workflow or best evaluated AI app track."
    ],
    officialTitle: "Developer path",
    officialNote: "Route to DevRel or community and frame the event around public AI app examples.",
    link: "https://www.langchain.com/"
  },
  clerk: {
    name: "Clerk",
    category: "Authentication for apps",
    score: 81,
    ask: "$6k-$12k",
    tags: ["builder"],
    reach: "Developer Relations, Community, Startup Partnerships, or Growth.",
    fit: "Hackathon teams need user auth fast if they want demos to look like real products rather than prototypes.",
    signals: [
      "The event can report apps with login flows, starter kits used, and teams that continue after the demo.",
      "Clerk can own a production-ready app track for teams moving from prototype to real users."
    ],
    officialTitle: "Developer path",
    officialNote: "Pitch a best production-ready app award or starter-kit sponsor.",
    link: "https://clerk.com/"
  },
  posthog: {
    name: "PostHog",
    category: "Product analytics",
    score: 80,
    ask: "$6k-$12k",
    tags: ["builder", "ops"],
    reach: "Developer Relations, Community, Startup Program, or Growth.",
    fit: "Teams need product analytics after launch, and a demo night can teach builders to measure usage from day one.",
    signals: [
      "The sponsor report can include teams instrumenting events, launch metrics, and post-event activation.",
      "PostHog can sponsor a best product insights or launch-ready metrics track."
    ],
    officialTitle: "Startup or developer path",
    officialNote: "Frame the event around shipping and measuring products, not just building prototypes.",
    link: "https://posthog.com/"
  },
  sentry: {
    name: "Sentry",
    category: "Developer observability",
    score: 79,
    ask: "$6k-$12k",
    tags: ["builder", "ops"],
    reach: "Developer Relations, Community, Startup Partnerships, or Product Marketing.",
    fit: "Hackathon teams can learn to ship more reliable demos and catch errors before judging or launch.",
    signals: [
      "The event can report projects instrumented, bugs caught, and teams that kept monitoring after the event.",
      "Sentry can sponsor a best production-quality demo or reliability track."
    ],
    officialTitle: "Developer path",
    officialNote: "Pitch reliability as the differentiator between a cute demo and a real product.",
    link: "https://sentry.io/"
  },
  elevenlabs: {
    name: "ElevenLabs",
    category: "AI voice",
    score: 78,
    ask: "$8k-$15k",
    tags: ["ai"],
    reach: "Developer Relations, Creator Partnerships, Community, or Product Marketing.",
    fit: "Voice AI can give hackathon teams a distinctive demo category across education, accessibility, games, media, and agents.",
    signals: [
      "The event can create voice-enabled projects, demo clips, creator stories, and public examples.",
      "ElevenLabs can sponsor a best voice interface or accessibility track."
    ],
    officialTitle: "Developer or creator path",
    officialNote: "Route through developer or creator partnerships and pitch a voice demo track.",
    link: "https://elevenlabs.io/"
  },
  runway: {
    name: "Runway",
    category: "AI video creation",
    score: 76,
    ask: "$8k-$15k",
    tags: ["ai"],
    reach: "Creator Partnerships, Community, Education, Events, or Product Marketing.",
    fit: "Demo nights need strong storytelling. Runway can help teams turn AI products into launch videos and social assets.",
    signals: [
      "The event can produce launch videos, demo reels, and public recap assets featuring sponsor usage.",
      "Runway can sponsor a best product story or AI video pitch track."
    ],
    officialTitle: "Creator path",
    officialNote: "Frame the sponsor moment around demo storytelling and social distribution.",
    link: "https://runwayml.com/"
  },
  notion: {
    name: "Notion",
    category: "Founder workspace",
    score: 78,
    ask: "$8k-$15k",
    tags: ["ops"],
    reach: "Startup Partnerships, Community, Product Marketing, Creator Partnerships, or Events.",
    fit: "Founder events create operating rituals: docs, databases, launch plans, investor notes, and team knowledge that can live in one workspace.",
    signals: [
      "The event can turn sponsor value into templates founders actually keep using after the room clears.",
      "Notion can own an operating system moment: founder CRM, demo-day planning, hiring tracker, or post-event resource hub."
    ],
    officialTitle: "Startup and community path",
    officialNote: "Pitch reusable founder templates and a post-event workspace that keeps the sponsor useful after the event.",
    link: "https://www.notion.com/"
  },
  airtable: {
    name: "Airtable",
    category: "No-code operations",
    score: 77,
    ask: "$8k-$15k",
    tags: ["ops", "builder"],
    reach: "Startup Partnerships, Community, Solutions Marketing, Product Marketing, or Events.",
    fit: "Workshops and operator events need lightweight systems for customer discovery, sponsor tracking, hiring, and launch planning.",
    signals: [
      "A workshop can produce usable bases, templates, and workflow examples that show practical product adoption.",
      "Airtable can sponsor a founder operations lab where attendees leave with systems rather than notes."
    ],
    officialTitle: "Startup or community path",
    officialNote: "Pitch a hands-on operating systems session with templates and post-event reuse.",
    link: "https://www.airtable.com/"
  },
  figma: {
    name: "Figma",
    category: "Product design",
    score: 83,
    ask: "$10k-$18k",
    tags: ["builder", "creative"],
    reach: "Community, Developer Relations, Startup Partnerships, Education, or Product Marketing.",
    fit: "Product events need fast prototyping, demos, pitch visuals, and collaborative product thinking.",
    signals: [
      "Figma can own the design-to-demo layer for founders turning early ideas into clear product stories.",
      "The sponsor report can include prototypes created, teams using templates, design critiques, and demo assets."
    ],
    officialTitle: "Community path",
    officialNote: "Pitch a product design sprint, demo critique, or prototype-to-launch track.",
    link: "https://www.figma.com/community"
  },
  miro: {
    name: "Miro",
    category: "Collaboration workspace",
    score: 76,
    ask: "$8k-$14k",
    tags: ["ops", "creative"],
    reach: "Community, Partnerships, Product Marketing, Education, or Events.",
    fit: "Workshops need a shared working surface for mapping ideas, user journeys, workflows, and team decisions.",
    signals: [
      "A hands-on workshop can create reusable boards and facilitation templates the sponsor can point to afterward.",
      "Miro can own the collaborative planning layer for teams before they move into implementation."
    ],
    officialTitle: "Community or education path",
    officialNote: "Pitch a facilitated founder workshop with reusable boards and templates.",
    link: "https://miro.com/"
  },
  luma: {
    name: "Luma",
    category: "Community events",
    score: 79,
    ask: "$6k-$12k",
    tags: ["ops", "creative"],
    reach: "Community, Partnerships, Growth, Events, or Founder Community.",
    fit: "Event-led communities need registration, invite flow, reminders, and a visible public calendar.",
    signals: [
      "A sponsor package can include event page placement, attendee conversion, repeat-event data, and community follow-up.",
      "Luma can sponsor the community growth layer across the full event series instead of a single night."
    ],
    officialTitle: "Community path",
    officialNote: "Pitch the series infrastructure: registration, calendar growth, recurring events, and attendee follow-up.",
    link: "https://lu.ma/"
  },
  beehiiv: {
    name: "beehiiv",
    category: "Audience growth",
    score: 75,
    ask: "$6k-$12k",
    tags: ["ops", "creative"],
    reach: "Creator Partnerships, Growth, Community, Partnerships, or Product Marketing.",
    fit: "Community builders and founders need a way to turn IRL momentum into a newsletter, waitlist, and repeat audience.",
    signals: [
      "A demo night or founder community can report subscriber growth, content performance, and post-event audience conversion.",
      "beehiiv can own the audience-building layer for founders who want community to become a business asset."
    ],
    officialTitle: "Creator or growth path",
    officialNote: "Pitch newsletter growth, founder story distribution, and post-event audience conversion.",
    link: "https://www.beehiiv.com/"
  },
  clay: {
    name: "Clay",
    category: "AI GTM workflows",
    score: 78,
    ask: "$8k-$15k",
    tags: ["ops", "ai"],
    reach: "Growth, Community, Partnerships, Product Marketing, or GTM teams.",
    fit: "Founder and operator workshops can teach teams how to turn community signals into smarter customer, partner, and investor outreach.",
    signals: [
      "A workshop can produce practical GTM workflows, enrichment templates, and outreach examples.",
      "Clay can sponsor a founder pipeline lab where attendees build real lists and follow-up systems."
    ],
    officialTitle: "Growth path",
    officialNote: "Pitch a practical GTM workflow session tied to founder outreach, sponsor follow-up, or customer discovery.",
    link: "https://www.clay.com/"
  },
  carta: {
    name: "Carta",
    category: "Equity and cap table",
    score: 74,
    ask: "$8k-$15k",
    tags: ["capital", "ops"],
    reach: "Startup Partnerships, Founder Programs, Community, Events, or Growth.",
    fit: "Founder dinners and investor-facing events gather companies thinking about equity, fundraising, hiring, and governance.",
    signals: [
      "The sponsor value is strongest when the event can report founder stage, hiring plans, funding plans, and cap-table questions.",
      "Carta can own a founder equity clinic or investor-readiness moment."
    ],
    officialTitle: "Startup path",
    officialNote: "Pitch founder quality, funding stage, and an equity-readiness session rather than general awareness.",
    link: "https://carta.com/"
  },
  cooley: {
    name: "Cooley",
    category: "Startup legal",
    score: 72,
    ask: "$8k-$15k",
    tags: ["capital", "ops"],
    reach: "Emerging Companies, Startup Programs, Events, Business Development, or Partner Marketing.",
    fit: "Founder-heavy events create demand for formation, financing, IP, hiring, and investor-readiness guidance.",
    signals: [
      "A curated dinner or workshop can create qualified founder conversations around legal questions that matter early.",
      "Cooley can sponsor a founder legal clinic or investor-readiness session with real follow-up value."
    ],
    officialTitle: "Emerging companies path",
    officialNote: "Pitch a founder legal clinic, not a logo placement. Lead with stage, company count, and follow-up quality.",
    link: "https://www.cooley.com/"
  },
  mercury: {
    name: "Mercury",
    category: "Startup banking",
    score: 77,
    ask: "$8k-$15k",
    tags: ["ops"],
    reach: "Startup Partnerships, Community, Events, Founder Programs, or Growth.",
    fit: "Founder dinners and demo nights gather exactly the early-stage operators who need startup finance infrastructure.",
    signals: [
      "The event can report founder stage, company formation intent, and opt-in interest for finance tools.",
      "Mercury can sponsor a founder operating stack or post-demo company-building session."
    ],
    officialTitle: "Startup path",
    officialNote: "Pitch founder quality, not attendee volume: stage, company formation, and finance needs.",
    link: "https://mercury.com/"
  },
  ramp: {
    name: "Ramp",
    category: "Finance operations",
    score: 75,
    ask: "$8k-$15k",
    tags: ["ops"],
    reach: "Startup Partnerships, Community, Events, Growth, or Partner Marketing.",
    fit: "Founder audiences are a natural fit for finance operations, spend controls, and startup operating education.",
    signals: [
      "The event can report founder roles, company stage, and teams interested in finance operations support.",
      "Ramp can sponsor a founder finance clinic or operating-stack dinner."
    ],
    officialTitle: "Startup path",
    officialNote: "Pitch this for founder dinners, operator events, or demo nights with active startups.",
    link: "https://ramp.com/"
  },
  brex: {
    name: "Brex",
    category: "Startup finance",
    score: 74,
    ask: "$8k-$15k",
    tags: ["ops"],
    reach: "Startup Partnerships, Community, Events, Founder Programs, or Growth.",
    fit: "A founder-heavy event can surface companies choosing banking, card, and spend tools early.",
    signals: [
      "The sponsor report can include founder stage, funding status, and finance-stack interest.",
      "Brex can sponsor a founder resources moment or startup operating playbook."
    ],
    officialTitle: "Startup path",
    officialNote: "Pitch a high-quality founder audience and post-event opt-in follow-up.",
    link: "https://www.brex.com/"
  }
};

const packageData = {
  builder: { name: "Builder Track", amount: "$10k", phrase: "$10k builder-track sponsorship" },
  lead: { name: "Lead Sponsor", amount: "$18k", phrase: "$18k lead sponsorship" },
  annual: { name: "Annual Partner", amount: "$60k", phrase: "$60k annual community partnership" }
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const elements = {
  sponsorBoard: document.querySelector("#sponsorBoard"),
  eventName: document.querySelector("#eventName"),
  cityName: document.querySelector("#cityName"),
  attendees: document.querySelector("#attendees"),
  audience: document.querySelector("#audience"),
  eventDescription: document.querySelector("#eventDescription"),
  targetAsk: document.querySelector("#targetAsk"),
  matchCount: document.querySelector("#matchCount"),
  refreshSponsorsBtn: document.querySelector("#refreshSponsorsBtn"),
  strategyAngle: document.querySelector("#strategyAngle"),
  strategyLine: document.querySelector("#strategyLine"),
  strategyLanes: document.querySelector("#strategyLanes"),
  strategyOffer: document.querySelector("#strategyOffer"),
  strategyProof: document.querySelector("#strategyProof"),
  lumaStatus: document.querySelector("#lumaStatus"),
  lumaEventCount: document.querySelector("#lumaEventCount"),
  lumaSponsorCount: document.querySelector("#lumaSponsorCount"),
  lumaUpdated: document.querySelector("#lumaUpdated"),
  lumaSignalList: document.querySelector("#lumaSignalList"),
  syncLumaBtn: document.querySelector("#syncLumaBtn"),
  toggleLumaLearningBtn: document.querySelector("#toggleLumaLearningBtn"),
  detailName: document.querySelector("#detailName"),
  detailCategory: document.querySelector("#detailCategory"),
  detailScore: document.querySelector("#detailScore"),
  detailAsk: document.querySelector("#detailAsk"),
  detailReach: document.querySelector("#detailReach"),
  detailFit: document.querySelector("#detailFit"),
  detailSignals: document.querySelector("#detailSignals"),
  detailProofPack: document.querySelector("#detailProofPack"),
  detailContext: document.querySelector("#detailContext"),
  detailPathNote: document.querySelector("#detailPathNote"),
  officialLink: document.querySelector("#officialLink"),
  detailTabs: document.querySelectorAll("[data-detail-tab]"),
  detailPanels: document.querySelectorAll("[data-detail-panel]"),
  modal: document.querySelector("#emailModal"),
  modalTitle: document.querySelector("#modalTitle"),
  modalSubtitle: document.querySelector("#modalSubtitle"),
  emailSubject: document.querySelector("#emailSubject"),
  emailBody: document.querySelector("#emailBody"),
  toast: document.querySelector("#toast")
};

function profile() {
  return eventProfiles[state.eventType];
}

function goal() {
  return goalProfiles[state.goal];
}

function selectedSponsor() {
  const list = scoredSponsors();
  return list.find((sponsor) => sponsor.id === state.selectedSponsorId) || list[0];
}

function filteredSponsors() {
  const list = scoredSponsors();
  if (state.filter === "all") return list;
  return list.filter((sponsor) => sponsor.tags.includes(state.filter));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function roundAsk(value) {
  return Math.max(3000, Math.round(value / 1000) * 1000);
}

function shortMoney(value) {
  return `$${Math.round(value / 1000)}k`;
}

function attendeeMultiplier() {
  const attendeeCount = Number(elements.attendees.value || 0);
  if (attendeeCount >= 300) return 1.25;
  if (attendeeCount >= 200) return 1.1;
  if (attendeeCount < 80) return 0.72;
  return 1;
}

function recommendedFirstAsk() {
  return roundAsk(profile().firstAsk * attendeeMultiplier() * goal().askMultiplier);
}

function sponsorAskFactor(sponsor) {
  if (sponsor.tags.includes("capital")) return 0.92;
  if (sponsor.tags.includes("creative")) return 0.88;
  if (sponsor.tags.includes("builder") && sponsor.tags.includes("ai")) return 1.08;
  return 1;
}

function askRangeFor(sponsor, score) {
  const base = recommendedFirstAsk() * sponsorAskFactor(sponsor) * clamp(score / 90, 0.7, 1.18);
  const low = roundAsk(base * 0.62);
  const high = Math.max(low + 3000, roundAsk(base * 1.08));
  return `${shortMoney(low)}-${shortMoney(high)}`;
}

function contextBoostFor(id, sponsor) {
  const event = eventInfo();
  const text = `${event.name} ${event.audience} ${event.description}`.toLowerCase();
  const rules = [
    { terms: ["investor", "fundraising", "fundraise", "capital", "vc"], ids: ["mercury", "ramp", "brex", "carta", "cooley", "granola"], points: 8 },
    { terms: ["hire", "hiring", "talent", "engineer", "technical"], ids: ["cursor", "replit", "vercel", "figma", "supabase", "sentry"], points: 7 },
    { terms: ["newsletter", "audience", "content", "creator", "community"], ids: ["beehiiv", "luma", "gamma", "runway", "notion"], points: 7 },
    { terms: ["workflow", "ops", "operator", "automation"], ids: ["n8n", "airtable", "notion", "miro", "clay", "granola"], points: 7 },
    { terms: ["design", "prototype", "product"], ids: ["figma", "lovable", "gamma", "vercel", "replit"], points: 6 },
    { terms: ["voice", "video", "story", "demo"], ids: ["elevenlabs", "runway", "gamma", "figma", "beehiiv"], points: 6 }
  ];

  return rules.reduce((total, rule) => {
    const hasTerm = rule.terms.some((term) => text.includes(term));
    return hasTerm && rule.ids.includes(id) ? total + rule.points : total;
  }, 0);
}

function relevantLumaSignals() {
  return lumaSignals
    .filter((signal) => signal.type === "all" || signal.type === state.eventType || signal.goals.includes(state.goal))
    .sort((a, b) => {
      const aExact = a.type === state.eventType ? 1 : 0;
      const bExact = b.type === state.eventType ? 1 : 0;
      return bExact - aExact || b.strength - a.strength;
    })
    .slice(0, 4);
}

function lumaBoostFor(id) {
  if (!state.lumaLearning) return 0;

  return relevantLumaSignals().reduce((total, signal) => {
    if (!signal.sponsors.includes(id)) return total;
    const exactType = signal.type === state.eventType ? 2 : 0;
    const goalMatch = signal.goals.includes(state.goal) ? 2 : 0;
    return total + Math.round(signal.strength / 3) + exactType + goalMatch;
  }, 0);
}

function lumaSignalFor(id) {
  return relevantLumaSignals().find((signal) => signal.sponsors.includes(id));
}

function scoredSponsors() {
  const eventOrder = new Map(profile().sponsorIds.map((id, index) => [id, index]));

  return Object.entries(sponsors)
    .map(([id, sponsor]) => {
      const eventIndex = eventOrder.has(id) ? eventOrder.get(id) : 99;
      const eventBoost = eventOrder.has(id) ? Math.max(2, 16 - eventIndex) : -8;
      const tagBoost = sponsor.tags.some((tag) => goal().tags.includes(tag)) ? 4 : 0;
      const goalBoost = goal().boosts[id] || 0;
      const contextBoost = contextBoostFor(id, sponsor);
      const marketBoost = lumaBoostFor(id);
      const score = clamp(Math.round(sponsor.score * 0.65 + eventBoost + tagBoost + goalBoost + contextBoost + marketBoost), 58, 97);

      return {
        ...sponsor,
        id,
        score,
        ask: askRangeFor(sponsor, score),
        matchLabel: matchLabelFor(sponsor, eventIndex, goalBoost, contextBoost, marketBoost),
        fit: fitFor(sponsor),
        signals: signalsFor(id, sponsor, score)
      };
    })
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

function matchLabelFor(sponsor, eventIndex, goalBoost, contextBoost, marketBoost) {
  if (marketBoost >= 6) return "Luma signal";
  if (contextBoost >= 7) return "Context match";
  if (goalBoost >= 8) return "Goal match";
  if (eventIndex < 5) return "Event match";
  if (sponsor.tags.some((tag) => goal().tags.includes(tag))) return "Lane match";
  return "Relevant";
}

function fitFor(sponsor) {
  return `${sponsor.fit} For this ${profile().label}, Marigold would package the ask around ${profile().offer.toLowerCase()} and ${goal().offer}.`;
}

function signalsFor(id, sponsor, score) {
  const marketSignal = lumaSignalFor(id);
  const signals = [
    `Ranked ${score}% because this sponsor fits ${profile().label} plus the goal to ${goal().label.toLowerCase()}.`,
    ...sponsor.signals
  ];

  if (marketSignal && state.lumaLearning) {
    signals.splice(1, 0, `Luma signal: ${marketSignal.title} suggests ${sponsor.name} is already adjacent to comparable ${profile().label} sponsorship patterns.`);
  }

  return signals;
}

function proofPack() {
  const sponsor = selectedSponsor();
  const marketSignal = sponsor ? lumaSignalFor(sponsor.id) : null;
  const marketProof = marketSignal && state.lumaLearning ? [`Comparable Luma signal: ${marketSignal.title}`] : [];

  return [
    ...profile().proofPack,
    ...goal().proofPack,
    ...marketProof
  ].filter((item, index, list) => list.indexOf(item) === index).slice(0, 5);
}

function pageCountFor(list) {
  return Math.max(1, Math.ceil(list.length / PAGE_SIZE));
}

function activePageStart(list = filteredSponsors()) {
  const page = state.refreshPage % pageCountFor(list);
  return page * PAGE_SIZE;
}

function activeSponsors() {
  const list = filteredSponsors();
  const start = activePageStart(list);
  return list.slice(start, start + PAGE_SIZE);
}

function eventInfo() {
  return {
    name: elements.eventName.value || "your event",
    city: elements.cityName.value || "your city",
    attendees: elements.attendees.value || "150",
    audience: elements.audience.value || "AI builders",
    description: elements.eventDescription.value.trim()
  };
}

function idForSponsor(target) {
  if (target.id) return target.id;
  return Object.keys(sponsors).find((id) => sponsors[id] === target);
}

function updateSummary() {
  elements.targetAsk.textContent = `${money.format(recommendedFirstAsk())} first ask`;
  updateMatchCount();
}

function updateMatchCount() {
  const filtered = filteredSponsors();
  const visible = activeSponsors();
  if (!filtered.length) {
    elements.matchCount.textContent = "0 fits";
    return;
  }

  const start = activePageStart(filtered) + 1;
  const end = start + visible.length - 1;
  elements.matchCount.textContent = filtered.length > PAGE_SIZE ? `${start}-${end} of ${filtered.length}` : `${filtered.length} fits`;
}

function sponsorRow(sponsor, index) {
  const sponsorId = idForSponsor(sponsor);
  const isSelected = sponsorId === state.selectedSponsorId;

  return `
    <article class="sponsor-row ${isSelected ? "active" : ""}" data-sponsor="${sponsorId}">
      <button class="row-select" type="button" data-select="${sponsorId}" aria-label="Select ${sponsor.name}">
        <span class="sponsor-left">
          <span class="rank">${index + 1}</span>
          <span class="sponsor-title">
            <strong>${sponsor.name}</strong>
            <span>${sponsor.category}</span>
          </span>
        </span>
        <span class="sponsor-meta">
          <span><strong>${sponsor.ask}</strong> Ask</span>
          <span><strong>${sponsor.score}%</strong> Fit</span>
          <span><strong>${sponsor.matchLabel}</strong>${profile().label}</span>
        </span>
      </button>
      <button class="primary-button" type="button" data-draft="${sponsorId}">Draft</button>
    </article>
  `;
}

function renderSponsors() {
  const list = activeSponsors();
  const start = activePageStart(filteredSponsors());
  elements.sponsorBoard.innerHTML = list.map((sponsor, index) => sponsorRow(sponsor, start + index)).join("");
  updateMatchCount();
}

function renderDetail() {
  const sponsor = selectedSponsor();

  elements.detailName.textContent = sponsor.name;
  elements.detailCategory.textContent = sponsor.category;
  elements.detailScore.textContent = `${sponsor.score}% fit`;
  elements.detailAsk.textContent = sponsor.ask;
  elements.detailReach.textContent = sponsor.reach;
  elements.detailFit.textContent = sponsor.fit;
  elements.detailContext.textContent = eventInfo().description || "No extra event context added yet.";
  elements.detailPathNote.textContent = sponsor.officialNote;
  elements.officialLink.href = sponsor.link;
  elements.officialLink.textContent = "Official path";
  elements.detailSignals.replaceChildren(
    ...sponsor.signals.map((signal) => {
      const li = document.createElement("li");
      li.textContent = signal;
      return li;
    })
  );
  elements.detailProofPack.replaceChildren(
    ...proofPack().map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    })
  );
}

function renderStrategy() {
  const lanes = [...profile().lanes, ...goal().lanes]
    .filter((lane, index, list) => list.indexOf(lane) === index)
    .slice(0, 5);

  elements.strategyAngle.textContent = `${profile().angle} + ${goal().angle}`;
  elements.strategyLine.textContent = profile().line;
  elements.strategyOffer.textContent = profile().offer;
  elements.strategyProof.textContent = `${profile().proof} Goal proof: ${goal().proof}.`;
  elements.strategyLanes.replaceChildren(
    ...lanes.map((lane) => {
      const chip = document.createElement("span");
      chip.textContent = lane;
      return chip;
    })
  );
}

function renderLumaSignals() {
  const signals = relevantLumaSignals();
  const sponsorIds = [...new Set(signals.flatMap((signal) => signal.sponsors))];

  elements.lumaStatus.textContent = state.lumaLearning ? "Learning on" : "Learning paused";
  elements.toggleLumaLearningBtn.textContent = state.lumaLearning ? "Learning on" : "Learning off";
  elements.toggleLumaLearningBtn.setAttribute("aria-pressed", String(state.lumaLearning));
  elements.lumaEventCount.textContent = String(signals.length);
  elements.lumaSponsorCount.textContent = String(sponsorIds.length);
  elements.lumaUpdated.textContent = state.lumaSynced ? "Public snapshot synced just now" : "Public snapshot ready";

  elements.lumaSignalList.replaceChildren(
    ...signals.slice(0, 3).map((signal) => {
      const card = document.createElement("article");
      card.className = "luma-signal";

      const body = document.createElement("div");
      const title = document.createElement("strong");
      const note = document.createElement("p");
      const badge = document.createElement("span");

      title.textContent = signal.title;
      note.textContent = signal.note;
      badge.textContent = `+${signal.strength}`;

      body.append(title, note);
      card.append(body, badge);
      return card;
    })
  );
}

function renderDetailTabs() {
  elements.detailTabs.forEach((tab) => {
    const isActive = tab.dataset.detailTab === state.detailTab;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  elements.detailPanels.forEach((panel) => {
    const isActive = panel.dataset.detailPanel === state.detailTab;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
}

function makeEmail() {
  const sponsor = selectedSponsor();
  const event = eventInfo();
  const pkg = packageData[state.package];
  const subject = `${sponsor.name} x ${event.name}: ${pkg.name} in ${event.city}`;
  const topSignal = (sponsor.signals[1] || sponsor.signals[0]).replace(/\.$/, "");
  const secondSignal = (sponsor.signals[2] || sponsor.signals[0]).replace(/\.$/, "");
  const contextLine = event.description ? `\n\nEvent context: ${event.description}` : "";
  const partnershipItems = proofPack()
    .slice(0, 4)
    .map((item) => `- ${item.charAt(0).toLowerCase()}${item.slice(1)}`)
    .join("\n");

  const body = `Hi [Name],

I run ${event.name} in ${event.city}, bringing together ${event.attendees}+ ${event.audience}. The sponsor strategy for this ${profile().label} is ${profile().angle.toLowerCase()} with a focus on ${goal().angle.toLowerCase()}.${contextLine}

I think ${sponsor.name} is a strong fit for this event because ${topSignal.charAt(0).toLowerCase()}${topSignal.slice(1)}. ${secondSignal}

I would like to invite ${sponsor.name} in as our ${pkg.name}. I would open the conversation around ${sponsor.ask} and package it as a ${profile().offer.toLowerCase()}.

The partnership would include:

${partnershipItems}

This is not a logo placement ask. It is a chance to be useful to women founders and technical builders while creating measurable proof: ${goal().proof}.

Would you be open to a 20-minute sponsor fit call next week?

Best,
[Your Name]`;

  return { subject, body };
}

function makeFollowUp() {
  const sponsor = selectedSponsor();
  const event = eventInfo();
  const signal = sponsor.signals[1] || sponsor.signals[0];

  return `Hi [Name],

Quick follow-up on ${sponsor.name} supporting ${event.name}.

The reason I think this is worth a look: ${signal}

I can send over a one-page sponsor brief with audience makeup, package options, and the post-event reporting plan for ${profile().angle.toLowerCase()} and ${goal().angle.toLowerCase()}. Would it be helpful if I sent that across?`;
}

function sponsorBriefText() {
  const sponsor = selectedSponsor();
  const event = eventInfo();

  return `${sponsor.name} sponsor brief

Event: ${event.name}
Location: ${event.city}
Audience: ${event.attendees}+ ${event.audience}
Context: ${event.description || "No extra context added."}
Recommended ask: ${sponsor.ask}
Strategy: ${profile().angle} + ${goal().angle}
Who to contact: ${sponsor.reach}

Why this sponsor fits:
- ${sponsor.signals.join("\n- ")}

Proof pack:
- ${proofPack().join("\n- ")}

Official path: ${sponsor.link}`;
}

function renderModalDraft() {
  const sponsor = selectedSponsor();
  const email = makeEmail();

  elements.modalTitle.textContent = `${sponsor.name} sponsorship ask`;
  elements.modalSubtitle.textContent = `${packageData[state.package].name} draft for ${eventInfo().name}`;
  elements.emailSubject.value = email.subject;
  elements.emailBody.value = email.body;
}

function openEmailModal() {
  state.modalOpen = true;
  renderModalDraft();
  elements.modal.hidden = false;
  document.body.style.overflow = "hidden";
  elements.emailSubject.focus();
}

function closeEmailModal() {
  state.modalOpen = false;
  elements.modal.hidden = true;
  document.body.style.overflow = "";
}

function render() {
  updateSummary();
  renderStrategy();
  renderLumaSignals();
  renderSponsors();
  renderDetail();
  renderDetailTabs();
  if (state.modalOpen) renderModalDraft();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.setTimeout(() => elements.toast.classList.remove("show"), 1800);
}

async function copyText(text, label) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(label);
  } catch {
    showToast("Copy failed");
  }
}

function selectTopSponsorForCurrentView() {
  const visible = activeSponsors();
  if (visible.length) {
    state.selectedSponsorId = visible[0].id;
  }
}

function applyEventTemplate(previousType, nextType) {
  const previous = eventProfiles[previousType];
  const next = eventProfiles[nextType];

  if (!elements.eventName.value.trim() || elements.eventName.value === previous.defaultName) {
    elements.eventName.value = next.defaultName;
  }

  if (!elements.audience.value.trim() || elements.audience.value === previous.defaultAudience) {
    elements.audience.value = next.defaultAudience;
  }

  if (!elements.eventDescription.value.trim() || elements.eventDescription.value.trim() === previous.defaultDescription) {
    elements.eventDescription.value = next.defaultDescription;
  }
}

document.querySelectorAll(".event-type").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".event-type").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    const previousType = state.eventType;
    state.eventType = button.dataset.event;
    state.refreshPage = 0;
    applyEventTemplate(previousType, state.eventType);
    selectTopSponsorForCurrentView();
    render();
    showToast(`${profile().label} strategy loaded`);
  });
});

document.querySelectorAll(".goal-type").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".goal-type").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    state.goal = button.dataset.goal;
    state.refreshPage = 0;
    selectTopSponsorForCurrentView();
    render();
    showToast(`${goal().label} strategy loaded`);
  });
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.filter = button.dataset.filter;
    state.refreshPage = 0;
    const list = activeSponsors();
    if (list.length && !list.some((sponsor) => sponsor.id === state.selectedSponsorId)) {
      state.selectedSponsorId = list[0].id;
    }
    render();
  });
});

document.querySelectorAll(".package").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".package").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.package = button.dataset.package;
    renderModalDraft();
  });
});

elements.detailTabs.forEach((button) => {
  button.addEventListener("click", () => {
    state.detailTab = button.dataset.detailTab;
    renderDetailTabs();
  });
});

["input", "change"].forEach((eventName) => {
  [elements.eventName, elements.cityName, elements.attendees, elements.audience, elements.eventDescription].forEach((input) => {
    input.addEventListener(eventName, render);
  });
});

elements.refreshSponsorsBtn.addEventListener("click", () => {
  const filtered = filteredSponsors();
  state.refreshPage = (state.refreshPage + 1) % pageCountFor(filtered);
  const visible = activeSponsors();
  if (visible.length) {
    state.selectedSponsorId = visible[0].id;
  }
  render();
  showToast("More sponsors found");
});

elements.syncLumaBtn.addEventListener("click", () => {
  state.lumaSynced = true;
  state.refreshPage = 0;
  selectTopSponsorForCurrentView();
  render();
  showToast("Luma signals synced");
});

elements.toggleLumaLearningBtn.addEventListener("click", () => {
  state.lumaLearning = !state.lumaLearning;
  state.refreshPage = 0;
  selectTopSponsorForCurrentView();
  render();
  showToast(state.lumaLearning ? "Learning turned on" : "Learning paused");
});

elements.sponsorBoard.addEventListener("click", (event) => {
  const draftButton = event.target.closest("[data-draft]");
  const selectButton = event.target.closest("[data-select]");

  if (draftButton) {
    state.selectedSponsorId = draftButton.dataset.draft;
    render();
    openEmailModal();
    return;
  }

  if (selectButton) {
    state.selectedSponsorId = selectButton.dataset.select;
    render();
  }
});

document.querySelector("#draftTopBtn").addEventListener("click", openEmailModal);
document.querySelector("#draftDetailBtn").addEventListener("click", openEmailModal);
document.querySelector("#closeModalBtn").addEventListener("click", closeEmailModal);

elements.modal.addEventListener("click", (event) => {
  if (event.target === elements.modal) closeEmailModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.modalOpen) closeEmailModal();
});

document.querySelector("#copyEmailBtn").addEventListener("click", () => {
  copyText(`Subject: ${elements.emailSubject.value}\n\n${elements.emailBody.value}`, "Email copied");
});

document.querySelector("#copyFollowUpBtn").addEventListener("click", () => {
  copyText(makeFollowUp(), "Follow-up copied");
});

document.querySelector("#copyBriefBtn").addEventListener("click", () => {
  copyText(sponsorBriefText(), "Brief copied");
});

document.querySelector("#copyPlanBtn").addEventListener("click", () => {
  const event = eventInfo();
  const lines = activeSponsors()
    .slice(0, 6)
    .map((sponsor, index) => `${index + 1}. ${sponsor.name}: ${sponsor.ask}. Contact: ${sponsor.reach}`);

  copyText(
    `${event.name} sponsor shortlist\n${event.city} | ${event.attendees}+ attendees | ${event.audience}\n\n${lines.join("\n")}`,
    "Shortlist copied"
  );
});

selectTopSponsorForCurrentView();
render();
