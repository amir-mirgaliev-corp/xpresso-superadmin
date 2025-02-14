import { ref, onUnmounted } from "vue";
import { io } from "socket.io-client";

export function useSocket(url, options = {}) {
	const socket = io(url, { transports: ["websocket"], path: "/socket/", ...options });
	const notifications = ref([]);

	const playSound = () => {
		const audio = new Audio("/notification.mp3");
		audio.play();
	};

	socket.connect();

	socket.on("connect", () => console.log("WebSocket connected"));
	socket.on("disconnect", () => console.log("WebSocket disconnected"));

	socket.on("newOrder", data => {
		notifications.value.push({
			order_id: data.item.order_id,
			type: "new",
			text: data.messages.ru || "Новый заказ",
			time: data.currentTime,
		});

		playSound();
	});

	socket.on("cancelOrder", data => {
		notifications.value.push({
			order_id: data.item.order_id,
			type: "cancel",
			text: data.messages.ru || "Заказ отменен",
			time: data.currentTime,
		});

		playSound();
	});

	onUnmounted(() => socket.disconnect());

	return { notifications };
}
