import { Pagination } from 'antd';
import Router from 'next/router';

export default class CustomPagination extends React.Component {
  changePage = (data) => {
    const { query } = this.props;
    Router.push({
      pathname: '/',
      query: Object.assign(query, { page: data })
    });
  }

  render() {
    const { count, query } = this.props;
    return (
      <div className="pagination">
        <Pagination defaultCurrent={Number(query.page) ? Number(query.page) : 1} current={Number(query.page) ? Number(query.page) : 1} total={count} pageSize={20} showSizeChanger={false} responsive={true} onChange={this.changePage}>
        </Pagination>
      </div>
    );
  }
}