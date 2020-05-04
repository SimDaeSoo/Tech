import { Editor, EditorState, convertFromRaw, convertToRaw, RichUtils, Modifier } from 'draft-js';
import { CalendarOutlined, UserOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import PrismDraftDecorator from 'draft-js-prism';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import { Network } from '../utils';

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    let contents = emptyContentState;
    const editable = false;
    try {
      const articleData = JSON.parse(this.props.article.contents);
      contents = convertFromRaw(articleData);
    } catch (e) {
      console.log('article contents is empty');
    }
    const decorator = new PrismDraftDecorator({
      prism: Prism,
      defaultSyntax: 'tsx'
    });
    let editorState = EditorState.createWithContent(contents, decorator);
    this.state = { editorState, editable };
  }

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  focus = () => {
    this.refs.editor.focus();
  }

  toggleBlockType = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  toggleColor = (toggledColor) => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(styleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  }

  // TODO: Authorization 추가
  save = async () => {
    const { article } = this.props;
    const contents = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    const response = await Network.fetch(`/api/articles/${article.id}`, {
      method: 'put',
      body: JSON.stringify({ contents }),
      headers: { 'Content-Type': 'application/json' },
    });
    this.setState({ editable: false })
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

  get createdAt() {
    const { article } = this.props;
    return article.createdAt.slice(0, 10);
  }

  render() {
    const { editorState, editable } = this.state;
    const { article, permission } = this.props;

    return (
      <div className='article-editor' onClick={this.focusEditor} style={{ textAlign: 'left' }}>
        {
          permission && editable &&
          <div className='editor-toolbar'>
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <ColorControls
              editorState={editorState}
              onToggle={this.toggleColor}
            />
          </div>
        }
        <div style={{ padding: '15px', position: 'relative', backgroundColor: '#FFFFFF', borderRadius: '10px' }}>
          {
            article.thumbnail &&
            <div style={{ opacity: 0.3, height: '120px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${article.thumbnail})`, backgroundSize: 'cover' }}>
            </div>
          }
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '2.5em', marginTop: '8px' }}>{article.title}</div>
            <div style={{ fontSize: '1.8em' }}>{article.description}</div>
            {this.tagElements}
            <div>
              <UserOutlined />
              <em style={{ fontSize: '0.8em', marginLeft: '4px' }}>{article.user.username} /</em>
              <CalendarOutlined style={{ marginLeft: '4px' }} />
              <em style={{ fontSize: '0.8em', marginLeft: '4px' }}> {this.createdAt}</em>
            </div>
          </div>
        </div>
        <div className='RichEditor-editor'>
          <Editor
            ref='editor'
            editorState={editorState}
            onChange={this.onChange}
            editorKey='article-editor'
            readOnly={!editable}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            handleKeyCommand={this.handleKeyCommand}
            spellCheck={editable}
          />
        </div>
        {
          permission && editable &&
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.save}>
              <SaveOutlined /> Save Article
          </Button>
          </div>
        }
        {
          permission && !editable &&
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={() => { this.setState({ editable: true }) }}>
              <SaveOutlined /> Edit Article
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
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 2,
  },
  red: {
    color: 'rgba(200, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  green: {
    color: '#06733a',
  },
  blue: {
    color: '#3C6CFE',
  },
  purple: {
    color: '#a566a0',
  },
  white: {
    color: '#FFFFFF'
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

var COLORS = [
  { label: 'Red', style: 'red' },
  { label: 'Orange', style: 'orange' },
  { label: 'Green', style: 'green' },
  { label: 'Blue', style: 'blue' },
  { label: 'Purple', style: 'purple' },
  { label: 'White', style: 'white' },
];

const ColorControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {COLORS.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};