import React from 'react';
import { Button, DatePicker } from 'antd';
// import DatePicker from 'antd/lib/date-picker';  // 加载 JS
// import 'antd/lib/date-picker/style/css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
            <DatePicker />
          </div>
        )
        
    }
}

export default App;
