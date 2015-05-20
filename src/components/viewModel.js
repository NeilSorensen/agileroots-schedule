'use strict';

function blockLengthInHalfHours(startTimeSeconds, endTimeSeconds){
	var lengthInSeconds = endTimeSeconds - startTimeSeconds;
	return Math.ceil((lengthInSeconds / 60) / 30);
}

module.exports = {
	buildBlockStartingAt: function(sessions, startTime){
		var sessionsStartingAt = sessions.filter(function(session) {
			return session.start_time_epoch == startTime;
		});
		var endTime = Math.max.apply(null, sessionsStartingAt.map(function(s) {return s.end_time_epoch;}));
		var sessionsInBlock = sessions.filter(function(session){
			return session.start_time_epoch >= startTime && session.end_time_epoch <= endTime;
		});
		return {
			blockType: sessionsInBlock.length === 1 ? 'plenary': 'breakout',
			sessions: sessionsInBlock,
			startTime: startTime,
			endTime: endTime,
			halfHours: blockLengthInHalfHours(startTime,  endTime)
		};	
	},
	buildEventsForDay: function(sessions){
		var nextBlockStarts = Math.min.apply(null, sessions.map(function(s){ return s.start_time_epoch;}));
		var dayEnd = Math.max.apply(null, sessions.map(function(s){ return s.end_time_epoch;}));
		var lastBlockEnds = 0;
		var blocks = [];
		while(lastBlockEnds < dayEnd){
			var nextBlock = this.buildBlockStartingAt(sessions, nextBlockStarts);
			blocks.push(nextBlock);
			lastBlockEnds = nextBlockStarts + 60*30*nextBlock.halfHours;
			nextBlockStarts = Math.min.apply(null, sessions.map(function(s){ return s.start_time_epoch;}).filter(function(t) {return t >= lastBlockEnds}));
		}
		return blocks;
	},
	buildBreak: function(breakStart, breakEnd){
		var halfHours = blockLengthInHalfHours(breakStart, breakEnd);
		return {
			blockType: halfHours > 1 ? 'lunch' : 'break',
			startTime: breakStart,
			halfHours: halfHours
		};
	}
};