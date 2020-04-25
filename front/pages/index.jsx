import { Layout } from 'antd';

export default class Home extends React.Component {
  render() {
    return (
      <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
          Hello I'm Home
      </div>
      </Layout.Content>
    );
  }
}