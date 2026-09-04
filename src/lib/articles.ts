export type Article = {
  slug: string;
  category: string;
  date: string;
  author: string;
  title: string;
  excerpt: string;
  image: string;
  readTime?: string;
  content: string[]; // paragraphs
  comingSoon?: boolean;
};

export const articles: Article[] = [
  {
    slug: "ldri-to-host-ai4d-hub",
    category: "Innovation Scaling",
    date: "February 27, 2026",
    author: "Leonida Mutuku",
    title: "LDRI to Host the AI4D Research and Innovation for Climate Hub",
    excerpt: "A major milestone in LDRI's journey: hosting the AI4D Climate Hub as a platform to accelerate responsible AI solutions for climate action in Africa.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=85&auto=format&fit=crop",
    readTime: "5 min read",
    content: [
      "The Local Development Research Institute (LDRI) will host the AI4D Research and Innovation for Climate Hub (RICH), a major milestone that positions African research and practice at the centre of climate AI innovation.",
      "RICH will serve as Africa’s central platform for climate AI knowledge, convening researchers, innovators, funders and policymakers. Its mandate is practical: make high-quality, Africa-centred knowledge discoverable and usable, from literature reviews and synthesis papers to lived case studies of innovations that succeeded and those that failed.",
      "For LDRI, hosting RICH builds on a decade of work on data, evidence and local development. The hub’s early focus is the Early Warning Systems (EWS) and LDRI deployment, a lived case that will be documented with unusual honesty, including what broke, what was fixed, and what remains hard.",
      "Phase 1 (Months 1-6) will launch with 20+ curated resources across four collections: Research Outputs, Innovation Case Studies, Ecosystem Insights and Policy Resources. Every resource will carry a standard tag taxonomy (innovation cluster, geography, theme, content type, scaling pathway, audience) so a policymaker, funder or innovator can find answers in under two minutes.",
      "What this means for partners: an open contribution pathway with a 4-week review decision, plain-language summaries for every research output, and policy resources designed for senior officials, not just researchers. If you have a resource that helps African innovators act on climate AI, RICH wants to host it.",
      "Hosting RICH is not an institutional trophy. It is an operational commitment. LDRI will provide the hub’s secretariat, curation and quality assurance, while a distributed editorial network of African researchers reviews submissions against a public rubric, relevance, evidence quality, usability and ethics, before anything is published.",
      "The opportunity is structural. Africa contributes the least to global emissions but faces the sharpest climate shocks, from failed rains in the Horn to floods in the Sahel. AI can expand what is possible, hyperlocal forecasts, crop stress detection from satellite, grid optimisation for mini-grids, but only if knowledge moves faster than pilots. RICH exists to shorten that cycle from years to weeks.",
      "Early work will be grounded in LDRI’s EWS deployment across arid and semi-arid counties. The team will publish the full stack: data pipelines from satellite and ground sensors, model choices and where they underperformed, community feedback loops that changed product decisions, and cost-per-alert at county scale. Failure logs sit alongside success metrics by design.",
      "Governance is deliberately lean. An independent advisory council, researchers, county government officials, innovators and funders, sets the curation priorities, not LDRI alone. All frameworks and templates ship under CC BY 4.0 so governments and startups can adapt them without permission friction.",
      "For researchers, RICH offers a citable, DOI-ready home for synthesis work that often dies in PDFs. For innovators, it offers teardowns you can build from. For policymakers, it offers two-page briefs that survive a cabinet meeting. If you are building climate AI for Africa, there is now a front door, and it is open for contributions.",
    ],
  },
  {
    slug: "collapse-of-koko-networks",
    category: "Failure Analysis",
    date: "February 27, 2026",
    author: "Mark Irura",
    title: "The Collapse of Koko Networks: Lessons for Climate Innovation and Regulatory Reform",
    excerpt: "The closure of Koko Networks marks a significant setback for climate innovation in Africa. What can we learn about regulatory barriers and scaling pathways?",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&q=85&auto=format&fit=crop",
    readTime: "7 min read",
    content: [
      "Koko Networks’ closure is more than a company failure, it is a stress test for Africa’s climate innovation ecosystem. Koko scaled a clean cooking fuel network to hundreds of thousands of households, then ran into the kind of regulatory and market friction that stalls many government-adoption pathways.",
      "Our case analysis identifies three lessons: First, government adoption is not a single sale, it is a sustained policy alignment problem across energy, environment and industrial policy, where standards lag behind innovation. Second, business model assumptions about who pays and who benefits must be re-tested at county and cross-border scale, not just Nairobi. Third, innovators need plain-language regulatory briefs before they need scale capital.",
      "RICH’s Innovation Case Studies collection exists for exactly this kind of learning. Koko is documented using the RICH case template: Context, Innovation cluster, Scaling pathway, Business model, What worked, What did not work, Key lessons, Status and next steps. Claims are evidenced, language is plain, and promotion is removed.",
      "For regulators and funders, the implication is clear: de-risk policy before demanding traction. RICH Policy Resources will carry a regulatory-reform companion brief for this case, mapping Kenya’s clean cooking standards and where an innovator should engage next.",
      "Failure analysis is Phase 1 by design. A repository that only hosts successes teaches nothing about how to scale in African institutional realities.",
      "The timeline matters. Koko built a dense last-mile network for bioethanol in Nairobi, coupling fuel, stove and mobile money into a single consumer promise. Unit economics improved with density, and households shifted off charcoal with measurable health and emission gains. That traction, however, lived inside a regulatory frame written for LPG and kerosene, where ethanol handling, transport and tax treatment were ambiguous across ministries.",
      "When fiscal and standards decisions tipped, excise reclassification, delayed safety standards for ethanol distribution, and county-level enforcement that varied by sub-county, the model that needed predictability faced compounding uncertainty. Capital priced that uncertainty immediately. The lesson is not that regulation killed innovation; it is that innovation outpaced the regulatory stack and no pre-competitive path existed to align it.",
      "At county level the picture sharpens. Adoption is not Nairobi. In secondary cities and border counties, distribution depends on road, market day and cross-border fuel flows that change price weekly. Koko’s playbook assumed urban density as the base case; a county-first stress test would have surfaced the need for a different channel partner model, saccos, agro-dealers, or county energy centres, with margin structures that survive outside a tight urban loop.",
      "For funders, Koko reframes diligence. Ask not only for growth curves but for a one-page regulatory map: which act, which standard, which agency owns the decision, and where the innovator sits in that queue. RICH will publish that map for clean cooking in Kenya, Ethiopia and Rwanda, with contact points, review cycles and what to file first, so founders arrive with a regulator-ready packet rather than a pitch deck.",
      "The case will stay live. RICH will track what happens to the installed base, stoves, canisters, customer credit, and whether the ethanol supply chain retrenches to industrial use or reforms into a safer, standards-led consumer fuel. Failure, documented well, is infrastructure for the next attempt.",
    ],
  },
  {
    slug: "aligning-climate-ai-ndc-commitments",
    category: "Policy and AI",
    date: "February 28, 2026",
    author: "RICH Team",
    title: "Aligning Climate AI Innovations with Africa's NDC Commitments: A Practical Guide",
    excerpt: "How innovators and government staff can use the RICH Policy Resources collection to map their work against national and regional climate frameworks.",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1920&q=85&auto=format&fit=crop",
    readTime: "6 min read",
    content: [
      "Innovators often ask a deceptively simple question: does my work count toward my country’s NDC? The answer matters for funding, for government partnership, and for procurement.",
      "This practical guide, launching in the Policy Resources collection, shows how to map a climate AI innovation against the AU Climate Strategy, the five RECs (EAC, ECOWAS, SADC, IGAD) and your national NDC and NAP. Each summary is plain-language, dated, and licensed for reuse by government staff.",
      "You will learn how to: 1) Find the right framework in two clicks via tags (geography + theme), 2) Use the NDC alignment checklist to write a one-page annex for a proposal, 3) Cite the correct version and owner so a reviewer can verify it in minutes.",
      "The guide ships with a template you can copy, not a 200-page PDF you must mine. This is “practitioner first” by design: a senior official should grasp the key message in two minutes.",
      "Status: In editorial review. Early access via the RICH mailing list. Publication target: March 2026. Want to be a reviewer? Submit via the repository.",
      "Why alignment is hard today: NDCs and NAPs are written for ministries, not product teams. An innovator building a drought early-warning model in Turkana has to infer whether that counts under Kenya’s NDC adaptation priority on climate information services or its disaster risk reduction chapter, and then find the same logic in the EAC Climate Change Policy to make a regional case. Without translation, good work misses procurement windows.",
      "The guide solves this with a three-layer map. Layer 1: AU Agenda 2063 and the African Union Climate Strategy, the continental why. Layer 2: the five REC frameworks with their current implementation plans and focal points. Layer 3: your national NDC, NAP and sector plan with article-level citations. Every layer carries a date, owner and link to the official source so a reviewer can verify in two minutes, not two weeks.",
      "Inside, you get the exact artefacts funders and governments expect: a one-page NDC alignment annex with checkboxes (mitigation vs adaptation, sector, geography, beneficiary), a responsible AI governance checklist aligned to the AU AI Continental Strategy, and a climate finance mapping that shows where your innovation fits in the GCF, Adaptation Fund and bilateral windows without overstating eligibility.",
      "Two worked examples bring it to life. Example A: a satellite-based crop stress alert for smallholders in Senegal maps to Senegal’s NDC on resilient agriculture, ECOWAS’s agricultural resilience programme and the AU’s early warning priority, and becomes a paragraph you can paste into a proposal. Example B: a mini-grid load forecasting tool in Zambia maps to Zambia’s NDC on renewable energy access and SADC’s energy protocol, with a procurement pathway through the rural electrification agency.",
      "All content is dated and versioned. When Kenya updates its NDC in 2025 or IGAD revises its drought resilience strategy, the summary update ships as a diff, not a new PDF. Teams that subscribed to that geography tag get a change log. This is the living part of RICH, policy as an API, not an archive.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find(a => a.slug === slug);
}
