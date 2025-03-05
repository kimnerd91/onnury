<template>
  <!-- Breadcrumb -->
  <section class="section-breadcrumb">
    <div class="ssm-breadcrumb-image">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="ssm-breadcrumb-title">
              <p class="d-flex">
                <a href="/">메인</a> <i class="fa-solid fa-caret-right"></i>
                <a href="#">장바구니</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Cart -->
  <section class="section-cart">
    <div class="container">
      <div class="row d-none">
        <div class="col-lg-12">
          <div class="mb-30" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            <div class="cr-banner">
              <h2>Cart</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore lacus vel facilisis.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="ssm-cart-content" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            <div class="row">
              <form action="#">
                <div class="ssm-table-content">
                  <table>
                    <thead>
                      <tr>
                        <th style="text-align: center">
                          <input type="checkbox" name="selectall" id="selectall" @click="selectAll()" />
                        </th>
                        <th><span>상품</span></th>
                        <th style="text-align: center"><span>가격</span></th>
                        <th style="text-align: center" class="text-center">
                          <span>수량</span>
                        </th>
                        <th style="text-align: center"><span>합계</span></th>
                        <th style="text-align: center"><span>삭제</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in cartList" :key="i">
                        <td class="ssm-cart-remove">
                          <input type="checkbox" name="cartCheck" @click="checkedProduct(i)"/>
                        </td>
                        <td class="ssm-cart-name">
                          <a :href="'productDetail?id=' + item.productId">
                            <img :src="item.productImage" alt="product-1" class="cr-cart-img" />
                            <div>
                              {{ item.productName }}
                              <p class="optionCartName"  v-for="(item, i2) in item.productOptionList" :key="i2">
                                {{ item.productDetailOptionTitle }},
                              </p>
                            </div>
                          </a>
                        </td>
                        <td class="ssm-cart-price" style="text-align: center">
                          <span class="amount">{{
                            (
                              item.productPrice + item.productDetailOptionPrice
                            ).toLocaleString() + "원"
                          }}</span>
                        </td>
                        <td class="ssm-cart-qty" style="text-align: center">
                          <div class="ssm-qty-plus-minus">
                            <button type="button" class="minus" @click="decreaseQuantity(i)">
                              -
                            </button>
                            <input type="text" placeholder="." :value="item.quantity" minlength="1" maxlength="20"
                              class="quantity" disabled />
                            <button type="button" class="plus" @click="increaseQuantity(i)">
                              +
                            </button>
                          </div>
                        </td>
                        <td class="ssm-cart-subtotal" style="text-align: center">
                          <span>
                            {{
                              (
                                (item.productPrice + item.productDetailOptionPrice) *
                                item.quantity
                              ).toLocaleString() + "원"
                            }}
                          </span>
                        </td>
                        <td class="ssm-cart-remove">
                          <a href="javascript:void(0)" @click="removeItem(i)">
                            <i class="ri-delete-bin-line"></i>
                          </a>
                        </td>
                      </tr>
                      <tr v-if="this.cartList.length === 0">
                        <td colspan="6" style="text-align: center; color: #ccc; padding: 50px 0">
                          장바구니에 아무 제품도 없습니다.
                        </td>
                      </tr>
                      <tr>
                        <td colspan="6" style="text-align: right">
                          <span class="fs-6">총 금액 : </span>
                          <span class="fs-4" style="color: ">{{ selectTotalPrice.toLocaleString() }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mobileCartList d-flex" v-for="(item, i) in cartList" :key="i">
                  <div class="image">
                    <input type="checkbox" name="cartCheck2" />
                  </div>

                  <div class="d-flex flex-row info">
                    <a :href="'productDetail?id=' + item.productId">
                      <div class="infoImg">
                        <img :src="item.productImage" alt="product-1" class="cr-cart-img" />
                      </div>
                    </a>
                    <div class="infoText">
                      <p>{{item.brandName}}</p>
                      <h5>{{ item.productName }}</h5>
                      <div class="cart-qty-plus-minus">
                        <button type="button" class="minus" @click="decreaseQuantity(i)">
                          -
                        </button>
                        <input type="text" placeholder="." :value="item.quantity" minlength="1" maxlength="20"
                          class="quantity" disabled />
                        <button type="button" class="plus" @click="increaseQuantity(i)">
                          +
                        </button>
                      </div>
                      <p class="optionCartName" v-for="(item2, i2) in item.productOptionList" :key="i2">
                        {{ item2.productDetailOptionTitle }},
                      </p>
                    </div>

                    <div class="action">
                      <a href="javascript:void(0)" @click="removeItem(i)">
                        <i class="ri-delete-bin-line"></i>
                      </a>
                      <h6 class="new-price">
                        {{
                          (
                            (item.productPrice + item.productDetailOptionPrice) *
                            item.quantity
                          ).toLocaleString() + "원"
                        }}
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="totalPrice onMobile">
                  <span class="fs-6">총 금액 : </span>
                  <span class="fs-4" style="color: ">{{ selectTotalPrice.toLocaleString() }}</span>
                </div>
                <div class="row onPC">
                  <div class="col-lg-12">
                    <div class="cr-cart-update-bottom">
                      <a href="javascript:void(0)" class="cr-button" @click="removeAllItems()">일괄삭제</a>
                      <a href="/checkOut" class="cr-button" @click.prevent="checkOut2()">
                        주문하기
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="row onMobile" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            <div class="col-lg-12">
              <div class="cr-cart-update-bottom">
                <a href="javascript:void(0)" class="cr-links"></a>
                <a href="/checkOut" class="cr-button col-12" @click.prevent="checkOut3()">
                  주문하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Popular products -->
  <section class="section-popular margin-tb-100">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12" >
          <div class="d-flex justify-content-center" style="margin-bottom: 50px">
            <h4 class="fw-bold">추천상품</h4>
          </div>

          <swiper :slidesPerView="5" :loop="true" :breakpoints="breakpoints2">
            <swiper-slide v-for="(item, i) in newProductList" :key="i">
              <div class="ssm-product-card">
                <div class="ssm-product-image">
                  <a :href="'productDetail?id=' + item.productId" class="title">
                    <div class="ssm-image-inner">
                      <img :src="item.mediaList[0].imgUrl" alt="product-1" />
                    </div>
                  </a>
                  <div class="ssm-side-view">
                    <a class="model-oraganic-product" data-bs-toggle="modal" href="#quickview" role="button"
                      @click="quikview(item)">
                      <i class="ri-eye-line"></i>
                    </a>
                  </div>
                  <!-- <a class="ssm-shopping-bag" @click="cartadd(item)">
                    <i class="ri-shopping-bag-line"></i>
                  </a> -->
                </div>
                <div class="ssm-product-details text-start">
                  <div class="cr-brand">
                    <p>{{ item.brand }}</p>
                  </div>
                  <a :href="'productDetail?id=' + item.productId" class="title fs-6 fw-bold">{{ item.productName }}</a>
                  <p class="ssm-price d-flex justify-content-start align-items-center flex-wrap text-start">
                    <span class="new-price">{{ item.sellPrice.toLocaleString() }}원</span>
                    <span class="new-price percent" style="margin-left: 5px">{{
                      Math.ceil(
                        ((item.normalPrice - item.sellPrice) / item.normalPrice) * 100
                      )
                    }}%<i class="fa-solid fa-caret-down"></i></span>
                  </p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
   <!-- Model -->
  <div class="modal fade quickview-modal" id="quickview" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered cr-modal-dialog">
      <div class="modal-content">
        <button
          type="button"
          class="cr-close-model btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
        <div class="modal-body">
          <div class="row">
            <div class="col-xxl-6 col-xl-6 col-md-6 col-12 mb-24">
              <div class="vehicle-detail-banner banner-content clearfix">
                <div class="banner-slider">
                  <div class="slider slider-for">
                    <swiper
                      :loop="true"
                      :spaceBetween="10"
                      :navigation="true"
                      :thumbs="{ swiper: thumbsSwiper }"
                      :modules="modules"
                      class="mySwiper2"
                    >
                      <swiper-slide v-for="(item, i) in quikviewInfo.mediaList" :key="i">
                        <div class="slider-banner-image bigDiv">
                          <div class="zoom-image-hover2">
                            <img
                              :src="item.imgUrl"
                              alt="product-tab-1"
                              class="product-image bigImage"
                            />
                          </div>
                        </div>
                      </swiper-slide>
                    </swiper>
                  </div>
                  <div class="slider slider-nav thumb-image">
                    <swiper
                      @swiper="setThumbsSwiper"
                      :loop="true"
                      :spaceBetween="5"
                      :slidesPerView="4"
                      :freeMode="true"
                      :watchSlidesProgress="true"
                      :modules="modules"
                      class="mySwiper"
                    >
                      <swiper-slide v-for="(item, i) in quikviewInfo.mediaList" :key="i">
                        <div class="slider-banner-image">
                          <div class="zoom-image-hover2">
                            <img
                              :src="item.imgUrl"
                              alt="product-tab-1"
                              class="product-image"
                            />
                          </div>
                        </div>
                      </swiper-slide>
                    </swiper>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xxl-6 col-xl-6 col-md-6 col-12 mb-24">
              <div class="cr-size-and-weight-contain">
                <div class="labelTagDiv d-flex justify-content-start align-items-center">
                  <a
                    class="nav-link"
                    style="margin-bottom: 5px"
                    :href="'/labelProductList?id=' + item.labelId + '&img=' + item.imgUrl"
                    v-for="(item, i) in quikviewInfo.labelList"
                    :style="{ backgroundColor: item.colorCode }"
                    :key="i"
                  >
                    {{ item.labelTitle }}
                  </a>
                </div>
                <h2 class="heading">
                  {{ quikviewInfo.productName }}
                </h2>
              </div>
              <div class="cr-size-and-weight">
                <div
                  class="cr-product-price"
                  style="display: flex; flex-direction: column; padding-top: 0"
                >
                  <p
                    class="cr-price d-flex justify-content-start align-items-center flex-wrap text-start"
                  >
                    <span class="old-price fs-6 col-12"
                      >{{ quikviewInfo.normalPrice.toLocaleString() }}원</span
                    >
                    <span class="new-price"
                      >{{ quikviewInfo.sellPrice.toLocaleString() }}원</span
                    >
                    <span class="new-price percent" style="margin-left: 5px"
                      >{{
                        Math.ceil(
                          ((quikviewInfo.normalPrice - quikviewInfo.sellPrice) /
                            quikviewInfo.normalPrice) *
                            100
                        )
                      }}%<i class="fa-solid fa-caret-down"></i
                    ></span>
                  </p>
                </div>
                <div class="list">
                  <ul>
                    <li v-if="quikviewInfo.deliveryType === 'D'">
                      추가 배송비 <span>:</span>
                      <span style="font-weight: bold; margin-left: 5px">
                        {{
                          quikviewInfo.deliveryPrice === 0
                            ? "무료배송"
                            : quikviewInfo.deliveryPrice.toLocaleString() + "원"
                        }}
                      </span>
                    </li>
                    <li v-if="quikviewInfo.deliveryType === 'S'">
                      배송방법 <span>:</span>
                      <span style="font-weight: bold; margin-left: 5px">설치제품</span>
                    </li>
                    <li>
                      모델명 <span>:</span
                      ><span style="font-weight: bold; margin-left: 5px">{{
                        quikviewInfo.modelNumber
                      }}</span>
                    </li>
                    <li>
                      제조사 <span>:</span
                      ><span style="font-weight: bold; margin-left: 5px">{{
                        quikviewInfo.manufacturer
                      }}</span>
                    </li>
                    <li>
                      원산지 <span>:</span
                      ><span style="font-weight: bold; margin-left: 5px">{{
                        quikviewInfo.madeInOrigin
                      }}</span>
                    </li>
                    <li>
                      * 일부 상품의 경우 상품별, 지역별 보유 물량에 따라 배송이 지연될 수
                      있습니다.
                    </li>
                    <li>
                      * 도서산간(제주 포함)의 경우 추가 배송비가 발생하거나 물류 사정에
                      따라 배송이 불가할 수 있습니다.
                    </li>
                  </ul>
                </div>
                <hr />
                <div class="cr-size-and-weight" v-if="quikviewOptionYn == 'Y'">
                  <h5><span class="new-price">옵션 선택</span></h5>
                  <div
                    class="cr-kg"
                    style="padding-top: 10px"
                    v-for="(item, i) in quikviewInfo.productOptionList"
                    :key="i"
                  >
                    <select
                      :id="'select-' + item.productOptionId"
                      class="form-select"
                      @change="optionSelect(i, item)"
                    >
                      <option value="title" selected>
                        {{ item.productOptionTitle }}
                      </option>
                      <option value="" v-if="item.necessaryCheck == 'N'">
                        선택 안함
                      </option>
                      <option
                        :value="item2.detailOptionId"
                        v-for="(item2, k) in item.productDetailOptionList"
                        :key="k"
                      >
                        {{ item2.detailOptionName }}
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  class="cr-add-card position-relative"
                  v-for="(item, i) in selectProductlist"
                  :key="i"
                  style="
                    background-color: lightgray;
                    margin-top: 20px;
                    background-color: #fff;
                    border: 1px solid #999;
                    padding: 10px 20px;
                  "
                >
                  <div class="cr-qty-main flex-wrap" style="width: 100%; padding: 5px">
                    <div class="col-12" style="padding: 10px 10px 0 0">
                      <span
                        ><b>{{ quikviewInfo.productName }}</b></span
                      >
                      <p style="margin-top: 5px">
                        <span v-for="(item2, i2) in item.productOptionList" :key="i2">
                          {{ item2.name }} /
                          {{ item.totalamount - this.quikviewInfo.sellPrice }}
                        </span>
                      </p>
                    </div>
                    <div
                      class="col-12 d-flex justify-content-between align-items-center addcardPrice"
                    >
                      <div>
                        <button type="button" @click="selectProductlistamount(i, -1)">
                          -
                        </button>
                        <input
                          type="text"
                          placeholder="."
                          v-model="item.quantity"
                          minlength="1"
                          maxlength="20"
                          class="quantity"
                          readonly
                        />
                        <button type="button" @click="selectProductlistamount(i, 1)">
                          +
                        </button>
                      </div>
                      <div class="cr-product-price">
                        <span class="fs-6">{{
                          (item.totalamount * item.quantity).toLocaleString() + "원"
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    v-if="quikviewOptionYn == 'Y'"
                    type="button"
                    class="position-absolute xmark"
                    @click="selectproductDelete(i)"
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div
                  class="col-12 d-flex justify-content-end align-items-center"
                  style="padding-top: 20px"
                  v-if="quikviewOptionYn == 'Y'"
                >
                  <span style="font-weight: 800">총 금액 :</span
                  ><span
                    class="col-4 fs-3 new-price d-flex justify-content-end align-items-center"
                    style="
                      color: #e87722 !important;
                      text-align: right;
                      font-weight: bold;
                    "
                    >{{ selectTotalPrice.toLocaleString() + "원" }}
                    <span
                      style="
                        color: #888;
                        font-size: 14px;
                        font-weight: 500;
                        margin-left: 5px;
                      "
                      >원</span
                    >
                  </span>
                </div>

                <div class="cr-size-and-weight" style="display: flex">
                  <button
                    type="button"
                    class="cr-button"
                    style="width: 50%; height: 50px"
                    @click="quikviewcartInsert()"
                  >
                    <i class="fa-solid fa-cart-shopping" style="margin-right: 5px"></i
                    >장바구니
                  </button>
                  <button
                    type="button"
                    class="cr-button"
                    style="width: 50%; height: 50px; margin-left: 10px"
                    @click="checkOut()"
                  >
                    구매하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";

export default {
  data() {
    return {
      name: this.$router.currentRoute.value.query.name, // 라우터에서 쿼리로 전달된 'name' 값을 가져옴
      cartList: [], // 장바구니 리스트
      paging: { paging: 1, maxpage: 1 }, // 페이지네이션 정보
      bannerList: [], // 배너 리스트
      oneDepthList: [], // 1차 카테고리 리스트
      newProductList: [], // 새로 출시된 상품 리스트
      filteredProducts: [], // 필터링된 상품 리스트
      selectedCategory: null, // 선택된 카테고리
      breakpoints: { // 반응형 슬라이더 설정 (화면 크기에 따라 다른 슬라이드 수)
        1399: { slidesPerView: 5, spaceBetween: 24 },
        1028: { slidesPerView: 3, spaceBetween: 24 },
        480: { slidesPerView: 2, spaceBetween: 24 },
        0: { slidesPerView: 1, spaceBetween: 10 },
      },
      breakpoints2: { // 다른 슬라이더를 위한 반응형 설정
        1399: { slidesPerView: 5, spaceBetween: 24 },
        1028: { slidesPerView: 5, spaceBetween: 24 },
        480: { slidesPerView: 2, spaceBetween: 24 },
        0: { slidesPerView: 2, spaceBetween: 10 },
      },
      quikviewInfo: { // 퀵뷰에 대한 상품 정보 초기화
        mediaList: [],
        productOptionList: [],
        normalPrice: 0,
        sellPrice: 0,
      },
      quikviewOptionYn: "Y", // 퀵뷰 옵션 여부
      selectOptionlist: [], // 선택된 옵션 리스트
      selectProductlist: [], // 선택된 상품 리스트
      selectOptionprice: 0, // 선택된 옵션 가격
      checkCount: [], // 체크된 상품 카운트
      selectTotalPrice: 0, // 선택된 총 가격
      selectcart: [], // 선택된 장바구니 아이템 리스트
    };
  },

  components: {
    Swiper, // Swiper 컴포넌트를 가져옴
    SwiperSlide, // SwiperSlide 컴포넌트를 가져옴
  },

  // Vue 컴포지션 API 사용, setup 함수
  setup() {
    let thumbsSwiper = ref(null); // 썸네일 스와이퍼 참조

    let setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper; // 썸네일 스와이퍼 설정
    };

    return {
      thumbsSwiper,
      setThumbsSwiper,
      modules: [Navigation, Thumbs, FreeMode, Pagination], // Swiper 모듈 설정
    };
  },

  // 컴포넌트가 마운트 되었을 때, 데이터 로드를 위한 함수 호출
  mounted() {
    this.cartListUp(); // 장바구니 리스트 불러오기
    this.newProductListUp(); // 새 상품 리스트 불러오기
  },

  computed: {
    // 총 상품 가격 계산 후 반환
    totalPrice() {
      let total = 0;
      this.cartList.forEach((item) => {
        total += (item.productPrice + item.productDetailOptionPrice) * item.quantity; // 상품 가격 계산
      });
      return total.toLocaleString() + "원"; // 천단위 구분과 함께 총 가격 반환
    },
  },

  methods: {
    // 상품 체크 상태 변경
    checkedProduct(i) {
      if (this.selectcart.indexOf(this.cartList[i].cartId) < 0) {
        this.selectcart.push(this.cartList[i].cartId); // 체크되면 장바구니에 추가
        this.selectTotalPrice += this.cartList[i].productPrice; // 총 가격 추가
      } else {
        this.selectcart.splice(this.selectcart.indexOf(this.cartList[i].cartId), 1); // 체크 해제되면 삭제
        this.selectTotalPrice -= this.cartList[i].productPrice; // 총 가격 감소
      }
    },

    // 전체 선택 기능
    selectAll() {
      const checkboxes = document.getElementsByName("cartCheck"); // 첫 번째 체크박스 그룹
      const checkboxes2 = document.getElementsByName("cartCheck2"); // 두 번째 체크박스 그룹
      const selectall = document.getElementById("selectall"); // 전체 선택 체크박스

      checkboxes.forEach((checkbox) => {
        checkbox.checked = selectall.checked; // 체크 상태를 전체 선택 상태로 동기화
      });
      checkboxes2.forEach((checkbox) => {
        checkbox.checked = selectall.checked; // 두 번째 체크박스도 동기화
      });

      // 장바구니 아이템 모두 체크/해제
      for (var i = 0; i < this.cartList.length; i++) {
        if (this.selectcart.indexOf(this.cartList[i].cartId) < 0) {
          this.selectcart.push(this.cartList[i].cartId);
          this.selectTotalPrice += this.cartList[i].productPrice;
        } else {
          this.selectcart.splice(this.selectcart.indexOf(this.cartList[i].cartId), 1);
          this.selectTotalPrice -= this.cartList[i].productPrice;
        }
      }
    },

    // 장바구니 리스트 불러오기
    async cartListUp() {
      const responsemyInfo = await axios.get("/api/cart/list", {
        headers: {
          Authorization: sessionStorage.getItem("authorization"),
          RefreshToken: sessionStorage.getItem("refreshToken"),
        },
      });
      this.cartList = responsemyInfo.data.data; // 서버로부터 장바구니 리스트 받아옴
      console.log(this.cartList); // 장바구니 내용 콘솔에 출력
    },

    // 가격을 천 단위로 포맷팅하는 함수
    formatPrice(value) {
      if (value == null) {
        return "";
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 천단위로 쉼표 추가
    },

    // 새 상품 리스트 불러오기
    async newProductListUp() {
      try {
        const response = await axios.get("/api/product/newrelease", {
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });
        this.newProductList = response.data.data; // 새 상품 리스트 저장
        this.NPLCategory = this.newProductList.map((product) => product.upCategory); // 카테고리 필터링
        this.filteredProducts = this.newProductList; // 필터링된 상품 리스트에 저장
      } catch (error) {
        // 에러 발생 시 콘솔에 출력 (주석 처리됨)
      }
    },

    // 퀵뷰 기능 (선택한 상품 정보 설정)
    quikview(item) {
      this.selectProductlist = [];
      this.quikviewInfo = item;
      if (item.productOptionList.length == 0) {
        this.quikviewOptionYn = "N"; // 옵션이 없을 때 처리
        this.selectProductlist.push({
          productId: this.quikviewInfo.productId,
          productOptionList: [],
          quantity: 1,
          totalamount: this.quikviewInfo.sellPrice,
        });
      } else {
        this.quikviewOptionYn = "Y"; // 옵션이 있을 때 처리
      }
    },

    // 수량 감소 함수
    decreaseQuantity(index) {
      if (this.cartList[index].quantity > 1) {
        this.cartList[index].quantity--; // 수량 1 감소
      }
    },

    // 아이템 삭제 함수
    removeItem(index) {
      if (confirm("해당 상품을 삭제 하시겠습니까?")) {
        const itemId = this.cartList[index].cartId;
        axios
          .delete(`/api/cart/delete`, {
            params: {
              cartId: itemId,
            },
            headers: {
              Authorization: sessionStorage.getItem("authorization"),
              RefreshToken: sessionStorage.getItem("refreshToken"),
            },
          })
          .then((response) => {
            if (response.status == 200) {
              location.reload(); // 성공적으로 삭제되면 페이지 새로고침
            }
          })
          .catch((error) => {
            // 에러 발생 시 처리 (주석 처리됨)
          });
      }
    },

    // 모든 상품을 삭제하는 함수
    removeAllItems() {
      if (confirm("모든 상품을 삭제 하시겠습니까?")) {
        const promises = this.cartList.map((item) => {
          return axios.delete(`/api/cart/delete`, {
            params: {
              cartId: item.cartId,
            },
            headers: {
              Authorization: sessionStorage.getItem("authorization"),
              RefreshToken: sessionStorage.getItem("refreshToken"),
            },
          });
        });

        Promise.all(promises)
          .then((responses) => {
            if (responses.every((response) => response.status == 200)) {
              location.reload(); // 모든 삭제가 성공하면 페이지 새로고침
            }
          })
          .catch((error) => {
            // 에러 처리 (주석 처리됨)
          });
      }
    },
  
    // 수량을 1 증가시키는 함수
    increaseQuantity(index) {
      this.cartList[index].quantity++;
    },

     // 옵션 선택함수
    optionSelect(idx, item) {
      var selectOptionid = "";
      var selectOptiontext = "";
      var selectOption = document.getElementById("select-" + item.productOptionId);
      selectOptionid = selectOption.options[selectOption.selectedIndex].value;
      selectOptiontext = selectOption.options[selectOption.selectedIndex].text;

      let actualLength = this.selectOptionlist.filter((item) => item !== undefined)
        .length;

      if (selectOptionid !== "title") {
        if (this.quikviewInfo.productOptionList.length != actualLength + 1) {
          this.selectOptionlist[idx] = {
            productOptionId: item.productOptionId,
            productDetailOptionId: selectOptionid,
            name: selectOptiontext,
          };

          for (var i = 0; i < item.productDetailOptionList.length; i++) {
            if (selectOptionid == item.productDetailOptionList[i].detailOptionId) {
              this.selectOptionprice += item.productDetailOptionList[i].optionPrice;
            }
          }
        } else {
          for (var k = 0; k < item.productDetailOptionList.length; k++) {
            if (selectOptionid == item.productDetailOptionList[k].detailOptionId) {
              this.selectOptionprice += item.productDetailOptionList[k].optionPrice;
            }
          }
          this.selectOptionlist[idx] = {
            productOptionId: item.productOptionId,
            productDetailOptionId: selectOptionid,
            name: selectOptiontext,
          };

          this.selectProductlist.push({
            productId: this.quikviewInfo.productId,
            productOptionList: this.selectOptionlist,
            quantity: 1,
            totalamount: this.quikviewInfo.sellPrice + this.selectOptionprice,
          });
          this.selectOptionprice = 0;
          this.selectOptionlist = [];
          this.quikviewInfo.productOptionList.forEach((option) => {
            var selectElement = document.getElementById(
              "select-" + option.productOptionId
            );
            if (selectElement) {
              selectElement.selectedIndex = 0; 
            }
          });
        }
      }
    },
    checkOut() {
      sessionStorage.removeItem("checkoutlist");
      sessionStorage.setItem("checkoutlist", JSON.stringify(this.selectProductlist));
      window.location.href = "/checkOut";
    },
    checkOut2() {
      const checkboxes = document.getElementsByName("cartCheck");
      this.checkCount = [];
      checkboxes.forEach((checkbox, index) => {
        let CartOptionSelectList = [];
        if (checkbox.checked) {

            for (var i = 0; i < this.cartList[index].productOptionList.length; i++) {
              CartOptionSelectList.push({
                productOptionId: this.cartList[index].productOptionList[i].productOptionId,
                productDetailOptionId: this.cartList[index].productOptionList[i].productDetailOptionId,
                name: this.cartList[index].productOptionList[i].productDetailOptionTitle,
              });
            }
          
          this.checkCount.push({
            cartId: this.cartList[index].cartId,
            productId: this.cartList[index].productId,
            productOptionList: CartOptionSelectList,
            quantity: this.cartList[index].quantity,
            totalamount:
              (this.cartList[index].productPrice +
                this.cartList[index].productDetailOptionPrice) *
              this.cartList[index].quantity,
          });
        }
      });

      if (0 < this.checkCount.length) {
        sessionStorage.removeItem("checkoutlist");
        sessionStorage.setItem("checkoutlist", JSON.stringify(this.checkCount));
        window.location.href = "/checkOut";
      } else {
        alert("주문 하실 상품을 선택해주세요.");
      }
    },
    checkOut3() {
      const checkboxes = document.getElementsByName("cartCheck2");
      this.checkCount = [];

      checkboxes.forEach((checkbox, index) => {

        let CartOptionSelectList = [];
        if (checkbox.checked) {
          if( this.cartList[index].productOptionList.length > 0){
            for (var i = 0; i < this.cartList[index].productOptionList.length; i++) {
              CartOptionSelectList.push({
                productOptionId: this.cartList[index].productOptionList[i].productOptionId,
                productDetailOptionId: this.cartList[index].productOptionList[i].productDetailOptionId,
                name: this.cartList[index].productOptionList[i].productDetailOptionTitle,
              });
            }
          }
          this.checkCount.push({
            cartId: this.cartList[index].cartId,
            productId: this.cartList[index].productId,
            productOptionList: CartOptionSelectList,
            quantity: this.cartList[index].quantity,
            totalamount:
              (this.cartList[index].productPrice +
                this.cartList[index].productDetailOptionPrice) *
              this.cartList[index].quantity,
          });
        }
      });

      if (0 < this.checkCount.length) {
        sessionStorage.removeItem("checkoutlist");
        sessionStorage.setItem("checkoutlist", JSON.stringify(this.checkCount));
        window.location.href = "/checkOut";
      } else {
        alert("주문 하실 상품을 선택해주세요.");
      }
    },

    // 장바구니에 넣는 함수
    cartadd(item) {
      var necessaryYN = "Y";
      for (var j = 0; j < item.productOptionList.length; j++) {
        if (item.productOptionList[j].necessaryCheck === "Y") {
          alert("필수 옵션을 선택 하셔야합니다.");
          location.href = "productDetail?id=" + item.productId;
        } else {
          necessaryYN = "N";
        }
      }
      if (necessaryYN === "N") {
        this.cartInsert(item);
      }
    },
    async cartInsert(item) {
      try {
        let formData = new FormData();

        var cartItem = [
          {
            productId: item.productId,
            productOptionIds: [],
            productDetailOptionIds: [],
            quantity: 1,
          },
        ];
        formData.append(
          "cartAddRequestDtoList",
          new Blob([JSON.stringify(cartItem)], { type: "application/json" })
        );

        const response = await axios.post("/api/cart/add", formData, {
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });
        if (response.status == 200) {
          alert("장바구니에 담겼습니다.");
          location.reload();
        } else {
          alert("장바구니에 담기 실패하였습니다.");
        }
      } catch (error) {
        // console.log("Error checking login ID:", error);
      }
    },
  },
};
</script>
