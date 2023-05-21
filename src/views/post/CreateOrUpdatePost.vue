<template>
    <div id="post">
        <section class="action">
            <el-row class="action-wrap">
                <el-col :span="24" class="action-wrap--col">
                    <Breadcrumb/>
                </el-col>
            </el-row>
        </section>
        <div class="post__content">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-card>
                        <div class="post__content__header border-b border-solid font-bold pb-2 mb-2">
                            Thông tin chung
                        </div>
                        <div class="post__content__title mb-4">
                            <div class="label-post required">Tiêu đề</div>
                            <el-input v-model="post.title"
                                      size="large"
                                      placeholder="Nhập tiêu đề bài viết">
                            </el-input>
                            <div v-if="errors.title !== '' " class="error text-[#f54b5e] mt-0.5 text-xs">
                                <span> {{ errors.title }} </span>
                            </div>
                        </div>
                        <div class="post__content__short mb-4">
                            <div class="label-post required">Tóm tắt</div>
                            <el-input v-model="post.short_content"
                                      type="textarea"
                                      :autosize="{ minRows: 4, maxRows: 5 }"
                                      size="large"
                                      placeholder="Nhập tóm tắt bài viết">
                            </el-input>
                            <div v-if="errors.short_content !== '' " class="error text-[#f54b5e] mt-0.5 text-xs">
                                <span> {{ errors.short_content }} </span>
                            </div>
                        </div>
                        <div class="post__content__short">
                            <div class="label-post required">Nội dung</div>
                            <Editor @newContent="getNewContent" :content="post.content" :isCreate="isCreate"></Editor>
                            <div v-if="errors.content !== '' " class="error text-[#f54b5e] mt-0.5 text-xs">
                                <span> {{ errors.content }} </span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="mb-5">
                        <div class="post__content__header border-b border-solid font-bold pb-2 mb-2">
                            Hiển thị
                        </div>
                        <el-checkbox v-model="post.status"
                                     :true-label="1"
                                     :false-label="0"
                                     label="Trang chủ"
                                     size="large" />
                    </el-card>
                    <el-card class="mb-5">
                        <div class="post__content__header border-b border-solid font-bold pb-2 mb-2 required">
                            Banner
                        </div>
                        <div class="upload__wrapper__upload relative w-full">
                            <el-upload
                                    class="avatar-uploader flex justify-center" action="#"
                                    :auto-upload="false" :show-file-list="false"
                                    :on-change="handleChangeAvatar">
                                <img v-if="post.banner" :src="post.banner" class="avatar">
                                <el-icon v-else class="el-icon-plus avatar-uploader-icon"><Plus /></el-icon>
                            </el-upload>
                        </div>
                        <div v-if="errors.banner !== '' " class="error text-[#f54b5e] mt-0.5 text-xs">
                            <span> {{ errors.banner }} </span>
                        </div>
                    </el-card>
                    <el-card class="mb-5">
                        <div class="post__content__header border-b border-solid pb-2 mb-2">
                            <div class="flex justify-between">
                                <div class="font-bold">
                                    Nhãn
                                    <el-tooltip
                                            class="box-item"
                                            effect="dark"
                                            content="Gắn nhãn (tag) giúp khách dễ tìm kiếm bài viết trên website hơn"
                                            placement="top"
                                    >
                                        <el-icon class="!text-[#f36a26]"><InfoFilled /></el-icon>
                                    </el-tooltip>
                                </div>
                                <div class="text-[#409EFF] cursor-pointer" @click="openAllTags()">
                                    Tất cả các nhãn
                                </div>
                            </div>
                        </div>
                        <el-select
                                v-model="post.post_tag_ids"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                :reserve-keyword="false"
                                placeholder="Chọn hoặc tạo mới nhãn"
                                size="large"
                                id="placeholderSelect"
                                class="w-full"
                                @change="changeTag"
                                ref="mySelect"
                        >
                            <el-option
                                    v-for="item in tags"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id"
                            />
                        </el-select>
                    </el-card>
                    <el-card>
                        <div class="post__content__header border-b border-solid font-bold pb-2 mb-2">
                            Nhóm bài viết
                        </div>
                        <el-select v-model="post.post_category_id"
                                   class="w-full"
                                   placeholder="Chọn nhóm bài viết"
                                   filterable
                                   clearable
                                   size="large"
                                   no-data-text="Không có dữ liệu">
                            <el-option
                                    v-for="item in categories"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id"
                                    class="my-1">
                            </el-option>
                        </el-select>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <section class="post-action">
            <div class="post-action--wrap">
                <el-row class="post-row">
                    <el-col :span="12" class="post-row__col">
                        <div class="post-row__col__left">
                            <el-button
                                    class="!bg-[#f56c6c]"
                                    @click="handleDeletePost()"
                                    v-if="!isCreate && hasPermission('POST-DEL')" type="danger">
                                Xóa
                            </el-button>
                        </div>
                    </el-col>
                    <el-col :span="isCreate ? 24 : 12" class="post-row__col">
                        <div class="post-row__col__right">
                            <el-button type="info" @click="returnListPost()" class="button-cancel !bg-[#909399]">Hủy
                            </el-button>
                            <el-button v-if="isCreate && hasPermission('POST-C')" class="button-apply" @click="handleCreatePost()">
                                Lưu
                            </el-button>
                            <el-button v-else-if="hasPermission('POST-U')" class="button-apply" @click="handleUpdatePost()">
                                Lưu
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </section>
        <el-dialog
                title="Danh sách nhãn"
                v-model="dialogTags"
                class="modal-tags"
                width="40%">
            <div class="tags-product">
                <div class="tags-product--selected mb-4 border-b border-solid">
                    <div class="title-wrap font-bold mb-2">
                        Nhãn đã chọn
                    </div>
                    <div class="mb-2">
                        <div class="tags-product--selected__tags" v-if="selectedTags.length > 0">
                            <el-tag
                                    v-for="(select, index) in selectedTags"
                                    :key="select._id"
                                    closable
                                    size="medium"
                                    @close="clearTag(index)"
                                    class="select-tag mr-1"
                                    type="info">
                                {{ select.name }}
                            </el-tag>
                        </div>
                        <i v-else class="text-muted">Chưa có nhãn nào được chọn</i>
                    </div>
                </div>
                <div class="tags-product--all">
                    <div class="title-wrap font-bold mb-2">
                        Tất cả nhãn
                    </div>
                    <div class="tags-product--all__tags" v-if="tags.length > 0">
                        <el-tag
                                v-for="option in tags"
                                :key="option._id"
                                class="cursor-pointer mr-1"
                                :class="post.post_tag_ids.includes(option._id) ? '!bg-[#0000004f] !text-white' : ''"
                                size="medium"
                                @click="selectTag(option._id)"
                                type="info">
                            {{ option.name }}
                        </el-tag>
                    </div>
                    <i v-else class="text-muted">Chưa có nhãn</i>
                </div>
            </div>
            <template #footer>
                <el-button class="close-delete" @click="dialogTags = false">Đóng</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { Getters, Mutations } from "@/store/enums/_type_enum";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import _ from "lodash";
