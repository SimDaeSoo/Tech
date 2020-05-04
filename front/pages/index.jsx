import { Layout } from 'antd';
import { getDefaultImage, getUser, getArticles, getAuth } from '../utils';
import DefaultLayout from '../layouts/default';
import ArticleCard from '../components/articleCard';
import CustomPagination from '../components/pagination';
import { LoadingOutlined } from '@ant-design/icons';

export default class Home extends React.Component {
  get articleElements() {
    const { articles, defaultImage } = this.props;
    if (articles && articles.length) {
      return articles.map((article, index) => {
        return (
          <ArticleCard article={article} defaultImage={defaultImage} key={index} />
        )
      });
    }
  }

  render() {
    const { user, defaultImage, query, count } = this.props;
    return (
      <DefaultLayout user={user} defaultImage={defaultImage} query={query}>
        <Layout.Content style={{ overflow: 'initial' }}>
          <div className="site-layout-background" style={{ textAlign: 'center' }}>
            {
              count > 0 &&
              <div>
                {this.articleElements}
                <CustomPagination query={query} count={count} />
              </div>
            }
            {
              count === 0 &&
              <div style={{ fontSize: '2em', height: 'calc(100vh - 70px)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 'calc(50% - 120px)', top: 'calc(50% - 22px)' }}>
                  <LoadingOutlined /> Article is empty..
                </div>
              </div>
            }
          </div>
        </Layout.Content>
      </DefaultLayout>
    );
  }
}

export async function getServerSideProps(context) {
  const query = Object.assign({ user: 'daesoo94' }, context.query);
  const [defaultImage, user, auth, articleData] = await Promise.all([getDefaultImage(), getUser(query.user), getAuth(), getArticles(query)]);
  return { props: { user, defaultImage, articles: articleData.articles, count: articleData.count, query, auth } };
}