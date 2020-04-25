import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

export default class ToggleNav extends React.Component {
  render() {
    const { isCollapsed, toggleNav } = this.props;
    return (
      <div style={{ transition: 'all 0.2s', fontSize: '1.5em', position: 'fixed', top: '64px', left: isCollapsed ? -8 : 212, color: 'white', width: '42px', height: '33px', paddingLeft: '13px', backgroundColor: '#1890ff', borderRadius: '8px' }} onClick={toggleNav}>
        {isCollapsed && <MenuUnfoldOutlined />}
        {!isCollapsed && <MenuFoldOutlined />}
      </div>
    );
  }
}