<template>
	<section>
		Dashboard
	</section>
</template>

<script>
import {useStore} from "vuex";
import {onMounted} from "vue";
import {Mutations} from "@/store/enums/_type_enum";

export default {
	name: "DashboardView",
	setup() {
		const store = useStore();
		
		/* Variables::start */
		
		/* Variables::end */
		
		/* Lifecycle hooks::start */
		onMounted(() => {
			store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 1)
		});
		/* Lifecycle hooks::end */
		
		/* Function::start */
		
		/* Function::end */
	}
}
</script>

<style scoped lang="scss">

</style>