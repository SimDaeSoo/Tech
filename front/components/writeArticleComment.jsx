import { Comment, Button, Input } from 'antd';
import { UserOutlined, CommentOutlined } from '@ant-design/icons';
import { Network } from '../utils';

export default class WriteArticleComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { author: '', content: '', loading: false };
  }

  setName = (e) => {
    const author = e.target.value;
    this.setState({ author });
  }

  setContent = (e) => {
    const content = e.target.value;
    this.setState({ content });
  }

  apply = async () => {
    if (this.state.author && this.state.content && !this.state.loading) {
      const author = '';
      const content = '';
      let loading = true;
      this.setState({ loading });

      const { update } = this.props;
      const response = await Network.fetch(`/api/comments`, {
        method: 'post',
        body: JSON.stringify({
          author: this.state.author,
          content: this.state.content,
          article: this.props.articleID
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (update) { update(); }
      loading = false;
      this.setState({ author, content, loading });
    }
  }

  render() {
    const { content, author } = this.state;
    return (
      <Comment
        style={{ height: 'auth' }}
        className="comment"
        actions={[<Button type="primary" size='small' icon={<CommentOutlined />} onClick={this.apply}>apply comment</Button>]}
        author={<Input size='small' placeholder="author" allowClear onChange={this.setName} value={author} />}
        avatar={<UserOutlined style={{ paddingLeft: '1px', lineHeight: '31px', fontSize: '1.3em', width: '30px', textAlign: 'center', height: '30px', borderRadius: '15px', backgroundColor: 'grey' }} />}
        content={<Input.TextArea rows={3} size='small' placeholder="comment" onChange={this.setContent} value={content} />}
      />
    );
  }
}