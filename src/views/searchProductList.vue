<template>
  <!-- Breadcrumb -->

  <section class="section-breadcrumb">
    <div class="cr-breadcrumb-image">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="cr-breadcrumb-title searchBreadcrumbs">
              <h2 class="d-flex align-items-center">
                <p>{{ search }}</p>
                <span class="d-flex align-items-center"
                  >총
                  <h6
                    style="
                      margin-bottom: 0;
                      margin: 0 5px;
                      color: #067dfd;
                      font-weight: bold;
                    "
                  >
                    {{ total }}
                  </h6>
                  건의 검색결과
                </span>
              </h2>

              <span> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Shop -->

  <section class="section-shop">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-12 md-30 sideCategory">
          <div class="cr-shop-sideview">
            <div class="cr-shop-categories d-flex align-items-center">
              <h4 class="cr-shop-sub-title"><b>카테고리</b></h4>
              <div class="cr-checkbox d-flex align-items-center">
                <div
                  class="checkbox-group d-flex align-items-center"
                  v-for="(item, i) in filterrelatedUnderCategoryList"
                  :key="i"
                >
                  <input
                    @click="onedepthProductSListUp('srch')"
                    type="checkbox"
                    :id="'category-' + i"
                  />
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

            <div class="cr-shop-weight d-flex align-items-center">
              <h4 class="cr-shop-sub-title"><b>브랜드</b></h4>
              <div class="cr-checkbox d-flex align-items-center">
                <div class="checkbox-group" v-for="(item, i) in filterbrandList" :key="i">
                  <input
                    type="checkbox"
                    :id="'brand-' + i"
                    :value="item.brandId"
                    @click="onedepthProductSListUp('srch')"
                  />
                  <label :for="'brand-' + i" @click="brandSelect(item.brandId)">{{
                    item.brandTitle
                  }}</label> 
                </div>
                <div v-if="filterbrandList.length === 0">
                  <p>해당하는 브랜드가 없습니다</p>
                </div>
              </div>
            </div>
            <div class="cr-shop-weight d-flex align-items-center">
              <h4 class="cr-shop-sub-title"><b>라벨</b></h4>
              <div class="cr-checkbox d-flex align-items-center">
                <div class="checkbox-group" v-for="(item, i) in filterlabelList" :key="i">
                  <input
                    @click="onedepthProductSListUp('srch')"
                    type="checkbox"
                    :id="'label-' + i"
                  />
                  <label :for="'label-' + i" @click="labelSelect(item.labelId)">{{
                    item.labelTitle
                  }}</label>
                </div>
                <div v-if="filterlabelList.length === 0">
                  <p>해당하는 라벨이 없습니다</p>
                </div>
              </div>
            </div>
            <div class="cr-shop-price d-flex align-items-center">
              <h4 class="cr-shop-sub-title"><b>가격</b></h4>
              <div class="price-range-slider d-flex align-items-center">
                <p class="range-value col-xl-6 col-sm-6">
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
                  <button
                    type="button"
                    class="cr-button"
                    style="margin-left: 20px"
                    @click="filterByPrice()"
                  >
                    검색
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div
            class="cr-shop-weight"
            style="
              display: flex;
              flex-direction: row-reverse;
              padding: 0;
              margin: 10px 0 20px 0;
            "
          >
            <button type="button" class="cr-button" @click="resetFilters()">
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
              class="col-xxl-3 col-xl-4 col-6 cr-product-box mb-24"
              v-for="(item, i) in productList"
              :key="i"
            >
              <div class="cr-product-card">
                <a :href="'productDetail?id=' + item.productId">
                  <div class="cr-product-image">
                    <a :href="'productDetail?id=' + item.productId">
                      <div class="cr-image-inner zoom-image-hover">
                        <img :src="item.mediaList[0].imgUrl" alt="product-1" />
                      </div>
                    </a>

                    <div class="cr-side-view">
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

                    <a class="cr-shopping-bag" @click="cartadd(item)">
                      <i class="ri-shopping-bag-line"></i>
                    </a>
                  </div>

                  <div class="cr-product-details text-start columnDetail">
                    <div class="cr-brand">
                      <p>{{ item.brand }}</p>
                      <p class="sulchi" v-if="item.deliveryType === 'S'">설치제품</p>
                    </div>

                    <a
                      :href="'productDetail?id=' + item.productId"
                      class="title fs-6 fw-bold"
                      >{{ item.productName }}</a
                    >

                    <p
                      class="cr-price d-flex justify-content-start align-items-center flex-wrap text-start"
                    >
                      <span class="new-price fs-5"
                        >{{ formatPrice(item.sellPrice) }}원</span
                      >

                      <span class="new-price percent" style="margin-left: 5px"
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
                          {{ item.totalamount - this.quikviewInfo.sellPrice }}</span
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
                        <span class="new-price">{{
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
                    OnClick="location.href ='/checkOut'"
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
      name: this.$router.currentRoute.value.query.name,
      search: this.$router.currentRoute.value.query.search,
      minPrice: "",
      twoDepthList: [],
      productList: [],
      filterbrandList: [],
      filterbrandListSelect: [],
      filterlabelList: [],
      filterlabelListSelect: [],
      filterrelatedUnderCategoryList: [],
      categoryListSelect: [],
      paramsValue: {},
      total: 0,
      maxpage: 0,
      paging: { paging: 1, maxpage: 1, displayedPages: 10 },
      currentPage: 1,
      breakpoints: {
        1399: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
        1028: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
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
    };
  },
  computed: {
    visiblePages() {
      const maxPagesToShow = 5;
      const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(this.paging.maxpage, startPage + maxPagesToShow - 1);

      // 페이지 번호 조정
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    visiblePages2() {
      const maxPagesToShow = this.paging.displayedPages;
      const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(this.paging.maxpage, startPage + maxPagesToShow - 1);

      // 페이지 번호 조정
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },

    totalPrice() {
      // Calculate total price for each item individually
      return this.selectProductlist.reduce((total, item) => {
        // Calculate subtotal for the current item
        // const subtotal = item.quantity * this.productInfo.sellPrice;
        const optionPlus = item.totalamount * item.quantity;
        // Return the total by adding the subtotal for the current item
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
      modules: [Navigation, Thumbs, FreeMode],
    };
  },
  mounted() {
    this.onedepthProducthListUp("");
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    },

    pagenation(i) {
      if (1 <= i && i <= this.paging.maxpage) {
        this.paging.paging = i;
        this.onedepthProducthListUp("page");
        this.currentPage = this.paging.paging;
      }
      this.scrollToTop();
    },
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
    async onedepthProducthListUp(str) {
      try {
        this.paramsValue = {};

        if (str == "sort") {
          this.paging.paging = 1;
          this.paramsValue.sort = this.sortSelect;
          this.paramsValue.page = this.paging.paging;
            this.currentPage = 1;
        } else {
          this.paramsValue.sort = this.sortSelect;
          this.paramsValue.page = this.paging.paging;
        }

        this.paramsValue.searchKeyword = this.search;

        if (this.filterlabelListSelect.length > 0) {
          this.paramsValue.labelId = this.filterlabelListSelect.toString();
        }

        if (this.filterbrandListSelect.length > 0) {
          this.paramsValue.brandId = this.filterbrandListSelect.toString();
        }

        if (this.categoryListSelect.length > 0) {
          this.paramsValue.middleCategoryId = this.categoryListSelect.toString();
        }

        this.paramsValue.startRangePrice = this.startRangePrice
          .toString()
          .replace(/,/g, "");
        this.paramsValue.endRangePrice = Number(
          this.endRangePrice.toString().replace(/,/g, "")
        );

        const config = { "Content-Type": "application/json" };

        const response = await axios.get(
          `/api/product/search`,
          {
            params: this.paramsValue,
            headers: {
              Authorization: sessionStorage.getItem("authorization"),
              RefreshToken: sessionStorage.getItem("refreshToken"),
            },
          },
          config
        );
        this.productList = response.data.data.searchProductList;
        this.filterbrandList = response.data.data.brandList;
        this.filterlabelList = response.data.data.labelList;
        this.filterrelatedUnderCategoryList = response.data.data.middleCategoryList;
        this.total = response.data.data.totalSearchProductCount;
        this.paging.maxpage = Math.ceil(this.total / 20);
        this.formatNumber();
      } catch (error) {
        // console.log(error);
      }
    },
    async onedepthProductSListUp(str) {
      try {
        this.paramsValue = {};

        if (str !== "page") {
          this.paramsValue.sort = 1;
          this.paging.paging = 1;
          this.paramsValue.page = this.paging.paging;
          this.currentPage = this.paging.paging;
        } else {
          this.paramsValue.sort = this.sortSelect;
          this.paramsValue.page = this.paging.paging;
        }

        if (this.filterlabelListSelect.length > 0) {
          this.paramsValue.labelId = this.filterlabelListSelect.toString();
        }

        if (this.filterbrandListSelect.length > 0) {
          this.paramsValue.brandId = this.filterbrandListSelect.toString();
        }

        if (this.categoryListSelect.length > 0) {
          this.paramsValue.middleCategoryId = this.categoryListSelect.toString();
        }

        // Convert the input values to integers
        const startPrice = parseInt(
          this.startRangePrice.toString().replace(/,/g, ""),
          10
        );
        const endPrice = parseInt(this.endRangePrice.toString().replace(/,/g, ""), 10);

        // Validate the input values
        if (
          isNaN(startPrice) ||
          isNaN(endPrice) ||
          startPrice < 0 ||
          endPrice < 0 ||
          startPrice > endPrice
        ) {
          alert("올바른 가격 범위를 입력하세요.");
          return;
        }

        this.paramsValue.startRangePrice = startPrice;
        this.paramsValue.endRangePrice = endPrice;

        const config = { "Content-Type": "application/json" };
        const response = await axios.get(
          `/api/product/page/up/${this.id}/list`,
          {
            params: this.paramsValue,
            headers: {
              Authorization: sessionStorage.getItem("authorization"),
              RefreshToken: sessionStorage.getItem("refreshToken"),
            },
          },
          config
        );

        this.productList = response.data.data.mainProductList;
        this.total = response.data.data.totalMainProductCount;
        this.paging.maxpage = Math.ceil(this.total / 20);
        console.log(this.productList);
        this.formatNumber();
      } catch (error) {
        // console.error('Error fetching filtered products:', error);
      }
    },
    formatPrice(value) {
      if (value == null) {
        return "";
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    labelSelect(id) {
      if (0 <= this.filterlabelListSelect.indexOf(id)) {
        this.filterlabelListSelect.splice(this.filterlabelListSelect.indexOf(id), 1);
      } else {
        this.filterlabelListSelect.push(id);
      }
    },
    brandSelect(id) {
      if (0 <= this.filterbrandListSelect.indexOf(id)) {
        this.filterbrandListSelect.splice(this.filterbrandListSelect.indexOf(id), 1);
      } else {
        this.filterbrandListSelect.push(id);
      }
    },
    categorySelect(id) {
      if (0 <= this.categoryListSelect.indexOf(id)) {
        this.categoryListSelect.splice(this.categoryListSelect.indexOf(id), 1);
      } else {
        this.categoryListSelect.push(id);
      }
    },
    formatNumber() {
      var value = this.startRangePrice.toString().replace(/,/g, "");
      var value2 = this.endRangePrice.toString().replace(/,/g, "");
      if (Number(value) > 0) {
        this.startRangePrice = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      if (Number(value2) > 0) {
        this.endRangePrice = value2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
  },
};
</script>
