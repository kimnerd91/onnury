<template>
  <footer class="footer padding-t-0 bg-off-white">
    <div class="container">
      <div class="row footer-top padding-b-20 d-flex flex-column justify-content-start gap-1">
        <div class="col-xl-12 col-lg-12 col-sm-12 col-12 ssm-footer-border cfb1">
          <div class="ssm-footer">
            <ul class="ssm-footer-links ssm-footer-dropdown d-flex gap-3 footerMenu">
              <li>
                <a href="faqList?active=2">
                  <button type="button">공지사항</button>
                </a>
              </li>
              <li><a href="contactUs">문의하기</a></li>
              <li>
                <a href="faqList?active=1">
                  <button type="button">FAQ</button>
                </a>
              </li>
              <li>
                <a href="TermsPolicy?id=iyong">
                  <button type="button">이용약관</button>
                </a>
              </li>
              <li>
                <a href="TermsPolicy?id=gaein">
                  <button type="button">개인정보처리방침</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-xl-12 col-lg-12 col-sm-12 col-12 cr-footer-border cfb2">
          <div class="cr-footer-logo">
            <div class="image">
              <img src="@/assets/img/logo/onnuryLOGO0.png" alt="logo" class="logo" />
              <img src="@/assets/img/logo/dark-logo.png" alt="logo" class="dark-logo" />
            </div>
          </div>
          <div class="cr-footer">
            <h4 class="cr-sub-title cr-title-hidden">
              Contact us
              <span class="cr-heading-res"></span>
            </h4>
            <ul class="cr-footer-links cr-footer-dropdown flex-column footerInfo">
              <li>
                상호명 : 주식회사 디앤티 | 경기도 김포시 김포한강10로 133번길 107, 7층 772호
                (구래동,디원시티시그니쳐)
              </li>
              <li>
                사업자등록번호 : 820-86-00989 | 통신판매업신고번호 : 2019-경기김포-1396호
              </li>
              <li>
                대표이사 : 유창용 | 전화번호 : 1670-2024 | 이메일 : dntinfo@naver.com
              </li>
            </ul>
            <div>
             <p style="font-size: 10px">
                (주)디앤티는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품,
                상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다 <br />
                본 사이트의 컨텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포 등을
                금합니다.
              </p>
              <p style="margin-top: 10px">COPYRIGHT © DNT LTD. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    return {
      currentRoute: route,
    };
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>
