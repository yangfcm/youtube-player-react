# My Youtube

## Intro

My personal Youtube video watch app built by React and Google Youtube Data API.

## Features & Functionality

- Display channel lists subscribed by the user.
- Display play list created by user.
- View channel details and play list.
- Play video and see video comments.
- Browse recommended videos.
- All videos are Ad free!

## Development setup

- Install Node.js and NPM.
- Under project root directory, run `npm install` to install packages.
- Create `.env` file under project root directory to specify API key and user's channel id:
  `REACT_APP_API_KEY=your_key_value REACT_APP_MY_CHANNEL_ID=your_channel_id_value`
  To get API key, you need to sign up on Google cloud platform, create a new project and create a new credential under the project so that you can get API key.

      	To get your channel id, you need to first signup as a youtube user and navigate to your channel. You can get your channel id in URL: `https://www.youtube.com/channel/your_channel_id?view_as=subscriber`

- Run `npm start` to run it on local machine.

## Deployment

- The app is deployed at [Netlify](https://www.netlify.com/) using CI/CD provided by Netlify.
- To make the app work on Netlify, specify environment variables of `REACT_APP_API_KEY` and `REACT_APP_MY_CHANNEL_ID`.
- Issue - Page Not Found on Netlify with React Router. When you go to the home page and navigate between pages, routing works well. But if you go to a specific route(not root route), Netlify will return 404 error because SPA's routing is configured on the client while Netlify as a server will first handle the route(which doesn't exist on server). To fix it create a file `.redirects` under public directory with the content: `/* /index.html 200` to tell Netlify pass on any route handling to `index.html`. Reference: https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
