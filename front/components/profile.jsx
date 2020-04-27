import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
export default class Profile extends React.Component {
  get careerElements() {
    if (this.props.user.careers) {
      return this.props.user.careers.map((career, index) => {
        const begin = career.begin ? career.begin.slice(0, 7) : ''
        const end = career.end ? career.end.slice(0, 7) : ''
        const thumbnail = career.thumbnail ? career.thumbnail : this.props.defaultImage;
        return (
          <div style={{ height: '22px', margin: '4px', fontSize: '0.9em', display: 'flex' }} key={index}>
            <img style={{ width: '22px', height: '22px', marginRight: '8px', borderRadius: '4px' }} src={thumbnail} />
            <span style={{ marginRight: '5px', lineHeight: '21px' }}>{career.name}</span>
            <span style={{ fontSize: '0.9em', marginTop: '2px' }}>{begin} - {end}</span>
          </div>
        )
      });
    }
  }

  get tagElements() {
    if (this.props.user.tags) {
      return this.props.user.tags.map((tag, index) => {
        return (
          <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: '#1890ff', margin: '2px', display: 'inline-block' }} key={index}>{tag.name}</div>
        )
      });
    }
  }

  render() {
    const { user, defaultImage } = this.props;
    const thumbnail = user.thumbnail ? user.thumbnail : defaultImage;
    return (
      <div style={{ width: '100%', padding: '3px', paddingBottom: '8px', borderRadius: '10px', color: 'white', backgroundColor: '#00151C' }}>
        {/* Thumbnail */}
        <div style={{ width: '180px', height: '180px', margin: 'auto', marginBottom: '6px', marginTop: '15px' }}>
          <img style={{ width: '100%', height: '100%', borderRadius: '10px' }} src={thumbnail} />
        </div>

        {/* NickName */}
        <div style={{ fontSize: '1.2em', marginLeft: '4px' }}>{user.name} ({user.username})</div>
        <div style={{ display: 'flex' }}>
          {/* TODO: Email Connection */}
          <GoogleOutlined style={{ margin: '2px 12px 2px 8px', fontSize: '1em' }} />
          <span style={{ fontSize: '0.8em' }}>{user.email}</span>
        </div>
        <div style={{ display: 'flex', marginBottom: '4px' }}>
          {/* TODO: Github Connection */}
          <GithubOutlined style={{ margin: '2px 12px 2px 8px', fontSize: '1em' }} />
          <span style={{ fontSize: '0.8em' }}>{user.github}</span>
        </div>

        {/* Career */}
        <div style={{ borderTop: 'solid', borderWidth: 'thin', paddingTop: '4px', borderColor: '#0A1F25' }}>
          {this.careerElements}
        </div>

        {/* Favorite */}
        {this.tagElements}
      </div>
    );
  }
}