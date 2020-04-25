import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

export default class ToggleNav extends React.Component {
  render() {
    const { isCollapsed, toggleNav } = this.props;
    return (
      <div style={{ transition: 'all 0.2s', fontSize: '1.5em', position: 'fixed', top: '0px', left: isCollapsed ? -8 : 212, color: 'white', padding: '10px', paddingLeft: '16px', paddingRight: '12px', backgroundColor: '#1890ff', borderRadius: '6px' }} onClick={toggleNav}>
        {isCollapsed && <MenuUnfoldOutlined />}
        {!isCollapsed && <MenuFoldOutlined />}
      </div>
    );
  }
}