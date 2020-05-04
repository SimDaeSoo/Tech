import fetch from 'isomorphic-unfetch';

const PAGE_LENGTH = 20;

export async function getDefaultImage() {
    const response = await fetch(`${process.env.BASE_SSR_API_URL}/upload/files?name=default.jpg`);
    const images = await response.json();

    return images[0] ? images[0].url : '';
}

export async function getUser(name) {
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

export async function getArticles(query) {
    let url = `/articles?_sort=createdAt:desc&_limit=${PAGE_LENGTH}&_start=${query.page?(query.page-1)*PAGE_LENGTH:0}&user.username=${query.user}${query.category?`&category.name=${query.category}`:''}`;
    const response = await fetch(`${process.env.BASE_SSR_API_URL}${url}`);
    const articles = await response.json();

    const count_url = `/articles/count?_sort=createdAt:desc&user.username=${query.user}${query.category?`&category.name=${query.category}`:''}`;
    const countResponse = await fetch(`${process.env.BASE_SSR_API_URL}${count_url}`);
    const count = await countResponse.json();
    return {
        articles,
        count
    };
}

export async function getArticle(id) {
    let url = `/articles/${id}`;
    const response = await fetch(`${process.env.BASE_SSR_API_URL}${url}`);
    const article = await response.json();
    return article;
}

export async function getAuth() {
    const url = `/users/me`;
    const response = await fetch(`${process.env.BASE_SSR_API_URL}${url}`);
    const user = await response.json();
    console.log(user);
    return {
        success: true,
        user
    };
}

export async function login(identifier, password) {
    const url = `/auth/local`;
    const response = await fetch(`/api${url}`, {
        method: 'post',
        body: JSON.stringify({
            identifier,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    console.log(data);
    return {
        success: true
    };
}