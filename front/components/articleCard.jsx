import { Card, Tag } from 'antd';
import { CalendarOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';
import ArticleThumbnail from './articleThumbnail';

export default class ArticleCard extends React.Component {
    get created() {
        const { article } = this.props;
        return article.createdAt.slice(0, 10);
    }

    get tagElements() {
        const { article } = this.props;
        const elements = [];

        if (article.tags) {
            article.tags.forEach((tag, index) => {
                elements.push(<Tag key={index} color={tag.color} style={{ margin: 2 }}>{tag.name}</Tag>);
            });
        }

        return (<div style={{ position: 'absolute', top: '2px', left: 0 }}> {elements} </div>);
    }

    render() {
        const { article, defaultImage } = this.props;
        return (
            <Card
                className='article-card'
                style={{ width: article.width, display: 'inline-block', margin: 10, boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)', textAlign: 'left' }}
                cover={<ArticleThumbnail thumbnail={article.thumbnail ? article.thumbnail : defaultImage} />}
                actions={[
                    <div style={{ textAlign: 'center' }} key='author'>
                        <UserOutlined />
                        <em style={{ fontSize: '0.8em', marginLeft: '4px' }}>{article.user.username}</em>
                    </div>,
                    <div style={{ textAlign: 'center' }} key='createAt'>
                        <CalendarOutlined />
                        <em style={{ fontSize: '0.8em', marginLeft: '4px' }}> {this.created}</em>
                    </div>
                ]}
            >
                <Card.Meta title={article.title} description={article.description} />
                {this.tagElements}
            </Card>
        );
    }
}