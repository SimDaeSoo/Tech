import { Layout } from 'antd';

export default class Header extends React.Component {
  render() {
    return (
      <Layout.Header className="site-layout-background" style={{ padding: 0, textAlign: 'center', fontSize: '1.6em', color: 'white' }} >
        Sift's Blog
      </Layout.Header>
    );
  }
}