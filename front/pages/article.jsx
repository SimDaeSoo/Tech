import { Layout } from 'antd';
import { getDefaultImage, getUser, getArticle, getAuth } from '../utils';
import DefaultLayout from '../layouts/default';
import TextEditor from '../components/textEditor';

export default class Article extends React.Component {
  render() {
    const { user, defaultImage, query, article } = this.props;
    return (
      <DefaultLayout user={user} defaultImage={defaultImage} query={query}>
        <Layout.Content style={{ overflow: 'initial' }}>
          <div className="site-layout-background" style={{ textAlign: 'center' }}>
            <TextEditor article={article} permission={true} />
          </div>
        </Layout.Content>
      </DefaultLayout>
    );
  }
}

export async function getServerSideProps(context) {
  const query = Object.assign({ user: 'daesoo94' }, context.query);
  const [defaultImage, user, auth, article] = await Promise.all([getDefaultImage(), getUser(query.user), getAuth(), getArticle(query.article_id)]);
  return { props: { user, defaultImage, auth, article, query } };
}