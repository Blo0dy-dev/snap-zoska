Poznámky
Teória:
- npm = Node package manager
- na github dávať len funkčný bezchybný kód
- na začiatku kódu musí byť ("use client";) keď sú použité funkcie, ktoré čakajú na nejakú akciu ako napr.    - onClick()     - onChange()  

Commands: 
- ls – vypis subory
- cd – prejdi do suboru
- npm run build – kompiluje produkčný server 
- npm start - spustí kompilovaný server
- npm run dev – zapnúť server v dev mode (pre developerov)
- npm install @mui/material @emotion/react @emotion/styled
- npm install @fontsource/roboto          // inštaluje font Roboto
- openssl rand -hex 32 - vygeneruje NEXTAUTH_SECRET ktory davame do .env
- npx prisma init - inicializacia prismy ( vytvori priecinok prisma a v nom schema.prisma, do .env dopise DATABASE_URL, ak nie je .env tak vytvori novy)
- npx prisma migrate dev --name "nazov migracie"             migracia databazy (potrebny prvy krok pred pracou s db)
- npx prisma studio             otvori prisma studio (tu vidime databazu so vsetkymi tabulkami)

SETUP

Na vytvorenie projektu pouzi:  npx create-next-app@latest

Projekt uploadneme pomocou gitu na github.
Z githubu dame projekt na Vercel.

Vercel – server hosting
- na stranke Vercel.com vytvoreny ucet cez mail
- je potrebne autorizovat github
- importujem vercel do svojho projektu
- deploynem projekt… (server sa automaticky updatuje podľa úprav na githube)


Prisma, postgreSQL - databaza
- databaza pouzita je postgreSQL
- adapter pouzity je Prisma viac info na: https://authjs.dev/getting-started/adapters/prisma?_gl=1*8n6v5*_gcl_au*NzUyNjA2NzMyLjE3MzIxNzU1ODc.
- vytvorime databazu na Vercel/"project-name"/storage link:  https://vercel.com/martinklcos-projects/zoska-insta/stores/integration/store_Y3YP9jYJsbfFUKAN/settings
- viac detailnejšie info v notes-prisma.md

Git commands
- git clone https://github.com/Martinklco/zoska-insta.git
- prejst do projektu
- git init 
- git branch -m main         (premenovanie branchu)
- git config user.name „Your Name“         // username ten co mam na githube
- git config user.email „example@gmail.com“
- git remote -v       (na kontrolu ci je git spravne nakonfigurovany)
- git add .               (pridať všetko zo zložky... neviem ci je to potrebne)

- Na začiatku projektu je potrebné spraviť si kostru

Google Cloud Console
- do .env vkladam GOOGLE_CLIENT_ID a GOOGLE_CLIENT_SECRET z APIs and Services page na google cloud console
- credentials --> Zoškagram-auth --> lava strana Client ID + Client secret

Tipy
- vľavo hore vo file si vždy zapnúť autosave
- komponenty "skladame" v layout.tsx (je vždy potrebné mať na začiatku importované)
- mui.com môžem použiť ako template pre seba alebo chatgpt aby mi to upravil
- je možné mať spustených viac serverov - každý nový server je potrebné spustiť na novom termináli