import { Layout, Menu } from 'antd';
import Profile from '../components/profile';

export default class Nav extends React.Component {
  get categoryElements() {
    const elements = [];

    elements.push(
      <Menu.Item key="2">
        <span className="nav-text">- next.js</span>
      </Menu.Item>
    );

    elements.push(
      <Menu.Item key="3">
        <span className="nav-text">- strapi</span>
      </Menu.Item>
    );

    elements.push(
      <Menu.Item key="4">
        <span className="nav-text">- others</span>
      </Menu.Item>
    );

    return elements;
  }
  render() {
    const { onCollapse } = this.props;
    return (
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={onCollapse}
        width="220px"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Profile />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.ItemGroup key="g1" title="Articles">
            <Menu.Item key="1">
              <span className="nav-text">- all</span>
            </Menu.Item>
            {this.categoryElements}
          </Menu.ItemGroup>
        </Menu>
      </Layout.Sider>
    )
  }
}