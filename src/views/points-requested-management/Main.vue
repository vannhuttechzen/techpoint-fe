<template>
  <DetailPointsRequest :is-open="isModalDetailOpen" :on-close="closeModalDetail" :data-detail="dataDetail"
                       :selected-time="selectedTime"/>
  <ModalConfirmApprove :is-open="isModalConfirmOpen" :on-close="closeModalConfirm" :data-detail="dataDetail"
                       :selected-time="selectedTime" :status="status"/>
  <div>
    <table class="table text-white font-medium">
      <thead class="text-white">
      <tr>
        <th></th>
        <th>Người tích điểm</th>
        <th>Tên tiêu chí</th>
        <th>Số điểm</th>
        <th>Ngày gửi yêu cầu</th>
        <th></th>
      </tr>
      </thead>
      <tbody class="text-sky-800 font-bold">
      <tr v-for="(item, index) in dataPage" :key="index">
        <td>
          <button class="flex items-center" @click="openModalDetail(item)">
            <AlertCircleIcon/>
          </button>
        </td>
        <td>{{ item.user?.name }}</td>
        <td>{{ item.criterion?.name }}</td>
        <td>{{ item.point }}</td>
        <td>{{ item.createAt.slice(0, 10) }}</td>
        <td class="text-center text-white w-60">
          <button class="bg-green-400 w-20 h-8 rounded-md"
                  v-if="item.status === 0"
                  @click="openModalConfirm(item, 1)">
            Duyệt
          </button>
          <button class="bg-rose-400 w-20 h-8 rounded-md ml-2"
                  v-if="item.status === 0"
                  @click="openModalConfirm(item, 2)">
            Từ chối
          </button>
          <i class="fa-regular fa-circle-check fa-2xl" style="color: #23da16;" v-if="item.status === 1"></i>
          <i class="fa-regular fa-circle-xmark fa-2xl" style="color: #f20d0d;" v-if="item.status === 2"></i>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
    <!-- BEGIN: Pagination -->
  <div v-if="totalPages > 1"
       class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3">
    <pagination :currentPage="currentPage" :perPage="perPage" :totalPages="totalPages" @pagechanged="onPageChange"/>
    <select v-model="perPage" class="lg:col-span-4 w-20 form-select box mt-3 sm:mt-0">
      <option value="8">8</option>
      <option value="16">16</option>
      <option value="24">24</option>
      <option value="50">50</option>
    </select>
  </div>
    <!-- END: Pagination -->
</template>

<script>
import AdminTagForPointsRequested from "@/components/criteria-group-manament/AdminTagForPointsRequested.vue";
import DetailPointsRequest from "@/components/point-requested-management/DetailPointsRequest.vue";
import ModalConfirmApprove from "@/components/point-requested-management/ModalConfirmApprove.vue";
import pagination from "@/components/pagination/pagination.vue";
import {mapGetters} from "vuex";
import moment from "moment";

export default {
  name: "PointsRequested",
  components: {ModalConfirmApprove, DetailPointsRequest, AdminTagForPointsRequested, pagination},
  data() {
    return {
      isModalDetailOpen: false,
      isModalConfirmOpen: false,
      chosenAdminId: "",
      perPage: 8,
      currentPage: 1,
      totalPages: 0,
      dataPage: {},
      totalRequest: 0,
      dataDetail: {},
      status: 0,
      selectedTime: null,
      newPointRequestList: []
    }
  },
  created() {
    this.$store.dispatch('pointsExchange/fetchPointsRequestedList')
    this.init()
  },
  computed: {
    ...mapGetters({
      fetchPointsRequestedList: "pointsExchange/getList"
    }),
    ...mapGetters('auth', ["uid"])
  },
  methods: {
    async init() {
      this.newPointRequestList = []
      this.fetchPointsRequestedList.map((item) => {
        item?.adminToGroup.map((ele) => {
          if (ele?.user.id === this.uid) {
            this.newPointRequestList.push(item)
          }
        })
      })
      this.totalRequest = this.newPointRequestList.length
      this.totalPages = Math.ceil(this.newPointRequestList.length / this.perPage)
      this.dataPage = this.paginate(this.newPointRequestList, this.perPage, 1)
    },
    onPageChange(page) {
      this.dataPage = this.paginate(this.newPointRequestList, this.perPage, page);
      this.currentPage = page;
    },
    paginate(array, page_size, page_number) {
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    },
    openModalDetail(item) {
      this.dataDetail = item
      this.isModalDetailOpen = true
      this.selectedTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    closeModalDetail(props) {
      this.isModalDetailOpen = false
      if (props != 0 || props == false) {
        this.init()
      }
    },
    openModalConfirm(item, status) {
      this.dataDetail = item
      this.status = status
      this.isModalConfirmOpen = true
      this.selectedTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    closeModalConfirm() {
      this.isModalConfirmOpen = false
      this.init()
    }
  },
  watch: {
    "perPage": function () {
      this.dataPage = this.paginate(this.fetchPointsRequestedList, this.perPage, this.currentPage);
      this.init()
    }
  }
}
</script>

<style scoped>
thead {
    background-image: url("src/assets/images/resquested-head.jpg");
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    border-radius: 10px;
}

tbody {
    background-image: url("src/assets/images/points-requested-back.jpg");
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
}

.table td {
    border-color: #F1F5F9;
    border-bottom-width: 10px;
    min-height: 84px;
    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
}

.table th {
    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
}

.table tr {
    border-radius: 30px;
}
</style>
