# Advisory Site Project

A polished, full-stack advisory website for an executive consulting brand focused on AI governance, digital transformation, project leadership, IT governance, and professional education.

## Portfolio context

This repository is a privacy-reviewed portfolio snapshot of a collaborative project. I contributed to the original project; its [complete Git history](https://github.com/jasnaking-stack/advisorysite) preserves the full team attribution.

The snapshot uses a fresh, audited history so personal contact details and contributor email addresses from earlier commits are not republished. Public-facing contact, scheduling, and domain values are intentionally non-operational examples.

## Highlights

- Responsive multi-page interface for services, industries, insights, and consultations
- 28 statically generated or server-rendered routes using the Next.js App Router
- AI advisory assistant with a built-in knowledge base and offline fallback responses
- Optional OpenAI Responses API integration through server-side environment variables
- Optional Supabase authentication, user profiles, and booking persistence
- Calendly integration configurable without hard-coded account details
- Reusable content, card, navigation, layout, and animation components
- Schema-based validation with Zod and in-memory API rate limiting
- Security headers for framing, content sniffing, referrers, permissions, and HTTPS
- Demo-safe behavior when Supabase or OpenAI credentials are not configured

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 15, React 19, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS, PostCSS |
| Authentication and data | Supabase SSR and Supabase JS |
| Validation | Zod |
| AI integration | OpenAI Responses API with local fallbacks |
| Deployment | Netlify-ready configuration |

## Application structure

```text
src/
├── app/                  # Pages, dynamic routes, and API handlers
├── cms/sanity/           # CMS-ready schema definitions
├── components/           # UI, layout, cards, sections, auth, and AI chat
├── content/              # Site copy, route data, and AI system prompt
└── lib/                  # CMS, validation, Supabase, AI, and security helpers
```

Site copy and route definitions are centralized in `src/content`, making the presentation layer easier to maintain and ready for a future CMS migration.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
git clone https://github.com/Sarajlich/AdvisorySiteProject.git
cd AdvisorySiteProject
npm install
npm run dev
```

Open `http://localhost:3000`. The public pages and AI fallback experience work without service credentials.

## Optional configuration

Copy `.env.example` to `.env.local`, then add only the services you want to enable:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_CALENDLY_URL=
OPENAI_API_KEY=
OPENAI_MODEL=
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for authentication and data |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public Supabase browser key; never use a service-role key here |
| `NEXT_PUBLIC_CALENDLY_URL` | Scheduling page displayed in the booking experience |
| `OPENAI_API_KEY` | Server-only key for live AI responses |
| `OPENAI_MODEL` | Model used by the AI advisor route |

Do not commit `.env` files, private keys, service-role credentials, or production secrets.

## Available scripts

```bash
npm run dev        # Start the development server
npm run typecheck  # Validate TypeScript
npm run build      # Create a production build
npm run start      # Run the production server
```

## Quality and security

Before publication, this snapshot was checked for committed credentials and personal contact information. It also passes:

```bash
npm audit --omit=dev
npm run typecheck
npm run build
```

The dependency audit reports zero known production vulnerabilities at publication time. Authentication controls and database authorization still depend on correct Supabase configuration and the included RLS policies.

## Demo limitations

- Login and registration display demo mode until Supabase is configured.
- The assistant uses local fallback responses until an OpenAI key and model are supplied.
- Contact, scheduling, and canonical-domain values are placeholders and must be configured before a real deployment.

## Attribution

This portfolio copy is intentionally transparent about its collaborative origin. See [`jasnaking-stack/advisorysite`](https://github.com/jasnaking-stack/advisorysite) for the original repository, contributors, and development history.
