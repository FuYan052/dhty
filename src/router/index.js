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
import PaySuccess from '@/pages/activity/PaySuccess'
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
// import MyOrder from '@/pages/userCenter/MyOrder'
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
      name: 'LoginHome',  //选择登录注册页
      component: LoginHome,
    },
    {
      path: '/home/register',
      name: 'Register',  //注册页
      component: Register,
    },
    {
      path: '/home/register/registerUserInfo',
      name: 'RegisterUserInfo',   //提交注册后选择个人信息
      component: RegisterUserInfo,
    },
    {
      path: '/home/register/registerLabel',
      name: 'RegisterLabel',  //提交注册后选择标签
      component: RegisterLabel,
    },
    {
      path: '/home/register/userAgreement',  
      name: 'UserAgreement',  // 用户协议
      component: UserAgreement,
    },
    {
      path: '/home/login',
      name: 'Login',  //密码登录页
      component: Login,
    },
    {
      path: '/home/loginForCode',
      name: 'LoginForCode',  //手机验证码登录页
      component: LoginForCode,
    },
    {
      path: '/home/bindPhone',
      name: 'BindPhone',  //首次微信登录绑定手机号
      component: BindPhone,
    },
    {
      path: '/home/forgetPassword',
      name: 'ForgetPassword',  //找回密码页
      component: ForgetPassword,
    },
    // 活动
    {
      path: '/childrenActivities',  
      name: 'ChildrenActivities',  //儿童活动
      component: ChildrenActivities,
      meta: {
        keepAlive: true 
      }
    },
    {
      path: '/activityHome',
      name: 'ActivityHome',
      component: ActivityHome,  //我要参与活动页
      meta: {
        keepAlive: true ,
        needCacheLast: false
      }
    },
    {
      path: '/playground',
      name: 'Playground',  //场馆列表页
      component: Playground,
      meta: {
        keepAlive: true 
      }
    },
    {
      path: '/activityDetail',
      name: 'ActivityDetail',  //活动详情页
      component: ActivityDetail,
      meta: {
        needCacheLast: true
      }
    },
    {
      path: '/playgroundDetail',
      name: 'PlaygroundDetail',  //场馆详情
      component: PlaygroundDetail,
      meta: {
        needCacheLast: true
      }
    },
    {
      path: '/mapPage',
      name: 'MapPage',  //地图导航页
      component: MapPage,
    },
    {
      path: '/escapeClause',  
      name: 'EscapeClause',  //免责条款
      component: EscapeClause,
    },
    //俱乐部
    {
      path: '/clubHome',
      name: 'ClubHome',
      component: ClubHome,  //社群页
      redirect: '/club/clubInfo/:id',
      children: [
        {
          path: '/club/clubInfo/:id',
          name: 'ClubInfo',  //社群信息
          component: ClubInfo
        },
        {
          path: '/club/clubActivities',
          name: 'ClubActivities',  //社群活动
          component: ClubActivities
        },
        {
          path: '/club/members',
          name: 'Members',  //社群成员
          component: Members,
        },
      ]
    },
    {
      path: '/club/member/memberData',
      name: 'MemberData',  //社群成员资料
      component: MemberData,
    },
    {
      path: '/club/member/attendGroupList',
      name: 'AttendGroupList',  //社群成员所加入的群
      component: AttendGroupList,
    },
    {
      path: '/club/member/organActivies',
      name: 'OrganActivies',  //社群成员组织过的活动
      component: OrganActivies,
    },
    {
      path: '/club/member/attendedActivies',
      name: 'AttendedActivies',  //社群成员参加过的活动
      component: AttendedActivies,
    },
    {
      path: '/club/member/motionData',
      name: 'MotionData',  //社群成员运动参数
      component: MotionData,
    },
    {
      path: '/activitySignUp',
      name: 'ActivitySignUp',  //活动报名页
      component: ActivitySignUp,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/activitySignUp/paySuccess',
      name: 'PaySuccess',  //活动报名支付成功
      component: PaySuccess,
    },
    {
      path: '/signUpList',
      name: 'SignUpList',  //活动报名列表页
      component: SignUpList,
    },
    {
      path: '/organization',  
      name: 'Organization',  //组织活动页
      component: Organization,
      meta: {
        requireAuth: true,
        keepAlive: true 
      }
    },
    {
      path: '/mapSelection',
      name: 'MapSelection',  //组织活动地图选点页
      component: MapSelection,
      meta: {
        needCacheLast: true  //是否需要缓存上一页
      }
    },
    // 我的数据
    {
      path: '/userCenter/myData',
      name: 'MyData',
      component: MyData,  //个人数据
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/myData/more',
      name: 'MyDataDetail',  //个人数据-更多数据
      component: MyDataDetail, 
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/myData/completeInfo',
      name: 'CompleteInfo',  //个人中心完善信息页
      component: CompleteInfo,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/userCenter/selectLabels',
      name: 'SelectLabels',  //完善信息选择标签
      component: SelectLabels,
      meta: {
        requireAuth: true,
        needCacheLast: true  //是否需要缓存上一页
      }
    },
    // 我的管理 
    {
      path: '/userCenter/manageHome',
      name: 'ManageHome',  //我的管理页
      component: ManageHome,  
      meta: {
        requireAuth: true,
        needCacheLast: false
      }
    },
    {
      path: '/userCenter/popularize',  
      name: 'Popularize',  //马上推广
      component: Popularize,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/myActivities',
      name: 'MyActivities',  //我的活动页
      component: MyActivities,
      meta: {
        requireAuth: true,
        keepAlive: true 
      }
    },
    // 活动管理
    {
      path: '/userCenter/editActiviesInfo',
      name: 'EditActiviesInfo',  //修改活动信息
      component: EditActiviesInfo,
      meta: {
        requireAuth: true,
        keepAlive: true 
      }
    },
    {
      path: '/userCenter/checkPublishSignUp',
      name: 'CheckPublishSignUp',  //个人中心查看报名列表
      component: CheckPublishSignUp,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/checkCompleteSignUp',
      name: 'CheckCompleteSignUp',  //查看已报名
      component: CheckCompleteSignUp,
      meta: {
        requireAuth: true
      }
    },
    // 群组管理
    {
      path: '/userCenter/groupManagement',
      name: 'GroupManagement',  //管理社群
      component: GroupManagement,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/groupManagement/createGroup',
      name: 'CreateGroup',  //创建社群
      component: CreateGroup,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/groupManagement/createdGroupManage',
      name: 'CreatedGroupManage',  //管理创建的群
      component: CreatedGroupManage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/groupManagement/manageGroupMembers',
      name: 'ManageGroupMembers',  //管理社群成员
      component: ManageGroupMembers,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/groupManagement/editGroupInfo',
      name: 'EditGroupInfo',  //修改社群信息
      component: EditGroupInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/groupManagement/transferGroup',
      name: 'TransferGroup',  //转让群
      component: TransferGroup,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/createdGroupList',
      name: 'CreatedGroupList',  //所创建的群列表
      component: CreatedGroupList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/joinCroupList',
      name: 'JoinCroupList',  //加入的群列表
      component: JoinCroupList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/commonProblem',
      name: 'CommonProblem',  //常见问题
      component: CommonProblem,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/cash',
      name: 'Cash',  //提现
      component: Cash,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userCenter/cash/accountDetails',
      name: 'AccountDetails',  //提现账户明细
      component: AccountDetails,
      meta: {
        requireAuth: true
      }
    },
  ]
})
