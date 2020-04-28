import { Card } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import ArticleThumbnail from './articleThumbnail';

export default class ArticleCard extends React.Component {
    render() {
        const { width, thumbnail } = this.props;
        return (
            <Card
                className='article-card'
                style={{ width: width, display: 'inline-block', margin: 10, boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.3)', textAlign: 'left' }}
                cover={<ArticleThumbnail thumbnail={thumbnail} />}
            >
                <Card.Meta title="Card title" description="This is the description" />
                <div style={{ marginTop: '4px' }}>
                    <CalendarOutlined />
                    <em style={{ fontSize: '0.8em' }}> 2020.01.01</em>
                </div>
            </Card>
        );
    }
}