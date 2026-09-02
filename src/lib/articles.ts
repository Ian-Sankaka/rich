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
      "The Local Development Research Institute (LDRI) will host the AI4D Research and Innovation for Climate Hub (RICH) - a major milestone that positions African research and practice at the centre of climate AI innovation.",
      "RICH will serve as Africa’s central platform for climate AI knowledge, convening researchers, innovators, funders and policymakers. Its mandate is practical: make high-quality, Africa-centred knowledge discoverable and usable - from literature reviews and synthesis papers to lived case studies of innovations that succeeded and those that failed.",
      "For LDRI, hosting RICH builds on a decade of work on data, evidence and local development. The hub’s early focus is the Early Warning Systems (EWS) and LDRI deployment - a lived case that will be documented with unusual honesty, including what broke, what was fixed, and what remains hard.",
      "Phase 1 (Months 1–6) will launch with 20+ curated resources across four collections: Research Outputs, Innovation Case Studies, Ecosystem Insights and Policy Resources. Every resource will carry a standard tag taxonomy (innovation cluster, geography, theme, content type, scaling pathway, audience) so a policymaker, funder or innovator can find answers in under two minutes.",
      "What this means for partners: an open contribution pathway with a 4-week review decision, plain-language summaries for every research output, and policy resources designed for senior officials - not just researchers. If you have a resource that helps African innovators act on climate AI, RICH wants to host it.",
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
      "Koko Networks’ closure is more than a company failure - it is a stress test for Africa’s climate innovation ecosystem. Koko scaled a clean cooking fuel network to hundreds of thousands of households, then ran into the kind of regulatory and market friction that stalls many government-adoption pathways.",
      "Our case analysis identifies three lessons: First, government adoption is not a single sale - it is a sustained policy alignment problem across energy, environment and industrial policy, where standards lag behind innovation. Second, business model assumptions about who pays and who benefits must be re-tested at county and cross-border scale, not just Nairobi. Third, innovators need plain-language regulatory briefs before they need scale capital.",
      "RICH’s Innovation Case Studies collection exists for exactly this kind of learning. Koko is documented using the RICH case template: Context, Innovation cluster, Scaling pathway, Business model, What worked, What did not work, Key lessons, Status and next steps. Claims are evidenced, language is plain, and promotion is removed.",
      "For regulators and funders, the implication is clear: de-risk policy before demanding traction. RICH Policy Resources will carry a regulatory-reform companion brief for this case - mapping Kenya’s clean cooking standards and where an innovator should engage next.",
      "Failure analysis is Phase 1 by design. A repository that only hosts successes teaches nothing about how to scale in African institutional realities.",
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
      "This practical guide - launching in the Policy Resources collection - shows how to map a climate AI innovation against the AU Climate Strategy, the five RECs (EAC, ECOWAS, SADC, IGAD) and your national NDC and NAP. Each summary is plain-language, dated, and licensed for reuse by government staff.",
      "You will learn how to: 1) Find the right framework in two clicks via tags (geography + theme), 2) Use the NDC alignment checklist to write a one-page annex for a proposal, 3) Cite the correct version and owner so a reviewer can verify it in minutes.",
      "The guide ships with a template you can copy - not a 200-page PDF you must mine. This is “practitioner first” by design: a senior official should grasp the key message in two minutes.",
      "Status: In editorial review. Early access via the RICH mailing list. Publication target: March 2026. Want to be a reviewer? Submit via the repository.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find(a => a.slug === slug);
}
