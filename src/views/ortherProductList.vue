<template>
  <!-- Breadcrumb -->
  <section class="section-breadcrumb">
    <div class="ssm-breadcrumb-image">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="ssm-breadcrumb-title">
              <p class="d-flex">
                <a href="/" stlye="color: #e">메인</a>
                <i class="fa-solid fa-caret-right"></i>
                <a href="#" v-if="this.upCategories">{{ upCategories }}</a>
                <a href="#" v-else>{{ upname }}</a>
                <i class="fa-solid fa-caret-right"></i>
                <a href="#" v-if="this.mdCategories">{{ mdCategories }}</a>
                <a href="#" v-else>{{ mdname }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section-categoryTab">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="cr-services-border">
            <ul class="d-flex align-items-center flex-wrap categoryUl">
              <li
                class="col-xl-2 col-sm-6 col-md-4"
                v-for="(item, i) in filterrelatedUnderCategoryList"
                :key="item.categoryId"
              >
                <a
                  :href="
                    'ortherProductList?uid=' +
                    id +
                    '&upname=' +
                    name +
                    '&mdname=' +
                    item.categoryName +
                    '&id=' +
                    item.categoryId
                  "
                  class="col-12"
                >
                  <button type="button" class="col-12">{{ item.categoryName }}</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Shop -->
  <section class="section-productList">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-12 md-30 sideCategory">
          <div class="ssm-sideview">
            <div class="ssm-categories">
              <h4 class="ssm-categories-sub-title"><b>카테고리</b></h4>
              <div class="ssm-checkbox ">
                <div
                  class="checkbox-group"
                  v-for="(item, i) in filterrelatedUnderCategoryList"
                  :key="i"
                >
                  <input type="checkbox" :id="'category-' + i" :value="item.categoryId" />
                  <label
                    :for="'category-' + i"
                    @click="categorySelect(item.categoryId)"
                    >{{ item.categoryName }}</label
                  >
                </div>
                <div v-if="filterrelatedUnderCategoryList.length === 0">
                  <p>해당하는 카테고리가 없습니다</p>
                </div>
              </div>
            </div>

            <div class="ssm-weight d-flex align-items-center">
              <h4 class="ssm-weight-sub-title"><b>브랜드</b></h4>
              <div class="cr-checkbox d-flex align-items-center">
                <div class="checkbox-group" v-for="(item, i) in filterbrandList" :key="i">
                  <input type="checkbox" :id="'brand-' + i" :value="item.brandId" />
                  <label :for="'brand-' + i" @click="brandSelect(item.brandId)">{{
                    item.brandTitle
                  }}</label>
                </div>
                <div v-if="filterbrandList.length === 0">
                  <p>해당하는 브랜드가 없습니다</p>
                </div>
              </div>
            </div>
            <div class="ssm-weight d-flex align-items-center">
              <h4 class="ssm-weight-sub-title"><b>라벨</b></h4>
              <div class="cr-checkbox d-flex align-items-center">
                <div class="checkbox-group" v-for="(item, i) in filterlabelList" :key="i">
                  <input type="checkbox" :id="'label-' + i" />
                  <label :for="'label-' + i" @click="labelSelect(item.labelId)">{{
                    item.labelTitle
                  }}</label>
                </div>
                <div v-if="filterlabelList.length === 0">
                  <p>해당하는 라벨이 없습니다</p>
                </div>
              </div>
            </div>
            <div class="ssm-price d-flex align-items-center">
              <h4 class="ssm-categories-sub-title"><b>가격</b></h4>
              <div class="price-range-slider d-flex align-items-center">
                <p class="range-value col-xl-6 col-sm-6">
                  <input
                    type="text"
                    id="startRangePrice"
                    v-model="startRangePrice"
                    placeholder="0"
                    @focus="clearInput"
                    @input="formatNumber"
                  />

                  <span style="margin: 0 5px">~</span>

                  <input
                    type="text"
                    id="endRangePrice"
                    v-model="endRangePrice"
                    placeholder=""
                    @focus="clearInput"
                    @input="formatNumber"
                  />
                  <span style="margin-left: 5px">원</span>
                </p>
                <button
                  type="button"
                  class="cr-button"
                  @click="onedepthProductSListUp('srch')"
                >
                  검색
                </button>
              </div>
            </div>
          </div>
          <div
            class="ssm-reset flex-row-reverse"
          >
            <button type="button" class="ssm-button" @click="resetFilters()">
              초기화
            </button>
          </div>
        </div>
        <div class="col-lg-12 col-12 md-30">
          <div class="row">
            <div class="col-12">
              <div class="cr-shop-bredekamp">
                <div class="cr-toggle">
                  <a href="javascript:void(0)" class="gridCol active-grid">
                    <i class="ri-grid-line"></i>
                  </a>
                  <a href="javascript:void(0)" class="gridRow">
                    <i class="ri-list-check-2"></i>
                  </a>
                </div>
                <div class="center-content">
                  <span>총 {{ total }} 개의 상품이 있습니다.</span>
                </div>
                <div class="cr-select">
                  <label>정렬 조건 :</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="sortSelect"
                    @change="onedepthProducthListUp('sort')"
                  >
                    <option selected value="1">최신순</option>
                    <option value="2">낮은 가격 순</option>
                    <option value="3">높은 가격 순</option>
                    <option value="4">누적 판매 순</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row col-100 mb-minus-24">
            <div
              class="col-xxl-3 col-xl-4 col-6 ssm-product-box mb-24"
              v-for="(item, i) in productList"
              :key="i"
            >
              <div class="ssm-product-card">
                <a :href="'productDetail?id=' + item.productId">
                  <div class="ssm-product-image">
                    <a :href="'productDetail?id=' + item.productId">
                      <div class="ssm-image-inner zoom-image-hover">
                        <img :src="item.mediaList[0].imgUrl" alt="product-1" />
                      </div>
                    </a>
                    <div class="ssm-side-view">
                      <a
                        class="model-oraganic-product"
                        data-bs-toggle="modal"
                        href="#quickview"
                        role="button"
                        @click="quikview(item)"
                      >
                        <i class="ri-eye-line"></i>
                      </a>
                    </div>
                    <!-- <a class="cr-shopping-bag" @click="cartadd(item)">
                      <i class="ri-shopping-bag-line"></i>
                    </a> -->
                  </div>
                  <div class="ssm-product-details text-start columnDetail">
                    <div class="oneRowDiv">
                      <div class="ssm-brand">
                        <p>{{ item.brand }}</p>
                        <p class="sulchi" v-if="item.deliveryType === 'S'">설치제품</p>
                      </div>
                      <a
                        :href="'productDetail?id=' + item.productId"
                        class="title fw-bold"
                        >{{ item.productName }}</a
                      >
                    </div>

                    <p
                      class="ssm-price "
                    >
                      <span class="new-price"
                        >{{ formatPrice(item.sellPrice) }}원</span
                      >
                      <span class="new-price percent"
                        >{{
                          Math.ceil(
                            ((item.normalPrice - item.sellPrice) / item.normalPrice) * 100
                          )
                        }}%<i class="fa-solid fa-caret-down"></i
                      ></span>
                    </p>
                    <div class="d-none">
                      <button type="button">자세히 보기</button>
                    </div>
                  </div>
                  <div class="labelSpanDiv">
                    <span v-if="0 > item.deliveryPrice">무료배송</span>
                    <span v-for="(label, k) in item.labelList" :key="k">
                      {{ label.labelTitle }}
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <div v-if="productList.length === 0">
              <p style="text-align: center; margin: 50px 0">해당되는 제품이 없습니다.</p>
            </div>
          </div>
          <nav aria-label="Page navigation example" class="cr-pagination">
            <ul class="pagination">
              <li class="page-item">
                <a
                  class="page-link"
                  @click="pagenation(paging.paging - 1)"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>

              <li class="page-item webpage" v-for="i in visiblePages2" :key="i">
                <a
                  class="page-link"
                  :class="{ active: i === currentPage }"
                  @click="pagenation(i)"
                >
                  {{ i }}
                </a>
              </li>

              <li class="page-item mopage" v-for="i in visiblePages" :key="i">
                <a
                  class="page-link"
                  :class="{ active: i === currentPage }"
                  @click="pagenation(i)"
                >
                  {{ i }}
                </a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                 @click="pagenation(paging.paging + 1)"
                  aria-label="Next"
                  :disabled="paging.displayedPages >= paging.maxpage"
                >
                  <span aria-hidden="true">&#187;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
  <!-- Model -->
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
                    <span class="new-price fs-5"
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
                    >{{ formatPrice(totalPrice) + "원" }}
                    <span
                      style="
                        color: #888;
                        font-size: 14px;
                        font-weight: 500;
                        margin-left: 5px;
                      "
                    ></span>
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

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Pagination, Autoplay } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
data() {
    return {
      // URL 쿼리 파라미터로부터 데이터를 가져옴
      name: this.$router.currentRoute.value.query.name,
      upname: this.$router.currentRoute.value.query.upname,
      mdname: this.$router.currentRoute.value.query.mdname,
      id: this.$router.currentRoute.value.query.id,
      uid: this.$router.currentRoute.value.query.uid,

      minPrice: 0,
      twoDepthList: [], // 2단계 카테고리 리스트
      productList: [], // 제품 리스트
      filterbrandList: [], // 필터링용 브랜드 리스트
      filterbrandListSelect: [], // 선택된 브랜드 필터
      filterlabelList: [], // 필터링용 라벨 리스트
      filterlabelListSelect: [], // 선택된 라벨 필터
      filterrelatedUnderCategoryList: [], // 하위 관련 카테고리 필터
      categoryListSelect: [], // 선택된 카테고리 필터
      paramsValue: {}, // 검색 조건을 위한 파라미터 값
      total: 0, // 총 제품 수
      maxpage: 0, // 총 페이지 수
      paging: { paging: 1, maxpage: 1, displayedPages: 10 }, // 페이징 정보
      currentPage: 1, // 현재 페이지
      startRangePrice: 0, // 시작 가격 범위
      endRangePrice: 0, // 종료 가격 범위
      sortSelect: 1, // 정렬 방식
      quikviewInfo: { // 퀵뷰 관련 정보
        mediaList: [],
        productOptionList: [],
        normalPrice: 0,
        sellPrice: 0,
        deliveryPrice: 0,
      },
      quikviewOptionYn: "Y", // 옵션 여부
      selectOptionlist: [], // 선택된 옵션 리스트
      selectProductlist: [], // 선택된 제품 리스트
      selectOptionprice: 0, // 선택된 옵션 가격
      maxPrice: 0, // 최대 가격
      checkedItems: [], // 체크된 아이템 리스트
      upCategories: this.upCategories, // 상위 카테고리
      mdCategories: this.mdCategories, // 중간 카테고리
    };
  },
  computed: {
    // 페이지네이션에 표시될 페이지 계산
    visiblePages() {
      const maxPagesToShow = 5;
      const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(this.paging.maxpage, startPage + maxPagesToShow - 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    visiblePages2() {
      const maxPagesToShow = this.paging.displayedPages;
      const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(this.paging.maxpage, startPage + maxPagesToShow - 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    totalPrice() {
      // 각 제품의 총 가격 계산
      return this.selectProductlist.reduce((total, item) => {
        const optionPlus = item.totalamount * item.quantity;
        return total + optionPlus;
      }, 0);
    },
  },
  setup() {
    let thumbsSwiper = ref(null);

    let setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };

    return {
      thumbsSwiper,
      setThumbsSwiper,
      modules: [Navigation, Thumbs, FreeMode, Pagination, Autoplay],
    };
  },
  mounted() {
    this.onedepthProducthListUp(""); // 페이지 로딩 시 1단계 제품 목록 가져오기
    this.twoDepthListUp(); // 2단계 카테고리 목록 가져오기
    this.mainList(); // 메인 리스트 가져오기
  },
  methods: {
  // 페이지 상단으로 스크롤
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  },

  // 페이지네이션 처리
  pagenation(i) {
    if (1 <= i && i <= this.paging.maxpage) {
      this.paging.paging = i;
      this.onedepthProducthListUp("page");
      this.currentPage = this.paging.paging;
    }
    this.scrollToTop(); // 페이지 이동 시 상단으로 스크롤
  },

  // 필터 초기화 (체크박스, 가격 범위 등)
  resetFilters() {
    const checkboxes = document.querySelectorAll('.cr-checkbox input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false; // 체크박스 해제
    });

    // 필터 관련 값 초기화
    this.startRangePrice = "";
    this.endRangePrice = "";
    this.filterlabelListSelect = [];
    this.filterbrandListSelect = [];
    this.categoryListSelect = [];
    this.onedepthProductSListUp("srch"); // 상품 리스트 갱신
  },

  // 메인 리스트 불러오기
  async mainList() {
    try {
      const response = await axios.get("/api/category/navigation", {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("authorization"),
          RefreshToken: sessionStorage.getItem("refreshToken"),
        },
      });
      this.DepthOne = response.data.data; // 1Depth 카테고리 데이터 저장
    } catch (error) {
      // 오류 처리
    }
  },

  // 이미지 변경 (슬라이더 이동)
  changeImage(index) {
    this.$refs.mySwiper.slideTo(index);
  },

  // 입력 필드 초기화
  clearInput(event) {
    event.target.value = "";
  },

  // 체크박스가 선택되었는지 확인
  isChecked(item) {
    return this.checkedItems.includes(item); // 선택된 항목이 체크된 상태인지 확인
  },

  // 체크아웃 (결제 페이지로 이동)
  checkOut() {
    sessionStorage.removeItem("checkoutlist"); // 기존 체크아웃 리스트 제거
    sessionStorage.setItem("checkoutlist", JSON.stringify(this.selectProductlist)); // 선택된 상품 목록 저장
    window.location.href = "/checkOut"; // 체크아웃 페이지로 이동
  },

  // 장바구니 추가 (필수 옵션 확인)
  cartadd(item) {
    var necessaryYN = "Y";
    for (var j = 0; j < item.productOptionList.length; j++) {
      if (item.productOptionList[j].necessaryCheck === "Y") {
        alert("필수 옵션을 선택 하셔야합니다."); // 필수 옵션 선택 안내
        location.href = "productDetail?id=" + item.productId; // 상품 상세 페이지로 이동
      } else {
        necessaryYN = "N";
      }
    }
    if (necessaryYN === "N") {
      this.cartInsert(item); // 장바구니에 추가
    }
  },

  // 장바구니에 상품 추가
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
        alert("장바구니에 담겼습니다."); // 성공 메시지
        location.reload(); // 페이지 새로고침
      } else {
        alert("장바구니에 담기 실패하였습니다."); // 실패 메시지
      }
    } catch (error) {
      // 오류 처리
    }
  },

  // 빠른 보기 (퀵뷰) 모드에서 상품 선택
  quikview(item) {
    this.selectProductlist = [];
    this.quikviewInfo = item;
    if (item.productOptionList.length == 0) {
      this.quikviewOptionYn = "N"; // 선택 가능한 옵션이 없을 경우
      this.selectProductlist.push({
        productId: this.quikviewInfo.productId,
        productOptionList: [],
        quantity: 1,
        totalamount: this.quikviewInfo.sellPrice,
      });
    } else {
      this.quikviewOptionYn = "Y"; // 옵션이 있는 경우
    }
  },

  // 옵션 선택
  optionSelect(idx, item) {
    var selectOptionid = "";
    var selectOptiontext = "";
    var selectOption = document.getElementById("select-" + item.productOptionId);
    selectOptionid = selectOption.options[selectOption.selectedIndex].value;
    selectOptiontext = selectOption.options[selectOption.selectedIndex].text;

    let actualLength = this.selectOptionlist.filter((item) => item !== undefined).length;

    if (selectOptionid !== "title") {
      if (this.quikviewInfo.productOptionList.length != actualLength + 1) {
        this.selectOptionlist[idx] = {
          productOptionId: item.productOptionId,
          productDetailOptionId: selectOptionid,
          name: selectOptiontext,
        };

        for (var i = 0; i < item.productDetailOptionList.length; i++) {
          if (selectOptionid == item.productDetailOptionList[i].detailOptionId) {
            this.selectOptionprice += item.productDetailOptionList[i].optionPrice; // 옵션 가격 추가
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
        this.selectOptionprice = 0; // 옵션 가격 초기화
        this.selectOptionlist = []; // 옵션 리스트 초기화
      }
    }
  },

  // 선택된 상품 삭제
  selectproductDelete(i) {
    this.selectProductlist.splice(i, 1);
  },

  // 선택된 상품의 수량 변경
  selectProductlistamount(i, idx) {
    if (idx > 0) {
      this.selectProductlist[i].quantity += 1; // 수량 증가
    } else {
      if (this.selectProductlist[i].quantity > 1) {
        this.selectProductlist[i].quantity -= 1; // 수량 감소
      }
    }
  },

  // 퀵뷰 상품을 장바구니에 추가
  async quikviewcartInsert() {
    try {
      var resstatus = "";
      if (this.selectProductlist.length > 0) {
        for (var j = 0; j < this.selectProductlist.length; j++) {
          let formData = new FormData();
          var productOptionIdList = [];
          var productDetailOptionList = [];
          for (var k = 0; k < this.selectProductlist[j].productOptionList.length; k++) {
            if (this.selectProductlist[j].productOptionList[k].productDetailOptionId != "") {
              productOptionIdList.push(
                this.selectProductlist[j].productOptionList[k].productOptionId
              );
              productDetailOptionList.push(
                Number(
                  this.selectProductlist[j].productOptionList[k].productDetailOptionId
                )
              );
            }
          }
          var cartItem = [
            {
              productId: this.selectProductlist[j].productId,
              productOptionIds: productOptionIdList,
              productDetailOptionIds: productDetailOptionList,
              quantity: this.selectProductlist[j].quantity,
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
          resstatus = response.status;
        }
        if (resstatus == 200) {
          alert("장바구니에 담겼습니다.");
          location.reload();
        } else {
          alert("장바구니에 담기 실패하였습니다.");
        }
      } else {
        alert("옵션을 선택해주세요."); // 옵션 미선택 시 안내
      }
    } catch (error) {
      // 오류 처리
    }
  },

  // 가격 형식 포맷팅
  formatPrice(value) {
    if (value == null) {
      return "";
    }
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  },

    async twoDepthListUp() {
    try {
      // 두 번째 카테고리 목록을 가져오기 위한 API 호출
      const response = await axios.get(`/api/category/page/${this.uid}`, {});
      this.twoDepthList = response.data;
    } catch (error) {
      // 로그인 ID 확인 중 오류 발생 시
      // console.log("Error checking login ID:", error);
    }
  },
  async onedepthProducthListUp(str) {
    try {
      this.paramsValue = {};

      // 정렬 기준이 변경된 경우 페이지 번호를 1로 설정
      if (str == "sort") {
        this.paging.paging = 1;
        this.paramsValue.sort = this.sortSelect;
        this.paramsValue.page = this.paging.paging;
        this.currentPage = 1;
      } else {
        // 정렬 기준이 변경되지 않은 경우 현재 페이지 번호를 유지
        this.paramsValue.sort = this.sortSelect;
        this.paramsValue.page = this.paging.paging;
      }

      // 선택된 라벨 필터가 있는 경우
      if (this.filterlabelListSelect.length > 0) {
        this.paramsValue.labelId = this.filterlabelListSelect.toString();
      }

      // 선택된 브랜드 필터가 있는 경우
      if (this.filterbrandListSelect.length > 0) {
        this.paramsValue.brandId = this.filterbrandListSelect.toString();
      }

      // 선택된 카테고리 필터가 있는 경우
      if (this.categoryListSelect.length > 0) {
        this.paramsValue.middleCategoryId = this.categoryListSelect.toString();
      }

      // 가격 범위 값을 숫자로 변환
      this.paramsValue.startRangePrice = Number(
        this.startRangePrice.toString().replace(/,/g, "")
      );
      this.paramsValue.endRangePrice = Number(
        this.endRangePrice.toString().replace(/,/g, "")
      );

      const config = { "Content-Type": "application/json" };
      // 상품 목록을 가져오기 위한 API 호출
      const response = await axios.get(
        `/api/product/page/md/${this.id}/list`,
        {
          params: this.paramsValue,
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        },
        config
      );

      // API 응답 데이터를 상태 변수에 저장
      this.productList = response.data.data.mainProductList;
      this.filterbrandList = response.data.data.brandList;
      this.filterlabelList = response.data.data.labelList;
      this.filterrelatedUnderCategoryList = response.data.data.relatedUnderCategoryList.slice();

      // 전체 상품 수를 기반으로 페이지 최대값 계산
      this.total = response.data.data.totalMainProductCount;
      this.paging.maxpage = Math.ceil(this.total / 20);

      // 상위 및 중간 카테고리 정보 저장
      this.upCategories = this.productList.map((product) => product.upCategory);
      this.mdCategories = this.productList.map((product) => product.middleCategory);

      // 숫자 포맷 변환
      this.formatNumber();

      // 첫 번째 카테고리를 선택된 카테고리로 설정
      this.upCategories = this.upCategories[0];
      this.mdCategories = this.mdCategories[0];
    } catch (error) {
      // 상품 목록 가져오는 중 오류 발생 시
      // console.log(error);
    }
  },
  async onedepthProductSListUp(str) {
    try {
      this.paramsValue = {};
      // 페이지 번호가 아닌 경우 기본값 설정
      if (str != "page") {
        this.paramsValue.sort = 1;
        this.paging.paging = 1;
        this.paramsValue.page = this.paging.paging;
        this.currentPage = this.paging.paging;
      } else {
        // 페이지 번호가 있는 경우 현재 정렬값과 페이지 번호 사용
        this.paramsValue.sort = this.sortSelect;
        this.paramsValue.page = this.paging.paging;
      }

      // 선택된 라벨 필터가 있는 경우
      if (this.filterlabelListSelect.length > 0) {
        this.paramsValue.labelId = this.filterlabelListSelect.toString();
      }

      // 선택된 브랜드 필터가 있는 경우
      if (this.filterbrandListSelect.length > 0) {
        this.paramsValue.brandId = this.filterbrandListSelect.toString();
      }

      // 선택된 카테고리 필터가 있는 경우
      if (this.categoryListSelect.length > 0) {
        this.paramsValue.relatedDownCategoryId = this.categoryListSelect.toString();
      }

      // 가격 범위 값을 숫자로 변환
      this.paramsValue.startRangePrice = Number(
        this.startRangePrice.toString().replace(/,/g, "")
      );

      this.paramsValue.endRangePrice = Number(
        this.endRangePrice.toString().replace(/,/g, "")
      );

      const config = { "Content-Type": "application/json" };
      // 상품 목록을 가져오기 위한 API 호출
      const response = await axios.get(
        `/api/product/page/md/${this.id}/list`,
        {
          params: this.paramsValue,
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        },
        config
      );

      // 상품 목록 및 페이지 정보 저장
      this.productList = response.data.data.mainProductList;
      this.total = response.data.data.totalMainProductCount;
      this.paging.maxpage = Math.ceil(this.total / 20);

      // 숫자 포맷 변환
      this.formatNumber();
    } catch (error) {
      // 상품 목록 가져오는 중 오류 발생 시
      // console.log(error);
    }
  },
  labelSelect(id) {
    // 라벨 필터 선택 및 해제 처리
    if (0 <= this.filterlabelListSelect.indexOf(id)) {
      this.filterlabelListSelect.splice(this.filterlabelListSelect.indexOf(id), 1);
    } else {
      this.filterlabelListSelect.push(id);
    }
    // 필터 적용 후 상품 목록 업데이트
    this.onedepthProductSListUp("srch");
  },
  brandSelect(id) {
    // 브랜드 필터 선택 및 해제 처리
    if (0 <= this.filterbrandListSelect.indexOf(id)) {
      this.filterbrandListSelect.splice(this.filterbrandListSelect.indexOf(id), 1);
    } else {
      this.filterbrandListSelect.push(id);
    }
    // 필터 적용 후 상품 목록 업데이트
    this.onedepthProductSListUp("srch");
  },
  categorySelect(id) {
    // 카테고리 필터 선택 및 해제 처리
    if (0 <= this.categoryListSelect.indexOf(id)) {
      this.categoryListSelect.splice(this.categoryListSelect.indexOf(id), 1);
    } else {
      this.categoryListSelect.push(id);
    }
    // 필터 적용 후 상품 목록 업데이트
    this.onedepthProductSListUp("srch");
  },
  formatNumber() {
    // 가격 범위를 3자리 단위로 콤마(,)로 구분
    var value = this.startRangePrice.toString().replace(/,/g, "");
    var value2 = this.endRangePrice.toString().replace(/,/g, "");
    if (Number(value) > 0) {
      this.startRangePrice = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if (Number(value2) > 0) {
      this.endRangePrice = value2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  }
};
</script>
<style>
.example ul li:hover {
  background-color: #222;

  transition: all 0.5s;
}

.example ul li:hover button {
  color: #fff;
  transition: all 0.5s;
}
</style>
