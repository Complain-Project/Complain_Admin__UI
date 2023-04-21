<template>
	<section>
		Quản lý nhân viên
	</section>
</template>

<script>
import {useStore} from "vuex";
import {onMounted} from "vue";
import {Mutations} from "@/store/enums/_type_enum";

export default {
	name: "UserView",
	setup() {
		const store = useStore();
		
		/* Lifecycle hooks::start */
		onMounted(() => {
			store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 2)
		});
		/* Lifecycle hooks::end */
	}
}
</script>

<style scoped lang="scss">

</style>