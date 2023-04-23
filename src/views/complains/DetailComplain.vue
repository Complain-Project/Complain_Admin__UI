<template>
	<section class="detail-complain">
		<section class="action">
			<el-row class="action-wrap">
				<el-col :span="24" class="action-wrap--col">
					<Breadcrumb />
				</el-col>
			</el-row>
		</section>
		<div class="detail-complain__wrapper">
			<el-card>
				<el-row :gutter="40">
					<el-col :span="5" class="border-r border-solid h-[calc(81vh)]">
						<div class="complain__contact">
							<div class="font-bold text-base">
								<div class="flex items-center mb-2">
									<div class="w-[31px] h-[31px] flex items-center justify-center rounded-full"
									     :style="{backgroundColor: randomBackground()}"
									     v-if="user.name">
										<span class="font-bold text-xl text-white">{{ user.name.charAt(0) }}</span>
									</div>
									<el-avatar v-else :size="31" :src="avatarDefault" />
									<div v-if="user.name" class="font-bold text-base ml-4">
										{{ user.name }}
									</div>
									<i v-else class="text-muted ml-4">Đang cập nhật</i>
								</div>
							</div>
							
							<hr class="mt-2 mb-6">
							
							<div class="complain__contact__item flex items-center mb-3">
								<div class="content ml-2">
									<span class="mr-2 font-bold">Bí danh :</span>
									<span v-if="user.aliases">{{ user.aliases }}</span>
									<span class="text-muted" v-else>Đang cập nhật</span>
								</div>
							</div>
							<div class="complain__contact__item flex items-center mb-3">
								<div class="content ml-2">
									<span class="mr-2 font-bold">Ngày sinh :</span>
									<span v-if="user.birthday">{{ formatBirthday(user.birthday) }}</span>
									<span class="text-muted" v-else>Đang cập nhật</span>
								</div>
							</div>
							<div class="complain__contact__item flex items-center mb-3">
								<div class="content ml-2">
									<span class="mr-2 font-bold">Số điện thoại :</span>
									<span v-if="user.phone">{{ user.phone }}</span>
									<span class="text-muted" v-else>Đang cập nhật</span>
								</div>
							</div>
							<div class="complain__contact__item flex items-center mb-3">
								<div class="content ml-2">
									<span class="mr-2 font-bold">Email :</span>
									<span v-if="user.email">{{ user.email }}</span>
									<span class="text-muted" v-else>Đang cập nhật</span>
								</div>
							</div>
							<div class="complain__contact__item flex items-center mb-3">
								<div class="content ml-2">
									<span class="mr-2 font-bold">Số CMND/CCCD :</span>
									<span v-if="user.account_name">{{ user.account_name }}</span>
									<span class="text-muted" v-else>Đang cập nhật</span>
								</div>
							</div>
							<div class="complain__contact__item flex items-center mb-3">
								<div class="content ml-2">
									<span class="mr-2 font-bold">Trạng thái :</span>
									<span>{{ user.status ? "Kích hoạt" : "Khóa" }}</span>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="19">
						<div>
							<div class="complain-content">
								<el-row>
									<el-col :span="20">
										<div class="title font-bold text-xl mb-1">
											{{ "#" + complain.code + ": " + complain.title }}
										</div>
										<i class="mb-3">({{ complain?.district?.name + ", " + formatDateComplain(complain.created_at) }})</i>
										<div class="content mt-3">
											{{ complain.content }}
										</div>
									</el-col>
									<el-col :span="4">
										<a :href="complain.attachment"
										   download class="flex justify-end"
										   v-if="complain.attachment">
											<el-button type="primary" class="!bg-[#409eff]">
												<el-icon>
													<Download />
												</el-icon>
												<span class="ml-0.5">File đính kèm</span>
											</el-button>
										</a>
									</el-col>
								</el-row>
							
							</div>
							<div class="complain-reply mt-5" v-if="complain?.reply">
								<hr>
								<div class="respondent pt-4">
									<div class="flex">
										<div class="w-[230px] flex items-center">
											<el-avatar :size="35"
											           :src="complain?.respondent?.avatar ? complain.respondent.avatar : userDefault" />
											<p class="admin-name ml-2 font-bold">{{ complain?.respondent?.name }}</p>
										</div>
										<div class="mb-5">{{ complain?.reply }}</div>
									</div>
									<div class="complain-reply__content">
										<div class="time" v-if="complain.appointment_time">
											<div class="px-[230px] mb-10">
												<i class="font-bold">Giấy hẹn:</i>
												<div class="text-center font-bold text-base">
													<p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
													<p>Độc lập - Tự do - Hạnh phúc</p>
													<p>------------</p>
												</div>
												<p class="text-right my-3"><i>{{ complain?.district?.name }},
													{{ formatDateComplain(complain.updated_at) }}</i></p>
												<p class="text-center text-xl font-bold">THÔNG BÁO</p>
												<div class="text-base">
													<p class="text-center font-bold">Về việc thụ lý giải quyết khiếu nại
														{{ complain?.code }}</p>
													<p class="mt-8">Kính gửi: Ông(Bà) {{ user?.name }}</p>
													<p>Địa chỉ: {{ complain?.district?.name }}</p>
													<p>Số CMND/CCCD: {{ user?.account_name }}</p>
													<p>Khiếu nại về việc: {{ complain.title }}</p>
													<p>Sau khi xem xét nội dung đơn khiếu nại, căn cứ Luật khiếu nại năm
														2011, đơn khiếu nại đủ điều kiện thụ lý và thuộc thẩm quyền giải
														quyết của UBND {{ complain?.district?.name }}</p>
													<p>Đơn khiếu nại đã được thụ lý giải quyết kể từ
														{{ formatDate(complain.appointment_time) }}</p>
													<p>Vậy thông báo để Ông(Bà) {{ user?.name }} được biết.</p>
													<p class="text-right font-bold">Người đứng đầu cơ quan, tổ chức, đơn
														vị</p>
													<p class="text-right mr-10"><i>(Ký, ghi rõ họ tên và đóng dấu)</i>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div v-else class="mt-5">
								<el-input
									v-model="reply"
									:rows="7"
									type="textarea"
									placeholder="Nhập nội dung phản hồi"
								/>
								<div v-if="errorReply !== '' " class="error text-red-500 mt-1">
									<span> {{ errorReply }} </span>
								</div>
								<div class="mt-5">
									<el-checkbox class="font-bold" v-model="checkReply" label="Giấy hẹn"></el-checkbox>
									<el-date-picker
										:disabled="!checkReply"
										class="ml-5"
										v-model="pickDate"
										placeholder="Chọn lịch hẹn"
										size="large"
										type="datetime"
										format="HH:mm DD/MM/YYYY"
										value-format="x"
									/>
									<div v-if="errorDate !== '' " class="error text-red-500 mt-1">
										<span> {{ errorDate }} </span>
									</div>
								</div>
								
								<div class="text-right mt-3">
									<el-button class="!bg-[#409eff]" type="primary" @click="replyComplain()">Phản hồi</el-button>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</el-card>
		</div>
	</section>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onMounted, reactive, ref, watch } from "vue";
