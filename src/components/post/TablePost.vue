<template>
    <el-table
            height="calc(63vh - 8px)"
            v-loading="loadingComputed"
            :data="postComputed"
            style="width: 100%">
        <el-table-column
                prop="name"
                label="Tiêu đề"
                fixed>
            <template #default="post">
                <span v-if="post.row.title" class="post-title break-normal detail">
                    {{ post.row.title }}
                </span>
                <i v-else class="text-muted">Đang cập nhật</i>
            </template>
        </el-table-column>
        <el-table-column
                prop="name"
                label="Tác giả"
        >
            <template #default="post">
                <span v-if="post.row.created_by">
                    {{ post.row.author.name }}
                </span>
                <i v-else class="text-muted">Đang cập nhật</i>
            </template>
        </el-table-column>
        <el-table-column
                prop="name"
                label="Nhóm bài viết"
        >
            <template #default="post">
                <span v-if="post.row.post_category_id">
                    {{ post.row.post_category_id.name }}
                </span>
                <span v-else class="text-muted">Đang cập nhật</span>
            </template>
        </el-table-column>
        <el-table-column
                width="180px"
                label="Trạng thái"
                align="center"
                v-if="hasPermission('edit-post')"
        >
            <template #default="post">
                <el-switch
                        @change="changeStatusShow(post.row.status, post.row._id)"
                        v-model="post.row.status"
                        :inactive-value="0"
                        :active-value="1"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="action"
            label="Hành động"
            v-if="hasPermission('edit-post') || hasPermission('delete-post') || hasPermission('update-status-post')"
        >
            <template #default="post">
                <div class="action">
                    <el-tooltip class="item" effect="dark" content="Chỉnh sửa" placement="top">
                        <a  v-if="hasPermission('edit-post')"
                            class="btn btnRecharge el-button el-button--primary"
                            @click="editPost(post.row._id)">
                            <el-icon><EditPen /></el-icon>
                        </a>
                    </el-tooltip>

                    <el-tooltip class="item" effect="dark" content="Xóa" placement="top">
                        <a  v-if="hasPermission('delete-post')"
                            class="btn btnRecharge el-button el-button--danger"
                            @click="handleDeletePost(post.row._id)">
                            <el-icon><Delete /></el-icon>
                        </a>
                    </el-tooltip>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrap" v-if="posts.length > 0">
        <div class="pagination-wrap--view">
            <el-select v-model="viewSelected" placeholder="Select" @change="handleFilter(null,1)">
                <el-option
                        v-for="item in views"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="pagination-wrap--page" v-if="pageComputed">
            <div class="mr-4">Tổng: {{ pageComputed.total }}</div>
            <el-pagination
                    layout="prev, pager, next"
                    :total="pageComputed.total"
                    :page-size="pageComputed.pageSize"
                    :current-page="pageComputed.currentPage"
                    @current-change="handleChangeCurrentPage()">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {computed, onMounted, reactive, ref, toRaw} from "vue";
import api from "@/utils/services/_api_service";
import {ElMessage, ElMessageBox} from "element-plus";
import _ from "lodash";
import {POST_STATUS} from "@/utils/constants/_constant";
import {Getters} from "@/store/enums/_type_enum";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import moment from "moment";

export default {
	name: "TablePost",
	props: {
		posts: {
			type: Array
		},
		loading: {
			type: Boolean
		},
		page: {
			type: Object
		}
	},
	setup(props, context) {
		const store = useStore()
        const router = useRouter()

		let postComputed = computed(() => toRaw(props.posts))
		let loadingComputed = computed(() => toRaw(props.loading))
		let pageComputed = computed(() => toRaw(props.page))

		let postStatus = ref([]);
		let viewSelected = ref(20);
		let postContent = ref({});
		let views = reactive([
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
		]);

		onMounted(() => {
			postStatus.value = POST_STATUS
		})

        const editPost = (id) => {
            router.push({name: 'UpdatePost', params: {id: id}});
        }

		const hasPermission = (per) => {
			return store.getters[`authModule/${Getters.HAS_PERMISSION}`](per)
		}

		const handleChangeCurrentPage = (page) => {
			handleFilter(null, page)
		}

		const handleFilter = (val = null, page = null) => {
			let payload = {}
			payload.val = val

			if (page) {
				payload.page = page
			} else {
				payload.page = pageComputed.value.currentPage
			}

			payload.per_page = viewSelected.value

			getListOrders(payload)
		}

		const getListOrders = (payload) => {
			context.emit('handleRefreshData', payload);
		}

		const changeStatusShow = (status, id) => {
			let data = {
				status: status ? 1 : 0
			}
			api.updateStatusShowPost(data, id).then(() => {
				ElMessage({
					message: 'Cập nhật trạng thái thành công!',
					type: 'success',
				})
			}).catch((error) => {
				let messageError = _.get(error.response, 'data.message');
				ElMessage.error(messageError ? messageError : "Có lỗi xảy ra, vui lòng thử lại sau!")
			});
		}

        const handleDeletePost = (id) => {
            ElMessageBox.confirm(
                'Dữ liệu đã xóa không thể phục hồi! Bạn có muốn tiếp tục?',
                'Cảnh báo',
                {
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy',
                    type: 'warning',
                    confirmButtonClass: 'btn-delete',
                    cancelButtonClass: 'btn-close',
                }
            ).then(() => {
                api.deletePost(id).then(() => {
                    ElMessage({
                        message: 'Xóa bài viết thành công!',
                        type: 'success',
                    })

                    handleChangeCurrentPage(pageComputed.value.currentPage)
                }).catch((error) => {
                    if (error) {
                        ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!")
                    }
                })
            })
        }

        const formatDate = (data) => {
            let datetime = new Date(data * 1000)
            return moment(datetime).format("HH:mm DD/MM/YYYY")
        }

		return {
			loadingComputed,
			postComputed,
			pageComputed,
			viewSelected,
			views,
			postStatus,
            postContent,
			handleChangeCurrentPage,
			handleFilter,
			changeStatusShow,
			hasPermission,
            editPost,
            handleDeletePost,
            formatDate
		}
	}
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/post/table";
</style>