import api from "@/utils/services/_api_service";
import Editor from "@/components/editor/Editor.vue";

export default {
    name: "CreateOrUpdatePost",
    components: {
        Editor,
        Breadcrumb
    },
    setup(){
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const post = reactive({
            _id: "",
            title: "",
            short_content: "",
            content: "",
            banner: "",
            file: "",
            post_category_id: "",
            post_tag_ids: [],
            status: 0
        })
        const categories = ref([])
        const selectedTags = ref([])
        const dialogTags = ref(false)
        const tags = ref([])
        const isCreate = ref(true)
        const errors = reactive({
            title: "",
            short_content: "",
            content: "",
            banner: ""
        })
        const titleBreadcrumb = ref("")
        const mySelect = ref(null)

        onMounted(async () => {
            post._id = route.params.id
            if(post._id && !hasPermission('POST-U')){
                return router.push({name: 'Home', params: {errorPermission: "true"}});
            }
            if(!post._id && !hasPermission('POST-C')){
                return router.push({name: 'Home', params: {errorPermission: "true"}});
            }
            await checkPage()
            getListTags()
            getListCategories()
            store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 6)
            store.commit(`homeModule/${Mutations.SET_BREADCRUMB}`, [
                {
                    path: '/',
                    name: 'Trang Chủ',
                },
                {
                    path: '/posts',
                    name: 'Bài viết',
                },
                {
                    path: window.location.pathname,
                    name: titleBreadcrumb.value,
                    icon: 'el-icon-shopping-cart-2'
                }
            ])
        })

        watchEffect(() => {
            if (mySelect.value && mySelect.value.$refs.input) {
                const inputEl = mySelect.value.$refs.input;
                inputEl.addEventListener("keyup", handleKeyUp);
            }
        });

        watch(post, () => {
            if (post.title.length > 0){
                errors.title = ""
            }
            if (post.short_content.length > 0){
                errors.short_content = ""
            }
            if (post.content.length > 0){
                errors.content = ""
            }
            if (post.banner.length > 0){
                errors.banner = ""
            }
        }, {deep: true})

        const checkPage = () => {
            isCreate.value = true
            titleBreadcrumb.value = "Thêm mới bài viết"
            if(post._id){
                titleBreadcrumb.value = "Cập nhật bài viết"
                getDetailPost()
            }
        }

        const getDetailPost = async () => {
            api.getDetailPost(post._id).then((res) => {
                post.title = _.get(res, "data.data.title", "")
                post.short_content = _.get(res, "data.data.short_content", "")
                post.content = _.get(res, "data.data.content", "")
                post.banner = _.get(res, "data.data.banner_src", "")
                post.post_tag_ids = _.get(res, "data.data.post_tag_ids", [])
                post.post_category_id = _.get(res, "data.data.post_category_id", "")
                post.status = _.get(res, "data.data.status", 0)
                isCreate.value = false
            }).catch(() => {
                ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!")
            })
        }
        const handleChangeAvatar = (file) => {
            let fileTypes = [
                "image/jpg",
                "image/jpeg",
                "image/png",
                "image/JPG",
                "image/JPEG",
                "image/PNG",
                "image/gif",
            ]

            let fileType = fileTypes.includes(file.raw.type);
            let fileSize = file.size / 1024 / 1024  < 2.048;

            if (!fileType) {
                errors.banner = "";
                ElMessage.error("Ảnh banner không đúng định dạng. Chỉ hỗ trợ định dạng jpg, jpeg, png, gif.")
            }
            if (!fileSize) {
                errors.banner = "";
                ElMessage.error("Kích thước ảnh banner không được vượt quá 2MB.")
            }

            if (fileType && fileSize) {
                post.file = file.raw;
                post.banner = URL.createObjectURL(file.raw);
            }
        }
        const getNewContent = (data) => {
            post.content = data
        }
        const getListCategories = () => {
            api.getListCategories().then((res) => {
                categories.value = _.get(res, "data.data")
            }).catch(() => {
                ElMessage.error( "Có lỗi xảy ra, vui lòng thử lại sau!")
            })
        }
        const handleCreatePost = () => {
            if (validateData()){
                let data = new FormData();
                data.append("title", post.title)
                data.append("short_content", post.short_content)
                data.append("content", post.content)
                data.append("status", post.status ? 1: 0)
                data.append("banner", post.file)
                if(post.post_tag_ids.length > 0){
                    post.post_tag_ids.forEach((item, i) => {
                        data.append("post_tag_ids[" + i + "]", item)
                    })
                }
                if(post.post_category_id){
                    data.append("post_category_id", post.post_category_id)
                }
                api.createPost(data).then(() => {
                    ElMessage({
                        message: 'Tạo mới bài viết thành công !',
                        type: 'success',
                    })
                    router.push({name: 'Post'})
                }).catch((error) => {
                    returnError(error)
                })
            }
        }

        const handleUpdatePost = () => {
            if (validateData()){
                let data = new FormData();
                data.append("title", post.title)
                data.append("short_content", post.short_content)
                data.append("content", post.content)
                data.append("status", post.status ? 1: 0)
                if (post.file){
                    data.append("banner", post.file)
                }
                post.post_tag_ids.forEach((item, i) => {
                    data.append("post_tag_ids[" + i + "]", item)
                })
                if(post.post_category_id){
                    data.append("post_category_id", post.post_category_id)
                }
                api.updatePost(data, post._id).then(() => {
                    ElMessage({
                        message: 'Cập nhật bài viết thành công !',
                        type: 'success',
                    })
                    router.push({name: 'Post'})
                }).catch((error) => {
                    returnError(error)
                })
            }
        }

        const handleDeletePost = () => {
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
                api.deletePost(post._id).then(() => {
                    ElMessage({
                        message: 'Xóa bài viết thành công !',
                        type: 'success',
                    })
                    router.push({name: 'Post'})
                }).catch(() => {
                    ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!")
                })
            })
        }

        const returnError = (error) => {
            let status = _.get(error, "response.statusCode");
            let errorDetails = _.get(error.response, 'data.details[0]', {});

            if (Object.keys(errorDetails).length > 0) {
                errors.title = _.get(errorDetails, 'title', "");
                errors.short_content = _.get(errorDetails, 'short_content', "");
                errors.content = _.get(errorDetails, 'content', "");
                if(_.get(errorDetails, 'banner', "")){
                    if(post.banner.length === 0){
                        errors.banner = 'Banner không được để trống'
                    }
                }
            } else if (status === 401) {
                router.push({name: 'Login'})
            } else if (status === 403) {
                router.push({name: 'Home', params: {errorPermission: "true"}});
            } else {
                let messageError = _.get(error.response, 'data.message');
                ElMessage.error(messageError ? messageError : "Có lỗi xảy ra, vui lòng thử lại sau!")
            }
        }
        const validateData = () => {
            let error = false
            if (post.title.length === 0) {
                error = true;
                errors.title = 'Tiêu đề bài viết không được để trống';
            }
            if (post.short_content.length === 0) {
                error = true;
                errors.short_content = "Tóm tắt bài viết không được để trống"
            }
            if (post.content.length === 0) {
                error = true;
                errors.content = 'Nội dung bài viết không được để trống';
            }
            if (post.banner.length === 0){
                error = true
                errors.banner = 'Banner không được để trống'
            }
            return !error
        }
        const clearTag = (index) => {
            post.post_tag_ids.splice(index,1)
            changeTag()
        }
        const selectTag = (id) => {
            let index = _.findIndex(post.post_tag_ids, (o) => {
                return o === id
            })
            if (index !== -1) {
                clearTag(index)
            } else {
                post.post_tag_ids.push(id)
            }
            changeTag()
        }
        const getListTags = async () => {
            await api.getListTags().then((res) => {
                tags.value = _.get(res, "data.data")
            }).catch(() => {
                ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!")
            })
        }
        const createTag = (name) => {
            let data = {
                name: name
            }
            api.createTag(data).then(async (res) => {
                await getListTags()
                setTimeout(() => {
                    post.post_tag_ids.push(_.get(res, "data.data"))
                }, 350)
            }).catch(() => {
                ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!")
            })
        }
        const changeTag = async () => {
            selectedTags.value = []
            let last = post.post_tag_ids.pop()
            if(last){
                let exist = _.find(tags.value, (o) => {
                    return o._id === last || o.name === last
                })
                if(!exist){
                    await createTag(last)
                }else{
                    post.post_tag_ids.push(last)
                }
                post.post_tag_ids.forEach((id) => {
                    tags.value.forEach((tag) => {
                        if(tag._id === id){
                            selectedTags.value.push(tag)
                        }
                    })
                })
            }
        }
        const handleKeyUp = (event) => {
            if (event.keyCode === 13) {
                post.post_tag_ids.push(mySelect.value.$refs.input.value)
                changeTag()
            }
        }

        const openAllTags = () => {
            dialogTags.value = true
            selectedTags.value = []
            post.post_tag_ids.forEach((id) => {
                tags.value.forEach((tag) => {
                    if(tag._id === id){
                        selectedTags.value.push(tag)
                    }
                })
            })
        }

        const returnListPost = () => {
            return router.push({name: "Post"})
        }
        const hasPermission = (per) => {
            return store.getters[`authModule/${Getters.HAS_PERMISSION}`](per)
        }

        return {
            post,
            errors,
            categories,
            isCreate,
            tags,
            dialogTags,
            selectedTags,
            mySelect,
            openAllTags,
            clearTag,
            selectTag,
            handleChangeAvatar,
            getNewContent,
            handleCreatePost,
            handleUpdatePost,
            handleDeletePost,
            getListCategories,
            changeTag,
            returnListPost,
            hasPermission,
        }
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/post/detail.scss";
</style>