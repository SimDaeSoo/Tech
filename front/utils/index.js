import fetch from 'isomorphic-unfetch';

export async function getDefaultImage() {
    const response = await fetch(`${process.env.BASE_SSR_API_URL}/upload/files?name=default.jpg`);
    const images = await response.json();

    return images[0] ? images[0].url : '';
}

export async function getUsers(name) {
    const DEFAULT_USER_INFO = {
        name: 'User',
        username: '-',
        email: 'none',
        github: 'none',
        careers: [],
        tags: [],
        categories: []
    }
    const response = await fetch(`${process.env.BASE_SSR_API_URL}/users?username=${name}`);
    const users = await response.json();
    const user = users[0] || DEFAULT_USER_INFO;

    return user;
}