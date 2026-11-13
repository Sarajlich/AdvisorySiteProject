import { aiKnowledgeBase } from "@/content/site";

const normalized = (value: string) => value.toLowerCase().trim();

const topicalResponses = [
  {
    terms: ["project management", "what is pm", "project"],
    answer:
      "Project management organizes scope, people, time, cost, risk and decisions so a defined result can be delivered with control. A good project setup clarifies the outcome, owner, constraints, governance rhythm and escalation path."
  },
  {
    terms: ["pmo", "project management office"],
    answer:
      "A PMO helps an organization standardize how projects are selected, governed, reported and improved. Its value comes from better visibility, clearer priorities and stronger delivery discipline."
  },
  {
    terms: ["program management", "portfolio", "prioritize", "prioritization"],
    answer:
      "Program management coordinates related work toward shared outcomes, while portfolio management helps leaders choose and balance investments. Useful prioritization criteria include strategic value, risk, regulatory need, capacity, dependencies, cost and expected benefits."
  },
  {
    terms: ["ai governance", "responsible ai", "govern ai"],
    answer:
      "AI governance defines how an organization approves, monitors and controls AI use. It covers accountability, data, security, risk, human oversight, documentation and review."
  },
  {
    terms: ["dora", "digital operational resilience", "what is dora"],
    answer:
      "DORA readiness starts with clear ICT governance, critical service mapping, incident handling, third-party risk review, resilience testing and evidence. Regulated organizations should validate the details with legal, risk and compliance advisors."
  },
  {
    terms: ["digital transformation", "transformation", "modernize", "introduce ai", "adopt ai", "ai adoption"],
    answer:
      "Start by naming the business problem, choosing a small set of priority use cases, checking data readiness and defining governance. AI adoption works best when leaders connect value, risk, people and controls before tools are selected."
  },
  {
    terms: ["ai ready", "ai-ready", "ai readiness", "assess ai risk", "ai risk"],
    answer:
      "AI readiness requires valuable use cases, accountable owners, reliable data, suitable technology, capable people and proportionate controls. Risk assessment should consider affected people, data, model limitations, security, regulation, third parties and the consequence of error."
  },
  {
    terms: ["it governance", "technology governance", "business goals"],
    answer:
      "IT governance connects technology priorities, investment, risk and performance to organizational goals. It works through clear decision rights, accountable owners, useful measures and an executive cadence for trade-offs."
  },
  {
    terms: ["banking", "financial services", "bank", "regulated environment"],
    answer:
      "For banking and financial services, transformation should connect delivery governance with operational resilience, risk, compliance, audit evidence and accountable AI use. The right starting point depends on the institution's most important service or decision."
  },
  {
    terms: ["government", "public sector", "public service"],
    answer:
      "Public-sector transformation benefits from transparent decisions, continuity across leadership and budget cycles, stakeholder alignment and measures tied to public value and service outcomes."
  },
  {
    terms: ["software", "product team", "engineering team", "technology team"],
    answer:
      "Technology and software teams usually need lightweight governance that clarifies portfolio priorities, product and platform ownership, dependencies and responsible AI adoption without slowing delivery."
  },
  {
    terms: ["infrastructure", "utilities", "utility", "vendor", "supplier"],
    answer:
      "Infrastructure and utilities programs need early visibility of dependencies, vendors, operational constraints and long-cycle risks. Clear ownership and a disciplined decision cadence keep complex delivery moving."
  },
  {
    terms: ["training", "education", "workshop", "recommendation", "learning path"],
    answer:
      "Training works best when it connects concepts to decisions your team makes every week. Useful formats include executive briefings, project governance workshops and practical AI readiness sessions."
  },
  {
    terms: ["consulting", "qualification", "ready for consulting", "consulting support"],
    answer:
      "A useful consulting conversation starts when the organization has a clear challenge, a sponsor, basic context on current constraints and willingness to discuss governance, risk and delivery decisions. If those pieces exist, a focused introductory call can define the right next step."
  }
];

export function getFallbackResponse(input: string) {
  const question = normalized(input);
  const knowledgeMatch = aiKnowledgeBase.find((item) =>
    question.includes(normalized(item.question).replace("?", ""))
  );

  if (knowledgeMatch) {
    return knowledgeMatch.answer;
  }

  const topicalMatch = topicalResponses.find((response) =>
    response.terms.some((term) => question.includes(term))
  );

  if (topicalMatch) {
    return topicalMatch.answer;
  }

  return "I can help with project, program and portfolio management, PMO design, AI readiness and governance, DORA, IT governance, digital transformation, sector challenges, vendor coordination and executive education. Ask about the page you are viewing or choose one of the suggested questions. For organization-specific decisions, book a consultation so the context, risks and stakeholders can be reviewed properly.";
}
