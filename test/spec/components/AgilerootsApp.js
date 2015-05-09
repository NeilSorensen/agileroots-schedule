'use strict';

describe('AgilerootsApp', function () {
  var React = require('react/addons');
  var AgilerootsApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    AgilerootsApp = require('components/AgilerootsApp.js');
    component = React.createElement(AgilerootsApp);
  });

  it('should create a new instance of AgilerootsApp', function () {
    expect(component).toBeDefined();
  });
});
