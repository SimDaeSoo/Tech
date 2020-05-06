import { Comment } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';

export default class ArticleComment extends React.Component {
  get createdAt() {
    return this.props.comment.createdAt.slice(0, 10);
  }
  render() {
    const { comment } = this.props;
    return (
      <Comment
        className="comment"
        author={<a>{comment.author} / <CalendarOutlined /> {this.createdAt}</a>}
        avatar={<UserOutlined style={{ paddingLeft: '1px', lineHeight: '31px', fontSize: '1.3em', width: '30px', textAlign: 'center', height: '30px', borderRadius: '15px', backgroundColor: 'grey' }} />}
        content={<p>{comment.content}</p>}
      />
    );
  }
}