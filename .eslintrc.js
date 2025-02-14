module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-recommended",
		"plugin:prettier/recommended",
	],
	rules: {
		"prettier/prettier": [
			"warn",
			{
				endOfLine: "auto",
			},
		],
	},
};
