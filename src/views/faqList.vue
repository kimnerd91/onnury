<template>
  <!-- Faq -->
  <!-- Breadcrumb -->
  <section class="section-breadcrumb" v-if="active == 2">
    <div class="ssm-breadcrumb-image">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="ssm-breadcrumb-title">
              <p class="d-flex"> <a href="/">메인</a> <i class="fa-solid fa-caret-right"></i>
                <a href="#">공지사항</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Breadcrumb -->
  <section class="section-breadcrumb" v-if="active == 1">
    <div class="ssm-breadcrumb-image">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="ssm-breadcrumb-title">
              <p class="d-flex"> <a href="/">메인</a> <i class="fa-solid fa-caret-right"></i>
                <a href="#">자주묻는 질문</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-faq padding-tb-50" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
    <div class="container">
      <div class="row">
        <div class="col-12 profile__tab d-none justify-content-center">
          <nav class="col-lg-8 col-md-12 col-sm-12">
            <div class="nav nav-tabs tp-tab-menu flex-row d-flex" id="profile-tab" role="tablist">
              <button class="nav-link col-6" id="nav-faq-tab" data-bs-toggle="tab" data-bs-target="#faq" type="button"
                role="tab" aria-controls="faq" :class="{ active: active === 1 }" aria-selected="true"
                @click="active = 1">
                <span><i class="fa-solid fa-user"></i></span> FAQ
              </button>
              <button class="nav-link col-6" id="nav-gongji-tab" data-bs-toggle="tab" data-bs-target="#gongji"
                type="button" role="tab" aria-controls="gongji" aria-selected="false" :class="{ active: active === 2 }"
                @click="active = 2">
                <span><i class="fa-solid fa-volume-high"></i></span> 공지사항
              </button>
            </div>
          </nav>
        </div>
        <div v-if="active == 1" class="col-lg-10 col-md-12 col-sm-12 faq d-flex align-items-start flex-wrap mx-auto flex-column" id="faq">
          <div class="col-lg-12 col-md-12 faqBox">
            <ul class="nav nav-tabs d-flex col-12 gap-2 justify-content-center" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="tab-1" data-bs-toggle="tab" data-bs-target="#no1-tab-pane"
                  type="button" role="tab" aria-controls="no1-tab-pane" aria-selected="true" @click="FAQListUp('이용안내')">
                  <div class="gap-2">
                    <i class="fa-solid fa-question"></i>
                    <p>이용안내</p>
                  </div>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab-2" data-bs-toggle="tab" data-bs-target="#no2-tab-pane" type="button"
                  role="tab" aria-controls="no2-tab-pane" aria-selected="false" @click="FAQListUp('회원관련')">
                  <div class="gap-2">
                    <i class="fa-solid fa-user"></i>
                    <p>회원관련</p>
                  </div>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab-3" data-bs-toggle="tab" data-bs-target="#no3-tab-pane" type="button"
                  role="tab" aria-controls="no3-tab-pane" aria-selected="false" @click="FAQListUp('주문/결제')">
                  <div class="gap-2">
                    <i class="fa-solid fa-money-bill-1"></i>
                    <p>주문/결제</p>
                  </div>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab-3" data-bs-toggle="tab" data-bs-target="#no3-tab-pane" type="button"
                  role="tab" aria-controls="no3-tab-pane" aria-selected="false" @click="FAQListUp('배송')">
                  <div class="gap-2">
                    <i class="fa-solid fa-truck"></i>
                    <p>배송</p>
                  </div>
                </button>
              </li>
              <!-- <li class="d-flex nav-item">
                <button type="button" class="mb-0" style="background-color: #ffff; border: 0px">
                  <img style="width: 80%" src="@/assets/img/logo/logo.png" alt="logo" class="logo" />
                </button>
              </li> -->
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab-3" data-bs-toggle="tab" data-bs-target="#no3-tab-pane" type="button"
                  role="tab" aria-controls="no3-tab-pane" aria-selected="false" @click="FAQListUp('교환/AS')">
                  <div class="gap-2">
                    <i class="fa-solid fa-rotate"></i>
                    <p>교환/AS</p>
                  </div>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab-3" data-bs-toggle="tab" data-bs-target="#no3-tab-pane" type="button"
                  role="tab" aria-controls="no3-tab-pane" aria-selected="false" @click="FAQListUp('취소/반품')">
                  <div class="gap-2">
                    <i class="fa-solid fa-xmark"></i>
                    <p>취소/반품</p>
                  </div>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab-3" data-bs-toggle="tab" data-bs-target="#no3-tab-pane" type="button"
                  role="tab" aria-controls="no3-tab-pane" aria-selected="false" @click="FAQListUp('혜택/이벤트')">
                  <div class="gap-2">
                    <i class="fa-solid fa-gift"></i>
                    <p>혜택/이벤트</p>
                  </div>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab-3" data-bs-toggle="tab" data-bs-target="#no3-tab-pane" type="button"
                  role="tab" aria-controls="no3-tab-pane" aria-selected="false" @click="FAQListUp('대량/입점문의')">
                  <div class="gap-2">
                    <i class="fa-solid fa-handshake"></i>
                    <p>대량ㆍ입점문의</p>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <div v-if="active == 1" class="col-lg-12 col-md-12 d-flex align-items-center justify-content-center">
            <div class="ssm-faq col-lg-8 col-sm-12">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item" v-for="(item, i) in faqList" :key="i">
                  <h2 class="accordion-header" id="heading-1">
                    <button class="accordion-button shadow-none" type="button" data-bs-toggle="collapse"
                      :data-bs-target="'#collapse-' + i" aria-expanded="false" :aria-controls="'collapse-' + i">
                      {{ item.question }}
                    </button>
                  </h2>
                  <div :id="'collapse-' + i" class="accordion-collapse collapse" :aria-labelledby="'heading-' + i"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <div v-html="item.answer"></div>
                      <!-- <p>
                        {{ item.answer }}
                      </p> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="active == 2" class="col-lg-12 d-flex justify-content-center mt-30" id="notify">
          <div class="col-12 d-flex justify-content-around" id="gongji" style="display: none">
            <div class="profile__notification-wrapper table-responsive col-8 ml-30 gongji">
              <table>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>일시</th>
                  </tr>
                </thead>
                <tbody id="gongji-tbody">
                  <tr v-for="(item, i) in noticeList" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td><a :href="`/noticeDetail?id=${item.noticeId}`">{{ item.noticeTitle }}</a></td>
                    <td>{{ formatDate(item.createdAt) }}</td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="cr-faq">
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item" v-for="(item, i) in noticeList" :key="i">
                    <h2 class="accordion-header" id="heading-1">
                      <button class="accordion-button shadow-none" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#collapse-noti-' + i" aria-expanded="false"
                        :aria-controls="'collapse-noti-' + i">
                        <table>
                          <tbody>
                            <tr>
                              <td>{{ i + 1 }}</td>
                              <td>{{ item.noticeTitle }}</td>
                              <td>{{ item.createdAt }}</td>

                            </tr>
                          </tbody>
                        </table>

                      </button>
                    </h2>
                    <div :id="'collapse-noti-' + i" class="accordion-collapse collapse"
                      :aria-labelledby="'heading-noti-' + i" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <p v-html="item.noticeContent">
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "faqList",
  data() {
    return {
      // 현재 라우터의 쿼리에서 'name' 값을 가져옴
      name: this.$router.currentRoute.value.query.name,
      tabs: true, // 탭 상태 관리
      active: null, // 활성화된 탭 번호
      page: 1, // FAQ 페이지 번호
      noticepage: 1, // 공지사항 페이지 번호
      type: "이용안내", // 기본 FAQ 타입
      faqList: [], // FAQ 리스트
      noticeList: [], // 공지사항 리스트
      FAQdata: {}, // FAQ 데이터 객체
      FAQCount: "", // FAQ 개수
    };
  },
  methods: {
    // FAQ 리스트를 서버에서 가져오는 함수
    async FAQListUp(type) {
      try {
        this.type = type; // 선택한 타입을 설정
        const response = await axios.get(`/api/faq/list`, {
          params: {
            page: this.page, // 현재 페이지 번호
            type: this.type, // 선택한 타입
          },
          headers: {
            Authorization: sessionStorage.getItem("authorization"), // 세션에 저장된 인증 토큰
            RefreshToken: sessionStorage.getItem("refreshToken"), // 세션에 저장된 리프레시 토큰
          },
        });
        this.faqList = response.data.data.faqDataResponseDto; // 가져온 FAQ 데이터를 설정
        // FAQ 데이터를 활용하는 로직을 여기에 작성합니다.
      } catch (error) {
        // FAQ 리스트를 가져오는 중 에러 발생 시 처리
      }
    },
    // 공지사항 리스트를 서버에서 가져오는 함수
    async noticeListUp() {
      try {
        const response = await axios.get(`/api/notice/list`, {
          params: {
            page: this.noticepage, // 현재 공지사항 페이지 번호
          },
          headers: {
            Authorization: sessionStorage.getItem("authorization"), // 세션에 저장된 인증 토큰
            RefreshToken: sessionStorage.getItem("refreshToken"), // 세션에 저장된 리프레시 토큰
          },
        });
        this.noticeList = response.data.data.noticeList; // 가져온 공지사항 데이터를 설정
      } catch (error) {
        // 공지사항 리스트를 가져오는 중 에러 발생 시 처리
      }
    },
    // 날짜 포맷팅 함수
    formatDate(dateStr) {
      const date = new Date(dateStr); // 날짜 문자열을 Date 객체로 변환
      const year = date.getFullYear(); // 연도 추출
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 추출 및 두 자리로 포맷팅
      const day = String(date.getDate()).padStart(2, "0"); // 일 추출 및 두 자리로 포맷팅
      return `${year}-${month}-${day}`; // yyyy-mm-dd 형식으로 반환
    },
  },
  created() {
    // 라우터에서 'active' 쿼리 파라미터를 가져옴 (숫자로 변환)
    this.active = parseInt(this.$route.query.active); 
  },
  mounted() {
    // 컴포넌트가 마운트된 후 기본 FAQ와 공지사항 리스트를 불러옴
    this.FAQListUp("이용안내");
    this.noticeListUp();
  },
};
</script>

