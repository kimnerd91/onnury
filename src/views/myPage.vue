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
                <a href="#">마이페이지</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Login -->
  <section class="section-mypage padding-tb-50">
    <div class="container">
      <div class="row justify-content-between flex-column align-items-center">
        <div class="profile__tab col-xl-8 col-lg-8 col-sm-12">
          <nav class="d-flex flex-row col-12" style="padding: 0">
            <div class="nav nav-tabs tp-tab-menu flex-row col-12" id="profile-tab" role="tablist">
              <button class="nav-link col-xl-25 col-lg-2 col-sm-12 active" id="nav-information-tab" data-bs-toggle="tab"
                data-bs-target="#nav-information" type="button" role="tab" aria-controls="nav-information"
                aria-selected="false" @click="toggleState('info')">
                <span><i class="fa-solid fa-user"></i></span> 회원정보
              </button>
              <button class="nav-link col-xl-25 col-lg-25 col-sm-12" id="nav-order-tab" data-bs-toggle="tab"
                data-bs-target="#nav-order" type="button" role="tab" aria-controls="nav-order" aria-selected="false"
                @click="toggleState('buyHistory'), paymentList('')">
                <span><i class="fa-solid fa-clipboard"></i></span> 구매이력확인
              </button>
              <button class="nav-link col-xl-25 col-lg-25 col-sm-12" id="nav-order-tab2" data-bs-toggle="tab"
                data-bs-target="#nav-order" type="button" role="tab" aria-controls="nav-order" aria-selected="false"
                @click="toggleState('cancleHistory'), cancleList('')">
                <span><i class="fa-solid fa-clipboard"></i></span> 취소내역확인
              </button>
              <button class="nav-link col-xl-25 col-lg-25 col-sm-12" id="nav-notification-tab" data-bs-toggle="tab"
                data-bs-target="#nav-notification" type="button" role="tab" aria-controls="nav-notification"
                aria-selected="false" @click="toggleState('inqury'), inquiryList('')">
                <span><i class="fa-solid fa-question"></i></span> 문의내역
              </button>
              <button class="nav-link col-xl-25 col-lg-25 col-sm-12" id="nav-password-tab" data-bs-toggle="tab"
                data-bs-target="#nav-password" type="button" role="tab" aria-controls="nav-password"
                aria-selected="false" @click="toggleState('pwdChange')">
                <span><i class="fa-solid fa-lock"></i></span> 비밀번호변경
              </button>
            </div>

            <div class="modal fade" id="outModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header" style="border-bottom: none !important">
                    <h5 class="modal-title">
                      <img src="@/assets/img/logo/onnuryLOGO0.png" alt="" />
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <h2>정말로 탈퇴하시겠습니까?</h2>
                    <p>
                      탈퇴 시, 구매 이력등 기존 정보가 <span>삭제되고</span> , 차후 재가입
                      시 <span>복구가 불가능하며.</span>
                      사후 서비스 역시 정상적으로 받을 수 없습니다.
                    </p>
                    <div class="d-flex align-items-center mb-50">
                      <input type="checkbox" id="acknowledge-checkbox" />
                      <label for="acknowledge-checkbox">탈퇴시 불이익을 전부 확인하고 이해했습니다.</label>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-target="#outAlert" data-bs-toggle="modal" @click="withdrawal()">
                      탈퇴하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal fade" id="outAlert" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">
                      <img src="@/assets/img/logo/onnuryLOGO0.png" alt="" />
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <h4>온누리 가전몰 탈퇴가 완료되었습니다.</h4>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="clearSessionAndRedirect()">
                      확인
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="col-xl-8 col-lg-8 col-sm-12 profile__info profile__tab-content">
          <!--회원정보 개인-->
          <div v-if="myinfo.type === 'C' && this.info == true">
            <h3 class="profile__info-title">회원정보</h3>
            <form id="personal-form">
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="profile__input-box">
                    <div class="profile__input">
                      <label for="username">아이디</label>
                      <input type="text" id="username" v-model="myinfo.loginId" placeholder="" disabled />
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6">
                  <div class="profile__input-box">
                    <div class="profile__input">
                      <label for="email">이메일</label>
                      <input type="email" id="email" placeholder="Enter your email" v-model="myinfo.email" readonly />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="profile__input-box">
                    <div class="profile__input">
                      <label for="birthdate">생년월일</label>
                      <input type="text" id="birthdate" placeholder="Enter your birthdate" v-model="myinfo.birth" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="profile__input-box">
                    <div class="profile__input">
                      <label for="phone">연락처</label>
                      <input type="text" id="phone" placeholder="-없이 입력하세요 (예: 01012345678)" v-model="myinfo.phone" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-12 col-md-12 d-flex align-items-center flex-wrap">
                  <div class="col-lg-8 col-md-12 col-sm-12 mr-15 d-flex align-items-center gap-2">
                    <div class="profile__input-box col-9">
                      <div class="profile__input mr-5">
                        <label for="address">주소</label>
                        <input type="text" id="address" placeholder="우측 주소검색 버튼을 클릭해주세요" v-model="myinfo.address"
                          disabled />
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <button type="button" class="cr-button addressBtn" @click="openPostcode()">
                        주소검색
                      </button>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="profile__input-box">
                      <div class="profile__input">
                        <input type="text" id="detailed-address" placeholder="상세주소" v-model="myinfo.detailAddress" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12 mt-2">
                  <div class="profile__btn">
                    <button type="submit" class="cr-button" @click="sendInfo()">
                      정보 업데이트
                    </button>
                  </div>
                </div>
              </div>
            </form>
              <div class="mt-10 d-flex justify-content-end out">
              <button type="button" class="cr-button mt-2" data-bs-toggle="modal" data-bs-target="#outModal">
                탈퇴하기
              </button>
            </div>
          </div>
          <!--회원정보 기업-->
          <div v-if="myinfo.type === 'B' && this.info == true">
            <h3 class="profile__info-title">회원정보 (기업)</h3>
            <form id="business-form">
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <div class="profile__input-box">
                    <div class="profile__input">
                      <label for="business-username">아이디</label>
                      <input type="text" id="business-username" placeholder="아이디를 입력하세요" v-model="myinfo.loginId"
                        readonly />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="profile__input-box">
                    <div class="profile__input">
                      <label for="business-number">사업자번호</label>
                      <input type="text" id="business-number" placeholder="사업자번호를 입력하세요" pattern="[0-9]+"
                        v-model="myinfo.businessNumber" readonly />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="profile__input-box">
                    <div class="profile__input">
                      <label for="contact-name">담당자 이름</label>
                      <input type="text" id="contact-name" placeholder="담당자 이름을 입력하세요" v-model="myinfo.manager" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="profile__input-box">
                    <div class="profile__input">
                      <label for="contact-email">담당자 이메일</label>
                      <input type="email" id="contact-email" placeholder="Enter your email" v-model="myinfo.email"
                        readonly />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6">
                  <div class="profile__input-box">
                    <div class="profile__input">
                      <label for="contact-phone">담당자 연락처</label>
                      <input type="text" id="contact-phone" placeholder="-없이 입력하세요 (예: 01012345678)"
                        v-model="myinfo.phone" pattern="[0-9]+" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-12 col-md-12 d-flex align-items-center flex-wrap">
                  <div class="col-lg-6 col-md-6 mr-15">
                    <div class="profile__input-box">
                      <div class="profile__input">
                        <label for="business-address">사업자 주소</label>
                        <input type="text" id="business-address" placeholder="우측 주소검색 버튼을 클릭해주세요"
                          v-model="myinfo.address" @click="openPostcode()" readonly />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5 col-md-5">
                    <button type="button" class="cr-button addressBtn" @click="openPostcode()">
                      주소검색
                    </button>
                  </div>
                  <div class="col-lg-12">
                    <div class="profile__input-box">
                      <div class="profile__input">
                        <input type="text" id="business-detailed-address" placeholder="상세주소"
                          v-model="myinfo.detailAddress" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="profile__btn">
                    <button type="submit" class="cr-button" data-bs-toggle="modal" data-bs-target="#infoAlert"
                      @click="sendInfo()">
                      정보 업데이트
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div class="mt-10 d-flex justify-content-end out">
              <button type="button" class="cr-button mt-2" data-bs-toggle="modal" data-bs-target="#outModal">
                탈퇴하기
              </button>
            </div>
          </div>
          <!--구매이력-->
          <div id="show" v-if="buyHistory && bHDetail == false">
            <div class="d-flex col-12 align-items-center head justify-content-between flex-wrap">
              <h3 class="profile__info-title col-12 mb-2">구매이력확인</h3>
              <div class="col-xl-6 col-lg-6 col-md-8 col-sm-12 datePick">
                <VueDatePicker v-model="date" :range="true" :enable-time-picker="false" :format="customFormat" />
              </div>
              <div class="d-flex gap-1">
                <div class="d-flex justify-content-center gap-1 align-items-center gray">
                  <button type="button" @click="setDateRange(1)" class="cr-button">
                    1개월
                  </button>
                  <button type="button" @click="setDateRange(3)" class="cr-button">
                    3개월
                  </button>
                  <button type="button" @click="setDateRange(6)" class="cr-button">
                    6개월
                  </button>
                </div>
                <div class="d-flex justify-content-center align-items-center orange">
                  <button type="button" class="cr-button" @click="filterData()">
                    조회
                  </button>
                </div>
              </div>
            </div>
            <div class="profile__ticket table-responsive tp-cart-list">
              <table v-for="(item, i) in paymentInfoList" :key="i" style="width:100%">
                <thead>
                  <tr class="position-relative">
                    <th colspan="4" class="tp-cart-header-product">
                     <p class="d-flex justify-content-between align-items-center">
                     <div>
                        <span id="order-no">주문번호 - {{ item.orderNumber }} &nbsp;</span>
                        <span id="order-date">주문날짜 - {{ datefomat(item.paymentInfo.orderedAt) }}</span>
                     </div>
                    
                          <span id="order-date" @click="handleClick(i)">주문상세보기</span>
                     </p>
                       
                    
                    
                    </th>
                    <th>
                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="col-12" v-for="(item2, i2) in item.orderProduct" :key="i2">
                    <td class="order-img col">
                      <img :src="item2.productImgurl" alt="" />
                    </td>
                    <td class="order-name col-4">
                      <div>
                        <a href="#">
                          {{ item2.productName }}
                        </a>
                        <div class="d-flex align-items-center gap-1 gold flex-wrap">
                          <span>{{ item2.productAmount.toLocaleString() + "원" }}</span>
                          <span>
                            {{ item2.detailOptionTitle }}
                            <span class="order-quantity">x {{ item2.quantity }}</span>
                          </span>
                        </div>
                      </div>
                    </td>

                    <td class="order-delivary col-4">
             
                      <p id="delivery-status" v-if="item2.transportNumber == '' && item2.cancelAmount == 0">상품
                        준비중</p>
                        <p id="delivery-status" v-if="
                        item2.transportNumber != '' &&
                        item2.quantity - item2.cancelAmount != 0 && item2.completePurchaseCheck == 'N'
                      ">배송중</p>
                                 <p id="delivery-status" v-if="
                        item2.transportNumber != '' &&
                        item2.quantity - item2.cancelAmount != 0 && item2.completePurchaseCheck == 'Y'
                      ">구매확정</p>
                      <span id="delivery-status" v-if="
                        item2.transportNumber != '' &&
                        item2.quantity - item2.cancelAmount != 0
                      ">{{ item2.parcelName + "(" + item2.transportNumber + ")" }}</span>

                      <p id="delivery-status" v-if="item2.cancelAmount > 0">주문
                        취소</p>
                    </td>
                    <td class="order-action col-2" v-if="item2.completePurchaseCheck != 'Y'">
                      <div class="d-flex flex-column gap-1" v-if="item2.cancelAmount == 0">
                        <button type="button" class="buying cr-button" v-if="item2.transportNumber != ''"
                          @click="confirmPurchase(item.orderNumber, item2.seq)">
                          구매확정
                        </button>
                        <button type="button" class="question cr-button" v-if="
                          item2.transportNumber == '' &&
                          item2.quantity - item2.cancelAmount != 0
                        " @click="cancelOrder(i, i2, item2.quantity)">
                          주문취소
                        </button>
                        <a href="/contactUs">
                          <button type="button" class="question cr-button" v-if="item2.transportNumber == ''">
                            1:1 문의
                          </button>
                        </a>
                      </div>
                      <div class="d-flex flex-column gap-1" v-if="item2.cancelAmount > 0">
                        <a href="/contactUs">
                          <button type="button" class="question cr-button">
                            1:1 문의
                          </button>
                        </a>
                      </div>
                    </td>
                    <td class="order-action col-2" v-if="item2.completePurchaseCheck == 'Y'">
                      <div class="d-flex flex-column gap-1" v-if="item2.cancelAmount > 0">
                        <a href="/contactUs" >
                          <button type="button" class="question cr-button">
                            1:1 문의
                          </button>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <nav aria-label="Page navigation example" class="cr-pagination">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" @click="pagenation(paging.paging - 1)" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                <li class="page-item webpage" v-for="i in visiblePages2(currentPage, paging)" :key="i">
                  <a class="page-link" :class="{ active: i === currentPage }" @click="pagenation(i)">
                    {{ i }}
                  </a>
                </li>

                <li class="page-item mopage" v-for="i in visiblePages(currentPage, paging)" :key="i">
                  <a class="page-link" :class="{ active: i === currentPage }" @click="pagenation(i)">
                    {{ i }}
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" @click="pagenation(paging.paging + 1)" aria-label="Next"
                    :disabled="paging.displayedPages >= paging.maxpage">
                    <span aria-hidden="true">&#187;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <!--구매이력상세-->
          <div id="false" v-if="buyHistory && bHDetail">
            <div class="profile__ticket table-responsive tp-cart-list">
              <table>
                <thead>
                    <label for="delivery-address">주문상품</label>
                </thead>
                <tbody>
                  <tr class="col-12" v-for="(item2, i2) in paymentInfoList[orderDetailidx].orderProduct" :key="i2">
                    <td class="order-img col">
                      <img :src="item2.productImgurl" alt="" />
                    </td>
                    <td class="order-name col-4">
                      <div>
                        <a href="#">
                          {{ item2.productName }}
                        </a>
                        <div class="d-flex align-items-center gap-1 gold flex-wrap">
                          <span>{{ item2.productAmount.toLocaleString() + "원" }}</span>
                          <span>
                            {{ item2.detailOptionTitle }}
                            <span class="order-quantity">x {{ item2.quantity }}</span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="order-delivary col-4">
             
                      <p id="delivery-status" v-if="item2.transportNumber == '' && item2.cancelAmount == 0">상품
                        준비중</p>
                        <p id="delivery-status" v-if="
                        item2.transportNumber != '' &&
                        item2.quantity - item2.cancelAmount != 0 && item2.completePurchaseCheck == 'N'
                      ">배송중</p>
                                  <p id="delivery-status" v-if="
                        item2.transportNumber != '' &&
                        item2.quantity - item2.cancelAmount != 0 && item2.completePurchaseCheck == 'Y'
                      ">구매확정</p>
                      <span id="delivery-status" v-if="
                        item2.transportNumber != '' &&
                        item2.quantity - item2.cancelAmount != 0
                      ">{{ item2.parcelName + "(" + item2.transportNumber + ")" }}</span>

                      <p id="delivery-status" v-if="item2.cancelAmount > 0">주문
                        취소</p>
                    </td>
                    <td class="order-action col-2" v-if="item2.completePurchaseCheck != 'Y'">
                      <div class="d-flex flex-column gap-1" v-if="item2.cancelAmount == 0">
                        <button type="button" class="buying cr-button" v-if="item2.transportNumber != ''"
                          @click="confirmPurchase(item.orderNumber, item2.seq)">
                          구매확정
                        </button>
                        <button type="button" class="question cr-button" v-if="
                          item2.transportNumber == '' &&
                          item2.quantity - item2.cancelAmount != 0
                        " @click="cancelOrder(i, i2, item2.quantity)">
                          주문취소
                        </button>
                        <a href="/contactUs">
                          <button type="button" class="question cr-button" v-if="item2.transportNumber == ''">
                            1:1 문의
                          </button>
                        </a>
                      </div>
                      <div class="d-flex flex-column gap-1" v-if="item2.cancelAmount > 0">
                        <a href="/contactUs">
                          <button type="button" class="question cr-button" >
                            1:1 문의
                          </button>
                        </a>
                      </div>
                    </td>
                    <td class="order-action col-2" v-if="item2.completePurchaseCheck == 'Y'">
                      <div class="d-flex flex-column gap-1" v-if="item2.cancelAmount > 0">
                        <a href="/contactUs" >
                          <button type="button" class="question cr-button">
                            1:1 문의
                          </button>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="orderHistory col-12 d-flex align-items-center gap-1 justify-content-around mt-10 pb-30">
                <div class="historyInfo col-12 d-flex flex-wrap justify-content-between">
                  <div class="col-6">
                    <label for="receiver">주문 번호</label>
                    <input type="text" id="receiver" :value="paymentInfoList[orderDetailidx].orderNumber"
                      readonly />
                  </div>
                  <div class="col-6">
                    <label for="receiver">주문 날짜</label>
                    <input type="text" id="receiver" :value="datefomat(paymentInfoList[orderDetailidx].paymentInfo.orderedAt)"
                      readonly />
                  </div>
                  <div class="col-6">
                    <label for="receiver">수령인</label>
                    <input type="text" id="receiver" :value="paymentInfoList[orderDetailidx].paymentInfo.receiver"
                      readonly />
                  </div>
                  <div class="col-6">
                    <label for="contact">연락처</label>
                    <input type="text" id="contact" pattern="[0-9]+"
                      :value="paymentInfoList[orderDetailidx].paymentInfo.receiverPhone" readonly />
                  </div>
                  <div class="col-12">
                    <label for="delivery-address">배송지</label>
                    <input type="text" id="delivery-address"
                      :value="paymentInfoList[orderDetailidx].paymentInfo.address" readonly />
                  </div>
                  <div class="col-12">
                    <label for="delivery-address">배송메모</label>
                    <!-- <input type="text" id="delivery-address" :value="paymentInfoList[orderDetailidx].paymentInfo.message" readonly /> -->
                    <textarea class="cr-bill-textarea" name=""
                      :value="paymentInfoList[orderDetailidx].paymentInfo.message"></textarea>
                  </div>
                </div>
                <div class="paidInfo col-12 d-flex align-items-center flex-wrap justify-content-between">
                  <div class="col-6">
                    <label for="payment-method">결제방식</label>
                    <input type="text" id="payment-method" value="복합 결제 (온누리+카드결제)"
                      v-if="paymentInfoList[orderDetailidx].paymentInfo.onNuryStatementNumber != '' && paymentInfoList[orderDetailidx].paymentInfo.creditStatementNumber != ''"
                      readonly />
                    <input type="text" id="payment-method" value="모바일 온누리 결제"
                      v-if="paymentInfoList[orderDetailidx].paymentInfo.onNuryStatementNumber != '' && paymentInfoList[orderDetailidx].paymentInfo.creditStatementNumber == ''"
                      readonly />
                    <input type="text" id="payment-method" value="일반 결제 (카드결제)"
                      v-if="paymentInfoList[orderDetailidx].paymentInfo.onNuryStatementNumber == '' && paymentInfoList[orderDetailidx].paymentInfo.creditStatementNumber != ''"
                      readonly />
                  </div>
                  <div class="col-6">
                    <label for="payment-status">도서산간,제주권 추가 결제</label>
                    <input type="text" id="payment-status"
                      :value="paymentInfoList[orderDetailidx].totalDangerPrice.toLocaleString() + '원'"
                      readonly />
                  </div>
                  <div class="col-6">
                    <label for="payment-status">모바일 온누리 결제</label>
                    <input type="text" id="payment-status"
                      :value="paymentInfoList[orderDetailidx].paymentInfo.onNuryApprovalPrice.toLocaleString() + '원'"
                      readonly />
                  </div>
                  <div class="col-6">
                    <label for="payment-amount">일반 결제 (카드결제)</label>
                    <input type="text" id="payment-amount"
                      :value="paymentInfoList[orderDetailidx].paymentInfo.creditApprovalPrice.toLocaleString() + '원'"
                      readonly />
                  </div>
                  <div class="col-6">
                    <label for="payment-status">총 결제</label>
                    <input type="text" id="payment-status"
                      :value="paymentInfoList[orderDetailidx].paymentInfo.totalApprovalPrice.toLocaleString() + '원'"
                      readonly />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--취소내역-->
          <div id="show" v-if="cancleHistory && chDetail == false">
            <div class="d-flex col-12 align-items-center head justify-content-between flex-wrap">
              <h3 class="profile__info-title col-12 mb-2">취소내역확인</h3>
              <div class="col-xl-6 col-lg-6 col-md-8 col-sm-12 datePick">
                <VueDatePicker v-model="date2" :range="true" :enable-time-picker="false" :format="customFormat" />
              </div>
              <div class="d-flex gap-1">
                <div class="d-flex justify-content-center gap-1 align-items-center gray">
                  <button type="button" @click="setDateRange2(1)" class="cr-button">
                    1개월
                  </button>
                  <button type="button" @click="setDateRange2(3)" class="cr-button">
                    3개월
                  </button>
                  <button type="button" @click="setDateRange2(6)" class="cr-button">
                    6개월
                  </button>
                </div>
                <div class="d-flex justify-content-center align-items-center orange">
                  <button type="button" class="cr-button" @click="filterCancle()">
                    조회
                  </button>
                </div>
              </div>
            </div>

            <div class="profile__ticket table-responsive tp-cart-list">
              <table v-for="(item, i) in cancleInfoList" :key="i">
                <thead>
                  <tr class="position-relative">
                    <th colspan="6" class="tp-cart-header-product">
                      <span id="order-no">주문번호 - {{ item.orderNumber }} </span>
                      <span id="order-date">취소 요청 일자 - {{ datefomat(item.cancelRequestAt) }}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="col-12">
                    <td class="order-img col">
                      <img :src="item.productImgurl" alt="" />
                    </td>
                    <td class="order-name col-4">
                      <div>
                        <a href="#">
                          {{ item.productName }}
                        </a>
                        <p>
                          {{ item.detailOptionTitle }}
                        </p>
                        <div class="d-flex align-items-center gap-1 gold flex-wrap">
                          <span class="order-quantity">취소 수량 {{ item.cancelAmount }}</span>
                        </div>
                      </div>
                    </td>

                    <td class="order-delivary col">
                      <span id="delivery-status" v-if="item.cancelCheck == 'N'">취소 대기</span>
                      <span id="delivery-status" v-if="item.cancelCheck == 'Y'">취소 확정</span>
                      <p id="delivery-status" v-if="item.cancelCheck == 'Y'">
                        확정 일자 - {{ datefomat(item.cancelRequestAt) }}
                      </p>
                    </td>
                    <td class="order-action col">
                      <div class="d-flex flex-column gap-1">
                        <a href="/contactUs">
                          <button type="button" class="question cr-button">
                            1:1 문의
                          </button>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example" class="cr-pagination">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" @click="pagenation2(paging2.paging - 1)" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                <li class="page-item webpage" v-for="i in visiblePages2(currentPage2, paging2)" :key="i">
                  <a class="page-link" :class="{ active: i === currentPage2 }" @click="pagenation2(i)">
                    {{ i }}
                  </a>
                </li>

                <li class="page-item mopage" v-for="i in visiblePages(currentPage2, paging2)" :key="i">
                  <a class="page-link" :class="{ active: i === currentPage2 }" @click="pagenation2(i)">
                    {{ i }}
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" @click="pagenation2(paging2.paging + 1)" aria-label="Next"
                    :disabled="paging2.displayedPages >= paging2.maxpage">
                    <span aria-hidden="true">&#187;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <!--문의내역-->
          <div v-if="inqury">
            <div class="profile__notification">
              <div class="profile__notification-top mb-30">
                <h3 class="profile__notification-title profile__info-title">문의내역</h3>
              </div>
              <div class="profile__notification-wrapper table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>번호</th>
                      <th>문의유형</th>
                      <th>제목</th>
                      <th>문의일시</th>
                      <th>답변여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in inquiryResList" :key="i" data-bs-toggle="modal" data-bs-target="#questions"
                      @click="inquryContent(item.inquiryId)">
                      <td>{{ (paging.paging - 1) * 10 + i + 1 }}</td>
                      <td>{{ item.type }}</td>
                      <td>{{ item.inquiryTitle }}</td>
                      <td>{{ formatDate(item.createdAt) }}</td>
                      <td>{{ item.answerCheck }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="col-12 d-flex justify-content-center">
                <nav aria-label="Page navigation example" class="cr-pagination">
                  <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link" @click="pagenation3(paging3.paging - 1)" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>

                    <li class="page-item webpage" v-for="i in visiblePages2(currentPage3, paging3)" :key="i">
                      <a class="page-link" :class="{ active: i === currentPage3 }" @click="pagenation3(i)">
                        {{ i }}
                      </a>
                    </li>

                    <li class="page-item mopage" v-for="i in visiblePages(currentPage3, paging3)" :key="i">
                      <a class="page-link" :class="{ active: i === currentPage3 }" @click="pagenation3(i)">
                        {{ i }}
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" @click="pagenation3(paging3.paging + 1)" aria-label="Next"
                        :disabled="paging3.displayedPages >= paging3.maxpage">
                        <span aria-hidden="true">&#187;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div class="modal fade" id="questions" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content modalInqury">
                  <div class="modal-header">
                    <h5 class="modal-title">
                      <img src="@/assets/img/logo/onnuryLOGO0.png" alt="" />
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <input type="text" v-model="modalData.inquiryTitle" placeholder="제목" readonly />
                    <label for="">내용</label>
                    <textarea v-model="modalData.content" readonly></textarea>
                    <label for="">답변</label>
                    <textarea class="answer" v-model="modalData.answer" readonly></textarea>
                    <div>
                      <a v-for="(file, index) in modalData.files" :key="index" :href="file.imgUrl"
                        :download="file.imgTitle" style="color: #333; font-size: 12px">
                        <i style="color: #888; font-size: 12px" class="fa-regular fa-file"></i>
                        <span style="color: #888; font-size: 12px">첨부파일 : </span>{{ file.imgTitle }}
                      </a>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                      확인
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--비밀번호-->
          <div v-if="pwdChange">
            <div class="profile__password">
              <form>
                <div class="profile__notification-top mb-30">
                  <h3 class="profile__info-title">비밀번호변경</h3>
                </div>
                <div class="row">
                  <div class="col-xxl-12">
                    <div class="profile__input-box">
                      <div class="profile__input-title">
                        <label for="old_pass">현재 비밀번호</label>
                      </div>
                      <div class="profile__input">
                        <input name="old_pass" id="old_pass" type="password"
                          v-model="myPageChangePasswordRequestDto.presentPassword" />
                      </div>
                    </div>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                    <div class="profile__input-box">
                      <div class="profile__input-title">
                        <label for="new_pass">새 비밀번호</label>
                      </div>
                      <div class="profile__input">
                        <input name="new_pass" id="new_pass" type="password"
                          v-model="myPageChangePasswordRequestDto.newPassword" />
                      </div>
                    </div>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                    <div class="profile__input-box">
                      <div class="profile__input-title">
                        <label for="con_new_pass">새 비밀번호 재입력</label>
                      </div>
                      <div class="profile__input">
                        <input name="con_new_pass" id="con_new_pass" type="password"
                          v-model="myPageChangePasswordRequestDto.newPasswordCheck" />
                      </div>
                    </div>
                  </div>
                  <div class="col-xxl-6 col-md-6">
                    <div class="profile__btn">
                      <button type="submit" class="cr-button" @click="PasswordChange()">
                        비밀번호변경
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal fade" id="passwordAlert" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">
                      <img src="@/assets/img/logo/onnuryLOGO0.png" alt="" />
                    </h5>
                    <button type="button" class="btn-close" data-bs-toggle="modal" aria-label="Close"
                      data-bs-target="#mainModal"></button>
                  </div>
                  <div class="modal-body">
                    <h4>비밀번호가 변경되었습니다.</h4>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                      <a href=""> 확인 </a>
                    </button>
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
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  name: "myPage",
  component: {
    VueDatePicker,
  },
  data() {
    return {
      info: true,
      name: this.$router.currentRoute.value.query.name,
      buyHistory: false,
      cancleHistory: false,
      chDetail: false,
      inqury: false,
      pwdChange: false,
      bHDetail: false,
      orderDetailidx: 0,
      listdata: {},
      modalData: {
        // 모달에 바인딩할 데이터
        inquiryTitle: "",
        content: "",
        answer: "",
        files: [],
      },
      customFormat: "yyyy-MM-dd",
      total: 0,
      maxpage: 0,
      paging: { paging: 1, maxpage: 1, displayedPages: 10 },
      paging2: { paging: 1, maxpage: 1, displayedPages: 10 },
      paging3: { paging: 1, maxpage: 1, displayedPages: 10 },
      currentPage: 1,
      currentPage2: 1,
      currentPage3: 1,
      myinfo: {
        memberId: "",
        loginId: "",
        userName: "",
        birth: "",
        address: "",
        detailAddress: "",
        postNumber: "",
        email: "",
        phone: "",
        businessNumber: "",
        manager: "",
        type: "",
      },
      myPageChangePasswordRequestDto: {
        newPassword: "",
        newPasswordCheck: "",
        presentPassword: "",
      },
      page: "",
      responsemyInfo: [],
      date: ref([]),
      date2: ref([]),
      inquiryId: null,
      paymentInfoList: [],
      cancleInfoList: [],
      canclequatity: 0,
      canclequatityCount: [],
      canclequatityCountShow: false,
      isVisible: true,
      totalDangerPrice: 0,
      dangerPriceList: [],
      inquiryResList: [],
    };
  },
  computed: {
    formattedDate() {
      if (Array.isArray(this.date)) {
        return this.date.map((d) => this.formatDate(d)).join(" - ");
      } else {
        return this.formatDate(this.date);
      }

      if (Array.isArray(this.date2)) {
        return this.date2.map((d) => this.formatDate(d)).join(" - ");
      } else {
        return this.formatDate(this.date2);
      }
    },
  },

  methods: {
    /* 회원 탈퇴 */
    withdrawal() {
      axios
        .put(
          "/api/mypage/withdrawal",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: sessionStorage.getItem("authorization"),
              RefreshToken: sessionStorage.getItem("refreshToken"),
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    /* 구매 확정 */
    confirmPurchase(ordernum, seqnum) {
      axios
        .put(
          "/api/mypage/confirm/payment",
          { orderNumber: ordernum, seq: seqnum },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: sessionStorage.getItem("authorization"),
              RefreshToken: sessionStorage.getItem("refreshToken"),
            },
          }
        )
        .then((res) => {
          if (res.data.statusCode == "O-200") {
            alert("구매 확정 되었습니다.");
            location.reload();
          } else {
            alert("구매 확정 실패하셨습니다.");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    /* 현재 페이지의 표시된 페이지 계산 */
    visiblePages(cur, pag) {
      const maxPagesToShow = 5;
      const startPage = Math.max(1, cur - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(pag.maxpage, startPage + maxPagesToShow - 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    /* 현재 페이지의 표시된 페이지 계산 (두 번째 페이지 네이션) */
    visiblePages2(cur, pag) {
      const maxPagesToShow = pag.displayedPages;
      const startPage = Math.max(1, cur - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(pag.maxpage, startPage + maxPagesToShow - 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    /* 페이지 상단으로 스크롤 */
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    /* 페이지 네이션 */
    pagenation(i) {
      if (1 <= i && i <= this.paging.maxpage) {
        this.paging.paging = i;
        this.paymentList("page");
        this.currentPage = this.paging.paging;
      }
      this.scrollToTop();
    },
    /* 두 번째 페이지 네이션 */
    pagenation2(i) {
      if (1 <= i && i <= this.paging2.maxpage) {
        this.paging2.paging = i;
        this.cancleList("page");
        this.currentPage2 = this.paging2.paging;
      }
      this.scrollToTop();
    },
    /* 세 번째 페이지 네이션 */
    pagenation3(i) {
      if (1 <= i && i <= this.paging3.maxpage) {
        this.paging3.paging = i;
        this.inquiryList("page");
        this.currentPage3 = this.paging.paging;
      }
      this.scrollToTop();
    },
    /* 페이지 수 더 보기 */
    showMorePages() {
      if (this.paging.displayedPages < this.paging.maxpage) {
        this.paging.displayedPages++;
      }
    },
    /* 세션 초기화 및 리다이렉션 */
    clearSessionAndRedirect() {
      sessionStorage.removeItem("authorization");
      sessionStorage.removeItem("loginId");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("type");
      window.location.href = "/";
    },
    /* 날짜 형식화 */
    formatDate(date) {
      var date2 = new Date(date);
      const koreaTimeDiff = 9 * 60 * 60 * 1000;
      const korNow = new Date(date2.getTime() + koreaTimeDiff);
      let year = korNow.getFullYear();
      let month = korNow.getMonth() + 1;
      let day = korNow.getDate();
      month = month >= 10 ? month : "0" + month;
      day = day >= 10 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    /* 상태 전환 */
    toggleState(state) {
      this.bHDetail = false;
      this.info = false;
      this.buyHistory = false;
      this.cancleHistory = false;
      this.inqury = false;
      this.pwdChange = false;
      this[state] = true;
    },
    /* 초기 날짜 범위 설정 */
    setInitialDateRange() {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      this.date = [startDate, endDate];
      this.date2 = [startDate, endDate];
    },
    /* 날짜 범위 설정 (개월 수로 설정) */
    setDateRange(months) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(startDate.getMonth() - months);
      this.date = [endDate, startDate];
    },
    /* 두 번째 날짜 범위 설정 (개월 수로 설정) */
    setDateRange2(months) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(startDate.getMonth() - months);
      this.date2 = [endDate, startDate];
    },
    /* 데이터 필터링 */
    filterData() {
      if (this.date && this.date.length === 2) {
        let paramsValue = {};
        const formattedStartDate = this.datefomat(this.date[0]);
        const formattedEndDate = this.datefomat(this.date[1]);
        paramsValue.startDate = formattedStartDate;
        paramsValue.endDate = formattedEndDate;
        paramsValue.page = this.paging.paging;
        this.paymentList(paramsValue);
      } else {
        console.error("Date range not set correctly.");
      }
    },
    /* 취소 필터링 */
    filterCancle() {
      if (this.date && this.date.length === 2) {
        let paramsValue = {};
        const formattedStartDate = this.datefomat(this.date2[0]);
        const formattedEndDate = this.datefomat(this.date2[1]);
        paramsValue.startDate = formattedStartDate;
        paramsValue.endDate = formattedEndDate;
        paramsValue.paging = this.paging.paging;
        paramsValue.page = this.paging2.paging;
        this.cancleList(paramsValue);
      } else {
        console.error("Date range not set correctly.");
      }
    },
    /* 유저 정보 가져오기 */
    async myInfo() {
      /* myinfo axios */
      await axios
        .get("/api/mypage/info", {
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        })
        .then((res) => {
          console.log(res);
          Object.assign(this.myinfo, res.data.data);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    },
    /* 문의 내역 리스트 가져오기 */
    async inquiryList(type) {
      /* inquiryList axios */
      await axios
        .get("/api/mypage/inquiryList", {
          params: {
            paging: this.paging3.paging,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        })
        .then((res) => {
          this.inquiryResList = res.data.data.inquiryResList;
          this.paging3.maxpage = res.data.data.maxpage;
          this.currentPage3 = this.paging3.paging;
        })
        .catch((error) => {
          console.error("Error fetching inquiry list:", error);
        });
    },
    /* 결제 내역 리스트 가져오기 */
    async paymentList(type) {
      /* paymentList axios */
      await axios
        .get("/api/mypage/paymentList", {
          params: {
            page: this.paging.paging,
            displayPage: this.paging.displayedPages,
            pageCount: this.total,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        })
        .then((res) => {
          this.listdata = res.data.data.paymentResList;
          this.total = res.data.data.totalCount;
          this.paging.maxpage = res.data.data.maxpage;
          this.currentPage = this.paging.paging;
        })
        .catch((error) => {
          console.error("Error fetching payment list:", error);
        });
    },
    /* 취소 내역 리스트 가져오기 */
    async cancleList(type) {
      /* cancleList axios */
      await axios
        .get("/api/mypage/cancleList", {
          params: {
            paging: this.paging2.paging,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        })
        .then((res) => {
          this.cancleInfoList = res.data.data.cancleResList;
          this.paging2.maxpage = res.data.data.maxpage;
          this.currentPage2 = this.paging2.paging;
        })
        .catch((error) => {
          console.error("Error fetching cancellation list:", error);
        });
    },
    /* 날짜를 기반으로 하는 데이터 포맷 */
    datefomat(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
  mounted() {
    this.setInitialDateRange(); /* 초기 날짜 설정 */
    this.myInfo(); /* 사용자 정보 가져오기 */
    this.paymentList(); /* 결제 내역 가져오기 */
    this.cancleList(); /* 취소 내역 가져오기 */
    this.inquiryList(); /* 문의 내역 가져오기 */
  },
};
</script>

