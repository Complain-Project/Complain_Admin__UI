<template>
	<div id="dashboard">
		<el-card v-if="hasPermission('DAB-L')">
			<div class="flex items-center max-w-2xl">
				<el-select
					v-model="district" @change="handleFilter"
					class="mr-3.5 w-1/3" clearable
					placeholder="Chọn huyện" size="large">
					<el-option
						v-for="item in districts"
						:key="item._id"
						:label="item.name"
						:value="item._id"
					/>
				</el-select>
				
				<el-date-picker
					v-model="dateFilter"
					@change="handleFilter"
					type="daterange"
					range-separator="-"
					start-placeholder="Bắt đầu"
					end-placeholder="Kết thúc"
					size="large"
				/>
			</div>
			
			<canvas ref="statistical" class="!w-full !h-[calc(100vh_-_200px)]"></canvas>
		</el-card>
	</div>
</template>

<script>

import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { Getters, Mutations } from "@/store/enums/_type_enum";
import Chart from "chart.js/auto";
import api from "@/utils/services/_api_service";
import { ElMessage } from "element-plus";
import _ from "lodash";
import moment from "moment"

export default {
	name: "TheDashboard",
	setup() {
		const store = useStore();
		
		/* Variables::start */
		const loading = ref(false);
		const statistical = ref(null);
		let chart = null;
		const chartConfig = reactive({
			type: "bar",
			data: {
				labels: [],
				datasets: [
					{
						label: 'Tất cả',
						data: [],
						borderColor: "#007e6d",
						backgroundColor: "#50bfaf",
						borderWidth: 2,
						borderRadius: 5,
						borderSkipped: false,
					},
					{
						label: 'Đã xử lý',
						data: [],
						borderColor: "#059bff",
						backgroundColor: "#82cdff",
						borderWidth: 2,
						borderRadius: 5,
						borderSkipped: false,
					},
					{
						label: 'Chưa xử lý',
						data: [],
						borderColor: "#be5900",
						backgroundColor: "#f68c2d",
						borderWidth: 2,
						borderRadius: 5,
						borderSkipped: false,
					},
				]
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Biểu đồ thống kê khiếu nại'
					},
					position: 'top',
				},
			}
		});
		const dateFilter = ref([]);
		const district = ref('');
		
		const districts = ref([]);
		/* Variables::end */
		
		/* Lifecycle hooks::start */
		onMounted(() => {
			store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 1);
			
			if (hasPermission("DAB-L")) {
				initChart();
				getDistricts();
				getStatisticals();
			}
		});
		
		const initChart = () => {
			chart = new Chart(statistical.value, chartConfig);
		};
		/* Lifecycle hooks::end */
		
		const hasPermission = (per) => {
			return store.getters[`authModule/${Getters.HAS_PERMISSION}`](per)
		}
		
		const getDistricts = () => {
			api.getDistricts().then((res) => {
				districts.value = _.get(res, 'data.data')
			}).catch(() => {
				ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!")
			});
		}
		
		const getStatisticals = (params = {}) => {
			api.getStatisticals(params).then((res) => {
				let statisticals = _.get(res, 'data.data');
				updateChart(statisticals);
			}).catch(() => {
				ElMessage.error("Có lỗi xảy ra, vui lòng thử lại sau!")
			});
		}
		
		const updateChart = (statisticals) => {
			chart.data.labels = statisticals.labels;
			chart.data.datasets[0].data = statisticals.total;
			chart.data.datasets[1].data = statisticals.processed;
			chart.data.datasets[2].data = statisticals.no_process;
			chart.update();
		}
		
		const handleFilter = () => {
			let params = {}
			if(district.value) {
				params.district_id = district.value
			}
			
			if(dateFilter.value && dateFilter.value.length > 0) {
				params.start_time = moment(dateFilter.value[0]).format('YYYY-MM-DD');
				params.end_time = moment(dateFilter.value[1]).format('YYYY-MM-DD');
			}
			
			getStatisticals(params)
		}
		
		return {
			loading,
			statistical,
			dateFilter,
			district,
			districts,
			initChart,
			hasPermission,
			handleFilter
		};
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
