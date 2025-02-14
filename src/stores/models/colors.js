import color from "@/api/color";

export default {
    state: {
        color: {},
    },

    actions: {
        async fetchColors (context) {
            const colors = await color.getColor();
            context.commit('setColors', colors);
        }
    },

    mutations: {
        setColors (state, colors) {
            state.color = colors;
        }
    },

    getters: {
        getColors(state) {
            return state.color;
        }
    }
}