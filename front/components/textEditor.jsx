import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { SaveOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    let contents = emptyContentState;
    try {
      const articleData = JSON.parse(this.props.article.contents);
      contents = convertFromRaw(articleData);
    } catch (e) {
      console.log('article contents is empty');
    }
    let editorState = EditorState.createWithContent(contents);
    this.state = { editorState };
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  }

  setEditor = (editor) => {
    this.editor = editor;
  }

  // TODO: Authorization 추가
  save = async () => {
    const { article } = this.props;
    const contents = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    const response = await fetch(`/api/articles/${article.id}`, {
      method: 'put',
      body: JSON.stringify({ contents }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  get tagElements() {
    const { article } = this.props;
    const elements = [];

    if (article.tags) {
      article.tags.forEach((tag, index) => {
        elements.push(<Tag key={index} color={tag.color} style={{ margin: 2 }}>{tag.name}</Tag>);
      });
    }

    return (<div> {elements} </div>);
  }

  render() {
    const { article, permission } = this.props;
    return (
      <div className='article-editor' onClick={this.focusEditor} style={{ textAlign: 'left' }}>
        <div style={{ padding: '15px', position: 'relative' }}>
          <div style={{ zIndex: 1, position: 'relative' }}>
            <div style={{ fontSize: '2.5em', marginTop: '8px' }}>{article.title}</div>
            <div style={{ fontSize: '1.8em' }}>{article.description}</div>
            {this.tagElements}
          </div>
          <div style={{ zIndex: 0, opacity: 0.3, position: 'absolute', top: '-2px', left: 0, width: '100%', height: '100%', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${article.thumbnail})`, backgroundSize: 'cover' }}>
          </div>
        </div>
        <div style={{ marginTop: '5px', marginBottom: '10px', padding: '8px' }}>
          <Editor
            ref={this.setEditor}
            editorState={this.state.editorState}
            onChange={this.onChange}
            editorKey='article-editor'
            readOnly={!permission}
          />
        </div>
        {
          permission &&
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.save}>
              <SaveOutlined /> Save Article
          </Button>
          </div>
        }
      </div>
    );
  }
}

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'article-editor',
      type: 'unstyled',
      entityRanges: [],
    },
  ],
});