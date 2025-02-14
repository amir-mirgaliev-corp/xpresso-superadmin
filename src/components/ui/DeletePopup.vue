.<template>
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
		<div class="deletepopup__container w-[440px] h-[320px] 
				border-[1px] rounded-[20px] flex flex-col
				justify-center items-center bg-white"
	>
		<div class="trash__content bg-[#E73B36]
					flex justify-center items-center
					rounded-full p-5 mb-8"
		>
			<Trash />
		</div>
		{{ text }}
		<div class="flex gap-3 mt-[40px]">
			<Button 
				width="160px" height="40px"
				bgColor="#E1E1E1"
				text="Отменить"
				borderColor="#E1E1E1"
				borderRadius="5px"
				@click="toggleDelete"
			/>
			<Button 
				width="160px" height="40px"
				bgColor="#E73B36"
				color="#fff"
				text="Удалить"
				borderColor="none"
				borderRadius="5px"
				@click="deleteItem"
			/>
		</div>
	</div>
	</div>
	
</template>

<script>
import Trash from '../icons/delete/Trash.vue';
import Button from './Button.vue';

export default {
	props:{
		text:{
			type: String,
			default: 'Вы действительно хотите удалить?'
		}
	},

	components:{
		Trash,
		Button
	},

	methods: {
		toggleDelete () {
			this.$emit('toggleDelete')
		},

		deleteItem () {
			this.$emit('deleteItem')
		}
	}
}
</script>
