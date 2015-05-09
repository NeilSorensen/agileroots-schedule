'use strict';

var AgilerootsApp = require('./AgilerootsApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={AgilerootsApp}>
    <Route name="/" handler={AgilerootsApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
