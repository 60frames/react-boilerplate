import logger from 'andlog';
import React from 'react';
import Boilerplate from './components/boilerplate';

logger.info('App started...');

React.render(<Boilerplate />, document.getElementById('content'));
