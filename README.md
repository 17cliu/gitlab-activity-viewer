# GitLab Activity Viewer

![build status](https://github.com/17cliu/gitlab-activity-viewer/workflows/build/badge.svg)


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

- Provide error details instead of showing generic error message
- Add tests for handling bad data (e.g. connecting to non-Gitlab api)
- Responsive charts!
- Better handling of dropped pages (right now, just shows what was successfully
  fetched, without mentioning that some data couldn't be fetched)
- Other stats: most commits/merges/new issues by project
- Styling with Emotion/styled-components/etc
- Cache data to local storage
    - Button to delete data in local storage
    - Button to add new data to local storage
    - Button to reload data completely
- Load data from exported json file, instead of from api
