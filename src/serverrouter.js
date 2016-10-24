import express from 'express';
import serverRenderer from './server'

const router = express.Router();
let middleware = serverRenderer;

router.use((req, res, next) => {
    middleware()(req, res, next);
});

if (module.hot) {
    module.hot.accept('./server', () => {
        middleware = require('./server').default;
    });
}

export default router;
