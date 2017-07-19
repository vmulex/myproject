import React from 'react';
import { Row, Col } from 'antd';

class Option1 extends React.Component {
	render() {
		return (
			<div>
			    <Row>
			      <Col span={24}>
					<span>这是一个学习react的过程</span>
			      </Col>
			    </Row>
			    <Row>
			      <Col span={8}>
					<span>Javascript</span>
			      </Col>
			      <Col span={8}>
					<span>Html</span>
			      </Col>
			      <Col span={8}>
					<span>Css</span>
			      </Col>
			    </Row>
			</div>
		)
	}
}

export default Option1;