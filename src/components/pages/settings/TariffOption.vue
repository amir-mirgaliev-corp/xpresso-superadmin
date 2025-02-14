<template>
	<section class="tariff-container mt-[30px] flex flex-col
					items-center p-8 pb-20 bg-white rounded-[15px]
					shadow-drop space-y-6">
		
		<h2 class="text-[40px] font-bold text-gray-900">Тариф</h2>

		<div class="w-[800px] space-y-5 mt-2">
			<div class="flex items-center justify-between gap-5">
				<div class="custom-checkbox-container flex items-center gap-3 ">
					<input id="styled-checkbox" type="checkbox" class="styled-checkbox">
					<label for="styled-checkbox" class="styled-label">
						Минимальная сумма заказа для активации процента
					</label>
				</div>

				<FormInput
					width="150px" 
					placeholder="30 000 сум"
				/>
			</div>
				
				
			<div class="flex items-center justify-between gap-5">
				<RadioButton
					text="Фиксированная цена за услугу"
					color="#f85b00"
					label-color="#000000"
					font-size="1rem"
					font-weight="600"
				/>
				<FormInput width="150px" />
			</div>

			<div class="flex items-center justify-between gap-5">
				<RadioButton
					text="Проценты за предоставленную услугу"
					color="#f85b00"
					label-color="#000000"
					font-size="1rem"
					font-weight="600"
				/>
				<FormInput width="150px" />
			</div>
		</div>
	</section>
</template>

<script>
import FormInput from '@/components/ui/FormInput.vue';
import RadioButton from '@/components/ui/RadioButton.vue'; 

export default {
	components: {
		RadioButton,
		FormInput
	},
};
</script>

<style scoped>

.styled-checkbox-container {
	display: flex;
	align-items: center;
	gap: 10px;
}

.styled-checkbox {
	appearance: none;
	width: 25px;
	height: 25px;
	border: 2px solid #ccc;
	border-radius: 7px;
	position: relative;
	cursor: pointer;
	outline: none;
	transition: all 0.4s ease;
}

.styled-checkbox:checked {
	background: linear-gradient(145deg, #f85b00, #ff7700);
	border-color: #f85b00;
}

.styled-checkbox::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 14px;
	height: 14px;
	background: white;
	border-radius: 50%;
	transform: translate(-50%, -50%) scale(0);
	opacity: 0;
	transition: transform 0.4s ease, opacity 0.4s ease;
}

.styled-checkbox:checked::before {
	transform: translate(-50%, -50%) scale(1.3);
	opacity: 0.3;
}

.styled-checkbox::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 10px;
	height: 18px;
	border: solid white;
	border-width: 0 3px 3px 0;
	transform: translate(-50%, -50%) rotate(45deg) scale(0);
	transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
}

.styled-checkbox:checked::after {
	transform: translate(-50%, -50%) rotate(45deg) scale(1);
}

</style>