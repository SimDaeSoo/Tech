import 'antd/dist/antd.css';
import '../styles/init.css';
import App from 'next/app';

export default class BaseApp extends App {

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Component {...pageProps} />
    );
  }
}