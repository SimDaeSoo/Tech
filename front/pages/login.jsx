import { Layout, Button } from 'antd';
import DefaultLayout from '../layouts/default';
import { getDefaultImage, getUser, login, getAuth } from '../utils';

export default class Login extends React.Component {
  tryLogin = () => {
    login('', '');
  }
  render() {
    const { user, defaultImage, query } = this.props;
    return (
      <DefaultLayout user={user} defaultImage={defaultImage} query={query}>
        <Layout.Content style={{ overflow: 'initial' }}>
          <div className="site-layout-background" style={{ textAlign: 'center' }}>
            this is login form
            <Button onClick={this.tryLogin}>hello</Button>
          </div>
        </Layout.Content>
      </DefaultLayout>
    );
  }
}

export async function getServerSideProps(context) {
  const query = Object.assign({ user: 'daesoo94', category: 'login' }, context.query);
  const [defaultImage, user, auth] = await Promise.all([getDefaultImage(), getUser(query.user), getAuth()]);
  return { props: { user, defaultImage, query, auth } };
}