import Head from '../components/head';
import Nav from '../components/nav';
import fetch from 'isomorphic-unfetch';

const BASE_SERVER_API = `http://back:1337`;
export default class Home extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <div>
        <Head title="Sift's Tech Blog" />
        <Nav />
        <div>
          Home {JSON.stringify(categories)}
        </div>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const response = await fetch(`${BASE_SERVER_API}/categories`);
  const categories = await response.json();

  return { props: { categories: categories } };
}