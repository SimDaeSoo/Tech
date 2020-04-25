import fetch from 'isomorphic-unfetch';

export default class Login extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
          Hello I'm Home {JSON.stringify(categories)}
        </div>
      </Layout.Content>
    );
  }
}

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.BASE_SSR_API_URL}/categories`);
  const categories = await response.json();

  return { props: { categories: categories } };
}