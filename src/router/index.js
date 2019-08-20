import Vue from 'vue'
import Router from 'vue-router'
import LoginHome from '@/pages/LoginHome'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import LoginForCode from '@/pages/LoginForCode'
import ForgetPassword from '@/pages/ForgetPassword'
import ChildrenActivities from '@/pages/activity/ChildrenActivities'
import ActivityHome from '@/pages/activity/ActivityHome'
import ActivityDetail from '@/pages/activity/ActivityDetail'
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
import Organization from '@/pages/activity/Organization'
import Members from '@/pages/activity/club/Members'
import ActivitiesDetail from '@/pages/activity/badminton/ActivitiesDetail'
import BShow from '@/pages/activity/badminton/BShow'
import BActivities from '@/pages/activity/badminton/BActivities'
import BMember from '@/pages/activity/badminton/BMember'
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
import Mall from '@/pages/mall/Mall'
import SearchPage from '@/pages/mall/SearchPage'
import MyOrder from '@/pages/userCenter/myManagement/MyOrder'
import CommonProblem from '@/pages/userCenter/myManagement/CommonProblem'
import Cash from '@/pages/userCenter/myManagement/Cash'
import AccountDetails from '@/pages/userCenter/myManagement/AccountDetails'
import AddressManage from '@/pages/userCenter/myManagement/AddressManage'
import AddAddress from '@/pages/userCenter/myManagement/AddAddress'
import EditAddress from '@/pages/userCenter/myManagement/EditAddress'

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
      path: '/home/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword,
    },
    // 活动
    {
      path: '/childrenActivities',  //儿童活动
      name: 'ChildrenActivities',
      component: ChildrenActivities,
    },
    {
      path: '/activityHome',
      name: 'ActivityHome',
      component: ActivityHome,
    },
    {
      path: '/playground',
      name: 'Playground',
      component: Playground,
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
    },
    //俱乐部
    {
      path: '/clubHome',
      name: 'ClubHome',
      component: ClubHome,
      redirect: '/club/clubInfo',
      children: [
        {
          path: '/club/clubInfo',
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
      path: '/organization',
      name: 'Organization',
      component: Organization,
    },
    {
      path: '/badminton/activitiesDetail',
      name: 'ActivitiesDetail',
      component: ActivitiesDetail,
      children: [
        {
          path: '/badminton/activitiesDetail/bShow',
          name: 'BShow',
          component: BShow
        },
        {
          path: '/badminton/activitiesDetail/bActivities',
          name: 'BActivities',
          component: BActivities
        },
        {
          path: '/badminton/activitiesDetail/bMember',
          name: 'BMember',
          component: BMember
        }
      ]
    },
    // 我的数据
    {
      path: '/userCenter/myData',
      name: 'MyData',
      component: MyData,
    },
    {
      path: '/userCenter/myData/more',
      name: 'MyDataDetail',
      component: MyDataDetail,
    },
    {
      path: '/userCenter/myData/completeInfo',
      name: 'CompleteInfo',
      component: CompleteInfo,
    },
    {
      path: '/userCenter/selectLabels',
      name: 'SelectLabels',
      component: SelectLabels,
    },
    // 我的管理
    {
      path: '/userCenter/manageHome',
      name: 'ManageHome',
      component: ManageHome,
    },
    {
      path: '/userCenter/popularize',
      name: 'Popularize',
      component: Popularize,
    },
    {
      path: '/userCenter/myActivities',
      name: 'MyActivities',
      component: MyActivities,
    },
    // 活动管理
    {
      path: '/userCenter/editActiviesInfo',
      name: 'EditActiviesInfo',
      component: EditActiviesInfo,
    },
    {
      path: '/userCenter/checkPublishSignUp',
      name: 'CheckPublishSignUp',
      component: CheckPublishSignUp,
    },
    {
      path: '/userCenter/checkCompleteSignUp',
      name: 'CheckCompleteSignUp',
      component: CheckCompleteSignUp,
    },
    // 群组管理
    {
      path: '/userCenter/groupManagement',
      name: 'GroupManagement',
      component: GroupManagement,
    },
    {
      path: '/userCenter/groupManagement/createGroup',
      name: 'CreateGroup',
      component: CreateGroup,
    },
    {
      path: '/userCenter/groupManagement/createdGroupManage',
      name: 'CreatedGroupManage',
      component: CreatedGroupManage,
    },
    {
      path: '/userCenter/groupManagement/manageGroupMembers',
      name: 'ManageGroupMembers',
      component: ManageGroupMembers,
    },
    {
      path: '/userCenter/groupManagement/editGroupInfo',
      name: 'EditGroupInfo',
      component: EditGroupInfo,
    },
    {
      path: '/userCenter/groupManagement/transferGroup',
      name: 'TransferGroup',
      component: TransferGroup,
    },
    {
      path: '/userCenter/createdGroupList',
      name: 'CreatedGroupList',
      component: CreatedGroupList,
    },
    {
      path: '/userCenter/joinCroupList',
      name: 'JoinCroupList',
      component: JoinCroupList,
    },
    {
      path: '/userCenter/MyOrder',
      name: 'MyOrder',
      component: MyOrder,
    },
    {
      path: '/userCenter/commonProblem',
      name: 'CommonProblem',
      component: CommonProblem,
    },
    {
      path: '/userCenter/cash',
      name: 'Cash',
      component: Cash,
    },
    {
      path: '/userCenter/cash/accountDetails',
      name: 'AccountDetails',
      component: AccountDetails,
    },
    // 商城
    {
      path: '/mall',
      name: 'Mall',
      component: Mall,
    },
    {
      path: '/mall/searchPage',
      name: 'SearchPage',
      component: SearchPage,
    },
    // 地址管理
    {
      path: '/userCenter/addressManagement',
      name: 'AddressManage',
      component: AddressManage,
    },
    {
      path: '/addressManagement/addAddress',
      name: 'AddAddress',
      component: AddAddress,
    },
    {
      path: '/addressManagement/editAddress',
      name: 'EditAddress',
      component: EditAddress,
    },
  ]
})
