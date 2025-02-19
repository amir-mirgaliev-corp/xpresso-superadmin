<template>
	<table class="table border-separate border-spacing-0 w-full overflow-hidden">
		<thead>
			<tr>
				<th
					v-for="(head, index) in filteredThead"
					:key="head"
					class="border-[1px] p-[12px_16px] text-left max-lg:px-3 max-lg:text-sm"
					:class="{
						'rounded-tr-[10px]': index === content.thead.length - 1,
						'rounded-tl-[10px]': index === 0,
					}"
				>
					{{ head }}
				</th>
			</tr>
		</thead>

		<tbody v-if="content.content.length">
			<tr v-for="(row, rowIndex) in content.content" :key="row.id" @click="handleRowClick(row.id)">
				<td
					v-for="(value, key) in filteredRow(row)"
					:key="key"
					class="border-[1px] p-[12px_16px] max-lg:px-3 max-lg:text-sm"
					:class="{
						'cursor-pointer': editLink,
						'w-[1%]': ['index', 'avatar', 'actions'].includes(key),
						'text-center': ['actions'].includes(key),
					}"
				>
					<div v-if="key === 'avatar'" class="flex justify-center items-center drop-shadow">
						<img :src="value" alt="avatar" class="w-[36px] h-[36px] rounded-[8px]" />
					</div>

					<template v-else-if="content.actions && key === 'actions'">
						<ActionsList :actions="content.actions" @action="action => handleAction(action, row)" />
					</template>

					<p v-else class="table__value table__status" :class="getStatusClass(value)">
						{{ value }}
					</p>
				</td>
			</tr>
		</tbody>
		<tbody v-else>
			<tr>
				<td class="border-[1px] p-[12px_16px] text-center" :colspan="content.thead.length">
					Отсутствуют данные в таблице или не были найдены
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import ActionsList from "./ActionsList.vue";

export default {
	emits: ["action"],
	props: {
		content: {
			type: Object,
			required: true,
		},
		editLink: {
			type: Object,
			required: false,
		},
	},

	computed: {
		filteredThead() {
			return this.content.thead.filter(head => head.toLowerCase() !== "id");
		},
	},

	methods: {
		filteredRow(row) {
			return Object.fromEntries(Object.entries(row).filter(([key]) => key !== "id"));
		},

		handleRowClick(rowId) {
			if (this.editLink) {
				this.$router.push(`${this.editLink}/${rowId}`);
			}
		},

		getStatusClass(value) {
			const valueClasses = {
				Готов: "border-[1px] text-center border-blue-500 bg-blue-100 text-blue-500",
				Успешно: "border-[1px] text-center border-green-500 bg-green-100 text-green-500",
				Принято: "border-[1px] text-center border-green-500 bg-green-100 text-green-500",
				Готовится: "border-[1px] text-center border-orange-500 bg-orange-100 text-orange-500",
				Отменено: "border-[1px] text-center border-red-500 bg-red-100 text-red-500",
				Обработка: "border-[1px] text-center border-[#DC6803] bg-[#F9DBAF] text-[#DC6803]",
			};

			return valueClasses[value] || "";
		},

		handleAction(action, row) {
			this.$emit("action", { action, id: row.id });
		},
	},

	components: {
		ActionsList,
	},
};
</script>

<style lang="scss" scoped>
.table {
	th {
		background-color: #fff;
	}

	tr {
		transition: $transition;
		&:nth-child(odd) {
			background-color: #f9fafb;
		}
		&:hover {
			background-color: rgba($color: $primary, $alpha: 0.05);
		}
		&:last-child {
			td:first-child {
				border-bottom-left-radius: 10px;
			}
			td:last-child {
				border-bottom-right-radius: 10px;
			}
		}
	}

	&__status {
		padding: 4px 8px;
		border-radius: 15px;
	}
}
</style>
