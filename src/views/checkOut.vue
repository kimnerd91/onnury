<template>
  <!-- Breadcrumb -->
  <section class="section-breadcrumb">
    <div class="ssm-breadcrumb-image">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="ssm-breadcrumb-title"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Checkout section -->
  <section class="ssm-checkout-section padding-tb-50">
    <div class="container">
      <div class="row rrDiv">
        <!-- Sidebar Area Start -->
        <div class="ssm-checkout-rightside col-lg-4 col-md-12">
          <div class="ssm-checkout-summary" style="padding-top: 25px">
            <div class="ssm-checkout-summary-title">
              <h4>결제 조건</h4>
            </div>
            <div><span class="text-left">결제 수단</span></div>
            <div>
              <span class="ssm-bill-option">
                <span>
                  <input type="radio" id="radio-paytype2" name="radio-postergroup-payType" value="PO"
                    @click="radioPaytype('PO')" />
                  <label for="radio-paytype2">모바일 온누리 결제</label>
                </span>
                <span>
                  <input type="radio" id="radio-paytype1" name="radio-postergroup-payType" value="PG"
                    @click="radioPaytype('PG')" />
                  <label for="radio-paytype1">일반 결제 (카드결제)</label>
                </span>
                <span class="d-flex">
                  <input type="radio" id="radio-paytype3" name="radio-postergroup-payType" value="POPG"
                    @click="radioPaytype('POPG')" />
                  <label for="radio-paytype3">복합 결제 (온누리+카드결제)</label><button type="button"
                    class="btn btn-secondary tooltip2" data-bs-toggle="tooltip" data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip" data-bs-title="복합 결제 시 도서산간,제주권 추가비용은 신용/일반 결제로 진행 됩니다.">
                    <i class="fa-solid fa-exclamation"></i>
                  </button>
                </span>
              </span>
            </div>

            <div class="onPaidWrap col-12 " v-if="raioPayTypeValue == 'POPG'">
              <div class="col-12" style="margin-bottom: 5px"><span class="text-left">결제
                  내역</span></div>
              <div v-for="(item, i) in checkOutList" :key="i"
                class="onPaidBlock col-12"
                >
                <div class="productName col-12" v-if="item.productName != '도서산간,제주권 추가비용'">


                  <div class="col-6">
                    <span class="text-left">{{ i + 1 + '. ' + item.productName }} </span>
                  </div>
                  <div class="col-6 d-flex justify-content-end">
                    <span class="text-left new-price">{{
                      (item.productTotalAmount + item.deliveryPrice + item.dangerPlacePrice).toLocaleString() + "원"
                    }}</span>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-between col-12 mobilemt10" v-if="item.productName != '도서산간,제주권 추가비용'">
                  <div class="col-6">
                    <span>모바일 온누리 사용금액</span>
                  </div>
                  <div class="d-flex gap-1 align-items-center col-6 d-flex justify-content-end">
                    <input type="text" name="onnuryInput" v-model="item.onnurypay" @input="fomatPrice(i)"
                      @change="onnurytotalpay()" @focus="item.onnurypay = ''"
                      @blur="item.onnurypay = item.onnurypay === '' ? 0 : item.onnurypay" />
                    <span>원</span>
                  </div>
                </div>

              </div>
              <div class="onPaidBtnDiv col-12">
                <button type="button" id="onnuryEnd" class="ssm-bill-button col-12 payBtn"
                  @click="onnuryReady()" ref="payOnnuri" :disabled="isPayButtonDisabled2">
                  온누리 승인
                </button>
              </div>
            </div>
            <div class="paymentInfoList">
            <span class="text-left first">결제 내역</span>
            </div>
            <div  class="paymentInfoList">
              <span class="text-left">상품 금액</span>
              <span class="text-right">{{ totalamount.toLocaleString() + "원"}}</span>
            </div>
            <div  class="paymentInfoList">
              <span class="text-left">추가 배송비</span>
              <span class="text-right">{{
                deliveryInfo.totalDelivery.toLocaleString() + "원"
              }}</span>
            </div>
            <div  class="paymentInfoList">
              <span class="text-left">도서산간,제주권 추가비용</span>
              <span class="text-right">{{
                deliveryInfo.totdangerPlacePrice.toLocaleString() + "원"
              }}</span>
            </div>
            <div  class="paymentInfoList">
              <span class="text-left">일반 결제금액</span>
              <span class="text-right">{{
                (totalamount + deliveryInfo.totalDelivery + deliveryInfo.totdangerPlacePrice - onnurytotalamount ).toLocaleString() + "원"
              }}</span>
            </div>
            <div class="onnuri-payment">
              <span class="text-left">온누리상품권 결제금액</span>
              <span class="text-right">{{
                onnurytotalamount.toLocaleString() + "원"
              }}</span>
            </div>
            <span class="ssm-bill-wrap ssm-bill-wrap align-items-center" style="">
              <div class="d-flex align-items-center">
                <input type="checkbox" id="confirmationCheckbox" required />
                <span>구매에 관한 내용을 전부 확인했습니다.</span>
              </div>
            </span>
            <div class="ssm-checkout-summary-total">
              <span class="text-left">총 결제금액</span>
              <span class="text-right">{{
                (totalamount + deliveryInfo.totalDelivery + deliveryInfo.totdangerPlacePrice).toLocaleString() + "원"
                }}</span>
            </div>
          </div>
          <div class="last">
            <p>복합 결제 시 도서산간,제주권 추가비용은 신용/일반 결제로 진행 됩니다.
            </p>
          </div>
          <div class="mt-10">
            <span class="ssm-check-order-btn">
              <button class="ssm-button col-12 payBtn" ref="payButton" @click.prevent="handlePayment"
                :disabled="isPayButtonDisabled">
                결제하기
              </button>
            </span>
          </div>
        </div>
        <!-- <button class="cr-button col-12 payBtn" ref="payButton" @click.prevent="bizpayment2222">
                test
        </button> -->
        
        <div class="ssm-checkout-leftside col-lg-8 col-md-12 m-t-991">
          <!-- checkout content Start -->
          <div class="ssm-checkout-content">
            <div class="ssm-checkout-inner">
              <div class="ssm-checkout-wrap">
                <div class="ssm-checkout-block ssm-check-bill">
                  <h3 class="ssm-checkout-title">주문자 정보</h3>
                  <div class="ssm-bl-block-content">
                    <div class="ssm-check-bill-form disabledInputBox">
                      <form action="#" method="post">
                        <span class="ssm-bill-wrap">
                          <label>이름*</label>
                          <input type="text" name="이름" :value="orderInfo.userName" disabled />
                        </span>
                        <span class="ssm-bill-wrap">
                          <label>연락처*</label>
                          <input type="text" name="연락처" :value="orderInfo.phone" placeholder="-없이 숫자만 입력해주세요"
                            pattern="[0-9]*" disabled />
                        </span>
                        <span class="ssm-bill-wrap">
                          <div class="d-flex justify-content-between align-items-center">
                            <label>주소</label>
                          </div>

                          <input type="text" name="address" :value="'우변번호-' + orderInfo.postNumber"
                            style="margin-bottom: 5px !important" />
                          <input type="text" name="detailAddress" :value="'상세주소-' + orderInfo.address + ', ' + orderInfo.detailAddress
                            " disabled />
                        </span>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="ssm-checkout-block ssm-check-bill">
                  <h3 class="ssm-checkout-title">수령인 정보</h3>
                  <div class="ssm-bl-block-content">
                    <span class="ssm-bill-option">
                      <span>
                        <input type="radio" id="bill1" name="radio-postergroup" value="same"
                          @change="setRecipientInfo('same')" />
                        <label for="bill1">주문자와 수령인이 같아요</label>
                      </span>
                      <span>
                        <input type="radio" id="bill2" name="radio-postergroup" value="new" v-model="selectedOption"
                          @change="setRecipientInfo('new')" />
                        <label for="bill2">새로 입력할래요</label>
                      </span>
                    </span>
                    <div class="ssm-check-bill-form mb-minus-24">
                      <form action="#" method="post">
                        <span class="ssm-bill-wrap">
                          <label>이름*</label>
                          <input type="text" name="이름" placeholder="이름" required v-model="posterInfo.userName"
                            @input="checkField" />
                        </span>
                        <span class="ssm-bill-wrap">
                          <label>연락처*</label>
                          <input type="text" name="연락처" placeholder="-없이 입력해주세요" pattern="[0-9*]" required
                            maxlength="11" v-model="posterInfo.phone" @input="checkField" />
                        </span>
                        <span class="ssm-bill-wrap">
                          <div class="d-flex justify-content-between align-items-center">
                            <label>주소</label>
                            <button type="button" id="openPostButton" class="ssm-bill-button" @click="openPostcode()">
                              주소선택
                            </button>
                          </div>

                          <input type="text" name="address" placeholder="주소" style="margin-bottom: 5px !important"
                            v-model="posterInfo.address" @input="checkField" readOnly />
                          <input type="text" name="detailAddress" placeholder="상세주소" v-model="posterInfo.detailAddress"
                          />
                        </span>
                        <span class="ssm-bill-wrap">
                          <label>배송메모</label>
                          <textarea class="ssm-bill-textarea" name="연락처" v-model="posterInfo.memo"></textarea>
                        </span>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ssm-sidebar-wrap">
            <!-- Sidebar Summary Block -->
            <div class="ssm-sidebar-block">
              <div class="ssm-sb-title">
                <h3 class="ssm-sidebar-title">상품 리스트</h3>
              </div>
              <div class="ssm-sb-block-content">
                <div class="ssm-checkout-pro">
                  <div class="col-sm-12 mb-6" v-for="(item, i) in checkOutList" :key="i" >
                    <div class="ssm-product-inner" v-if="item.productName != '도서산간,제주권 추가비용'">
                      <div class="ssm-pro-image-outer col-lg-3">
                        <div class="ssm-pro-image">
                          <a :href="'productDetail?id=' + item.productId" class="image">
                            <img class="main-image" :src="item.imgUrl" alt="Product" />
                          </a>
                        </div>
                      </div>
                      <div class="ssm-pro-content ssm-product-details pcView">
                        <h5 class="ssm-pro-title">
                          <a href="product-left-sidebar.html">{{ item.productName }}</a>
                        </h5>
                        <p class="optionName">
                          <span v-for="(item2, i2) in item.productOptionList" :key="i2">{{ item2.name }},</span>
                          <span>{{ item.detailOptionTitle }}</span>
                        </p>


                        <p class="ssm-price priceTag d-flex align-items-center gap-1">
                        <div>
                          <span class="new-price">{{
                            item.productTotalAmount.toLocaleString() + "원"
                          }}</span>

                        </div>
                        <div class="smallSizePrice">
                          <span class="gray-price"> &#40;
                            {{
                              (item.productAmount + item.productOptionAmount).toLocaleString() + "원"
                            }} x {{ item.quantity }} &#41;</span>
                          <!-- <span class="fw-bold" style="font-size: 12px; color: #777; margin: 0 0 0 5px"> 수량 : 
                          </span> -->
                          <span class="fw-bold" style="font-size: 12px; color: #777; margin: 0px">
                          </span>
                          <span class="fs-6 new-price row50vw"></span>
                        </div>

                        </p>
                        <p class="delivary">
                          <span v-if="item.deliveryPrice == 0">무료배송</span>
                          <span v-if="item.deliveryPrice > 0">추가 배송비 - {{ item.deliveryPrice + '원' }}</span>

                        </p>
                      </div>
                      <div class="ssm-pro-content ssm-product-details mobileView">
                        <h5 class="ssm-pro-title">
                          <a href="product-left-sidebar.html">{{ item.productName }}</a>
                        </h5>
                        <p class="optionName">
                          <span v-for="(item2, i2) in item.productOptionList" :key="i2">{{ item2.name }},</span>
                          <span>{{ item.detailOptionTitle }}</span>
                        </p>


                        <p class="ssm-price priceTag d-flex align-items-center gap-1">
                        <div>
                          <span class="gray-price">{{
                            item.productTotalAmount.toLocaleString() + "원"
                          }}</span>

                        </div>
                        <div class="smallSizePrice">
                          <span class="gray-price"> &#40;
                            {{
                              item.productAmount.toLocaleString() + "원"
                            }} x {{ item.quantity }} &#41;</span>
                          <!-- <span class="fw-bold" style="font-size: 12px; color: #777; margin: 0 0 0 5px"> 수량 : 
                          </span> -->
                          <span class="fw-bold" style="font-size: 12px; color: #777; margin: 0px">
                          </span>
                          <span class="fs-6 new-price row50vw"></span>
                        </div>

                        </p>
                        <p class="delivary">
                          <span v-if="item.deliveryPrice == 0">무료배송</span>
                          <span v-if="item.deliveryPrice > 0">추가 배송비 - {{ item.deliveryPrice + '원' }}</span>
                  
                        </p>
                        <p class="d-flex justify-content-start align-items-center gap-1 cr-price ">
                          <span>총액 : </span>
                          <span class="new-price">{{ (item.deliveryPrice + item.dangerPlacePrice +
                            item.productTotalAmount).toLocaleString() + "원"}}</span>

                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <!-- Sidebar Summary Block -->
          </div>
          <!--cart content End -->
        </div>
      </div>
    </div>
  </section>
  <!-- Checkout section End -->
