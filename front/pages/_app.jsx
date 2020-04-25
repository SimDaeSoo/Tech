import 'antd/dist/antd.css';
import '../styles/init.css';
import App from 'next/app';
import { Layout } from 'antd';
import Nav from '../components/nav';
import Head from '../components/head';
import Header from '../components/header';
import ToggleNav from '../components/togglenav';

export default class BaseApp extends App {
  constructor() {
    super();
    this.state = {
      isCollapsed: false,
      isTinyDisplay: false
    }
  }

  onCollapse = (collapsed) => {
    const isCollapsed = collapsed;
    const isTinyDisplay = collapsed;
    this.setState({ isCollapsed, isTinyDisplay });
  }

  toggleNav = () => {
    const isCollapsed = !this.state.isCollapsed;
    this.setState({ isCollapsed });
  }

  render() {
    const { isCollapsed, isTinyDisplay } = this.state;
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Head title="Sift's Blog" />
        <Nav onCollapse={this.onCollapse} isCollapsed={isCollapsed} />
        <ToggleNav isCollapsed={isCollapsed} toggleNav={this.toggleNav} />
        <Layout className="site-layout" style={{ marginLeft: isCollapsed || isTinyDisplay ? 0 : 220, transition: 'all 0.2s' }}>
          <Header />
          <Component {...pageProps} />
          <Layout.Footer style={{ textAlign: 'center' }}>Sift's tech blog</Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}