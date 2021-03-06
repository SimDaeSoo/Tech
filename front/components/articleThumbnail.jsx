export default class ArticleThumbnail extends React.Component {
  render() {
    const { thumbnail } = this.props;
    return (
      <div style={{ width: 'auto', height: '200px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover' }}>
      </div >
    );
  }
}