<template>
  <!-- Header -->
  <header>
    <div class="col-12">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="top-header">
              <a href="/" class="ssm-logo">
                <img src="@/assets/img/logo/onnuryLOGO0.png" alt="logo" class="logo" />
              </a>
             <form class="ssm-search" @submit.prevent="handleSubmit">
    <input
      class="search-input"
      type="text"
      v-model="searchvalue"
      placeholder="상품명을 검색해주세요."
      @keyup.enter="handleSubmit"
    />
    <a @click="handleSubmit" class="search-btn">
      <i class="ri-search-line"></i>
    </a>
  </form>
              <div class="ssm-right-bar">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle ssm-right-bar-item" href="javascript:void(0)">
                      <i class="ri-user-3-line"></i>
                      <span>{{ loginId }} 님</span>
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <router-link to="/myPage">마이페이지</router-link>
                      </li>
                      <li>
                        <a class="dropdown-item" style="cursor: pointer" @click="logout()">로그아웃</a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <router-link to="/cartList" class="ssm-right-bar-item Shopping-toggle"><i
                    class="ri-shopping-cart-line"></i>
                  <span>장바구니</span><span class="position-absolute circle">{{ cartCount }}</span></router-link>

                <a @click="recentShow()" class="ssm-right-bar-item Shopping-toggle">
                  <i class="ri-eye-line"></i>
                  <span>최근본제품</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ssm-fix" id="ssm-main-menu-desk">
        <div class="container">
          <div class="ssm-menu-list">
            <div class="ssm-category-icon-block col-xl-2 col-md-3">
              <div class="ssm-category-menu w-80">
                <div class="ssm-category-toggle">
                  <i class="ri-menu-2-line"></i> <span>모든 카테고리</span>
                </div>
              </div>
              <div class="ssm-cat-dropdown position-absolute megaMenu container">
                <div class="ssm-cat-block col-12 d-flex justify-content-between gap-1">
                  <div class="ssm-cat-tab d-flex ulWrapper">
                    <div class="ssm-tab-list nav flex-column nav-pills first justify-content-start" id="v-pills-tab"
                      role="tablist" aria-orientation="vertical">
                      <ul>
                        <li v-for="(item, i) in DepthOne" :key="i" @mouseover="setCurrentIndex(i)">
                          <a :href="'upProductList?id=' +
                            item.upCategoryId +
                            '&name=' +
                            item.upCategoryName
                            " @click="isActive = false">
                            <button type="button">{{ item.upCategoryName }}</button>
                            <i class="fa-solid fa-angle-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="tab-content second" id="v-pills-tabContent">
                      <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel"
                        aria-labelledby="v-pills-home-tab">
                        <div class="tab-list row">
                          <div class="col" style="padding-right: 0">
                            <ul>
                              <li v-for="(sub, j) in DepthOne[currentIndex]
                                .relatedMiddleCategories" :key="j" @mouseover="setDepthTwoIndex(j)">
                                <a :href="'ortherProductList?uid=' +
                                  DepthOne[currentIndex].upCategoryId +
                                  '&id=' +
                                  sub.middleCategoryId +
                                  '&upname=' +
                                  DepthOne[currentIndex].upCategoryName +
                                  '&mdname=' +
                                  sub.middleCategoryName
                                  " @click="isActive = false">
                                  <button type="button" class="d-flex justify-content-between">
                                    <span>{{
                                      DepthOne[currentIndex].relatedMiddleCategories[j]
                                        .middleCategoryName
                                    }}</span>

                                    <i class="fa-solid fa-angle-right"></i>
                                  </button>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div class="col third">
                            <ul>
                              <li v-for="(item, v) in (DepthOne[currentIndex] &&
                                DepthOne[currentIndex].relatedMiddleCategories &&
                                DepthOne[currentIndex].relatedMiddleCategories[
                                DepthTwoIndex
                                ] &&
                                DepthOne[currentIndex].relatedMiddleCategories[
                                  DepthTwoIndex
                                ].relatedDownCategories) ||
                                []" :key="v">
                                <a :href="'ortherProductList?id=' +
                                  item.downCategoryId +
                                  '&mdname=' +
                                  DepthOne[currentIndex].upCategoryName +
                                  '/' +
                                  DepthOne[currentIndex].relatedMiddleCategories[
                                    DepthTwoIndex
                                  ].middleCategoryName +
                                  '/' +
                                  item.downCategoryName
                                  " @click="isActive = false">
                                  <button type="button">
                                    {{ item.downCategoryName }}
                                  </button>
                                </a>
                              </li>
                            </ul>
                          </div>

                          <div class="brandWrapper pt-20">
                            <div class="brand">
                              <ul>
                                <li v-for="(item, q) in DepthOne[currentIndex]
                                  .relatedBrands" :key="q">
                                  <a :href="`/upProductList?id=${DepthOne[currentIndex].upCategoryId}&name=${DepthOne[currentIndex].upCategoryName}&bid=${item.brandId}&bname=${item.brandName}`"
                                    @click="isActive = false">
                                    <button type="button">
                                      {{
                                        DepthOne[currentIndex].relatedBrands[q].brandName
                                      }}
                                    </button></a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <nav class="navbar navbar-expand-lg col-8" style="padding-left: 2.5rem">
              <a @click="mobilemanu()" class="navbar-toggler shadow-none">
                <i class="ri-menu-3-line"></i>
              </a>
              <div id="navbarSupportedContent">
                <ul class="navbar-nav" style="margin: unset">
                  <li class="nav-item" v-for="(item, i) in labelList" :key="i">
                    <a class="nav-link" :href="'/labelProductList?id=' + item.labelId + '&img=' + item.imgUrl
                      " style="border-radius: 5px; margin-right: 5px">
                      <button type="button" style="color: #666">
                        {{ item.labelTitle }}
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
              <ul class="d-flex justify-content-around align-items-center nomo">
                <li><a href="/faqList?active=2">공지사항</a></li>
                <li><a href="/faqList?active=1">FAQ</a></li>
                <li><a href="/contactUs">문의하기</a></li>
              </ul>
            </nav>
            <div class="ssm-header-buttons nomo">
              <a href="/cartList" class="ssm-right-bar-item Shopping-toggle">
                <i class="ri-shopping-cart-line"></i>
              </a>
              <a @click="recentShow()" class="ssm-right-bar-item">
                <i class="ri-eye-line"></i>
              </a>
            </div>
            <div class="ssm-calling col-xl-2 col-lg-2 col-md-3">
              <i class="ri-phone-line"></i>
              <a href="javascript:void(0)"><span>고객센터</span> 1670-2024 </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Mobile menu -->
  <div class="ssm-sidebar-overlay" @click="mobilenonemanu()"></div>
  <div id="ssm_mobile_menu" class="ssm-side-cart ssm-mobile-menu">
    <div class="ssm-menu-title">
      <span class="menu-title" style="max-width: 50%"><a href="/"><img src="@/assets/img/logo/onnuryLOGO0.png" alt=""
          style="width: 100%" /></a></span>
      <button type="button" class="ssm-close" @click="mobilenonemanu()">×</button>
    </div>
    <div class="ssm-menu-inner">
      <div class="iconMenu">
        <ul>
          <li class="col-5">
            <a href="/myPage">
              <button type="button">
                <i class="fa-solid fa-user"></i>
                <span>마이페이지</span>
              </button>
            </a>
          </li>
          <li class="col-5">
            <a href="/cartList" class="position-relative">
              <button type="button">
                <i class="fa-solid fa-cart-shopping"></i>
                <span>장바구니</span>
              </button>
              <span class="position-absolute" style="
                  width: 20px;
                  height: 20px;
                  background-color: red;
                  color: #fff;
                  border-radius: 100%;
                  top: 0px;
                  right: 15px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 12px;
                ">{{ cartCount }}</span>
            </a>
          </li>
          <li class="col-5">
            <a href="/contactUs">
              <button type="button">
                <i class="fa-solid fa-question"></i>
                <span>문의</span>
              </button>
            </a>
          </li>

          <li class="col-5">
            <a href="/" @click="logout()">
              <button type="button">
                <i class="fa-solid fa-power-off"></i>
                <span>로그아웃</span>
              </button>
            </a>
          </li>
        </ul>
      </div>
      <div class="labelMenu">
        <h6 style="
            padding-bottom: 10px;
            padding-top: 10px;
            margin-bottom: 20px;
            font-weight: 900;
            color: rgb(34, 34, 34);
            text-align: center;
            border-bottom: 1px solid #888;
            border-top: 1px solid #888;
          ">
          프로모션
        </h6>
        <ul>
          <li class="nav-item" v-for="(item, i) in labelList" :key="i">
            <a class="nav-link" :href="'/labelProductList?id=' + item.labelId + '&img=' + item.imgUrl">
              <button type="button">
                {{ item.labelTitle }}
              </button>
            </a>
          </li>
        </ul>
      </div>
      <div class="ssm-menu-content">
        <h6 style="
            margin: 20px 0px 10px;
            padding-bottom: 10px;
            padding-top: 10px;
            font-weight: 900;
            color: rgb(34, 34, 34);
            text-align: center;
            border-bottom: 1px solid #888;
            border-top: 1px solid #888;
          ">
          상품 카테고리
        </h6>
        <ul>
          <li class="nav-item" v-for="(item, i) in DepthOne" :key="i">
            <a :href="'upProductList?id=' + item.upCategoryId + '&name=' + item.upCategoryName
              " @click.prevent="toggleSubcategories(i)">
              <button type="button">{{ item.upCategoryName }}</button>
              <i class="fa-solid fa-angle-right"></i>
            </a>
            <ul v-if="isCategoryActive(i)">
              <li class="viewAll">
                <a :href="'upProductList?id=' +
                  item.upCategoryId +
                  '&name=' +
                  item.upCategoryName
                  ">전체보기</a>
              </li>
              <li v-for="(sub, j) in item.relatedMiddleCategories" :key="j" @mouseover="setDepthTwoIndex(j)">
                <a :href="'ortherProductList?uid=' +
                  item.upCategoryId +
                  '&id=' +
                  sub.middleCategoryId +
                  '&upname=' +
                  item.upCategoryName +
                  '&mdname=' +
                  sub.middleCategoryName
                  " @click="isActive = false">
                  <button type="button" class="d-flex justify-content-between">
                    <span>{{ sub.middleCategoryName }}</span>
                    <i class="fa-solid fa-angle-right"></i>
                  </button>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <h6 style="
            margin: 20px 0px 10px;
            padding-bottom: 10px;
            padding-top: 10px;
            font-weight: 900;
            color: rgb(34, 34, 34);
            text-align: center;
            border-bottom: 1px solid #888;
            border-top: 1px solid #888;
          ">
          공지 및 자주묻는 질문
        </h6>
        <ul>
          <li class="nav-item"><a href="/faqList?active=2"><button type="button">공지사항</button> </a></li>
          <li class="nav-item"><a href="/faqList?active=1"><button type="button">FAQ</button> </a></li>
          <li class="nav-item"><a @click="recentShow()" class="ssm-right-bar-item Shopping-toggle">
              <button type="button">

                <span>최근 본 제품</span></button>
            </a></li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 최근본제품 -->
  <div class="ssm-cart-overlay" @click="recentNoneShow()"></div>
  <div class="ssm-cart-view">
    <div class="ssm-cart-inner">
      <div class="ssm-cart-top">
        <div class="ssm-cart-title">
          <h6>최근본제품</h6>
          <button @click="recentNoneShow()" type="button" class="close-cart">×</button>
        </div>
        <ul class="crcart-pro-items">
          <li v-for="(item, i) in latelyProductList" :key="i">
            <a :href="'productDetail?id=' + item.productId" class="crside_pro_img">
              <img :src="item.imgUrl" alt="product-1" /></a>
            <div class="cr-pro-content">
              <a :href="'productDetail?id=' + item.productId" class="cart_pro_title">{{
                item.productName
              }}</a>
              <span class="cart-price"><span>{{ formatPrice(item.sellPrice) }}</span>원</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery"; // jQuery를 사용하여 DOM 조작
