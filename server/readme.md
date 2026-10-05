# Firebase Functions

## Set up environment variables

Create `.env` file

```
YOUTUBE_API_KEY=your_youtube_api_key
```

## Install dependencies

```sh
cd functions
npm install
```

## Set up Youtube API key

```sh
firebase functions:config:set functions.youtube_api_key="your_youtube_api_key"
```

## Deploy

```sh
cd functions
npm run deploy
```
