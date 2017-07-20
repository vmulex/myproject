import React from 'react';
import Header from './Header/header.js';
import styles from './styles/common.less';

class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {collapsed: false};
    }
    
    render() {
      return (
        <div>
          <Header />
          <Nav />
          <section>section</section>
          <footer>footer</footer>
        </div>
      )
    }
}

export default App;
