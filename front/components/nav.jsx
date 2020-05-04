import { Layout, Menu } from 'antd';
import Router from 'next/router';
import Profile from '../components/profile';
import { LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  get categoryElements() {
    const { user } = this.props;
    if (user.categories) {
      return user.categories.map((category, index) => {
        return (
          <Menu.Item key={index + 2} style={{ lineHeight: '25px', height: '28px', marginTop: '3px', marginBottom: '3px' }}
            onClick={() => { this.linkTo(`/?user=${user.username}&category=${category.name}`) }}
          >
            <span className="nav-text" style={{ fontSize: '0.8em' }}>- {category.displayName}</span>
          </Menu.Item>
        );
      });
    }
  }

  linkTo(href) {
    Router.push(href);
  }

  get defaultSelectedKey() {
    const { user, query } = this.props;
    let key = 1;

    if (query && query.category) {
      const categories = user.categories.map(category => category.name);
      const index = categories.indexOf(query.category);
      key = index >= 0 ? index + 2 : index;
    }

    return [`${key}`];
  }

  render() {
    const { onCollapse, isCollapsed, user, defaultImage, isAuth } = this.props;
    return (
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={onCollapse}
        collapsed={isCollapsed}
        width="220px"
        className='side-bar'
        style={{ zIndex: 4 }}
      >
        <Profile user={user} defaultImage={defaultImage} detail={true} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={this.defaultSelectedKey}>
          <Menu.ItemGroup key="g1" title={<span style={{ color: 'white' }}>Category</span>}>
            <Menu.Item key="1" style={{ lineHeight: '25px', height: '28px', marginTop: '3px', marginBottom: '3px' }}
              onClick={() => { this.linkTo(`/?user=${user.username}`) }}
            >
              <span className="nav-text" style={{ fontSize: '0.8em' }}>- All logs</span>
            </Menu.Item>
            {this.categoryElements}
          </Menu.ItemGroup>
        </Menu>
        {
          !isAuth &&
          <div style={{ margin: '10px', backgroundColor: '#1890ff', color: 'white', textAlign: 'center', borderRadius: '6px' }} onClick={() => { this.linkTo('/login'); }}>
            <LockOutlined />
          </div>
        }
        {
          isAuth &&
          <div style={{ margin: '10px', backgroundColor: '#1890ff', color: 'white', textAlign: 'center', borderRadius: '6px' }}>
            <SafetyCertificateOutlined />
          </div>
        }
        <div style={{ padding: '40px' }}></div>
      </Layout.Sider>
    );
  }
}