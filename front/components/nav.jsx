import { Layout, Menu } from 'antd';
import Profile from '../components/profile';

export default class Nav extends React.Component {
  get categoryElements() {
    const elements = [];

    elements.push(
      <Menu.Item key="2" style={{ lineHeight: '25px', height: '28px', marginTop: '3px', marginBottom: '3px' }}>
        <span className="nav-text" style={{ fontSize: '0.8em' }}>- Next.js</span>
        <span style={{ padding: '4px', fontSize: '0.8em', lineHeight: '17px', height: '26px', position: 'absolute', top: '1px', right: '4px', borderRadius: '4px', backgroundColor: 'brown' }}>0</span>
      </Menu.Item>
    );
    elements.push(
      <Menu.Item key="3" style={{ lineHeight: '25px', height: '28px', marginTop: '3px', marginBottom: '3px' }}>
        <span className="nav-text" style={{ fontSize: '0.8em' }}>- StrAPI</span>
        <span style={{ padding: '4px', fontSize: '0.8em', lineHeight: '17px', height: '26px', position: 'absolute', top: '1px', right: '4px', borderRadius: '4px', backgroundColor: 'brown' }}>0</span>
      </Menu.Item>
    );

    elements.push(
      <Menu.Item key="4" style={{ lineHeight: '25px', height: '28px', marginTop: '3px', marginBottom: '3px' }}>
        <span className="nav-text" style={{ fontSize: '0.8em' }}>- Docker</span>
        <span style={{ padding: '4px', fontSize: '0.8em', lineHeight: '17px', height: '26px', position: 'absolute', top: '1px', right: '4px', borderRadius: '4px', backgroundColor: 'brown' }}>0</span>
      </Menu.Item>
    );

    elements.push(
      <Menu.Item key="5" style={{ lineHeight: '25px', height: '28px', marginTop: '3px', marginBottom: '3px' }}>
        <span className="nav-text" style={{ fontSize: '0.8em' }}>- AWS</span>
        <span style={{ padding: '4px', fontSize: '0.8em', lineHeight: '17px', height: '26px', position: 'absolute', top: '1px', right: '4px', borderRadius: '4px', backgroundColor: 'brown' }}>0</span>
      </Menu.Item>
    );

    return elements;
  }
  render() {
    const { onCollapse, isCollapsed } = this.props;
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
        <Profile />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.ItemGroup key="g1" title={<span style={{ color: 'white' }}>Category</span>}>
            <Menu.Item key="1" style={{ lineHeight: '25px', height: '28px', marginTop: '3px', marginBottom: '3px' }}>
              <span className="nav-text" style={{ fontSize: '0.8em' }}>- All</span>
              <span style={{ padding: '4px', fontSize: '0.8em', lineHeight: '17px', height: '26px', position: 'absolute', top: '1px', right: '4px', borderRadius: '4px', backgroundColor: 'brown' }}>0</span>
            </Menu.Item>
            {this.categoryElements}
          </Menu.ItemGroup>
        </Menu>
      </Layout.Sider>
    );
  }
}