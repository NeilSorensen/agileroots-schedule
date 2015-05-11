'use strict';

var React = require('react/addons');
var moment = require('moment');

var timelineBlock = React.createClass({
	render:function(){
		var time = moment(this.props.startTime);
		var endTime = moment(this.props.endTime);
		var timeBlocks = [];
		while(time < endTime){
			timeBlocks.push(React.createElement('div', {class: 'time-30'}, time.format('h:mm')));
			time.setMinutes(time.getMinutes + 30);
		}
		
		return React.createElement('div', {class: 'timeline-block'}, timeBlocks);
	}
})