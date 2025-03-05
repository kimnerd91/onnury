import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import upProductList from '../views/upProductList.vue'
import ortherProductList from '../views/ortherProductList.vue'
import searchProductList from '../views/searchProductList.vue'
import labelProductList from '../views/labelProductList.vue'
import productDetail from '../views/productDetail.vue'
import checkOut from '../views/checkOut.vue'
import myPage from '../views/myPage.vue'
import contactUs from '../views/contactUs.vue'
import faqList from '../views/faqList.vue'
import cartList from '../views/cartList.vue'
import TermsPolicy from '../views/TermsPolicy.vue'
import Brand from '../views/brand.vue'
import noticeDetail from "../views/noticeDetail.vue"
import WrongUrl from '../views/WrongUrl.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props : true
    },
    {
     path: '/noticeDetail',
      name: 'noticeDetail',
      component: noticeDetail,
      props: true
    },
    {
      path: '/upProductList',
      name: 'upProductList',
      component: upProductList,
      props : true
    },
 {
   path: '/brand',
   name: 'Brand',
   component: Brand,
   props: true
 },
    {
      path: '/ortherProductList',
      name: 'ortherProductList',
      component: ortherProductList,
      props : true
    },
    {
      path: '/searchProductList',
      name: 'searchProductList',
      component: searchProductList,
      props : true
    },
    {
      path: '/labelProductList',
      name: 'labelProductList',
      component: labelProductList,
      props : true
    },
    {
      path: '/productDetail',
      name: 'productDetail',
      component: productDetail,
      props : true
    },
    {
      path: '/checkOut',
      name: 'checkOut',
      component: checkOut,
      props : true
    },
    {
      path: '/myPage',
      name: 'myPage',
      component: myPage,
      props : true
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      component: contactUs,
      props : true
    },
    {
      path: '/faqList',
      name: 'faqList',
      component: faqList,
      props : true
    },
    {
      path: '/cartList',
      name: 'cartList',
      component: cartList,
      props : true
    },
    {
      path: '/TermsPolicy',
      name: 'TermsPolicy',
      component: TermsPolicy,
      props : true
    },
     {
       path: '/:pathMatch(.*)*',
       name: 'WrongUrl',
       component: WrongUrl
     }
  ]
})

router.beforeEach(function (to, from, next) {

  if(to.query.token != undefined){
    sessionStorage.setItem("token", to.query.token);
  }
  next();
});

export default router
