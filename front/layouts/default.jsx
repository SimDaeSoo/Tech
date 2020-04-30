import { Layout } from 'antd';
import Nav from '../components/nav';
import Head from '../components/head';
import ToggleNav from '../components/togglenav';

export default class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      isTinyDisplay: true
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
    const { children, user, defaultImage, query } = this.props;
    const { isCollapsed, isTinyDisplay } = this.state;
    return (
      <Layout style={{ height: isTinyDisplay && !isCollapsed ? '100%' : 'fit-content' }}>
        <Head title="Blog" />
        <Nav onCollapse={this.onCollapse} isCollapsed={isCollapsed} user={user} defaultImage={defaultImage} query={query} />
        <div
          style={{
            width: '100%', height: '100%', position: 'fixed', zIndex: 2, backgroundColor: 'rgba(0,0,0,0.2)',
            display: isTinyDisplay && !isCollapsed ? 'block' : 'none'
          }}
          onClick={this.toggleNav}
        >
        </div>
        <ToggleNav isCollapsed={isCollapsed} toggleNav={this.toggleNav} />
        <Layout className="site-layout" style={{
          marginLeft: isCollapsed || isTinyDisplay ? 0 : 220,
          height: isTinyDisplay && !isCollapsed ? '100%' : '', transition: 'all 0.2s'
        }}>
          {children}
        </Layout>
      </Layout>
    );
  }
}