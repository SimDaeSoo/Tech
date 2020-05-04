import { Layout } from 'antd';
import { getDefaultImage, getUser, getArticle, getAuth } from '../utils';
import DefaultLayout from '../layouts/default';
import TextEditor from '../components/textEditor';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuth: false };
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

  render() {
    const { isAuth } = this.state;
    const { user, defaultImage, query, article } = this.props;
    return (
      <DefaultLayout user={user} defaultImage={defaultImage} query={query} isAuth={isAuth}>
        <Layout.Content style={{ overflow: 'initial' }}>
          <div className="site-layout-background" style={{ textAlign: 'center' }}>
            <TextEditor article={article} permission={isAuth} />
          </div>
        </Layout.Content>
      </DefaultLayout>
    );
  }
}

export async function getServerSideProps(context) {
  const query = Object.assign({ user: 'daesoo94' }, context.query);
  const [defaultImage, user, article] = await Promise.all([getDefaultImage(), getUser(query.user), getArticle(query.article_id)]);
  return { props: { user, defaultImage, article, query } };
}