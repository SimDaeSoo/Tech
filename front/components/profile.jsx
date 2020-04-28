import { GithubOutlined, GoogleOutlined, UserOutlined } from '@ant-design/icons';
export default class Profile extends React.Component {
  get careerElements() {
    if (this.props.user.careers) {
      return this.props.user.careers.map((career, index) => {
        const begin = career.begin ? career.begin.slice(0, 7) : ''
        const end = career.end ? career.end.slice(0, 7) : ''
        const thumbnail = career.thumbnail ? career.thumbnail : this.props.defaultImage;
        return (
          <div style={{ height: '22px', margin: '4px', fontSize: '0.9em', display: 'flex', backgroundColor: '#253545', borderRadius: '4px' }} key={index}>
            <img style={{ width: '22px', height: '22px', marginRight: '8px', borderRadius: '4px' }} src={thumbnail} />
            <span style={{ marginRight: '5px', lineHeight: '23px' }}>{career.name}</span>
            <span style={{ fontSize: '0.8em', marginTop: '4px' }}> {begin} - {end}</span>
          </div>
        )
      });
    }
  }

  get tagElements() {
    if (this.props.user.tags) {
      return this.props.user.tags.map((tag, index) => {
        return (
          <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: tag.color, margin: '2px', display: 'inline-block' }} key={index}>{tag.name}</div>
        )
      });
    }
  }

  render() {
    const { user, defaultImage, detail } = this.props;
    const thumbnail = user.thumbnail ? user.thumbnail : defaultImage;
    return (
      <div style={{ width: '100%', padding: '3px', paddingBottom: '8px', borderRadius: '8px', color: 'white', backgroundColor: '#00151C', boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)' }}>
        {/* Thumbnail */}
        <div style={{ width: '180px', height: '180px', margin: 'auto', marginBottom: '3px', marginTop: '7px' }}>
          <img style={{ width: '100%', height: '100%', borderRadius: '10px' }} src={thumbnail} />
        </div>

        {/* NickName */}
        <div style={{ fontSize: '1.2em', marginLeft: '7px', marginBottom: '5px' }}>
          <UserOutlined style={{ marginRight: '7px' }} />
          {user.name} ({user.username})
        </div>
        {detail &&
          <div style={{ display: 'flex', marginBottom: '4px' }}>
            <GoogleOutlined style={{ marginLeft: '7px', marginRight: '8px', fontSize: '1.2em' }} />
            <span style={{ fontSize: '0.8em', backgroundColor: '#253545', paddingLeft: '4px', paddingRight: '4px', borderRadius: '4px' }}>{user.email}</span>
          </div>
        }
        {detail &&
          <div style={{ display: 'flex', marginBottom: '7px' }}>
            <GithubOutlined style={{ marginLeft: '7px', marginRight: '8px', fontSize: '1.2em' }} />
            <span style={{ fontSize: '0.8em', backgroundColor: '#253545', paddingLeft: '4px', paddingRight: '4px', borderRadius: '4px' }}>{user.github}</span>
          </div>
        }

        {/* Career */}
        {detail &&
          <div style={{ borderTop: 'solid', borderWidth: 'thin', paddingTop: '3px', borderColor: '#0A2F30' }}>
            {this.careerElements}
          </div>
        }

        {/* Favorite */}
        <div style={{ textAlign: 'center' }}>
          {this.tagElements}
        </div>
      </div>
    );
  }
}