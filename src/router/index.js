import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginHome from '@/pages/LoginHome'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import LoginForCode from '@/pages/LoginForCode'
import ForgetPassword from '@/pages/ForgetPassword'
import ActivityHome from '@/pages/activity/ActivityHome'
import Playground from '@/pages/activity/Playground'
import ActivitySignUp from '@/pages/activity/ActivitySignUp'
import Organization from '@/pages/activity/Organization'
import Members from '@/pages/activity/Members'
import ClubInfo from '@/pages/activity/ClubInfo'
import ActivitiesDetail from '@/pages/activity/badminton/ActivitiesDetail'
import BShow from '@/pages/activity/badminton/BShow'
import BActivities from '@/pages/activity/badminton/BActivities'
import BMember from '@/pages/activity/badminton/BMember'
import ManageHome from '@/pages/userCenter/myManagement/ManageHome'
import GroupManagement from '@/pages/userCenter/myManagement/manageGroup/GroupManagement'
import CreateGroup from '@/pages/userCenter/myManagement/manageGroup/CreateGroup'
import EditGroupInfo from '@/pages/userCenter/myManagement/manageGroup/EditGroupInfo'
import ManageGroupMembers from '@/pages/userCenter/myManagement/manageGroup/ManageGroupMembers'
import CreatedGroupList from '@/pages/userCenter/myManagement/manageGroup/CreatedGroupList'
import JoinCroupList from '@/pages/userCenter/myManagement/manageGroup/JoinCroupList'
import MyActivities from '@/pages/userCenter/myManagement/MyActivities'
import MyOrder from '@/pages/userCenter/myManagement/MyOrder'
import CommonProblem from '@/pages/userCenter/myManagement/CommonProblem'
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
      path: '/members',
      name: 'Members',
      component: Members,
    },
    {
      path: '/clubInfo',
      name: 'ClubInfo',
      component: ClubInfo,
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
    // 我的管理
    {
      path: '/userCenter/manageHome',
      name: 'ManageHome',
      component: ManageHome,
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
      path: '/userCenter/myActivities',
      name: 'MyActivities',
      component: MyActivities,
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
