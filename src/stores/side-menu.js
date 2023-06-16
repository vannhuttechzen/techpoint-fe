import {defineStore} from 'pinia'

export const useSideMenuStore = defineStore('sideMenu', {
    state: () => ({
        menu: [
            {
                icon: 'GiftIcon',
                pageName: 'Tich diem nhan qua',
                title: 'lang.SIDEBAR.CG1',
                id: 0,
                subMenu: [
                    {
                        icon: 'UsersIcon',
                        pageName: 'admin-group-criteria',
                        title: 'lang.SIDEBAR.CG2',
                        id: 0,
                        subMenu: [
                            {
                                icon: "GridIcon",
                                pageName: 'admin-group-criteria',
                                title: "lang.SIDEBAR.CG8",
                                id: 5
                            },
                            {
                                icon: "TrelloIcon",
                                pageName: 'points-requested',
                                title: "lang.SIDEBAR.CG9",
                                id: 6
                            }
                        ]
                    },
                    {
                        icon: 'ArchiveIcon',
                        pageName: 'Quản lí quà tặng',
                        title: 'lang.SIDEBAR.CG3',
                        id: 1,
                        subMenu: [
                            {
                                icon: "ShoppingBagIcon",
                                pageName: 'gift-management',
                                title: "lang.SIDEBAR.CG7",
                                id: 4
                            },
                            {
                                icon: "GitPullRequestIcon",
                                pageName: 'gifts-requested',
                                title: "lang.SIDEBAR.CG6",
                                id: 4
                            }
                        ]
                    }
                ]
            }
        ]
    })
})
