<template>
	<section class="clients">
		<ClientFilter @filter="handleFilter" />
		<AllClients :filters="filters" />
	</section>
</template>

<script>
import AllClients from "@/components/pages/clients/AllClients.vue";
import ClientFilter from "@/components/pages/clients/ClientFilter.vue";

export default {
	components: {
		ClientFilter,
		AllClients,
	},

	data() {
		return {
			filters: [],
		};
	},

	methods: {
		handleFilter(data) {
			this.filters = data;
		},
	},
};
</script>
