import Vue from 'vue'
import Router from 'vue-router'
import LoginHome from '@/pages/LoginHome'
import Register from '@/pages/Register'
import RegisterUserInfo from '@/pages/RegisterUserInfo'
import RegisterLabel from '@/pages/RegisterLabel'
import UserAgreement from '@/pages/UserAgreement'
import Login from '@/pages/Login'
import LoginForCode from '@/pages/LoginForCode'
import BindPhone from '@/pages/BindPhone'
import ForgetPassword from '@/pages/ForgetPassword'
import ChildrenActivities from '@/pages/activity/ChildrenActivities'
import ActivityHome from '@/pages/activity/ActivityHome'
import ActivityDetail from '@/pages/activity/ActivityDetail'
import EscapeClause from '@/pages/activity/EscapeClause'
import ClubHome from '@/pages/activity/club/ClubHome'
import ClubInfo from '@/pages/activity/club/ClubInfo'
import ClubActivities from '@/pages/activity/club/ClubActivities'
import MemberData from '@/pages/activity/club/memberInfo/MemberData'
import AttendGroupList from '@/pages/activity/club/memberInfo/AttendGroupList'
import OrganActivies from '@/pages/activity/club/memberInfo/OrganActivies'
import AttendedActivies from '@/pages/activity/club/memberInfo/AttendedActivies'
import MotionData from '@/pages/activity/club/memberInfo/MotionData'
import Playground from '@/pages/activity/Playground'
import PlaygroundDetail from '@/pages/activity/PlaygroundDetail'
import MapPage from '@/pages/activity/MapPage'
import ActivitySignUp from '@/pages/activity/ActivitySignUp'
import SignUpList from '@/pages/activity/SignUpList'
import Organization from '@/pages/activity/Organization'
import MapSelection from '@/pages/activity/MapSelection'
import Members from '@/pages/activity/club/Members'
import MyData from '@/pages/userCenter/myData/MyData'
import MyDataDetail from '@/pages/userCenter/myData/MyDataDetail'
import CompleteInfo from '@/pages/userCenter/myData/CompleteInfo'
import SelectLabels from '@/pages/userCenter/myData/SelectLabels'
import Popularize from '@/pages/userCenter/Popularize'
import ManageHome from '@/pages/userCenter/myManagement/ManageHome'
import MyActivities from '@/pages/userCenter/myManagement/MyActivities'
import EditActiviesInfo from '@/pages/userCenter/myManagement/manageActivies/EditActiviesInfo'
import CheckPublishSignUp from '@/pages/userCenter/myManagement/manageActivies/CheckPublishSignUp'
import CheckCompleteSignUp from '@/pages/userCenter/myManagement/manageActivies/CheckCompleteSignUp'
import GroupManagement from '@/pages/userCenter/myManagement/manageGroup/GroupManagement'
import CreatedGroupManage from '@/pages/userCenter/myManagement/manageGroup/CreatedGroupManage'
import CreateGroup from '@/pages/userCenter/myManagement/manageGroup/CreateGroup'
import EditGroupInfo from '@/pages/userCenter/myManagement/manageGroup/EditGroupInfo'
import TransferGroup from '@/pages/userCenter/myManagement/manageGroup/TransferGroup'
import ManageGroupMembers from '@/pages/userCenter/myManagement/manageGroup/ManageGroupMembers'
import CreatedGroupList from '@/pages/userCenter/myManagement/manageGroup/CreatedGroupList'
import JoinCroupList from '@/pages/userCenter/myManagement/manageGroup/JoinCroupList'
import CommonProblem from '@/pages/userCenter/myManagement/CommonProblem'
import Cash from '@/pages/userCenter/myManagement/Cash'
import AccountDetails from '@/pages/userCenter/myManagement/AccountDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'LoginHome',
      component: LoginHome,
    },
    {
      path: '/home/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/home/register/registerUserInfo',
      name: 'RegisterUserInfo',
      component: RegisterUserInfo,
    },
    {
      path: '/home/register/registerLabel',
      name: 'RegisterLabel',
      component: RegisterLabel,
    },
    {
      path: '/home/register/userAgreement',  // 用户协议
      name: 'UserAgreement',
      component: UserAgreement,
    },
    {
      path: '/home/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home/loginForCode',
      name: 'LoginForCode',
      component: LoginForCode,
    },
    {
      path: '/home/bindPhone',
      name: 'BindPhone',
      component: BindPhone,
    },
    {
      path: '/home/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword,
    },
    // 活动
    {
      path: '/childrenActivities',  //儿童活动
      name: 'ChildrenActivities',
      component: ChildrenActivities,
      meta: {
        keepAlive: true 
      }
    },
    {
      path: '/activityHome',
      name: 'ActivityHome',
      component: ActivityHome,
      meta: {
        keepAlive: true ,
        needCacheLast: false
      }
    },
    {
      path: '/playground',
      name: 'Playground',
      component: Playground,
      meta: {
        keepAlive: true 
      }
    },
    {
      path: '/playgroundDetail',
      name: 'PlaygroundDetail',
      component: PlaygroundDetail,
    },
    {
      path: '/mapPage',
      name: 'MapPage',
      component: MapPage,
    },
    {
      path: '/activityDetail',
      name: 'ActivityDetail',
      component: ActivityDetail,
      meta: {
        keepAlive: true 
      }
    },
    {
      path: '/escapeClause',  //免责条款
      name: 'EscapeClause',
      component: EscapeClause,
    },
    //俱乐部
    {
      path: '/clubHome',
      name: 'ClubHome',
      component: ClubHome,
      redirect: '/club/clubInfo/:id',
      children: [
        {
          path: '/club/clubInfo/:id',
          name: 'ClubInfo',
          component: ClubInfo
        },
        {
          path: '/club/clubActivities',
          name: 'ClubActivities',
          component: ClubActivities
        },
        {
          path: '/club/members',
          name: 'Members',
          component: Members,
        },
      ]
    },
    {
      path: '/club/member/memberData',
      name: 'MemberData',
      component: MemberData,
    },
    {
      path: '/club/member/attendGroupList',
      name: 'AttendGroupList',
      component: AttendGroupList,
    },
    {
      path: '/club/member/organActivies',
      name: 'OrganActivies',
      component: OrganActivies,
    },
    {
      path: '/club/member/attendedActivies',
      name: 'AttendedActivies',
      component: AttendedActivies,
    },
    {
      path: '/club/member/motionData',
      name: 'MotionData',
      component: MotionData,
    },
    {
      path: '/activitySignUp',
      name: 'ActivitySignUp',
      component: ActivitySignUp,
    },
    {
      path: '/signUpList',
      name: 'SignUpList',
      component: SignUpList,
    },
    {
      path: '/organization',  //组织活动
      name: 'Organization',
      component: Organization,
      meta: {
        requireAuth: true,
        keepAlive: true 
      }
    },
    {
      path: '/mapSelection',
      name: 'MapSelection',
      component: MapSelection,
      meta: {
        needCacheLast: true  //是否需要缓存上一页
      }
    },
    // 我的数据
    {
      path: '/userCenter/myData',
      name: 'MyData',
      component: MyData,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/myData/more',
      name: 'MyDataDetail',
      component: MyDataDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/myData/completeInfo',
      name: 'CompleteInfo',
      component: CompleteInfo,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/userCenter/selectLabels',
      name: 'SelectLabels',
      component: SelectLabels,
      meta: {
        requireAuth: true,
        needCacheLast: true  //是否需要缓存上一页
      }
    },
    // 我的管理 
    {
      path: '/userCenter/manageHome',
      name: 'ManageHome',
      component: ManageHome,
      meta: {
        requireAuth: true,
        needCacheLast: false
      }
    },
    {
      path: '/userCenter/popularize',  //马上推广
      name: 'Popularize',
      component: Popularize,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/myActivities',
      name: 'MyActivities',
      component: MyActivities,
      meta: {
        requireAuth: true,
        keepAlive: true 
      }
    },
    // 活动管理
    {
      path: '/userCenter/editActiviesInfo',
      name: 'EditActiviesInfo',
      component: EditActiviesInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/checkPublishSignUp',
      name: 'CheckPublishSignUp',
      component: CheckPublishSignUp,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/checkCompleteSignUp',
      name: 'CheckCompleteSignUp',
      component: CheckCompleteSignUp,
      meta: {
        requireAuth: true
      }
    },
    // 群组管理
    {
      path: '/userCenter/groupManagement',
      name: 'GroupManagement',
      component: GroupManagement,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/groupManagement/createGroup',
      name: 'CreateGroup',
      component: CreateGroup,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/groupManagement/createdGroupManage',
      name: 'CreatedGroupManage',
      component: CreatedGroupManage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/groupManagement/manageGroupMembers',
      name: 'ManageGroupMembers',
      component: ManageGroupMembers,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/groupManagement/editGroupInfo',
      name: 'EditGroupInfo',
      component: EditGroupInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/groupManagement/transferGroup',
      name: 'TransferGroup',
      component: TransferGroup,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/createdGroupList',
      name: 'CreatedGroupList',
      component: CreatedGroupList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/joinCroupList',
      name: 'JoinCroupList',
      component: JoinCroupList,
      meta: {
        requireAuth: true
      }
    },
    // {
    //   path: '/userCenter/MyOrder',
    //   name: 'MyOrder',
    //   component: MyOrder,
    // },
    {
      path: '/userCenter/commonProblem',
      name: 'CommonProblem',
      component: CommonProblem,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/cash',
      name: 'Cash',
      component: Cash,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/cash/accountDetails',
      name: 'AccountDetails',
      component: AccountDetails,
      meta: {
        requireAuth: true
      }
    },
    // 商城
    // {
    //   path: '/mall',
    //   name: 'Mall',
    //   component: Mall,
    // },
    // {
    //   path: '/mall/searchPage',
    //   name: 'SearchPage',
    //   component: SearchPage,
    // },
    // 地址管理
    // {
    //   path: '/userCenter/addressManagement',
    //   name: 'AddressManage',
    //   component: AddressManage,
    // },
    // {
    //   path: '/addressManagement/addAddress',
    //   name: 'AddAddress',
    //   component: AddAddress,
    // },
    // {
    //   path: '/addressManagement/editAddress',
    //   name: 'EditAddress',
    //   component: EditAddress,
    // },
  ]
})
