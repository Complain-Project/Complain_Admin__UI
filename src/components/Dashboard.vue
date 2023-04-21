<template>
  <div id="dashboard">

  </div>
</template>

<script>

import {onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import {Mutations} from "@/store/enums/_type_enum";

export default {
  name: 'TheDashboard',
  setup() {
    const store = useStore();

    /* Variables::start */
    const defaultProductImage = ref('https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png')
    const view = ref(20)
    const loading = ref(false)
    const views = reactive([
      {
        value: 20,
        label: 'Hiển thị 20'
      },
      {
        value: 50,
        label: 'Hiển thị 50'
      },
      {
        value: 100,
        label: 'Hiển thị 100'
      },
    ])
    const page = reactive({
      currentPage: 1,
      pageSize: 20,
      total: 0,
      from: 0,
      to: 0,
      last_page: 1,
    })
    /* Variables::end */

    /* Lifecycle hooks::start */
    onMounted(() => {
      store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 1)
    });
    /* Lifecycle hooks::end */


    return {
      defaultProductImage,
      views,
      view,
      loading,
      page
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