</template>
<script>
import axios from "axios";
import addCheckList from "../address.json";
import { onMounted } from 'vue';
export default {
  data() {
    return {
      getProductList: JSON.parse(sessionStorage.getItem("checkoutlist")),
      checkOutList: [],
      totalamount: 0,
      productTotalsellAmount: 0,
      onnurytotalamount: 0,
      orderInfo: {},
      checkoutBox: {},
      posterInfo: {
        userName: "",
        phone: "",
        address: "",
        detailAddress: "",
      },
      deliveryInfo: { totalDelivery: 0, totdangerPlacePrice: 0 },
      merchantTotalOrderID: "",
      selectedOption: "new",
      onnurycheckYN: "N",
      totalDeliveryPrice: 0,
      paymentPayInfo: {},
      paymentInfo: {},
      paymentProductList: [],
      isPayButtonDisabled: true,
      isPayButtonDisabled2: true,
      checkedPostNum: "",
      raioPayTypeValue: "",
    };
  },
  mounted() {
    this.productcheck();
    this.userInfo();
    this.checkField();
    this.moderid();
  },
  setup() {
    onMounted(() => {
      // 모든 툴팁 활성화
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });

    });
  },
  methods: {

    // 날짜와 시간 체크
    moderid() {
      let date = new Date();
      let month = (date.getMonth() + 1);
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let sec = date.getSeconds();
      let misec = date.getSeconds();
      if (month < 10) {
        month = "0" + month.toString();
      } else {
        month.toString();
      }
      if (day < 10) {
        day = "0" + day.toString();
      } else {
        day.toString();
      }
      if (hours < 10) {
        hours = "0" + hours.toString();
      } else {
        hours.toString();
      }

      if (minutes < 10) {
        minutes = "0" + minutes.toString();
      } else {
        minutes.toString();
      }
      if (minutes < 10) {
        minutes = "0" + minutes.toString();
      } else {
        minutes.toString();
      }
      if (sec < 10) {
        sec = "0" + sec.toString();
      } else {
        sec.toString();
      }

      if (misec < 10) {
        misec = "00" + misec.toString();
      } else if(misec < 100){
        misec = "0" + misec.toString();
      }else{
        misec.toString();
      }
      this.merchantTotalOrderID = date.getFullYear().toString() +
        month + day + hours + minutes + sec + misec;
    },
    // 결제 방식 선택
    radioPaytype(type) {
      this.raioPayTypeValue = type;
      
      for (var i = 0; i < this.checkOutList.length; i++) {
        this.checkOutList[i].onnurypay = 0;
      }
      if (this.raioPayTypeValue == "PO") {
        for (var i = 0; i < this.checkOutList.length; i++) {
          this.checkOutList[i].onnurypay = this.checkOutList[i].productTotalAmount + this.checkOutList[i].deliveryPrice + this.checkOutList[i].dangerPlacePrice;
        }
        this.onnurytotalpay();
      } else if (type == "POPG") {
        this.onnurytotalpay();
      } else {
        this.onnurytotalamount = 0;
        this.onnurytotalpay();
      }
      this.checkField();
    },
// 가격 포맷팅
    fomatPrice(i) {
      var value = this.checkOutList[i].onnurypay.toString().replace(/,/g, "");

      if (Number(value) > this.checkOutList[i].productTotalAmount + this.checkOutList[i].deliveryPrice + this.checkOutList[i].dangerPlacePrice) {
        this.checkOutList[i].onnurypay = (this.checkOutList[i].productTotalAmount + this.checkOutList[i].deliveryPrice + this.checkOutList[i].dangerPlacePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        this.checkOutList[i].onnurypay = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }


    },
    // 유저정보 axios
    async userInfo() {
      const responsemyInfo = await axios.get("/api/mypage/info", {
        headers: {
          Authorization: sessionStorage.getItem("authorization"),
          RefreshToken: sessionStorage.getItem("refreshToken"),
        },
      });
      if (responsemyInfo.data.data.type == "C") {
        this.orderInfo.userName = responsemyInfo.data.data.userName;
      } else {
        this.orderInfo.userName = responsemyInfo.data.data.manager;
      }
      this.orderInfo.phone = responsemyInfo.data.data.phone;
      this.orderInfo.postNumber = responsemyInfo.data.data.postNumber;
      this.orderInfo.address = responsemyInfo.data.data.address;
      this.orderInfo.detailAddress = responsemyInfo.data.data.detailAddress;
    },
    // 장바구니에 담긴 제품 axios
    async productcheck() {
      for (var i = 0; i < this.getProductList.length; i++) {
        this.checkoutBox = {};
        let response = await axios.get(
          `/api/product/page/detail/${this.getProductList[i].productId}`,
          {
            headers: {
              Authorization: sessionStorage.getItem("authorization"),
              RefreshToken: sessionStorage.getItem("refreshToken"),
            },
          }
        );
        if (response.data.data.status == 'Y' && response.data.data.expressionCheck == 'Y') {
          this.checkoutBox.cartId = 0;
          if (this.getProductList[i].cartId != undefined) {
            this.checkoutBox.cartId = this.getProductList[i].cartId;
          }

          this.checkoutBox.seq = i + 1;
          this.checkoutBox.dangerPlacePrice = 0;
          this.checkoutBox.deliveryType = response.data.data.deliveryType;
          this.checkoutBox.deliveryPrice = response.data.data.deliveryPrice;
          this.checkoutBox.imgUrl = response.data.data.mediaList[0].imgUrl;
          this.checkoutBox.businessNumber = response.data.data.businessNumber;
          this.checkoutBox.frcNumber = response.data.data.frcNumber;
          this.checkoutBox.productClassificationCode = response.data.data.classificationCode;
          this.checkoutBox.supplierId = response.data.data.supplierId;
          this.checkoutBox.productName = response.data.data.productName;
          this.checkoutBox.quantity = this.getProductList[i].quantity;
          this.checkoutBox.onnurypay = 0;
          this.checkoutBox.productAmount = response.data.data.sellPrice;
          this.checkoutBox.productOptionAmount = 0;
          this.checkoutBox.productTotalAmount = response.data.data.sellPrice;
          this.checkoutBox.detailOptionTitle = "";

          for (var k = 0; k < response.data.data.productOptionList.length; k++) {

            for (var n = 0; n < this.getProductList[i].productOptionList.length; n++) {

              if (response.data.data.productOptionList[k].productOptionId == this.getProductList[i].productOptionList[n].productOptionId) {

                for (var h = 0; h < response.data.data.productOptionList[k].productDetailOptionList.length; h++) {
                  if (response.data.data.productOptionList[k].productDetailOptionList[h].detailOptionId == this.getProductList[i].productOptionList[n].productDetailOptionId) {
                    this.checkoutBox.detailOptionTitle += response.data.data.productOptionList[k].productDetailOptionList[h].detailOptionName;
                    if (response.data.data.productOptionList.length != k + 1) {
                      this.checkoutBox.detailOptionTitle += ",";
                    }
                    this.checkoutBox.productOptionAmount += response.data.data.productOptionList[k].productDetailOptionList[h].optionPrice;
                    this.checkoutBox.productTotalAmount += response.data.data.productOptionList[k].productDetailOptionList[h].optionPrice;
                  }
                }
              }
            }
          }

          this.checkoutBox.productTotalAmount = this.checkoutBox.productTotalAmount * this.checkoutBox.quantity;
          this.productTotalsellAmount = this.checkoutBox.productTotalAmount * this.checkoutBox.quantity;
          this.totalamount += this.checkoutBox.productTotalAmount;
          this.deliveryInfo.totalDelivery += this.checkoutBox.deliveryPrice;
          this.deliveryInfo.totdangerPlacePrice += this.checkoutBox.dangerPlacePrice;
          this.checkoutBox.productId = response.data.data.productId;
          this.checkOutList.push(this.checkoutBox);

        } else {
          alert(response.data.data.productName + " 해당 상품은 판매자에 의해 일시 판매가 일시 중지되었습니다.");

          if (this.getProductList[i].cartId != undefined) {
            axios
            .delete(`/api/cart/delete`, {
              params: {
                cartId:  this.getProductList[i].cartId,
              },
              headers: {
                Authorization: sessionStorage.getItem("authorization"),
                RefreshToken: sessionStorage.getItem("refreshToken"),
              },
            })
            .then((response) => {
              if (response.status == 200) {
              }
            })
            .catch((error) => {
              // console.error("Error removing item from cart:", error);
            });
          }
          histroy.go(-1);
        }
      }
    },
    setRecipientInfo(str) {
      if (str == "same") {
        this.checkedPostNum = this.orderInfo.postNumber;
        this.posterInfo.userName = this.orderInfo.userName;
        this.posterInfo.phone = this.orderInfo.phone;
        this.posterInfo.postNumber = this.orderInfo.postNumber;
        this.posterInfo.address = this.orderInfo.address;
        this.posterInfo.detailAddress = this.orderInfo.detailAddress;
        document.getElementById("openPostButton").disabled = true;
        document.getElementById("openPostButton").classList.add("payBtn");
      } else {
        this.checkedPostNum = "";
        this.posterInfo = {};
        document.getElementById("openPostButton").disabled = false;
        document.getElementById("openPostButton").classList.remove("payBtn");
      }
      this.checkField();
    },
    // 인풋 확인하고 빠진 데이터 체크
    checkField() {

      const payButton = this.$refs.payButton;

      if (this.checkedPostNum != "") {
        this.checkAddres();
      }
      if (
        this.posterInfo.userName !== "" && this.posterInfo.phone !== "" && this.posterInfo.address !== "" &&
        this.posterInfo.userName !== undefined && this.posterInfo.phone !== undefined && this.posterInfo.address !== undefined && this.raioPayTypeValue != ""
      ) {
        var regex = /[^0-9]/g;				// 숫자가 아닌 문자열을 선택하는 정규식
        this.posterInfo.phone = this.posterInfo.phone.replace(regex, "");
        payButton.classList.remove("payBtn");
        this.isPayButtonDisabled = false;
      } else {
        payButton.classList.add("payBtn");
        this.isPayButtonDisabled = true;
      }
    },
    // 주소 정보 체크 + 주소에 따라 추가비용
    checkAddres() {
      for(let i = 0; i < this.checkOutList.length; i++) {
        if(this.checkOutList[i].productName == "도서산간,제주권 추가비용")  {
          this.checkOutList.splice(i, 1);
          i--;
        }
      }
      let dangerPrice = 0;
      if(addCheckList.mountainrange.includes(this.checkedPostNum) || addCheckList.Jeju.includes(this.checkedPostNum)){
        if (addCheckList.mountainrange.includes(this.checkedPostNum)) {
            dangerPrice = 7000;

        } else if (addCheckList.Jeju.includes(this.checkedPostNum)) {
            dangerPrice = 3500;

        }
        const groupCounts = this.checkOutList.reduce((acc, item) => {
              const group = item.supplierId;
              acc[group] = (acc[group] || 0) + 1;
              return acc;
            }, {});
            
          const supplierIdValue = Object.keys(groupCounts);

          this.deliveryInfo.totdangerPlacePrice = supplierIdValue.length * dangerPrice;

          for(var d = 0; d < supplierIdValue.length; d++){
            let object = {};
            for(var k = 0; k < this.checkOutList.length; k++){
              if(this.checkOutList[k].supplierId == supplierIdValue[d]){
                object.businessNumber = this.checkOutList[k].businessNumber;
                object.dangerPlacePrice = 0;
                object.deliveryPrice = 0;
                object.frcNumber = this.checkOutList[k].frcNumber;
                object.imgUrl = "";
                object.onnurypay = 0;
                object.productAmount = dangerPrice;
                object.productClassificationCode = "";
                object.productId = "";
                object.productName = "도서산간,제주권 추가비용";
                object.productOptionAmount = 0;
                object.productTotalAmount = dangerPrice;
                object.quantity = 1;
                object.seq = this.checkOutList.length + 1;
                object.supplierId = this.checkOutList[k].supplierId;
              }
            }
            this.checkOutList.push(object);
          }
      }
      if (this.raioPayTypeValue == "PO") {
        for (var i = 0; i < this.checkOutList.length; i++) {
          this.checkOutList[i].onnurypay = this.checkOutList[i].productTotalAmount + this.checkOutList[i].deliveryPrice;
        }
        this.onnurytotalpay();
      }
    },

    // 온누리 페이
    onnurytotalpay() {

      this.onnurytotalamount = 0;
      for (var i = 0; i < this.checkOutList.length; i++) {
        var value = this.checkOutList[i].onnurypay.toString().replace(/,/g, "");
        this.onnurytotalamount += Number(value);
      }
      
      if (this.raioPayTypeValue == "POPG") {
        if (this.onnurytotalamount > 0) {
          const payOnnuri = this.$refs.payOnnuri;
          payOnnuri.classList.remove("payBtn");
          this.isPayButtonDisabled2 = false;
        } else {
          const payOnnuri = this.$refs.payOnnuri;

          if (payOnnuri != undefined) {
            payOnnuri.classList.add("payBtn");
            this.isPayButtonDisabled2 = true;
          }
        }
      } 
    },
// 주소 검색창 오픈
    openPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.checkedPostNum = data.zonecode;
          this.posterInfo.postNumber = data.zonecode;
          this.posterInfo.address = "(" + data.zonecode + ")" + data.roadAddress;
          this.checkAddres();
          this.checkField();
        },
      }).open();
    },
    // 결제 관련 
    async handlePayment() {

      if (this.isPayButtonDisabled) {
        alert("모든 필드에 값을 입력해주세요.");
        return; // 필드가 비어 있으면 결제 처리를 하지 않음
      }
      const checkbox = document.getElementById("confirmationCheckbox");
      if (!checkbox.checked) {
        alert("구매에 관한 내용을 확인해주세요");
        return;
      }
      var screenwidth = screen.availWidth;
      var deviceType = "pc";
      if (767 > screenwidth) {
        deviceType = "mobile";
      }

      var pgTotPrice = this.totalamount + this.deliveryInfo.totdangerPlacePrice + this.deliveryInfo.totalDelivery - this.onnurytotalamount;
      this.paymentPayInfo = {
        productName: this.checkOutList[0].productName + "포함 총 " + this.checkOutList.length + "건",
        pgtotalAmount: Number(pgTotPrice),
        onnurytotalamount: Number(this.onnurytotalamount),
        orderNumber: this.merchantTotalOrderID,
        deviceType: deviceType,
        merchantUserNm: sessionStorage.getItem("loginId")
      };

      this.paymentInfo.orderNumber = this.merchantTotalOrderID;
      this.paymentInfo.buyMemberLoginId = sessionStorage.getItem("loginId");
      this.paymentInfo.receiver = this.posterInfo.userName;
      this.paymentInfo.postNumber = this.posterInfo.postNumber;
      this.paymentInfo.address = this.posterInfo.address + ',' + this.posterInfo.detailAddress;
      this.paymentInfo.message = this.posterInfo.memo;
      this.paymentInfo.receiverPhone = this.posterInfo.phone;

      if (sessionStorage.getItem("token") != undefined) {
        axios.get("/api/link/DecCode", { params: { data: sessionStorage.getItem("token") } })
          .then((res) => {
            this.paymentInfo.linkCompany = res.data.data.substr(1);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.paymentInfo.linkCompany = "직접입력";
      }
      this.paymentInfo.totalApprovalPrice = this.totalamount;

      if (this.raioPayTypeValue == "PO") {
        this.onnuryReady();
      } else if (this.raioPayTypeValue == "PG") {
        this.easyPaymentReady()
      } else {
        if (this.onnurycheckYN == "Y" || this.onnurytotalamount == 0) {
          const payButton = this.$refs.payButton;
          payButton.classList.remove("payBtn");
          this.isPayButtonDisabled = false;

          const onnuryInput = document.getElementsByName('onnuryInput');
          onnuryInput.forEach((item) => { item.readOnly = true; });


          if (Number(pgTotPrice) == 0) {
            this.onnuryApproval();

          } else {
            this.easyPaymentReady()
          }

        } else {

          alert("온누리 승인 요청 해주세요.");

        }
      }
    },
    // 온누리 인증확인
    async onnuryReady() {
      if (this.onnurytotalamount > 0) {
        // let date = new Date();
        // this.merchantTotalOrderID = date.getFullYear().toString() + (date.getMonth() + 1).toString() + date.getDate().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString();
        let formData = new FormData();
        let productList = [];
        let totQuantity = 0;

        for (var i = 0; i < this.checkOutList.length; i++) {

          var value = this.checkOutList[i].onnurypay.toString().replace(/,/g, "");
          // this.checkOutList[i].businessNumber = "1198710555";
          // this.checkOutList[i].frcNumber = "01153200002";
          if (Number(value) > 0) {
            productList.push({ seq: this.checkOutList[i].seq, biz_no: this.checkOutList[i].businessNumber.replaceAll("-",""), frc_cd: this.checkOutList[i].frcNumber.replaceAll("-",""), name: this.checkOutList[i].productName, count: this.checkOutList[i].quantity, amount: Number(value) });
            totQuantity += this.checkOutList[i].quantity;
          }
        }
        let payInfo = {
          merchantOrderID: this.merchantTotalOrderID,
          merchantUserKey: sessionStorage.getItem("loginId"),
          productName: this.checkOutList[0].productName + "포함 총 " + this.checkOutList.length + "건",
          quantity: totQuantity,
          totalAmount: this.onnurytotalamount,
          productItems: productList
        };
        formData.append("paymentOnnuryPayRequestDto", new Blob([JSON.stringify(payInfo)], { type: "application/json" }));
        const response = await axios.post("/api/payment/onnury/reserve/ready", formData, {
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
            "Content-Type": "multipart/form-data", accept: "application/json"
          },
        });

        const url = 'https://pgapi.bizplaypay.co.kr/api_v1_ongift_payment_reserve.act';
        const data = response.data.data;
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;


        for (const key in data) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = data[key];
          form.appendChild(input);
        }
        window.open("", "온누리 상품권 인증", "width=500, height=800");
        form.target = '온누리 상품권 인증';
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        this.onnuryCheck();
      } else {
        alert("온누리 사용금액을 입력 해주세요.");
      }
    },
    // 온누리 승인확인
    onnuryCheck() {

      axios.get(`/api/payment/onnury/approval/info/get`, {
        params: { merchantOrderID: this.merchantTotalOrderID },
        headers: {
          Authorization: sessionStorage.getItem("authorization"),
          RefreshToken: sessionStorage.getItem("refreshToken"),
        },
      })
        .then((response) => {
          if (response.data.statusCode == "O-200") {

            if (this.raioPayTypeValue == "PO") {
              this.onnuryApproval();
            } else if (this.raioPayTypeValue == "POPG") {
              this.onnurycheckYN = "Y";
              const onnuryInput = document.getElementsByName('onnuryInput');
              onnuryInput.forEach((item) => { item.disabled = true; })
              document.getElementById("onnuryEnd").innerText = "승인이 완료 되었습니다.";
              this.isPayButtonDisabled2 = true;
            }
          } else {
            this.onnurycheckYN = "N";
            for (var o = 0; o < this.checkOutList.length; o++) {
              this.checkOutList[o].onnurypay = 0;
            }
          }
        })
        .catch((error) => {
          // console.error("Error sending:", error);
        });

    },
    // 온누리 결제
    async onnuryApproval() {

      let formData = new FormData();
      formData.append("paymentProductListRequestDto", new Blob([JSON.stringify(this.checkOutList)], { type: "application/json" }));
      formData.append("newPaymentRequestDto", new Blob([JSON.stringify(this.paymentInfo)], { type: "application/json" }));

      await axios.post("/api/payment/onnury/approval", formData, {
        headers: { Authorization: sessionStorage.getItem("authorization"), RefreshToken: sessionStorage.getItem("refreshToken"), "Content-Type": "multipart/form-data", accept: "application/json" },
      })
        .then((response) => {

          if (response.data.statusCode == "O-200") {
            alert("결제가 완료되었습니다.");
            location.href = "/mypage?name=buyHistory";
          } else {
            alert("결제 실패 했습니다.");
          }
        })
        .catch((error) => {
          // console.error("Error sending:", error);
        });

    },
    // 이지 페이먼트
    async easyPaymentReady() {
      let formData = new FormData();
      formData.append("paymentKiccRequestDto", new Blob([JSON.stringify(this.paymentPayInfo)], { type: "application/json" }));

      const response = await axios.post("/api/payment/easyPay/reserve/ready", formData, {
        headers: {
          Authorization: sessionStorage.getItem("authorization"),
          RefreshToken: sessionStorage.getItem("refreshToken"),
          "Content-Type": "multipart/form-data", accept: "application/json"
        },
      });
      if (response.data.data.resCd === "0000") {
        window.open(response.data.data.authPageUrl, "_blank", "width=500, height=500");
        this.easyPaymentCheck();
      } else {
        alert("결제에 실패하셨습니다.");
      }
    },
    // 이지 페이먼트 체크
    easyPaymentCheck() {
      axios.get(`/api/payment/easyPay/approval/info/get`, {
        params: { shopOrderNo: this.merchantTotalOrderID },
        headers: {
          Authorization: sessionStorage.getItem("authorization"),
          RefreshToken: sessionStorage.getItem("refreshToken"),
        },
      })
        .then((response) => {
          // console.log(response);
          if (response.data.statusCode == "O-200") {
            this.easyPayApproval()
          }
        })
        .catch((error) => {
          // console.error("Error sending:", error);
        });

    },
    // 이지 페이먼트 지불
    easyPayApproval() {
      let formData = new FormData();

      formData.append("paymentProductListRequestDto", new Blob([JSON.stringify(this.checkOutList)], { type: "application/json" }));
      formData.append("newPaymentRequestDto", new Blob([JSON.stringify(this.paymentInfo)], { type: "application/json" }));

      if (this.onnurycheckYN == 'N') {
        axios.post(`/api/payment/easyPay/approval`, formData, {
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
            "Content-Type": "multipart/form-data", accept: "application/json"
          },
        })
          .then((response) => {
            if (response.data.statusCode == "O-200") {
              alert("결제가 완료되었습니다.");
              location.href = "/mypage?name=buyHistory";
            } else {
              alert("실패");
            }

          })
          .catch((error) => {
            // console.error("Error sending:", error);
          });
      } else {
        axios.post(`/api/payment/compound/approval`, formData, {
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
            "Content-Type": "multipart/form-data", accept: "application/json"
          },
        })
          .then((response) => {
            if (response.data.statusCode == "O-200") {
              alert("결제가 완료되었습니다.");
              location.href = "/mypage?name=buyHistory";
            } else {
              alert("실패");
            }

          })
          .catch((error) => {
            // console.error("Error sending:", error);
          });

      }
    },
  },
};
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox  */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>