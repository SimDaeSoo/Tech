import { Layout, Input, Button, notification } from 'antd';
import { LockOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import DefaultLayout from '../layouts/default';
import { getDefaultImage, getUser, login, getAuth } from '../utils';
import Router from 'next/router';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuth: false, identifier: '', password: '' };
  }

  componentDidMount() {
    this.fetchAuthorization();
  }

  async fetchAuthorization() {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      const auth = await getAuth();
      if (!auth.data.statusCode) {
        const isAuth = true;
        this.setState({ isAuth });
      }
    }
  }

  tryLogin = async () => {
    const { identifier, password } = this.state;
    const isSuccess = await login(identifier, password);
    if (isSuccess) {
      Router.replace('/');
    } else {
      this.openNotification('Erorr: Fail login request..', 'Please check your identifier and password');
    }
  }

  openNotification = (placement, description) => {
    notification.warning({
      message: `${placement}`,
      description,
      placement,
      style: {
        width: '100%'
      }
    });
  };

  setID = (e) => {
    const identifier = e.target.value;
    this.setState({ identifier });
  }

  setPW = (e) => {
    const password = e.target.value;
    this.setState({ password });
  }

  render() {
    const { isAuth } = this.state;
    const { user, defaultImage, query } = this.props;
    return (
      <DefaultLayout user={user} defaultImage={defaultImage} query={query} isAuth={isAuth}>
        <Layout.Content style={{ overflow: 'initial' }}>
          <div className="site-layout-background" style={{ textAlign: 'center' }}>

            <div style={{ height: 'calc(100vh - 70px)', display: 'flex' }}>
              <div style={{ width: '300px', margin: 'auto' }}>
                <Input placeholder="Identifier" allowClear prefix={<UserOutlined />} onChange={this.setID} />
                <Input.Password placeholder="Password" allowClear prefix={<LockOutlined />} onChange={this.setPW} />
                <Button type="primary" icon={<SafetyCertificateOutlined />} style={{ width: '100%' }} onClick={this.tryLogin}>Login</Button>
              </div>
            </div>

          </div>
        </Layout.Content>
      </DefaultLayout>
    );
  }
}

export async function getServerSideProps(context) {
  const query = Object.assign({ user: 'daesoo94', category: 'login' }, context.query);
  const [defaultImage, user] = await Promise.all([getDefaultImage(), getUser(query.user)]);
  return { props: { user, defaultImage, query } };
}