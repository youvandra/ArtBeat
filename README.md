## Clone this project

```
git clone https://github.com/youvandra/ArtBeat.git
```

Open project folder

```
cd Artbeat/
```

## Set your network on metamask with BTTC Testnet

Network name : BitTorrent Chain Donau

RPC : https://pre-rpc.bt.io/

Chain ID : 1029

Symbol : BTT

Block Explorer : https://testscan.bt.io


## Set .env file

DATABASE_URL: your prisma database connection url more info here (I recommend using planetscale its easy and free)

NEXTAUTH_SECRET=a random string to hash session tokens

NEXTAUTH_URL=localhost:3000

## How to run locally: 

After setting up the .env file:

run command : 

```
npm install command
npx prisma generate
npm run dev
```

## Go to localhost:3000 in your browser
