<template>
	<section class="clients">
		<div class="mb-4 bg-white rounded-[0.5rem] sm:hidden">
			<HeaderSearch />
		</div>
		<ClientFilter @filter="handleFilter" />
		<AllClients :filters="filters" />
	</section>
</template>

<script>
import HeaderSearch from "@/components/layouts/content_layout/header-ui/HeaderSearch.vue";
import AllClients from "@/components/pages/clients/AllClients.vue";
import ClientFilter from "@/components/pages/clients/ClientFilter.vue";

export default {
	components: {
		ClientFilter,
		AllClients,
		HeaderSearch
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
