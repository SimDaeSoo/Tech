import { Layout } from 'antd';
import Nav from '../components/nav';
import Head from '../components/head';
import ToggleNav from '../components/togglenav';

export default class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
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
    const { children, user, defaultImage } = this.props;
    const { isCollapsed, isTinyDisplay } = this.state;
    return (
      <Layout>
        <Head title="Blog" />
        <Nav onCollapse={this.onCollapse} isCollapsed={isCollapsed} user={user} defaultImage={defaultImage} />
        <ToggleNav isCollapsed={isCollapsed} toggleNav={this.toggleNav} />
        <Layout className="site-layout" style={{ marginLeft: isCollapsed || isTinyDisplay ? 0 : 220, transition: 'all 0.2s' }}>
          {children}
        </Layout>
      </Layout>
    );
  }
}