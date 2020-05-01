import 'antd/dist/antd.css';
import '../styles/init.css';
import '../styles/draft.css';
import '../styles/draftcode.css';
import App from 'next/app';

export default class BaseApp extends App {

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Component {...pageProps} />
    );
  }
}