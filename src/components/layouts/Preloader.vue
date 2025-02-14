<template>
	<div class="preloader">
		<ul>
			<li></li>
			<li></li>
			<li></li>
		</ul>

		<div class="cup"><span></span></div>
	</div>
</template>

<script>
export default {
	name: "Preloader",
};
</script>

<style scoped>
.preloader {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	z-index: 1000;
}

@keyframes wave {
	0% {
		opacity: 0;
		transform: translateY(15px);
	}
	50% {
		opacity: 1;
		transform: translateY(0);
	}
	100% {
		opacity: 0;
		transform: translateY(-15px);
	}
}
.preloader ul {
	margin: 0 0 10px 0;
	padding: 0;
	list-style: none;
	width: 60px;
	text-align: center;
	animation: wave 1.5s infinite ease-in-out;
	animation-fill-mode: forwards;
}
.preloader li {
	display: inline-block;
	background: #cfcfcf;
	opacity: 0.75;
	height: 30px;
	width: 9px;
	margin: 0 2px;
	border-radius: 0 100%;
	transform: rotate(12deg);
}
.cup {
	background: #f4350d;
	width: 60px;
	height: 54px;
	border-radius: 0 0 50% 50%;
	position: relative;
}
.cup:before {
	content: "";
	position: absolute;
	width: 66px;
	height: 20px;
	border-radius: 50%;
	background: inherit;
	left: -3px;
	top: -10px;
}
.cup:after {
	content: "";
	position: absolute;
	width: 56px;
	height: 12px;
	border-radius: 50%;
	background: #3a2f28;
	left: 2px;
	top: -6px;
}
.preloader span {
	background: #f4350d;
	width: 13px;
	height: 20px;
	position: absolute;
	right: -13px;
	top: 10px;
	border-radius: 0 50% 50% 0;
}
.preloader span:before {
	content: "";
	position: absolute;
	top: 4px;
	left: 0;
	background: #fff;
	width: 10px;
	height: 12px;
	border-radius: 0 50% 50% 0;
}
.preloader span:after {
	content: "";
	position: absolute;
	top: 40px;
	left: -50px;
	background: #f4350d;
	opacity: 0.25;
	width: 40px;
	height: 8px;
	border-radius: 50%;
}
</style>
