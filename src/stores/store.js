import { createStore } from "vuex";

import users from "./models/users";
import color from "./models/colors";
import orders from "./models/orders";
import chains from "./models/chains";
import leaders from "./models/leaders";
import profile from "./models/profile";
import products from "./models/products";
import branches from "./models/branches";
import graphics from "./models/graphics";
import transport from "./models/transport";
import statistic from "./models/statistic";
import commission from "./models/commission";
import modificator from "./models/modificator";
import transactions from "./models/transactions";
import avatar from "./models/avatar";
import faq from "./models/faq";
import docs from "./models/docs";
import categories from "./models/categories";
import additives from "./models/additives";
import admins from "./models/admins";

export default createStore({
	modules: {
		color,
		users,
		orders,
		chains,
		leaders,
		profile,
		products,
		branches,
		graphics,
		transport,
		statistic,
		commission,
		modificator,
		transactions,
		avatar,
		faq,
		docs,
		categories,
		additives,
		admins,
	},
});
