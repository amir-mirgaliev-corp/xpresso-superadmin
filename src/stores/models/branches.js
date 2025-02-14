import branches from "@/api/branches";

export default {
    state: {
        topBranches: [],
        branches: [],
        branch: {}
    },

    actions: {
        async fetchBranches(context, {id, params}) {
            const resBranches = await branches.getBranches(id, params);
            context.commit('setBranches', resBranches);
        },

        async fetchOneBranchById(context, id) {
            const resBranch = await branches.getOneBranch(id);
            context.commit('setOneBranch', resBranch);
        },

        async fetchTopBranches (context, params) {
            const topBranches = await branches.getTopBranches(params);
            context.commit('setTopBranches', topBranches);
        }
    },

    mutations: {
        setBranches(state, branches) {
            state.branches = branches;
        },

        setOneBranch(state, branch) {
            state.branch = branch;
        },

        setTopBranches(state, topBranches) {
            state.topBranches = topBranches;
        }
    },

    getters: {
        getBranches(state) {
            return state.branches;
        },

        getOneBranch(state) {
            return state.branch;
        },

        getTopBranches(state) {
            return state.topBranches;
        }
    }
};
