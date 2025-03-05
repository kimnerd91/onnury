<template>
  <!-- Breadcrumb -->
  <section class="section-breadcrumb">
    <div class="cr-breadcrumb-image">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="cr-breadcrumb-title">
              <p class="d-flex">
                <a href="/">메인</a> <i class="fa-solid fa-caret-right"></i>
                <a href="#">문의하기</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section class="section-Contact padding-tb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div
            class="mb-30"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="400"
          >
            <div class="cr-banner">
              <h2>문의하기</h2>
            </div>
            <div class="cr-banner-sub-title">
              <p>
                대량 주문 및 기타 문의사항은 아래 전화번호 또는 이메일로 연락해 주십시오.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-minus-24 justify-content-center">
        <div class="col-xl-8 col-md-12 d-flex">
          <div
            class="col-lg-6 col-md-6 col-sm-6 mb-24 50vw"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="400"
          >
            <div class="cr-info-box col-xs-6">
              <div class="cr-icon">
                <i class="ri-phone-line"></i>
              </div>
              <div class="cr-info-content">
                <h4 class="heading">연락처</h4>
                <p>
                  <a href="javascript:void(0)"
                    ><i class="ri-phone-line"></i> &nbsp; 1670-2024</a
                  >
                </p>
                <p>
                  <a href="javascript:void(0)"
                    ><i class="ri-phone-line"></i> &nbsp; 02-6406-0022</a
                  >
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-lg-6 col-md-6 col-sm-6 mb-24 50vw"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="600"
          >
            <div class="cr-info-box col-md-12">
              <div class="cr-icon">
                <i class="ri-mail-line"></i>
              </div>
              <div class="cr-info-content">
                <h4 class="heading">메일 주소</h4>
                <p>
                  <a href="javascript:void(0)"
                    ><i class="ri-mail-line"></i> &nbsp; dntc02@naver.com</a
                  >
                </p>
                <p>
                  <a href="javascript:void(0)"
                    ><i class="ri-globe-line"></i> &nbsp; dntc02@naver.com</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row padding-t-50 mb-minus-24 d-flex justify-content-center">
        <div
          class="col-md-12 col-lg-6 col-12 mb-24"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="800"
        >
          <form class="cr-content-form">
            <select
              class="form-select w-50 mb-24"
              v-model="inquiryRequestDto.type"
              placeholder="문의를 선택해주세ㅛ"
              aria-label="Default select example"
            >
              <option disabled value="">문의를 선택해주세요</option>
              <option value="견적문의">견적문의</option>
              <option value="이용안내">이용안내</option>
              <option value="회원관련">회원관련</option>
              <option value="주문/결제">주문/결제</option>
              <option value="배송">배송</option>
              <option value="취소/반품">취소/반품</option>
              <option value="교환/AS">교환/AS</option>
              <option value="혜택/이벤트">혜택/이벤트</option>
              <option value="대량/입점문의">대량ㆍ입점문의</option>
            </select>
            <div class="form-group">
              <input
                type="text"
                placeholder="문의 제목"
                class="cr-form-control"
                :class="{ 'error-border': errors.inquiryTitle }"
                v-model="inquiryRequestDto.inquiryTitle"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                class="cr-form-control"
                id="exampleFormControlTextarea1"
                rows="15"
                placeholder="문의내용"
                :class="{ 'error-border': errors.inquiryContent }"
                v-model="inquiryRequestDto.inquiryContent"
                required
              ></textarea>
            </div>
            <div style="margin: 10px 0">
              <span><i class="fa-regular fa-file"></i> 파일첨부 : </span>
              <input type="file" id="files" multiple accept="image/gif, image/jpeg,  image/jpg, image/png"/>
            </div>
            <span class="cr-bill-wrap cr-bill-wrap mb-24">
              <div class="d-flex align-items-center mb-12">
                <label for="checkcheck">
                  <input
                    type="checkbox"
                    v-model="agreementChecked"
                    id="checkcheck"
                    :class="{ 'error-border': errors.agreementChecked }"
                    required
                  />
                  <span>입력하신 연락처, 메일 등으로 메시지 수신에 동의합니다.</span>
                </label>
              </div></span
            ><button
              type="button"
              class="cr-button mt-24 col-lg-3 col-sm-12"
              @click="sentInqury"
            >
              문의보내기
            </button>
          </form>
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
      name: this.$router.currentRoute.value.query.name,
      inquiryRequestDto: {
        type: "",
        InquiryTitle: "",
        InquiryContent: "",
        relateFiles: [],
      },
      agreementChecked: false,
      errors: {
        inquiryTitle: false,
        inquiryContent: false,
        agreementChecked: false,
        fileup: null,
      },
    };
  },
methods: {
 async sentInqury() {
  var typeYN = true;
  if(this.inquiryRequestDto.type != ""){
    typeYN = false;
  }
  this.errors = {
    type: typeYN,
    inquiryTitle: !this.inquiryRequestDto.inquiryTitle,
    inquiryContent: !this.inquiryRequestDto.inquiryContent,
    agreementChecked: !this.agreementChecked,
  };

  // Check if there are any errors
  const hasErrors = Object.values(this.errors).some((error) => error);

  if (hasErrors) {
    alert("문의 제목과 내용을 입력하시고, 답변을 위해 수신동의를 체크해 주세요.");
    return;
  }

  try {
    let formData = new FormData();
    const fileInput = document.getElementById("files");

    // Append files or add an empty file if no files are selected
    if (fileInput.files.length > 0) {
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append("inquiryFile", fileInput.files[i]);
      }
    } else {
      // Add an empty file or some placeholder value if no files are selected
     formData.append("inquiryFile", "null");
    }

    const inquiryRequestDto = {
      type: this.inquiryRequestDto.type,
      inquiryTitle: this.inquiryRequestDto.inquiryTitle,
      inquiryContent: this.inquiryRequestDto.inquiryContent,
    };
    formData.append("inquiryRequestDto", new Blob([JSON.stringify(inquiryRequestDto)], { type: "application/json" }));

    // Send request
    const response = await axios.post("/api/inquiry/create", formData, {
      headers: {
        Authorization: sessionStorage.getItem("authorization"),
        RefreshToken: sessionStorage.getItem("refreshToken"),
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    });
    this.requestData = response.data.data;

    // Clear the form after successful submission
    this.inquiryRequestDto.type = "";
    this.inquiryRequestDto.inquiryTitle = "";
    this.inquiryRequestDto.inquiryContent = "";
    this.agreementChecked = false;
    fileInput.value = ""; // Clear file input

    // Show success message and redirect
    alert("문의가 전송되었습니다");
    location.href = "/mypage?name=inqury";

  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
  }
}
}

};
</script>
<style>
.error-border {
  border-color: red;
}

textarea::placeholder {
  color: #ddd;
}
</style>