import { Mutations } from "@/store/enums/_type_enum";
import _ from "lodash";
import api from "@/utils/services/_api_service";
import complain from "./Complain.vue";
import moment from "moment";
import { ElMessage } from "element-plus";
import { Download } from "@element-plus/icons-vue";

export default {
	name: "DetailComplain",
	computed: {
		complain() {
			return complain;
		}
	},
	components: { Breadcrumb },
	setup() {
		const store = useStore();
		const route = useRoute();
		
		const reply = ref("");
		const pickDate = ref("");
		const checkReply = ref(false);
		const userDefault = ref(require("@/assets/images/userDefault.png"));
		const avatarDefault = reactive("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png");
		const listBackground = reactive([
			"#000000",
			"#fc9b00",
			"#f24d34",
			"#00d0bf",
			"#8cbe5c",
			"#cb8f62"
		]);
		const complain = reactive({});
		const loading = ref(false);
		const user = ref("");
		const errorReply = ref("");
		const errorDate = ref("");
		const icon = reactive({
			shield: require("@/assets/images/icons/shield.svg"),
			status: require("@/assets/images/icons/sliders-simple.svg"),
			points: require("@/assets/images/icons/bullseye-pointer.svg"),
			referralCode: require("@/assets/images/icons/share-from-square.svg"),
			phone: require("@/assets/images/icons/phone.svg")
		});
		
		watch(checkReply, () => {
			if (!checkReply.value) {
				pickDate.value = "";
			}
		});
		
		/* Lifecycle hooks::start */
		onMounted(async () => {
			await detailComplain();
			store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 5);
			store.commit(`homeModule/${Mutations.SET_BREADCRUMB}`, [
				{
					path: "/",
					name: "Trang Chủ"
				},
				{
					path: "/complains",
					name: "Danh sách khiếu nại"
				},
				{
					path: window.location.pathname,
					name: "Chi tiết phiếu khiếu nại ",
					icon: "el-icon-shopping-cart-2"
				}
			]);
			
		});
		/* Lifecycle hooks::end */
		const randomBackground = () => {
			let colors = localStorage.getItem("color-complain");
			let color = listBackground[Math.floor(Math.random() * listBackground.length)];
			let complainView = {
				_id: user.value._id,
				color: color
			};
			if (colors) {
				let list = JSON.parse(colors);
				let index = _.findIndex(list, (o) => {
					return user.value._id === o._id;
				});
				if (index !== -1) {
					color = list[index]["color"];
				} else {
					list.push(complainView);
					localStorage.setItem("color-complain", JSON.stringify(list));
				}
			} else {
				localStorage.setItem("color-complain", JSON.stringify([complainView]));
			}
			return color;
		};
		
		const detailComplain = () => {
			api.getDetailComplain(route.params.id).then((res) => {
				user.value = _.get(res, "data.data.user");
				complain._id = _.get(res, "data.data._id");
				complain.code = _.get(res, "data.data.code");
				complain.title = _.get(res, "data.data.title");
				complain.content = _.get(res, "data.data.content");
				complain.district = _.get(res, "data.data.district");
				complain.status = _.get(res, "data.data.status");
				complain.respondent = _.get(res, "data.data.respondent");
				complain.reply = _.get(res, "data.data.reply");
				complain.created_at = _.get(res, "data.data.created_at");
				complain.updated_at = _.get(res, "data.data.updated_at");
				complain.appointment_time = _.get(res, "data.data.appointment_time");
				complain.attachment = _.get(res, "data.data.attachment");
				randomBackground();
			});
		};
		
		const formatDateComplain = (date) => {
			let day = "ngày " + moment(_.cloneDeep(date)).format("DD");
			let month = "tháng " + moment(_.cloneDeep(date)).format("MM");
			let year = "năm " + moment(_.cloneDeep(date)).format("YYYY");
			return day + " " + month + " " + year;
		};
		const formatDate = (date) => {
			let hour = moment(_.cloneDeep(date)).format("HH:mm");
			let day = "ngày " + moment(_.cloneDeep(date)).format("DD");
			let month = "tháng " + moment(_.cloneDeep(date)).format("MM");
			let year = "năm " + moment(_.cloneDeep(date)).format("YYYY");
			return hour + " " + day + " " + month + " " + year;
		};
		const formatBirthday = (date) => {
			let datetime = new Date(date * 1000);
			return moment(datetime).format("DD/MM/YYYY");
		};
		
		const replyComplain = () => {
			if (validateReply()) {
				let data = {
					reply: reply.value
				};
				if (checkReply.value) {
					data.appointment_time = pickDate.value;
				}
				api.replyComplain(data, complain._id).then(() => {
					ElMessage({
						message: "Phản hồi khiếu nại thành công!",
						type: "success"
					});
					detailComplain();
				}).catch(() => {
					ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!");
				});
			}
		};
		
		const validateReply = () => {
			let error = false;
			if (reply.value.length === 0) {
				error = true;
				errorReply.value = "Nội dung phản hồi không được để trống";
			}
			if (checkReply.value) {
				if (pickDate.value.length === 0) {
					error = true;
					errorDate.value = "Lịch hẹn không được bỏ trống";
				}
			}
			return !error;
		};
		
		watch(reply, () => {
			errorReply.value = "";
		});
		watch(pickDate, () => {
			errorDate.value = "";
		});
		watch(checkReply, () => {
			errorDate.value = "";
		});
		
		return {
			user,
			icon,
			complain,
			Download,
			userDefault,
			avatarDefault,
			loading,
			reply,
			checkReply,
			pickDate,
			errorReply,
			errorDate,
			randomBackground,
			formatDateComplain,
			formatDate,
			replyComplain,
			formatBirthday
		};
	}
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/complain/detail";
</style>