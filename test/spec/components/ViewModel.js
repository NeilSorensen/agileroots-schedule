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
			it('should contain the session', function(){
				expect(block.sessions).toContain(sessions[0]);
			});
			it('should have the correct start time', function(){
				expect(block.startTime).toBe(startTime);
			});
		});
	});
	
	describe('When using three sequential sessions', function(){
		var sessions = [{
			start_time: '2015-06-18 09:00:00',
			start_time_epoch: 1434639600,
			end_time_epoch:  1434642000,
			speakers: [
				{
					name: 'Diana Larsen'
				}
			],
			title: 'This is the Talk'
		},{
			start_time: '2015-06-18 10:00:00',
			start_time_epoch: 1434643200,
			end_time_epoch: 1434645600,
			speakers: [
				{name: 'Jeff Patton'}
			],
			title: 'Jeffs Awesome Talk'
		},{
			start_time: '2015-06-18 10:00:00',
			start_time_epoch: 1434646800,
			end_time_epoch: 1434649200,
			speakers: [
				{name: 'Mary Poppendick'}
			],
			title: 'Lean is Number One'
		}];
		
		describe('when building all events for the day', function(){
			var allBlocks = viewModel.buildEventsForDay(sessions);
			it('should have three event blocks', function(){
				expect(allBlocks.length).toBe(3);
			});
		});
	});
	
	describe('when using a sample day', function(){
		var sampleData = require('../data/sampleData.js');
		describe('when building an event block for a plenary event', function(){
			var block = viewModel.buildBlockStartingAt(sampleData.sessions, sampleData.plenaryStartTime);
			it('should have one session', function(){
				expect(block.sessions.length).toBe(1);
			});
			it('should start at the start time', function(){
				expect(block.startTime).toBe(sampleData.plenaryStartTime);
			});
			it('should be the right length', function(){
				expect(block.halfHours).toBe(2);
			});
		});
		describe('when building an event block for a breakout event', function(){
			var block = viewModel.buildBlockStartingAt(sampleData.sessions, sampleData.breakoutStartTime);
			it('should return a breakout block', function(){
				expect(block.blockType).toBe('breakout');
			});
			it('should have 10 sessions', function(){
				expect(block.sessions.length).toBe(10);
			});
			it('should have the right start time', function(){
				expect(block.startTime).toBe(sampleData.breakoutStartTime);
			});
			it('should be the right length', function(){
				expect(block.halfHours).toBe(3);
			});
		});
		
		describe('when building all events for the day', function(){
			var allBlocks = viewModel.buildEventsForDay(sampleData.sessions);
			it('should have the right number of events', function(){
				expect(allBlocks.length).toBe(7);
			});
		});
	});
	
	describe('when creating a break event block', function() {
		
	});
});