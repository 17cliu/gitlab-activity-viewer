# GitLab Activity Viewer

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._

## Quick start

- Create a `.env` file in root folder with your GitLab.com api token:
    ```
    REACT_APP_GITLAB_COM_TOKEN=xxxxx
    ```
- `npm start` to run app in development mode. Site served at http://localhost:3000.
- `npm test` to run tests in watch mode.
- `npm run build` to build app for production.


## Resources

- http://lortza.github.io/2018/05/22/create-react-app-api-keys.html
- https://docs.gitlab.com/ee/api/events.html#get-user-contribution-events

## Roadmap

- Handle user not found
- Responsive charts
- Support loading _many_ pages of data
    - Insert reasonable delays between calls in case of rate limiting
    - Show progress bar (x of y pages)
- Stats: Most active day of the week, most commits/merges/new issues on x
- Styling with Emotion/styled-components/etc
- Cache data to local storage
    - Button to delete data in local storage
    - Button to add new data to local storage
    - Button to reload data completely
