<template>
	<div class="calendar">
		<VueDatePicker
			v-model="date"
			:model-auto="rangeDisabled ? false : true"
			locale="ru"
			:enable-time-picker="false"
			placeholder="Выберите дату"
			select-text="Выбрать"
			:format="format"
			:range="!rangeDisabled"
			:clearable="clearDisabled ? false : true"
			@cleared="clear"
		/>
	</div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
	components: { VueDatePicker },

	props: {
		initialDate: String,
		clearDisabled: Boolean,
		rangeDisabled: Boolean,
	},

	data() {
		return {
			date: this.getInitialDate(),
		};
	},

	computed: {
		queryFromDate() {
			return this.$route.query.from_date || null;
		},
		queryToDate() {
			return this.$route.query.to_date || null;
		},
	},

	watch: {
		queryFromDate: {
			immediate: true,
			deep: true,

			handler(newFromDate) {
				this.updateDateFromQuery(newFromDate, this.queryToDate);
			},
		},
		queryToDate: {
			immediate: true,
			deep: true,

			handler(newToDate) {
				this.updateDateFromQuery(this.queryFromDate, newToDate);
			},
		},
		date: {
			immediate: true,

			handler(newDate) {
				this.updateQueryParams(newDate);
			},
		},
	},

	methods: {
		format(date) {
			if (Array.isArray(date)) {
				const [startDate, endDate] = date.map(d => (d ? this.formatDate(new Date(d)) : null));
				return endDate ? `${startDate} – ${endDate}` : startDate;
			}

			return this.formatDate(new Date(date));
		},

		formatDate(date) {
			if (!(date instanceof Date) || isNaN(date)) return "";
			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
		},

		getInitialDate() {
			if (this.$route.query.from_date && this.$route.query.to_date) {
				return [new Date(this.$route.query.from_date), new Date(this.$route.query.to_date)];
			} else if (this.$route.query.to_date) {
				return new Date(this.$route.query.to_date);
			} else if (this.initialDate) {
				return new Date(this.initialDate);
			}

			return "";
		},

		updateDateFromQuery(from_date, to_date) {
			if (from_date && to_date) {
				this.date = [new Date(from_date), new Date(to_date)];
			} else if (to_date) {
				this.date = new Date(to_date);
			} else if (!from_date && !to_date && !this.initialDate) {
				this.date = "";
			}
		},

		updateQueryParams() {
			const query = { ...this.$route.query };

			if (Array.isArray(this.date)) {
				if (this.date.length === 2 && this.date[1]) {
					query.from_date = this.formatDate(this.date[0]);
					query.to_date = this.formatDate(this.date[1]);
				} else {
					query.to_date = this.formatDate(this.date[0]);
					delete query.from_date;
				}
			} else if (this.date) {
				query.to_date = this.formatDate(this.date);
				delete query.from_date;
			} else {
				delete query.from_date;
				delete query.to_date;
			}

			this.$router.replace({ query });
		},

		clear() {
			this.date = "";
			this.$router.replace({ query: { ...this.$route.query, from_date: undefined, to_date: undefined } });
		},
	},
};
</script>

<style lang="scss">
.dp__theme_light {
	--dp-input-padding: 10px 16px 10px 32px;
	--dp-font-family: "Inter", serif;
	--dp-primary-color: #f6350d;
	--dp-action-buttons-padding: 0.5rem 1rem;
	--dp-action-button-height: 2.5rem;
	--dp-preview-font-size: 1rem;
	--dp-border-radius: 8px;
}
.dp__action_buttons {
	flex: 0 0 50%;
}
.dp__action_button {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 0;
}
.dp__selection_preview,
.dp__action_cancel {
	display: none;
}
.dp__active_date:hover {
	background: var(--dp-primary-color);
	color: var(--dp-primary-text-color);
}
</style>
