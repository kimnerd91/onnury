<template>
  <!-- Breadcrumb -->
  <section class="section-breadcrumb">
    <div class="ssm-breadcrumb-image">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="ssm-breadcrumb-title">
              <p class="d-flex">
                <a href="/">메인</a>

                <i class="fa-solid fa-caret-right"></i>
                <a href="#">{{ this.brandTitle }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section-productList padding-tb-50">
    <div class="container">
      <div class="d-flex align-items-center justify-content-center">
        <img v-if="this.brandsLogo" style="width: 50%" :src="this.brandsLogo" alt="" />
        <img v-else style="width: 5%" src="../assets/img/logo/omnuryLOGO2.png" alt="" />
      </div>
    </div>
  </section>
  <!-- Shop -->
  <section class="section-productList">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-12 md-30 sideCategory">
          <div class="ssm-sideview">
            <div class="ssm-categories d-flex align-items-center">
              <h4 class="ssm-categories-sub-title"><b>카테고리</b></h4>
              <div class="ssm-checkbox d-flex align-items-center">
                <div
                  class="checkbox-group d-flex align-items-center"
                  v-for="(item, i) in filterrelatedmiddleCategoryList"
                  :key="i"
                >
                  <input type="checkbox" :id="'category-' + i" :value="item.categoryId" />
                  <label
                    :for="'category-' + i"
                    @click="categorySelect(item.categoryId)"
                    >{{ item.categoryName }}</label
                  >
                </div>
                <div
                  v-if="
                    !filterrelatedmiddleCategoryList ||
                    filterrelatedmiddleCategoryList.length === 0
                  "
                >
                  <p>해당하는 카테고리가 없습니다</p>
                </div>
              </div>
            </div>
            <div class="ssm-weight d-flex align-items-center">
              <h4 class="ssm-weight-sub-title"><b>라벨</b></h4>
              <div class="ssm-checkbox d-flex align-items-center">
                <div class="checkbox-group" v-for="(item, i) in filterlabelList" :key="i">
                  <input type="checkbox" :id="'label-' + i" />
                  <label :for="'label-' + i" @click="labelSelect(item.labelId)">{{
                    item.labelTitle
                  }}</label>
                </div>
                <div v-if="!filterlabelList || filterlabelList.length === 0">
                  <p>해당하는 라벨이 없습니다</p>
                </div>
              </div>
            </div>
            <div class="ssm-price d-flex align-items-center">
              <h4 class="ssm-categories-sub-title"><b>가격</b></h4>
              <div class="price-range-slider d-flex align-items-center">
                <p class="range-value col-xl-6 col-sm-12">
                  <input
                    type="text"
                    id="startRangePrice"
                    v-model="this.startRangePrice"
                    placeholder="0"
                    @focus="clearInput"
                    @input="formatNumber"
                  />

                  <span style="margin: 0 5px">~</span>

                  <input
                    type="text"
                    id="endRangePrice"
                    v-model="this.endRangePrice"
                    placeholder=""
                    @focus="clearInput"
                    @input="formatNumber"
                  />
                  <span style="margin-left: 5px">원</span>
                </p>
                <button
                  type="button"
                  class="ssm-button"
                  style="margin-left: 20px"
                  @click="filterByPrice()"
                >
                  검색
                </button>
              </div>
            </div>
          </div>
          <div class="ssm-reset">
            <button type="button" class="ssm-button" @click="resetFilters()">
              초기화
            </button>
          </div>
        </div>
        <div class="col-lg-12 col-12 md-30">
          <div class="row">
            <div class="col-12">
              <div class="ssm-bredekamp">
                <div class="ssm-toggle">
                  <a
                    href="#"
                    class="gridCol"
                    :class="{ 'active-grid': activeLinkIndex === 0 }"
                    @click.prevent="activateLink(0)"
                  >
                    <i class="ri-grid-line"></i>
                  </a>
                  <a
                    href="#"
                    class="gridRow"
                    :class="{ 'active-grid': activeLinkIndex === 1 }"
                    @click.prevent="activateLink(1)"
                  >
                    <i class="ri-list-check-2"></i>
                  </a>
                </div>
                <div class="center-content">
                  <span>총 {{ total }} 개의 상품이 있습니다.</span>
                </div>
                <div class="ssm-select">
                  <label>정렬 조건 :</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="sortSelect"
                    @change="brandProductList('sort')"
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
          <div
            class="row col-100 mb-minus-24"
            :class="{ 'col-size': activeLinkIndex === 1 }"
          >
            <div
              class="col-xxl-3 col-xl-4 col-6 ssm-product-box mb-24"
              v-for="(item, i) in this.brands"
              :key="i"
            >
              <div class="ssm-product-card">
                <a :href="'productDetail?id=' + item.productId">
                  <!-- product로 변경 -->
                  <div class="ssm-product-image">
                    <a :href="'productDetail?id=' + item.productId">
                      <div class="ssm-image-inner">
                        <img :src="item.mediaList[0].imgUrl" alt="product-1" />
                        <!-- product로 변경 -->
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
                    <!-- <a class="-shopping-bag" href="javascript:void(0)">
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
                        class="title fs-6 fw-bold"
                      >
                        {{ item.productName }}
                      </a>
                    </div>

                    <p class="ssm-price">
                      <span class="new-price fs-5"
                        >{{ formatPrice(item.sellPrice) }}원</span
                      >
                      <span class="new-price percent" style="margin-left: 5px">
                        {{
                          Math.ceil(
                            ((item.normalPrice - item.sellPrice) / item.normalPrice) * 100
                          )
                        }}%
                        <i class="fa-solid fa-caret-down"></i>
                      </span>
                    </p>
                    <div class="d-none">
                      <button type="button">자세히 보기</button>
                    </div>
                  </div>
                  <div class="labelSpanDiv">
                    <span v-if="item.deliveryPrice < 0">무료배송</span>
                    <span v-for="(label, k) in item.labelList" :key="k">
                      {{ label.labelTitle }}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div v-if="!brandProductList || brandProductList.length === 0">
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

              <li class="page-item webpage" v-for="i in webPagination" :key="i">
                <a
                  class="page-link"
                  :class="{ active: i === currentPage }"
                  @click="pagenation(i)"
                >
                  {{ i }}
                </a>
              </li>

              <li class="page-item mopage" v-for="i in mobilePagination" :key="i">
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
              <div class="vehicle-detail-banner banner-content clearfix"></div>
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
                      {{
                        quikviewInfo.deliveryPrice === 0
                          ? "무료배송"
                          : quikviewInfo.deliveryPrice.toLocaleString() + "원"
                      }}
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
                          {{ item2.name }}/</span
                        >
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
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      activeLinkIndex: 0,
      brandId: [], // 선택된 브랜드 id
      name: this.$router.currentRoute.value.query.name,
      brandName: this.$router.currentRoute.value.query.bname,
      img: this.$router.currentRoute.value.query.img,
      id: this.$router.currentRoute.value.query.id,
      minPrice: 0,
      debounceTimeout: null,
      brands: [],
      checkedItems: [],
      twoDepthList: [],
      productList: [],
      filterbrandList: [],
      filterbrandListSelect: [],
      filterrelatedmiddleCategoryList: [],
      filterlabelList: [],
      categoryListSelect: [],
      paramsValue: {},
      total: 0,
      maxpage: 0,
      paging: { paging: 1, maxpage: 1, displayedPages: 10 },
      currentPage: 1,
      startRangePrice: 0,
      endRangePrice: 0,
      sortSelect: 1,
      quikviewInfo: {
        mediaList: [],
        productOptionList: [],
        normalPrice: 0,
        sellPrice: 0,
        deliveryPrice: 0,
      },
      quikviewOptionYn: "Y",
      selectOptionlist: [],
      selectProductlist: [],
      selectOptionprice: 0,
      maxPrice: 0,
      brandTitle: this.brandTitle,
      brandsLogo: this.brandsLogo,
      products: [],
      selectedBrand: "",
      items: [],
      filterlabelListSelect: [],
    };
  },
  setup() {
    let thumbsSwiper = ref(null);

    let setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };

    return {
      thumbsSwiper,
      setThumbsSwiper,
      modules: [Navigation, Thumbs, FreeMode],
    };
  },
  mounted() {
    this.brandProductList();
    this.BrandList();
  },
  computed: {
    /*모바일 페이지네이션*/
    mobilePagination() {
      const maxPagesToShow = 5;
      const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(this.paging.maxpage, startPage + maxPagesToShow - 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    /*웹 페이지네이션*/
    webPagination() {
      const maxPagesToShow = this.paging.displayedPages;
      const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(this.paging.maxpage, startPage + maxPagesToShow - 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    /* 모달 내 총 가격 계산*/
    totalPrice() {
      return this.selectProductlist.reduce((total, item) => {
        const optionPlus = item.totalamount * item.quantity;
        return total + optionPlus;
      }, 0);
    },
    // filteredProductList() {
    //   return this.products.filter((product) => product.brandId.toString() === this.id);
    // },
  },
  methods: {
    /* 스크롤 탑 버튼 메소드 */
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    },
    /*페이지네이션 작동 (웹, 모바일)*/
    pagenation(i) {
      if (1 <= i && i <= this.paging.maxpage) {
        this.paging.paging = i;
        this.brandProductSearchList("page");
        this.currentPage = this.paging.paging;
      }
      this.scrollToTop();
    },
    /* 브랜드 리스트 axios*/
    async BrandList() {
      try {
        const response = await axios.get("/api/brand/mainlist", {
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });
        // 성공적인 응답
        if (response.status === 200) {
          this.brandsList = response.data.data;
          this.brandsLogo = this.brands.map((product) => product.mediaUrl);
          this.brandTitle = this.brands.map((product) => product.brandTitle);
          this.brandId = this.brands.map((product) => product.brandId);
          // this.id 값을 문자열로 변환하여 일치하는 brandId의 brandTitle 출력
          this.matchedBrand = this.brandsList.find(
            (product) => product.brandId.toString() === this.id
          );
          if (this.matchedBrand) {
            this.brandTitle = this.matchedBrand.brandTitle;
          } else {
          }
        }
      } catch (error) {
        // 에러 처리
        // console.error("에러 발생:", error);
      }
    },
    async mounted() {
      try {
        await this.BrandList(); // 브랜드 목록을 먼저 불러옵니다.
        await this.brandProductList(); // 브랜드 상품 목록을 불러옵니다.
      } catch (error) {
        // console.error("데이터 로딩 중 오류 발생:", error);
      }
    },

    /* 상단 필터 초기화 */
    resetFilters() {
      const checkboxes = document.querySelectorAll('.cr-checkbox input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      this.startRangePrice = "";
      this.endRangePrice = "";
      this.filterlabelListSelect = [];
      this.filterbrandListSelect = [];
      this.categoryListSelect = [];
      this.brandProductList("srch");
    },

    /* 브랜드별 상품 axios */

    async brandProductList(str) {
      try {
        this.brandId = this.id;
        this.paramsValue = {};

        if (str === "sort") {
          this.paging.paging = 1;
        }

        this.paramsValue.sort = Number(this.sortSelect);
        this.paramsValue.page = this.paging.paging;

        if (this.filterlabelListSelect.length > 0) {
          this.paramsValue.labelIdList = this.filterlabelListSelect.toString();
        }

        if (this.filterbrandListSelect.length > 0) {
          this.paramsValue.brandId = this.filterbrandListSelect.toString();
        }

        if (this.categoryListSelect.length > 0) {
          this.paramsValue.relatedMiddleCategoryIdList = this.categoryListSelect.toString();
        }

        this.paramsValue.startRangePrice = Number(
          this.startRangePrice.toString().replace(/,/g, "")
        );

        this.paramsValue.endRangePrice = Number(
          this.endRangePrice.toString().replace(/,/g, "")
        );

        const config = {
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        };

        // URL에 백틱(``) 사용
        const response = await axios.get(`/api/product/page/brand/${this.brandId}/list`, {
          params: this.paramsValue,
          ...config,
        });

        this.brands = response.data.data.brandProductList;
        this.total = response.data.data.totalBrandProductCount;
        this.filterbrandList = response.data.data.brandProductList.brandList;
        this.filterlabelList = response.data.data.brandProductList.labelList;
        this.filterlabelList = response.data.data.labelList;
        this.paging.maxpage = Math.ceil(this.total / 20);

        // 카테고리 리스트 설정
        this.filterrelatedmiddleCategoryList = response.data.data.middleCategoryList;

        this.formatNumber();
      } catch (error) {
        // console.error("Error fetching brand products:", error);
      }
    },

    /* 브랜드별 상품 검색리스트 */
    async brandProductSearchList(str) {
      try {
        this.brandId = this.id;
        this.paramsValue = {};

        if (str === "sort") {
          this.paging.paging = 1;
        }

        this.paramsValue.sort = this.sortSelect;
        this.paramsValue.page = this.paging.paging;

        if (this.filterlabelListSelect.length > 0) {
          this.paramsValue.labelIdList = this.filterlabelListSelect.toString();
        }

        if (this.filterbrandListSelect.length > 0) {
          this.paramsValue.brandId = this.filterbrandListSelect.toString();
        }

        if (this.categoryListSelect.length > 0) {
          this.paramsValue.relatedMiddleCategoryIdList = this.categoryListSelect.toString();
        }

        this.paramsValue.startRangePrice = Number(
          this.startRangePrice.toString().replace(/,/g, "")
        );

        this.paramsValue.endRangePrice = Number(
          this.endRangePrice.toString().replace(/,/g, "")
        );

        const config = {
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        };

        // URL에 백틱(``) 사용
        const response = await axios.get(`/api/product/page/brand/${this.brandId}/list`, {
          params: this.paramsValue,
          ...config,
        });

        this.brands = response.data.data.brandProductList;

        this.formatNumber();
      } catch (error) {
        // console.error("Error fetching brand products:", error);
      }
    },

    /* 검색기능 */

    onCategoryClick(categoryId) {
      this.brandProductList("srch");
    },

    /* 인풋 입력값 초기화 */
    clearInput(event) {
      event.target.value = "";
    },

    /*결제 페이지로 이동*/

    checkOut() {
      sessionStorage.removeItem("checkoutlist");
      sessionStorage.setItem("checkoutlist", JSON.stringify(this.selectProductlist));
      window.location.href = "/checkOut";
    },
    isChecked(item) {
      // 예시: 체크박스가 체크되었는지 확인하는 로직
      return this.checkedItems.includes(item);
    },
    /* 장바구니 담기 기능 */
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
    /* 천원 이하의 절삭 */
    formatPrice(value) {
      if (value == null) {
        return "";
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      /* 퀵부 모달 */
    },
    quikview(item) {
      this.selectProductlist = [];
      this.quikviewInfo = item;
      if (item.productOptionList.length == 0) {
        this.quikviewOptionYn = "N";
        this.selectProductlist.push({
          productId: this.quikviewInfo.productId,
          productOptionList: [],
          quantity: 1,
          totalamount: this.quikviewInfo.sellPrice,
        });
      } else {
        this.quikviewOptionYn = "Y";
      }
    },

    /*옵션 선택기능*/

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
        }
      }
    },
    activateLink(index) {
      this.activeLinkIndex = index;
    },
    labelSelect(labelId) {
      // 필터링 조건에 선택된 라벨 ID를 추가
      if (!Array.isArray(this.filterlabelListSelect)) {
        this.filterlabelListSelect = [];
      }

      if (this.filterlabelListSelect.includes(labelId)) {
        this.filterlabelListSelect = this.filterlabelListSelect.filter(
          (id) => id !== labelId
        );
      } else {
        this.filterlabelListSelect.push(labelId);
      }
      // 라벨 선택 후 상품 목록 갱신
      this.brandProductSearchList("srch");
    },
    selectproductDelete(i) {
      this.selectProductlist.splice(i, 1);
    },
    selectProductlistamount(i, idx) {
      if (idx > 0) {
        this.selectProductlist[i].quantity += 1;
      } else {
        if (this.selectProductlist[i].quantity > 1) {
          this.selectProductlist[i].quantity -= 1;
        }
      }
    },
    async quikviewcartInsert() {
      try {
        var resstatus = "";
        if (this.selectProductlist.length > 0) {
          for (var j = 0; j < this.selectProductlist.length; j++) {
            let formData = new FormData();
            var productOptionIdList = [];
            var productDetailOptionList = [];
            for (var k = 0; k < this.selectProductlist[j].productOptionList.length; k++) {
              if (
                this.selectProductlist[j].productOptionList[k].productDetailOptionId != ""
              ) {
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
          alert("옵션을 선택해주세요.");
        }
      } catch (error) {
        // console.log("Error checking login ID:", error);
      }
    },

    formatNumber() {
      var value = Number(this.startRangePrice).toString().replace(/,/g, "");
      var value2 = this.endRangePrice.toString().replace(/,/g, "");
      if (Number(value) > 0) {
        this.startRangePrice = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      if (Number(value2) > 0) {
        this.endRangePrice = value2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    brandSelect(id) {
      if (0 <= this.filterbrandListSelect.indexOf(id)) {
        this.filterbrandListSelect.splice(this.filterbrandListSelect.indexOf(id), 1);
      } else {
        this.filterbrandListSelect.push(id);
      }
      this.brandProductSearchList("srch");
    },
    categorySelect(id) {
      if (this.categoryListSelect.indexOf(id) >= 0) {
        this.categoryListSelect.splice(this.categoryListSelect.indexOf(id), 1);
      } else {
        this.categoryListSelect.push(id);
      }
      this.brandProductSearchList("srch");
    },
  },
};
</script>
