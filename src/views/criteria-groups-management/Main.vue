<template>
    <div v-if="activeGroup" class="flex gap-x-12 h-full">
        <div class="flex flex-col w-1/4">
            <GroupPanel :group-list="groupList"
                        :active-group="activeGroup"
                        :on-click-group-tab="clickGroupTab"
                        :on-delete-group="deleteGroup"
            />
        </div>
        <div class="w-3/4">
            <div class="flex flex-col gap-y-12">
                <div class="flex flex-col">
                    <AdminsPanel ref="adminsPanel" :active-group="activeGroup" :admin-list="activeGroup.admins"/>
                </div>

                <div class="flex flex-col">
                    <CriteriaPanel :data="activeGroup.criteria" :active-group="activeGroup"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CriteriaGroupTab from "@/components/criteria-group-manament/CriteriaGroupTab.vue";
import CriteriaPanel from "@/components/criteria-group-manament/CriteriaPanel.vue";
import {mapGetters} from "vuex";
import AdminsPanel from "@/components/criteria-group-manament/AdminsPanel.vue";
import GroupPanel from "@/components/criteria-group-manament/GroupPanel.vue";

export default {
    name: "CriteriaGroupManagementPage",
    components: {GroupPanel, CriteriaPanel, AdminsPanel, CriteriaGroupTab},
    data() {
        return {
            activeGroup: null,
            isOpen: false
        };
    },
    async created() {
        this.$store.dispatch("criteriaGroup/fetchCriteriaGroupList")
        this.$store.dispatch("users/fetchUsers")
    },
    computed: {
        ...mapGetters({
            groupList: "criteriaGroup/getList"
        }),
    },
    methods: {
        clickGroupTab(group) {
            this.activeGroup = group;
            this.$refs.adminsPanel.chosenAdminId = ""
        },
        deleteGroup(id) {
            // console.log("delete: ", id);
        },
    },
    watch: {
        groupList() {
            this.activeGroup = this.groupList[0]
        }
    }
};
</script>

<style>
@media screen and (max-width: 1280px) {
    .responsive {
        display: none;
    }
}
</style>
