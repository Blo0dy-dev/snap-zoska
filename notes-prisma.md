1. Vercel -> Storage:
    Neon -> Create -> Accept -> Region -> Frankfurt, Germany-(fra1) -> Connect
    in snap-zoska-4h-postgres:
    .env.local -> Show secret -> Copy snippet into your src/.env 

2. NextAuth:
    Get started -> Adapters -> Prisma 
    npm install @prisma/client @auth/prisma-adapter
    npm install prisma --save-dev
    npx prisma init

3. VsCode:
    In .env replace value of DATABASE_URL
    .env
    Create prisma.ts in src/app/api/auth/[...nextauth] -> copy code from NextAuth docs
    Update authOptions.ts -> add:   import { PrismaAdapter } from "@auth/prisma-adapter"
                                    import { prisma } from "./prisma"
                                    adapter: PrismaAdapter(prisma),

    package.json:   "build": "prisma generate && next build",
                    "postinstall": "prisma generate"


4. VsCode terminal:
    npx prisma migrate dev --name user_posts_added
    npx prisma generate
    npx prisma studio