import ArticleComment from "./articleComment";
import WriteArticleComment from "./writeArticleComment";

export default class Comments extends React.Component {
  get CommentElements() {
    const { comments } = this.props;
    if (comments && comments.length > 0) {
      return comments.map((comment) => {
        return (<ArticleComment key={comment.id} comment={comment}></ArticleComment>);
      });
    }
  }

  render() {
    const { articleID, update } = this.props;
    return (
      <div className="comments">
        {this.CommentElements}
        <WriteArticleComment articleID={articleID} update={update} />
      </div>
    );
  }
}