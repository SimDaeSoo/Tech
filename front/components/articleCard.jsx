import { Card } from 'antd';
import { CalendarOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';
import ArticleThumbnail from './articleThumbnail';

export default class ArticleCard extends React.Component {
    get created() {
        const { article } = this.props;
        return article.createdAt.slice(0, 10);
    }

    render() {
        const { article, defaultImage } = this.props;
        return (
            <Card
                className='article-card'
                style={{ width: article.width, display: 'inline-block', margin: 10, boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)', textAlign: 'left' }}
                cover={<ArticleThumbnail thumbnail={article.thumbnail ? article.thumbnail : defaultImage} />}
                actions={[
                    <div style={{ textAlign: 'center' }} key='createAt'>
                        <CalendarOutlined />
                        <em style={{ fontSize: '0.8em', marginLeft: '4px' }}> {this.created}</em>
                    </div>,
                    <div style={{ textAlign: 'center' }} key='author'>
                        <UserOutlined />
                        <em style={{ fontSize: '0.8em', marginLeft: '4px' }}>{article.user.username}</em>
                    </div>
                ]}
            >
                <Card.Meta title={article.title} description={article.description} />
            </Card>
        );
    }
}