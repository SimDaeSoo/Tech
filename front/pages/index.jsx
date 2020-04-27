import { Layout } from 'antd';
import Link from 'next/link';
import { getDefaultImage, getUsers } from '../utils';
import DefaultLayout from '../layouts/default';

export default class Blog extends React.Component {
  render() {
    const { user, defaultImage } = this.props;
    return (
      <DefaultLayout user={user} defaultImage={defaultImage}>
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
  const defaultImage = await getDefaultImage();
  const user = await getUsers(context.query.user);

  return { props: { user, defaultImage } };
}