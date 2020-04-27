import { Layout } from 'antd';
import fetch from 'isomorphic-unfetch';
import DefaultLayout from '../layouts/default';

const DEFAULT_USER_INFO = {
  name: 'User',
  username: '-',
  email: 'none',
  github: 'none',
  careers: [],
  tags: [],
  categories: []
}

export default class Home extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <DefaultLayout user={user}>
        <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            Hello I'm Home
          </div>
        </Layout.Content>
      </DefaultLayout>
    );
  }
}

export async function getServerSideProps(context) {
  const DEFAULT_USER = 'daesoo94';
  const response = await fetch(`${process.env.BASE_SSR_API_URL}/users?username=${DEFAULT_USER}`);
  const users = await response.json();
  const user = users[0] || DEFAULT_USER_INFO;

  return { props: { user: user } };
}