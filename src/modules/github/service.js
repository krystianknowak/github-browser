const RAW_URL = 'https://api.github.com/users/';

const EVENT_TYPES = ['PullRequestEvent', 'PullRequestReviewCommentEvent'];

export function getGithubUserEvents(username) {
    return fetch(`${RAW_URL}${username}/events/public?per_page=100`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw Error('Response not 200');
        })
        .catch(err => console.warn(err))
        .then(arr => arr.filter(e => EVENT_TYPES.includes(e.type)));
}

export function getGithubUserInfo(username) {
    return fetch(`${RAW_URL}${username}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw Error('Response not 200');
        })
        .catch(err => console.warn(err));
}