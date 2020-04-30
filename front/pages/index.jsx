import { Layout } from 'antd';
import { getDefaultImage, getUser, getArticles } from '../utils';
import DefaultLayout from '../layouts/default';
import ArticleCard from '../components/articleCard';

export default class Home extends React.Component {
  get articleElements() {
    const { articles, defaultImage } = this.props;
    if (articles) {
      return articles.map((article, index) => {
        return (
          <ArticleCard article={article} defaultImage={defaultImage} key={index} />
        )
      });
    }
  }

  render() {
    const { user, defaultImage, query } = this.props;
    return (
      <DefaultLayout user={user} defaultImage={defaultImage} query={query}>
        <Layout.Content style={{ overflow: 'initial' }}>
          <div className="site-layout-background" style={{ textAlign: 'center' }}>
            {this.articleElements}
          </div>
        </Layout.Content>
      </DefaultLayout>
    );
  }
}

export async function getServerSideProps(context) {
  const query = Object.assign({ user: 'daesoo94' }, context.query);
  const defaultImage = await getDefaultImage();
  const user = await getUser(query.user);
  const articles = await getArticles(query);

  return { props: { user, defaultImage, articles, query } };
}