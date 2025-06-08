# 🏀 Sport-Odds App

En webbaserad sportodds-applikation byggd i React som låter användare:
- Söka efter sporter och ligor
- Visa aktuella odds från The Odds API
- Spara matcher i en favoritkalender
- Filtrera matcher efter datum

## Jämförelse med andra ramverk
Innan utvecklingen av Sport-Odds App började behövde vi välja ett frontendramverk. Vi jämförde **React**, **Angular** och **Vue**, och valde tillslut **React**.

Enligt Radixweb är React särskilt lämpat för projekt som kräver hög återanvändbarhet av komponenter och flexibel hantering av dataflöden. De lyfter fram att React är idealiskt när man bygger interaktiva gränssnitt och vill ha friheten att välja egna verktyg för routing, state management och styling. Den komponentbaserade arkitekturen i React passade perfekt för vår applikation där sökning, visning av odds och favoritkalender är tydligt avgränsade funktioner.

Även Strapi framhåller Reacts fördelar och mer specefikt hur det möjliggör snabb utveckling av dynamiska användargränssnitt. De betonar att React har en låg inlärningströskel, är lätt att komma igång med och passar bra för applikationer som behöver vara snabba, responsiva och skalbara.

# Källor för jämförelsen
- React vs Vue: https://radixweb.com/blog/react-vs-vue
- React vs Angular: https://strapi.io/blog/react-vs-angular-framework-comparison

## Kom igång
### Installation

För att köra applikationen lokalt:
1. Klona repot:
   $ git clone https://github.com/<ditt-användarnamn>/odds_app.git
   cd odds_app

2. Installera Beroenden:
    npm install

(2.5) om inte bibliotek installerades automatiskt, kör:
    npm install react-bootstrap bootstrap react-calendar axios

3. Lägg till en .env-fil med din API-nyckel från The Odds API:
    REACT_APP_API_KEY=din-api-nyckel-här

4. Starta applikationen:
    npm start
    'Enligt nedan'

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
