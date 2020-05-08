import { Layout } from 'antd';
import { getDefaultImage, getUser, getArticle, getAuth, Network } from '../utils';
import DefaultLayout from '../layouts/default';
import TextEditor from '../components/textEditor';
import Comments from '../components/comments';

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

  updateComment = async () => {
    const { article } = this.props;
    const response = await Network.fetch(`/api/articles/${article.id}`);
    const clientArticle = await response.json();
    this.setState({ clientArticle });
  }

  render() {
    const { isAuth, clientArticle } = this.state;
    const { user, defaultImage, query, article } = this.props;
    return (
      <DefaultLayout user={user} defaultImage={defaultImage} query={query} isAuth={isAuth} title={article.title}>
        <Layout.Content style={{ overflow: 'initial' }}>
          <div className="site-layout-background" style={{ textAlign: 'center' }}>
            <TextEditor article={article} permission={isAuth} />
            <Comments articleID={article.id} comments={clientArticle ? clientArticle.comments : article.comments} update={this.updateComment} />
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