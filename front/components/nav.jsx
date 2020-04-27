import { Layout, Menu } from 'antd';
import Link from 'next/link';
import Profile from '../components/profile';

export default class Nav extends React.Component {
  get categoryElements() {
    const { user } = this.props;
    if (user.categories) {
      return user.categories.map((category, index) => {
        return (
          <Menu.Item key={index + 2} style={{ lineHeight: '25px', height: '28px', marginTop: '3px', marginBottom: '3px' }}>
            <span className="nav-text" style={{ fontSize: '0.8em' }}>
              <Link href={{ path: '/', query: { user: user.username, category: category.name } }}>
                <a>- {category.displayName}</a>
              </Link>
            </span>
          </Menu.Item>
        );
      });
    }
  }

  render() {
    const { onCollapse, isCollapsed, user, defaultImage } = this.props;
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
        <Profile user={user} defaultImage={defaultImage} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.ItemGroup key="g1" title={<span style={{ color: 'white' }}>Category</span>}>
            <Menu.Item key="1" style={{ lineHeight: '25px', height: '28px', marginTop: '3px', marginBottom: '3px' }}>
              <span className="nav-text" style={{ fontSize: '0.8em' }}>
                <Link href={{ path: '/', query: { user: user.username } }}>
                  <a>- All</a>
                </Link>
              </span>
            </Menu.Item>
            {this.categoryElements}
          </Menu.ItemGroup>
        </Menu>
      </Layout.Sider>
    );
  }
}