## Set .env file

DATABASE_URL: your prisma database connection url more info here (I recommend using planetscale its easy and free)
NEXTAUTH_SECRET=a random string to hash session tokens
NEXTAUTH_URL=localhost:3000

How to run locally: 
After setting up the .env file:

```
run npm install command
npx prisma generate
npm run dev

```