import axios from "axios"; // Axios를 사용하여 HTTP 요청

export default {
  data() {
    return {
      // 카테고리 깊이 1, 2, 3을 저장하는 배열
      DepthOne: [{ relatedMiddleCategories: [{ relatedDownCategories: [] }] }],
      
      labelList: [], // 라벨 목록을 저장
      currentIndex: 0, // 현재 선택된 카테고리의 인덱스
      DepthTwoIndex: 0, // 두 번째 깊이의 카테고리 인덱스
      loginId: "", // 로그인된 사용자의 ID를 저장
      searchvalue: "", // 검색어 저장
      latelyProductList: [], // 최근 본 상품 목록 저장
      activeCategories: [], // 활성화된 카테고리의 인덱스를 추적
      cartCount: 0, // 장바구니 상품 개수를 저장
    };
  },
  methods: {
    // 장바구니 목록을 불러와 장바구니 개수를 업데이트하는 함수
    async cartListUp() {
      const responsemyInfo = await axios.get("/api/cart/list", {
        headers: {
          Authorization: sessionStorage.getItem("authorization"),
          RefreshToken: sessionStorage.getItem("refreshToken"),
        },
      });
      this.cartCount = responsemyInfo.data.data.length; // 장바구니 개수 업데이트
    },
    
    // 서브 카테고리를 토글하는 함수 (열기/닫기)
    toggleSubcategories(index) {
      const pos = this.activeCategories.indexOf(index);
      if (pos > -1) {
        this.activeCategories.splice(pos, 1); // 이미 활성화된 카테고리면 비활성화
      } else {
        this.activeCategories.push(index); // 비활성화된 카테고리면 활성화
      }
    },
    
    // 특정 카테고리가 활성화되었는지 확인하는 함수
    isCategoryActive(index) {
      return this.activeCategories.includes(index);
    },
    
    // 검색 기능을 처리하는 함수
    handleSubmit() {
      if(this.searchvalue.trim() != ''){ // 검색어가 공백이 아니면
        const searchUrl = "/searchProductList?search=" + this.searchvalue;
        window.location.href = searchUrl; // 검색 결과 페이지로 이동
      } else {
        alert("검색어를 입력해주세요."); // 검색어가 없으면 알림
      }
    },
    
    // 최근 본 상품 팝업을 보여주는 함수
    recentShow() {
      $(".ssm-cart-view").addClass("ssm-cart-view-active");
      $(".ssm-cart-overlay").fadeIn();
      this.latelyProductListUp(); // 최근 본 상품 목록 불러오기
    },
    
    // 최근 본 상품 팝업을 숨기는 함수
    recentNoneShow() {
      $(".ssm-cart-view").removeClass("ssm-cart-view-active");
      $(".ssm-cart-overlay").fadeOut();
    },
    
    // 모바일 메뉴를 여는 함수
    mobilemanu() {
      $(".ssm-sidebar-overlay").fadeIn();
      $(".ssm-mobile-menu").addClass("ssm-menu-open");
    },
    
    // 모바일 메뉴를 닫는 함수
    mobilenonemanu() {
      $(".ssm-sidebar-overlay").fadeOut();
      $(".ssm-mobile-menu").removeClass("ssm-menu-open");
    },
    
    // 메인 카테고리 목록을 불러오는 함수
    async mainList() {
      try {
        const response = await axios.get("/api/category/navigation", {
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });
        this.DepthOne = response.data.data; // 카테고리 데이터를 저장
      } catch (error) {
        // 에러 처리 (로그인 체크 시 발생한 에러)
      }
    },
    
    // 라벨 목록을 불러오는 함수
    async labelListup() {
      try {
        const response = await axios.get("/api/label/topexpression", {
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });
        this.labelList = response.data.data; // 라벨 데이터를 저장
      } catch (error) {
        // 에러 처리
      }
    },
    
    // 현재 선택된 카테고리 인덱스를 설정하는 함수
    setCurrentIndex(index) {
      this.currentIndex = index;
    },
    
    // 두 번째 깊이 카테고리의 인덱스를 설정하는 함수
    setDepthTwoIndex(index) {
      this.DepthTwoIndex = index;
    },
    
    // 로그아웃 함수
    logout() {
      this.$cookies.set("latelyProduct", ""); // 최근 본 상품 쿠키 초기화
      sessionStorage.clear(); // 세션 스토리지 초기화
      location.href = "/"; // 로그아웃 후 홈으로 이동
    },
    
    // 최근 본 상품 목록을 불러오는 함수
    latelyProductListUp() {
      this.latelyProductList = this.$cookies.get("latelyProduct"); // 쿠키에서 최근 본 상품 불러오기
    },
    
    // 가격을 포맷팅하는 함수 (3자리마다 콤마 추가)
    formatPrice(value) {
      if (value == null) {
        return "";
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  
  // 컴포넌트가 마운트될 때 실행되는 로직
  mounted() {
    if (sessionStorage.getItem("loginId") != null) {
      this.mainList(); // 메인 카테고리 목록 불러오기
      this.labelListup(); // 라벨 목록 불러오기
      this.latelyProductListUp(); // 최근 본 상품 목록 불러오기
      this.cartListUp(); // 장바구니 목록 불러오기
      this.loginId = sessionStorage.getItem("loginId"); // 로그인 ID 설정
    }
  },
};
</script>
