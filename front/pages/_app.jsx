import 'antd/dist/antd.css';
import App from 'next/app';
import { Layout } from 'antd';
import Nav from '../components/nav';
import Head from '../components/head';

export default class BaseApp extends App {
  constructor() {
    super();
    this.state = {
      isCollapsed: false
    }
  }

  onCollapse = (collapsed) => {
    const isCollapsed = collapsed;
    this.setState({ isCollapsed });
  }

  render() {
    const { isCollapsed } = this.state;
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Head title="Sift's Tech Blog" />
        <Nav onCollapse={this.onCollapse} />
        <Layout className="site-layout" style={{ marginLeft: isCollapsed ? 0 : 220 }}>
          <Layout.Header className="site-layout-background" style={{ padding: 0 }} />
          <Component {...pageProps} />
          <Layout.Footer style={{ textAlign: 'center' }}>Sift's tech blog</Layout.Footer>
        </Layout>
      </Layout>
    )
  }
}