import { Layout } from 'antd';
import { getDefaultImage, getUser } from '../utils';
import DefaultLayout from '../layouts/default';
import ArticleCard from '../components/articleCard';

export default class Home extends React.Component {
  render() {
    const { user, defaultImage, query } = this.props;
    return (
      <DefaultLayout user={user} defaultImage={defaultImage} query={query}>
        <Layout.Content style={{ overflow: 'initial' }}>
          <div className="site-layout-background" style={{ textAlign: 'center' }}>
            <ArticleCard width={300} thumbnail={'https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png'}></ArticleCard>
            <ArticleCard width={600} thumbnail={'https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png'}></ArticleCard>
            <ArticleCard width={400} thumbnail={'https://velopert.com/wp-content/uploads/2017/04/Cvn-H3tWAAAhsyS-950x608.jpg'}></ArticleCard>
            <ArticleCard width={300} thumbnail={'https://velopert.com/wp-content/uploads/2017/04/Cvn-H3tWAAAhsyS-950x608.jpg'}></ArticleCard>
            <ArticleCard width={500} thumbnail={'https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png'}></ArticleCard>
            <ArticleCard width={400} thumbnail={'https://velopert.com/wp-content/uploads/2017/04/Cvn-H3tWAAAhsyS-950x608.jpg'}></ArticleCard>
            <ArticleCard width={300} thumbnail={'https://velopert.com/wp-content/uploads/2017/04/Cvn-H3tWAAAhsyS-950x608.jpg'}></ArticleCard>
            <ArticleCard width={400} thumbnail={'https://velopert.com/wp-content/uploads/2017/04/Cvn-H3tWAAAhsyS-950x608.jpg'}></ArticleCard>
            <ArticleCard width={500} thumbnail={'https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png'}></ArticleCard>
            <ArticleCard width={600} thumbnail={'https://velopert.com/wp-content/uploads/2017/04/Cvn-H3tWAAAhsyS-950x608.jpg'}></ArticleCard>
            <ArticleCard width={600} thumbnail={'https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png'}></ArticleCard>
            <ArticleCard width={400} thumbnail={'https://velopert.com/wp-content/uploads/2017/04/Cvn-H3tWAAAhsyS-950x608.jpg'}></ArticleCard>
            <ArticleCard width={300} thumbnail={'https://velopert.com/wp-content/uploads/2017/04/Cvn-H3tWAAAhsyS-950x608.jpg'}></ArticleCard>
            <ArticleCard width={300} thumbnail={'https://velopert.com/wp-content/uploads/2017/04/Cvn-H3tWAAAhsyS-950x608.jpg'}></ArticleCard>
            <ArticleCard width={500} thumbnail={'https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png'}></ArticleCard>
            <ArticleCard width={300} thumbnail={'https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png'}></ArticleCard>
            <ArticleCard width={300} thumbnail={'https://velopert.com/wp-content/uploads/2017/04/Cvn-H3tWAAAhsyS-950x608.jpg'}></ArticleCard>
            <ArticleCard width={600} thumbnail={'https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png'}></ArticleCard>
            <ArticleCard width={500} thumbnail={'https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png'}></ArticleCard>
            <ArticleCard width={300} thumbnail={'https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png'}></ArticleCard>
          </div>
        </Layout.Content>
      </DefaultLayout>
    );
  }
}

export async function getServerSideProps(context) {
  const defaultImage = await getDefaultImage();
  const user = await getUser(context.query.user);
  const query = context.query;

  return { props: { user, defaultImage, query } };
}