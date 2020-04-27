import { Layout, Menu } from 'antd';
import Profile from '../components/profile';

export default class Nav extends React.Component {
  get categoryElements() {
    const { user } = this.props;
    if (user.categories) {
      return user.categories.map((category, index) => {
        return (
          <Menu.Item key={index + 2} style={{ lineHeight: '25px', height: '28px', marginTop: '3px', marginBottom: '3px' }}>
            <span className="nav-text" style={{ fontSize: '0.8em' }}>- {category.displayName}</span>
          </Menu.Item>
        );
      });
    }
  }

  render() {
    const { onCollapse, isCollapsed, user } = this.props;
    return (
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={onCollapse}
        collapsed={isCollapsed}
        width="220px"
        style={{
          overflowY: 'visible',
          overflowX: 'hidden',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 1
        }}
      >
        <Profile user={user} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.ItemGroup key="g1" title={<span style={{ color: 'white' }}>Category</span>}>
            <Menu.Item key="1" style={{ lineHeight: '25px', height: '28px', marginTop: '3px', marginBottom: '3px' }}>
              <span className="nav-text" style={{ fontSize: '0.8em' }}>- All</span>
            </Menu.Item>
            {this.categoryElements}
          </Menu.ItemGroup>
        </Menu>
      </Layout.Sider>
    );
  }
}