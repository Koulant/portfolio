# Anton Koulikov — Portfolio

Personal portfolio site built with Next.js 16, React 19, and TypeScript. Live at [koulant.com](https://koulant.com).

## Stack

- **Framework** - Next.js 16 (App Router)
- **UI** - shadcn/ui, Tailwind CSS 4
- **Forms** - React Hook Form, Zod
- **Email** - Resend
- **Rate limiting** - Upstash Redis
- **Deployment** - Vercel
- **CI/CD** - GitHub Actions

## Pages

| Route | Description |
|-------|-------------|
| `/` | About, social links, tech stack |
| `/career` | Work history and experience timeline |
| `/projects` | Project showcase with carousel |
| `/contact` | Contact form with email delivery |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint and auto-fix |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run typecheck` | TypeScript type check |

## Environment Variables

Create a `.env.local` file with the following:

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key for email delivery |
| `CONTACT_TO_EMAIL` | Address that receives contact form submissions |
| `CONTACT_FROM_EMAIL` | Sender address (must be on a verified Resend domain) |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |

## Contact Form

The `/api/contact` route applies the following protections:

- Honeypot field — silently discards bot submissions
- Server-side validation — mirrors client Zod schema
- Rate limiting — 1 submission per IP per 24 hours via Upstash sliding window
