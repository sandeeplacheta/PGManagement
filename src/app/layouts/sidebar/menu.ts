import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 0,
        label: 'Masters',
        icon: 'book',
        subItems: [
            {
                id: 1,
                label: 'Company Master',
                link: '/master/companymaster',
                parentId: 1
            },
            {
                id: 2,
                label: 'Configuration Master',
                link: '/master/configuration',
                parentId: 1
            },
            {
                id: 3,
                label: 'GeoLocations',
                icon: 'book',
                // link: '/master/entity',
                // parentId: 1
                subItems: [
                    {
                        id: 4,
                        label: 'Entity',
                        link: '/master/entity',
                        parentId: 8
                    },
                    {
                        id: 5,
                        label: 'Location',
                        link: '/master/location',
                        parentId: 8
                    },
                    {
                        id: 5,
                        label: 'Building',
                        link: '/master/building',
                        parentId: 8
                    },
                    {
                        id: 5,
                        label: 'Floor',
                        link: '/master/floor',
                        parentId: 8
                    },
                    
                    {
                        id: 5,
                        label: 'Room Type',
                        link: '/master/roomtype',
                        parentId: 8
                    },
                    {
                        id: 5,
                        label: 'Room',
                        link: '/master/room',
                        parentId: 8
                    }
                ]
            },
            {
                id: 4,
                label: 'Designation Master',
                link: '/master/designation',
                parentId: 1
            },
            {
                id: 5,
                label: 'User Role Master',
                link: '/master/userroles',
                parentId: 1
            },
            {
                id: 6,
                label: 'Employee Master',
                link: '/master/employee',
                parentId: 1
            },
        ]
    },{
        id: 1,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.SALES.TEXT',
        icon: 'monitor',
        link: '/',
        badge: {
            variant: 'badge-secondary-subtle',
            text: 'MENUITEMS.SALES.BADGE',
        },
    },
    {
        id: 4,
        label: 'MENUITEMS.APPLICATIONS.TEXT',
        isTitle: true
    },
    {
        id: 11,
        label: 'MENUITEMS.CONTACTS.TEXT',
        icon: 'book',
        subItems: [
            {
                id: 12,
                label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
                link: '/contacts/grid',
                parentId: 11
            },
            {
                id: 13,
                label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                link: '/contacts/list',
                parentId: 11
            },
            {
                id: 14,
                label: 'MENUITEMS.CONTACTS.LIST.SETTINGS',
                link: '/contacts/settings',
                parentId: 11
            }
        ]
    },
    {
        id: 16,
        label: 'MENUITEMS.PROJECTS.TEXT',
        icon: 'briefcase',
        subItems: [
            {
                id: 17,
                label: 'MENUITEMS.PROJECTS.LIST.PROJECTSGRID',
                link: '/projects/project-grid',
                parentId: 16
            },
            {
                id: 18,
                label: 'MENUITEMS.PROJECTS.LIST.PROJECTSLIST',
                link: '/projects/project-list',
                parentId: 16
            },
            {
                id: 19,
                label: 'MENUITEMS.PROJECTS.LIST.PROJECTSOVERVIEW',
                link: '/projects/project-overview',
                parentId: 16
            },
            {
                id: 20,
                label: 'MENUITEMS.PROJECTS.LIST.CREATENEW',
                link: '/projects/project-create',
                parentId: 16
            }
        ]
    },
    {
        id: 21,
        label: 'MENUITEMS.PAGES.TEXT',
        isTitle: true
    },
    {
        id: 22,
        label: 'MENUITEMS.AUTHENTICATION.TEXT',
        icon: 'user',
        badge: {
            variant: 'info',
            text: 'MENUITEMS.AUTHENTICATION.BADGE',
        },
        subItems: [
            {
                id: 23,
                label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNIN',
                subItems: [
                    {
                        id: 24,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                        link: 'account/signin/basic',
                        parentId: 23
                    },
                    {
                        id: 25,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                        link: 'account/signin/cover',
                        parentId: 23
                    },
                ]
            },
            {
                id: 26,
                label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNUP',
                subItems: [
                    {
                        id: 27,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                        link: 'account/signup/basic',
                        parentId: 26
                    },
                    {
                        id: 28,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                        link: 'account/signup/cover',
                        parentId: 26
                    },
                ]
            },
            {
                id: 29,
                label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNOUT',
                subItems: [
                    {
                        id: 30,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                        link: 'account/signout/basic',
                        parentId: 29
                    },
                    {
                        id: 31,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                        link: 'account/signout/cover',
                        parentId: 29
                    },
                ]
            },
            {
                id: 32,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
                subItems: [
                    {
                        id: 33,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                        link: 'account/lockscreen/basic',
                        parentId: 32
                    },
                    {
                        id: 34,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                        link: 'account/lockscreen/cover',
                        parentId: 32
                    },
                ]
            },
            {
                id: 35,
                label: 'MENUITEMS.AUTHENTICATION.LIST.FORGOTPASSWORD',
                subItems: [
                    {
                        id: 36,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                        link: 'account/forgot-password/basic',
                        parentId: 32
                    },
                    {
                        id: 37,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                        link: 'account/forgot-password/cover',
                        parentId: 32
                    },
                ]
            },
            {
                id: 38,
                label: 'MENUITEMS.AUTHENTICATION.LIST.RESETPWD',
                subItems: [
                    {
                        id: 39,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                        link: 'account/reset-password/basic',
                        parentId: 38
                    },
                    {
                        id: 40,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                        link: 'account/reset-password/cover',
                        parentId: 38
                    },
                ]
            },
            {
                id: 41,
                label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION',
                subItems: [
                    {
                        id: 42,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                        link: 'account/email-verification/basic',
                        parentId: 41
                    },
                    {
                        id: 43,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                        link: 'account/email-verification/cover',
                        parentId: 41
                    },
                ]
            },
            {
                id: 44,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
                subItems: [
                    {
                        id: 45,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                        link: 'account/twostep-verification/basic',
                        parentId: 44
                    },
                    {
                        id: 46,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                        link: 'account/twostep-verification/cover',
                        parentId: 44
                    },
                ]
            },
            {
                id: 47,
                label: 'MENUITEMS.AUTHENTICATION.LIST.THANKYOU',
                subItems: [
                    {
                        id: 48,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
                        link: 'account/thankyou/basic',
                        parentId: 47
                    },
                    {
                        id: 49,
                        label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
                        link: 'account/thankyou/cover',
                        parentId: 47
                    },
                ]
            }
        ]
    },
    {
        id: 50,
        label: 'MENUITEMS.ERRORSPAGES.TEXT',
        icon: 'alert-circle',
        subItems: [
            {
                id: 51,
                label: 'MENUITEMS.ERRORSPAGES.LIST.404BASIC',
                link: '/pages/404-basic',
                parentId: 50
            },
            {
                id: 52,
                label: 'MENUITEMS.ERRORSPAGES.LIST.404COVER',
                link: '/pages/404-cover',
                parentId: 50
            },
            {
                id: 53,
                label: 'MENUITEMS.ERRORSPAGES.LIST.500BASIC',
                link: '/pages/500-basic',
                parentId: 50
            },
            {
                id: 53,
                label: 'MENUITEMS.ERRORSPAGES.LIST.500COVER',
                link: '/pages/500-cover',
                parentId: 50
            },
        ]
    },
    {
        id: 54,
        label: 'MENUITEMS.UTILITY.TEXT',
        icon: 'file-text',
        subItems: [
            {
                id: 55,
                label: 'MENUITEMS.UTILITY.LIST.STARTER',
                link: '/pages/starter',
                parentId: 54
            },
            {
                id: 56,
                label: 'MENUITEMS.UTILITY.LIST.PROFILE',
                link: '/pages/profile',
                parentId: 54
            },
            {
                id: 56,
                label: 'MENUITEMS.UTILITY.LIST.MAINTENANCE',
                link: '/pages/maintenance',
                parentId: 54
            },
            {
                id: 57,
                label: 'MENUITEMS.UTILITY.LIST.COMINGSOON',
                link: '/pages/comingsoon',
                parentId: 54
            },
            {
                id: 58,
                label: 'MENUITEMS.UTILITY.LIST.FAQS',
                link: '/pages/faqs',
                parentId: 54
            }
        ]
    },
    {
        id: 65,
        label: 'MENUITEMS.TIMELINE.TEXT',
        icon: 'award',
        subItems: [
            {
                id: 63,
                label: 'MENUITEMS.TIMELINE.LIST.CENTERVIEW',
                link: '/timeline/center',
                parentId: 62
            },
            {
                id: 64,
                label: 'MENUITEMS.TIMELINE.LIST.LEFTVIEW',
                link: '/timeline/left',
                parentId: 62
            },
            {
                id: 64,
                label: 'MENUITEMS.TIMELINE.LIST.HORIZONTALVIEW',
                link: '/timeline/horizontal',
                parentId: 62
            },
        ]
    },
    {
        id: 65,
        label: 'MENUITEMS.COMPONENTS.TEXT',
        isTitle: true
    },
    
    {
        id: 124,
        label: 'MENUITEMS.MULTILEVEL.TEXT',
        icon: 'share-2',
        subItems: [
            {
                id: 125,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
                parentId: 124
            },
            {
                id: 126,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
                subItems: [
                    {
                        id: 127,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
                        parentId: 126,
                    },
                    {
                        id: 128,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
                        parentId: 126,
                    }
                ]
            },
        ]
    }
];

