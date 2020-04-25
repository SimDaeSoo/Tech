import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
export default class Profile extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', padding: '3px', paddingBottom: '8px', borderRadius: '10px', color: 'white', backgroundColor: '#00151C' }}>
        {/* Thumbnail */}
        <div style={{ width: '180px', height: '180px', margin: 'auto', marginBottom: '6px', marginTop: '15px' }}>
          <img style={{ width: '100%', height: '100%', borderRadius: '10px' }} src='/uploads/4d8298ed79c8431a9daa3f926cf5fa98.PNG' />
        </div>

        {/* NickName */}
        <div style={{ fontSize: '1.2em', marginLeft: '4px' }}>심대수 (daesoo94)</div>
        <div style={{ display: 'flex' }}>
          <GoogleOutlined style={{ margin: '2px 12px 2px 8px', fontSize: '1em' }} />
          <span style={{ fontSize: '0.8em', marginTop: '1px' }}>tlaeotn123@gmail.com</span>
        </div>
        <div style={{ display: 'flex', marginBottom: '4px' }}>
          <GithubOutlined style={{ margin: '2px 12px 2px 8px', fontSize: '1em' }} />
          <span style={{ fontSize: '0.8em', marginTop: '1px' }}>https://github.com/SimDaeSoo</span>
        </div>

        {/* Career */}
        <div style={{ borderTop: 'solid', borderWidth: 'thin', paddingTop: '4px', borderColor: '#0A1F25' }}>
          <div style={{ height: '22px', margin: '4px', fontSize: '0.9em', display: 'flex' }}>
            <img style={{ width: '22px', height: '22px', marginRight: '8px', borderRadius: '4px' }} src='/uploads/3dd388025ec64b80a1c0a97a8b158b05.jpg' />
            <span style={{ marginRight: '5px' }}>devCat</span>
            <span style={{ fontSize: '0.9em', marginTop: '2px' }}>2018.09 - 2020.02</span>
          </div>
          <div style={{ height: '22px', margin: '4px', fontSize: '0.9em', display: 'flex' }}>
            <img style={{ width: '22px', height: '22px', marginRight: '8px', borderRadius: '4px' }} src='/uploads/785f6689047d4d478b0d593eb9c45f6a.png' />
            <span style={{ marginRight: '5px' }}>Smart Study</span>
            <span style={{ fontSize: '0.9em', marginTop: '2px' }}>2020.02 ~ </span>
          </div>
        </div>

        {/* Favorite */}
        <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: '#1890ff', margin: '2px', display: 'inline-block' }}>React.js</div>
        <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: '#1890ff', margin: '2px', display: 'inline-block' }}>Next.js</div>
        <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: '#1890ff', margin: '2px', display: 'inline-block' }}>Vue.js</div>
        <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: '#1890ff', margin: '2px', display: 'inline-block' }}>Node.js</div>
        <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: '#1890ff', margin: '2px', display: 'inline-block' }}>StrAPI</div>
        <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: '#1890ff', margin: '2px', display: 'inline-block' }}>AWS</div>
        <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: '#1890ff', margin: '2px', display: 'inline-block' }}>RDB</div>
        <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: '#1890ff', margin: '2px', display: 'inline-block' }}>MongoDB</div>
        <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: '#1890ff', margin: '2px', display: 'inline-block' }}>Socket.io</div>
        <div style={{ fontSize: '0.7em', padding: '2px', borderRadius: '4px', backgroundColor: '#1890ff', margin: '2px', display: 'inline-block' }}>Docker</div>
      </div>
    );
  }
}