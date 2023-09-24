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

DATABASE_URL='mysql://eoko41rx4m3ui7zlpt56:pscale_pw_10jHJyu9ss0TIQtmCzD05cB2N8odWmPaz7aMW2Pxasi@aws.connect.psdb.cloud/artbeat?sslaccept=strict'

NEXTAUTH_SECRET=0EYcoz3wZI2f1MvYWjE7jBeg4pQ9qGj2

NEXTAUTH_URL=http://localhost:3000

## How to run locally: 

After setting up the .env file:

run command : 

```
npm install command
npx prisma generate
npm run dev
```

## Go to localhost:3000 in your browser
