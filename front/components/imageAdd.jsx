export default class ImageAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
  }

  addImage = () => {
    const { onChange } = this.props;
    const { url } = this.state;
    onChange(url);
  };

  changeUrl = (evt) => {
    this.setState({ url: evt.target.value });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Paste the image url …"
          onChange={this.changeUrl}
          value={this.state.url}
        />
        <button type="button" onClick={this.addImage}> Add </button>
      </div>
    );
  }
}