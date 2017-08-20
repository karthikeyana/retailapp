'use strict';

import { RetailApi } from './retail-api';

export default function(app) {

	new RetailApi(app);

}
