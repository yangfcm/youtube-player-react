# My Youtube

## Intro

A lightweight, ad-free Youtube video watching app built with React and Google Youtube Data API.

## Features & Functionality

- Google authorization
- Display channel lists subscribed by authorized user.
- Display play list created by authorized user.
- View channel details and play list.
- Play video and see video comments.
- Browse recommended videos.
- Subscribe/Unsubscribe channels.
- Two advantages compared to Youtube app: Ad free and playing in the background.

## Development setup

- Install Node.js and NPM.
- Under project root directory, run `npm install` to install packages.
- Create `.env` file under project root directory to specify API key and user's channel id:

  ```
    REACT_APP_API_KEY=your_api_key
    REACT_APP_MY_CHANNEL_ID=your_channel_id
    REACT_APP_CLIENT_ID=your_client_id_for_google_auth
    REACT_APP_CLIENT_SECRET=your_client_secret_for_google_auth
  ```

  To get API key, you need to sign up on Google cloud platform, create a new project and create a new credential under the project so that you can get API key.

      	To get your channel id, you need to first signup as a youtube user and navigate to your channel. You can get your channel id in URL: `https://www.youtube.com/channel/your_channel_id?view_as=subscriber`

- Run `npm start` to run it on local machine.

## Docker

- Requirements: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

- Build and start app in dev.

```
docker build -f Dockerfile.dev .
```

```
docker run -p 3000:3000 <image id from last command>
```

The issue with this approach is the change to source code cannot be reflected on UI instantly.

- Build, start and watch source file.

```
docker-compose up
```
