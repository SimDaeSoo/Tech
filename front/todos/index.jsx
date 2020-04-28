import Profile from "../components/profile";
import Router from 'next/router';
import { getDefaultImage } from '../utils';

export default class Main extends React.Component {
  get userProfiles() {
    const { users, defaultImage } = this.props;
    const profiles = users.map((user, index) => {
      return (
        <div style={{ width: '280px', margin: 4, display: 'inline-block' }} key={index} onClick={() => { this.linkTo(`/home?user=${user.username}`) }}>
          <Profile user={user} defaultImage={defaultImage} />
        </div>
      );
    });

    return profiles;
  }

  linkTo(href) {
    Router.push(href);
  }

  render() {
    return (
      <div style={{ textAlign: 'center', minHeight: '100%' }}>
        {this.userProfiles}
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.BASE_SSR_API_URL}/users`);
  const defaultImage = await getDefaultImage();
  const users = await response.json();

  return { props: { users, defaultImage } };
}