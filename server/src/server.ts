process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import ShopRoute from '@routes/shop.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new AuthRoute(), new ShopRoute()]);

app.listen();
