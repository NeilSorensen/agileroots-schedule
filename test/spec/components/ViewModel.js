'use strict';

describe('ViewModel', function() {
	var viewModel = require('components/viewModel.js');
	describe('When there is one session', function() {
		var startTime = 1434639600;
		var sessions = [{
			start_time: '2015-06-18 09:00:00',
			start_time_epoch: startTime,
			end_time_epoch:  1434642000,
			speakers: [
				{
					name: 'Diana Larsen'
				}
			],
			title: 'This is the talk'
		}];
		
		describe('when building an event block', function(){
			var block = viewModel.buildBlockStartingAt(sessions, startTime);
			it('should return a plenary block', function(){
				expect(block.blockType).toBe('plenary');
			});
		});
		
	});
});