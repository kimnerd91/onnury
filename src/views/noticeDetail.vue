<template>
  <!-- Faq -->
  <!-- Breadcrumb -->
  <section class="section-breadcrumb">
    <div class="ssm-breadcrumb-image">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="ssm-breadcrumb-title">
              <p class="d-flex"> <a href="/">메인</a> <i class="fa-solid fa-caret-right"></i>
                <a href="#">{{ name }}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-faq padding-tb-50" style="margin-top: 30px" data-aos="fade-up" data-aos-duration="2000"
    data-aos-delay="400">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="noticePage">
            <div class="noticeTitle">
              <!-- <h2>{{ notice.noticeTitle }}</h2>
              <span>{{ notice.createdAt }}</span> -->
              <h2>{{ notice.noticeTitle }}</h2>
              <span>{{ formatDate(notice.createdAt) }}</span>
            </div>
            <div class="noticeText">
              <p v-html="notice.noticeContent"></p>
              <!-- <div v-html="notice.noticeContent"></div> -->
      
            </div>
            <div class="noticeBack">
              <a href="/faqList?active=2"><button type="button">돌아가기</button></a>
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
  
  data() {
    return {
      name: "noticeDetail",
      noticeId: this.$router.currentRoute.value.query.id,
      notice: {noticeTitle: "",
      createdAt: "",
      noticeContent:"",
      },
    };
  },
  methods: {
    async noticeDetail(){
      try {
        const response = await axios.get(`/api/notice/get`, {
          params: {
            noticeId: this.noticeId,
          },
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });
        this.notice = response.data.data;
      } catch (error) {
        // console.error("Error fetching FAQ list:", error);
      }
    },
    formatDate(dateStr) {
      // Date 객체로 변환
      const date = new Date(dateStr);
      // 원하는 형식으로 변환
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
  mounted() {
    this.noticeDetail();
  },
};
</script>
