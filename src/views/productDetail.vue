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
                <a href="#">{{ productInfo.upCategory }}</a>
                <i class="fa-solid fa-caret-right"></i>
                <a href="#">{{ productInfo.middleCategory }}</a>
                <i class="fa-solid fa-caret-right"></i>
                <a href="#">{{ productInfo.downCategory }}</a>
                <!-- <i class="fa-solid fa-caret-right"></i>
                <a href="#">{{ productInfo.productName }}</a> -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Product -->
  <section class="section-product padding-b-100">
    <div class="container">
      <div class="row mb-minus-24">
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
                  <swiper-slide v-for="(item, i) in productInfo.mediaList" :key="i">
                    <div class="slider-banner-image big">
                      <div class="zoom-image-hover2">
                        <img
                          :src="item.imgUrl"
                          alt="product-tab-1"
                          class="product-image big"
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
                  <swiper-slide v-for="(item, i) in productInfo.mediaList" :key="i">
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
          <div class="ssm-size-and-weight-contain" style="padding-bottom: 0">
            <div class="labelTagDiv d-flex justify-content-start align-items-center">
              <a
                class="nav-link"
                style="margin-bottom: 5px"
                :href="'/labelProductList?id=' + item.labelId + '&img=' + item.imgUrl"
                v-for="(item, i) in productInfo.labelList"
                :style="{ backgroundColor: item.colorCode }"
                :key="i"
              >
                {{ item.labelTitle }}
              </a>
            </div>
            <h2 class="heading">
              <b>{{ productInfo.productName }}</b>
            </h2>
          </div>
          <div class="ssm-size-and-weight">
            <div
              class="ssm-product-price"
              style="display: flex; flex-direction: column; padding-top: 0"
            >
              <p
                class="ssm-price d-flex justify-content-start align-items-center flex-wrap text-start"
              >
                <span class="old-price fs-6 col-12"
                  >{{ wonreplace(productInfo.normalPrice) }}원</span
                >
                <span class="new-price fs-3" style="line-height: 1px; margin-top: 10px"
                  >{{ wonreplace(productInfo.sellPrice) }}원</span
                >
                <span class="new-price percent" style="margin-left: 5px; margin-top: 10px"
                  >{{
                    Math.ceil(
                      ((productInfo.normalPrice - productInfo.sellPrice) /
                        productInfo.normalPrice) *
                        100
                    )
                  }}%<i class="fa-solid fa-caret-down"></i
                ></span>
              </p>
            </div>
            <div class="list">
              <ul>
                <li v-if="productInfo.deliveryType === 'D'">
                  추가 배송비 <span>:</span>
                  <span style="font-weight: bold; margin-left: 5px">
                    {{
                      productInfo.deliveryPrice === 0
                        ? "무료배송"
                        : productInfo.deliveryPrice.toLocaleString() + "원"
                    }}</span
                  >
                </li>
                <li v-if="productInfo.deliveryType === 'S'">
                  배송방법 <span>:</span>
                  <span style="font-weight: bold; margin-left: 5px">설치제품</span>
                </li>
                <li>
                  모델명 <span>:</span
                  ><span style="font-weight: bold; margin-left: 5px">{{
                    productInfo.modelNumber
                  }}</span>
                </li>
                <li>
                  제조사 <span>:</span
                  ><span style="font-weight: bold; margin-left: 5px">{{
                    productInfo.manufacturer
                  }}</span>
                </li>
                <li>
                  원산지 <span>:</span
                  ><span style="font-weight: bold; margin-left: 5px">{{
                    productInfo.madeInOrigin
                  }}</span>
                </li>

                <li>
                  * 일부 상품의 경우 상품별, 지역별 보유 물량에 따라 배송이 지연될 수
                  있습니다.
                </li>
                <li>
                  * 도서산간(제주 포함)의 경우 추가 배송비가 발생하거나 물류 사정에 따라
                  배송이 불가할 수 있습니다.
                </li>
              </ul>
            </div>
            <hr />
            <div class="ssm-size-and-weight" v-if="quikviewOptionYn == 'Y'">
              <h5><span class="new-price">옵션 선택</span></h5>
              <div
                class="ssm-kg"
                style="padding-top: 10px"
                v-for="(item, i) in productInfo.productOptionList"
                :key="i"
              >
                <select
                  :id="'select-' + item.productOptionId"
                  class="form-select"
                  @change="optionSelect(i, item)"
                >
                  <option value="title" selected>{{ item.productOptionTitle }}</option>
                  <option value="" v-if="item.necessaryCheck == 'N'">선택 안함</option>
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
              class="ssm-add-card position-relative"
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
              <div class="ssm-qty-main flex-wrap" style="width: 100%; padding: 5px">
                <div class="col-12" style="padding: 10px 10px 0 0">
                  <span
                    ><b>{{ productInfo.productName }}</b></span
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
                  <div class="ssm-product-price">
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
                style="text-align: right; font-weight: bold"
                >{{ formatPrice(totalPrice) }}
                <span
                  style="color: #888; font-size: 14px; font-weight: 500; margin-left: 5px"
                  >원</span
                >
              </span>
            </div>
            <div class="ssm-size-and-weight" style="display: flex">
              <button
                type="button"
                class="ssm-button"
                style="width: 50%; height: 50px"
                @click="quikviewcartInsert"
              >
                <i class="fa-solid fa-cart-shopping" style="margin-right: 5px"></i
                >장바구니
              </button>
              <button
                type="button"
                class="ssm-button"
                style="width: 50%; height: 50px; margin-left: 10px"
                @click="checkOut()"
              >
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="ssm-paking-delivery">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="description-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#description"
                  type="button"
                  role="tab"
                  aria-controls="description"
                  aria-selected="true"
                >
                  상세설명
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="additional-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#additional"
                  type="button"
                  role="tab"
                  aria-controls="additional"
                  aria-selected="false"
                >
                  판매자 정보
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="additional2-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#additional2"
                  type="button"
                  role="tab"
                  aria-controls="additional2"
                  aria-selected="false"
                >
                  구매시 유의사항
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="description"
                role="tabpanel"
                aria-labelledby="description-tab"
              >
                <div class="ssm-tab-content">
                  <div class="ssm-description">
                    <p v-html="productInfo.productDetailInfo"></p>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="additional"
                role="tabpanel"
                aria-labelledby="additional-tab"
              >
                <div class="ssm-tab-content">
                  <div class="ssm-description">
                    <p>{{ productInfo.csInfo }}</p>
                  </div>
                  <div class="list">
                    <ul>
                      <li>
                        <label>판매자 <span>:</span></label
                        >{{ productInfo.supplierCompany }}
                      </li>
                      <li>
                        <label>CS 전화 <span>:</span></label
                        >{{ productInfo.csCall }}
                      </li>
                      <li>
                        <label>담당자/이메일 <span>:</span></label
                        >{{ productInfo.email }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="additional2"
                role="tabpanel"
                aria-labelledby="additional2-tab"
              >
                <div class="ssm-tab-content">
                  <div class="ssm-description">
                    <p v-html="productInfo.memo"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
      id: this.$router.currentRoute.value.query.id,
      productInfo: { normalPrice: 0, sellPrice: 0, deliveryPrice: 0 },
      quikviewOptionYn: "Y",
      latelyProduct: [],
      selectOptionlist: [],
      selectProductlist: [],
      selectOptionprice: 0,
      minAmount: 1,
      colorCode: "",
      dt: "",
      dp: [],
    };
  },
  created() {
    this.ProductDetail();
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
  methods: {
    async ProductDetail() {
      try {
        const response = await axios.get(`/api/product/page/detail/${this.id}`, {
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });

        this.productInfo = response.data.data;
        // console.log(this.productInfo);
        this.dt = this.productInfo.deliveryType;
        // console.log(this.dt);
        this.dp = this.productInfo.deliveryPrice;

        const colorCodes = this.productInfo.labelList.map((label) => label.colorCode);
        this.colorCodepick = colorCodes;

        this.productInfo.memo = this.productInfo.memo.replaceAll("\n", "<br>");

        if (this.productInfo.productOptionList.length == 0) {
          this.quikviewOptionYn = "N";
          this.selectProductlist.push({
            productId: this.productInfo.productId,
            productOptionList: [],
            quantity: 1,
            totalamount: this.productInfo.sellPrice,
          });
        } else {
          this.quikviewOptionYn = "Y";
        }
        var latelyProduct = {
          productName: this.productInfo.productName,
          imgUrl: this.productInfo.mediaList[0].imgUrl,
          sellPrice: this.productInfo.sellPrice,
          productId: this.productInfo.productId,
        };

        if (this.$cookies.get("latelyProduct") != null) {
          var list = this.$cookies.get("latelyProduct");
          console.log(typeof list);
          var index = list.find(this.isrepresentCheck2);
          if (index == null) {
            if (list.length < 15) {
              list.unshift(latelyProduct);
              this.$cookies.set("latelyProduct", list);
            } else {
              list.pop();
              list.unshift(latelyProduct);
            }
          } else {
            list.splice(index, 1);
            list.unshift(latelyProduct);
            this.$cookies.set("latelyProduct", list);
          }
        } else {
          this.$cookies.set("latelyProduct", [latelyProduct]);
        }
      } catch (error) {
        // console.log("Error checking login ID:", error);
      }
    },
    checkOut() {
      if (this.selectProductlist.length > 0) {
        sessionStorage.removeItem("checkoutlist");
        sessionStorage.setItem("checkoutlist", JSON.stringify(this.selectProductlist));
        window.location.href = "/checkOut";
      } else {
        alert("옵션을 선택 해주세요.");
      }
    },
    isrepresentCheck(element) {
      if (element.representCheck === "Y") {
        return true;
      }
    },
    isrepresentCheck2(element) {
      if (element.productId == this.id) {
        return true;
      }
    },
    selectproductDelete(i) {
      this.selectProductlist.splice(i, 1);
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
        if (this.productInfo.productOptionList.length != actualLength + 1) {
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
            productId: this.productInfo.productId,
            productOptionList: this.selectOptionlist,
            quantity: 1,
            totalamount: this.productInfo.sellPrice + this.selectOptionprice,
          });

          // Reset the option price and list for the next selection
          this.selectOptionprice = 0;
          this.selectOptionlist = [];

          // Initialize the select boxes to their default state
          this.productInfo.productOptionList.forEach((option) => {
            var selectElement = document.getElementById(
              "select-" + option.productOptionId
            );
            if (selectElement) {
              selectElement.selectedIndex = 0; // Reset to default value
            }
          });
        }
      }
    },

    selectProductlistamount(i, idx) {
      if (idx > 0) {
        this.selectProductlist[i].quantity = this.selectProductlist[i].quantity + 1;
      } else {
        if (this.selectProductlist[i].quantity > 1) {
          this.selectProductlist[i].quantity = this.selectProductlist[i].quantity - 1;
        }
      }
    },

    updateMinAmount() {
      this.minAmount = this.selectProductlist.reduce(
        (sum, product) => sum + product.quantity,
        0
      );
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
                 Number(this.selectProductlist[j].productOptionList[k].productDetailOptionId)
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
            console.log(cartItem);
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
    wonreplace(str) {
      if (str == null) {
        return ""; // or return a default value like '0'
      }
      return str.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },
    formatPrice(value) {
      if (value == null) {
        return "";
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  computed: {
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
};
</script>
<style>
.zoom-image-hover2 {
  cursor: pointer;
}
</style>
