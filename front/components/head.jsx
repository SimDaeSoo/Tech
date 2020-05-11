import NextHead from 'next/head';
import { string } from 'prop-types';

const defaultTitle = 'Blog'
const defaultDescription = '심대수(daesoo94)의 개발 블로그 입니다. javascript, typescript, vue.js, next.js, node.js, docker, aws 등에 관심이 있습니다.';
const defaultKeywords = 'next.js, tech, develop, study, front, blog';
const defaultOGURL = '';
const defaultOGImage = '';

export default class Head extends React.Component {
  render() {
    const { title, description, keywords, url, ogImage } = this.props;
    return (
      <NextHead>
        <meta charSet="UTF-8" />
        <title>{title || defaultTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description || defaultDescription} />
        <meta name="keywords" content={keywords || defaultKeywords} />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="mask-icon" href="/static/favicon-mask.svg" color="#000000" />
        <meta property="og:url" content={url || defaultOGURL} />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta name="twitter:site" content={url || defaultOGURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage || defaultOGImage} />
        <meta property="og:image" content={ogImage || defaultOGImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="google-site-verification" content="FfMGp5M6fQZH3wrjh5qWzW7uCBBbHbZZ6C30z4ZwSd0" />
      </NextHead>
    );
  }
}

Head.propTypes = {
  title: string,
  description: string,
  keywords: string,
  url: string,
  ogImage: string
};