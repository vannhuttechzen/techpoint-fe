<template>
  <ModalConfirmAccept :is-open="isModalConfirmOpen" :on-close="closeModalConfirm" :request-id="requestedId"
                      :gift-name="giftName" :selected-time="selectedTime"/>
  <ApprovalGiftRequest :is-open="isModalOpen" :on-close="closeModal" :request-id="requestedId"
                       :selected-time="selectedTime"/>
  <div>
    <table class="table text-white font-medium">
      <thead class="text-white">
      <tr>
        <th></th>
        <th>Người đổi quà</th>
        <th>Tên quà</th>
        <th>Số lượng</th>
        <th>Điểm</th>
        <th>Ngày đổi</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in dataPage" :key="index">
        <td @click="openModal(item.id)">
          <button class="flex items-center">
            <AlertCircleIcon/>
          </button>
        </td>
        <td>{{ item.user?.name }}</td>
        <td>{{ item.gift?.name }}</td>
        <td>{{ item.amount }}</td>
        <td>{{ item.pointUsed }}</td>
        <td>{{ item.createAt.slice(0, 10) }}</td>
        <td class="text-center">
          <button v-if="item.status === 0" class="bg-orange-400 w-20 h-8 rounded-md"
                  @click="openModalConfirm(item.id, item.gift?.name)">
            Trao quà
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
import '@vuepic/vue-datepicker/dist/main.css'
import {mapGetters} from "vuex";
import pagination from "@/components/pagination/pagination.vue";
import ApprovalGiftRequest from "@/components/gift-requested-management/ApprovalGiftRequest.vue";
import ModalConfirmAccept from "@/components/gift-requested-management/ModalConfirmAccept.vue";
import moment from "moment/moment";
import GiftsExchange from "@/api/GiftsExchange";
import Swal from "sweetalert2";

export default {
  name: "GiftRequested",
  components: {ModalConfirmAccept, ApprovalGiftRequest, pagination},
  data() {
    return {
      perPage: 8,
      currentPage: 1,
      totalPages: 0,
      dataPage: {},
      totalRequest: 0,
      isModalOpen: false,
      requestedId: null,
      giftName: null,
      isModalConfirmOpen: false,
      selectedTime: null
    }
  },
  created() {
    this.$store.dispatch('giftsExchange/fetchGiftsExchangeList')
    this.init()
  },
  computed: {
    ...mapGetters({
      giftsExchangeList: "giftsExchange/getList"
    })
  },
  methods: {
    async init() {
      this.totalRequest = this.giftsExchangeList.length
      this.totalPages = (this.giftsExchangeList.length / this.perPage).toFixed()
      this.dataPage = this.paginate(this.giftsExchangeList, this.perPage, 1)
    },
    onPageChange(page) {
      this.dataPage = this.paginate(this.giftsExchangeList, this.perPage, page);
      this.currentPage = page;
    },
    paginate(array, page_size, page_number) {
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    },
    openModal(id) {
      this.requestedId = id
      this.isModalOpen = true
      this.selectedTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    openModalConfirm(id, giftName) {
      this.requestedId = id
      this.giftName = giftName
      this.isModalConfirmOpen = true
      this.selectedTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    closeModal() {
      this.init()
      this.isModalOpen = false
    },
    closeModalConfirm() {
      this.init()
      this.isModalConfirmOpen = false
    }
  },
  watch: {
    "perPage": function () {
      this.dataPage = this.paginate(this.giftsExchangeList, this.perPage, this.currentPage);
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
    background-image: url("src/assets/images/table-back.jpg");
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
}

.table td {
    border-color: #F1F5F9;
    border-bottom-width: 10px;
}

.table tr {
    border-radius: 30px;
}
</style>

<style>
.dp__clear_icon {
    display: none;
    position: relative;
}

.font-special {
    font-family: 'Pacifico', cursive;
}
</style>