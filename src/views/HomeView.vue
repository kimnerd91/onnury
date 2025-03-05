<template>
  <div class="d-flex popUpBox">
    <Popup :isVisible="showPopup1" @close="showPopup1 = false" popupId="popup1">
     <a :href="'/noticeDetail?id='+ 13">
      <img src="../assets/img/popUp/popUp2.jpg" alt="">
      </a>
    
    </Popup>
    <Popup :isVisible="showPopup2" @close="showPopup2 = false" popupId="popup2">
       <a :href="'/noticeDetail?id='+ 14">
      <img src="../assets/img/popUp/popUp1.jpg" alt="">
      </a>
    </Popup>
  </div>


  <section class="section-hero next" v-if="bannerList.length > 0">
    <swiper
      :loop="true"
      :pagination="{
        clickable: true,
        type: 'fraction',
      }"
      :keyboard="{
        enabled: true,
      }"
      :centeredSlides="false"
      :slidesPerGroupSkip="1"
      :grabCursor="true"
      :navigation="true"
      :spaceBetween="20"
      :breakpoints="breakpoints3"
      :autoplay="true"
      :speed="500"
      :modules="modules"
      class="mySwiper cr-slider slim"
    >
      <swiper-slide v-for="(item, i) in bannerList" :key="i">
        <div class="cr-hero-banner webBanner">
          <a :href="item.linkUrl">
            <img :src="webbannerList[i].imgUrl" alt="" />
          </a>
        </div>
        <div class="cr-hero-banner mobileBanner">
          <a
            :href="item.linkUrl"
            style="background-size: contain; background-repeat: no-repeat"
            :style="{ backgroundImage: 'url(' + appbannerList[i].imgUrl + ')' }"
          >
          </a>
        </div>
      </swiper-slide>
    </swiper>
  </section>

  <!-- Services -->
  <section class="section-services">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="cr-services-border">
            <div class="swiper-container">
              <swiper
                :loop="true"
                :navigation="true"
                :spaceBetween="24"
                :slidesPerView="5"
                :modules="modules"
                :breakpoints="{
                  1399: { slidesPerView: 5, spaceBetween: 24 },
                  1028: { slidesPerView: 5, spaceBetween: 24 },
                  480: { slidesPerView: 5, spaceBetween: 24 },
                  0: { slidesPerView: 5, spaceBetween: 10 },
                }"
                :autoplay="{
                  delay: 2500,
                  disableOnInteraction: false,
                }"
                :speed="500"
                class="mySwiper cr-service-slider"
              >
                <swiper-slide v-for="(item, i) in oneDepthList" :key="i">
                  <div>
                    <div class="cr-services">
                      <div
                        class="cr-services-image"
                        style="padding-top: 60px; border: 1px"
                      >
                        <router-link
                          :to="{
                            name: 'upProductList',
                            query: { id: item.categoryId, name: item.categoryName },
                          }"
                        >
                          <img :src="item.imgUrl" alt="" />
                        </router-link>
                      </div>
                      <div
                        class="cr-services-contain"
                        style="padding-top: 10px; padding-bottom: 20px"
                      >
                        <h4>{{ item.categoryName }}</h4>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Product Default Style -->
  <section class="section-products weekly">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-50">
            <div class="cr-banner">
              <h2>
                온누리가전몰
                <span style="color: #e37226 !important; font-weight: bold">BEST</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-minus-24">
        <div
          class="col-lg-12 col-12 cr-product-box mb-24 d-flex flex-wrap gap-1 justify-content-between"
        >
          <div class="swiper-container">
            <swiper
              class="swiper-wrapper mySwiper"
              :loop="true"
              :navigation="true"
              :modules="modules"
              :breakpoints="{
                1399: { slidesPerView: 4, spaceBetween: 24 },
                1028: { slidesPerView: 4, spaceBetween: 24 },
                480: { slidesPerView: 2, spaceBetween: 24 },
                0: { slidesPerView: 2, spaceBetween: 10 },
              }"
            >
              <swiper-slide
                v-for="(item, i) in weeklyProductsBest"
                :key="i"
                class="cr-product-card"
              >
                <a :href="'productDetail?id=' + item.productId">
                  <div class="cr-product-image">
                    <div class="cr-image-inner">
                      <a :href="'productDetail?id=' + item.productId" class="title">
                        <img :src="item.mediaList[0].imgUrl" alt="product-1" />
                      </a>
                    </div>
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
                  <div class="cr-product-details">
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
                        >{{ item.sellPrice.toLocaleString() }}원</span
                      >
                      <span class="new-price percent" style="margin-left: 5px"
                        >{{
                          Math.ceil(
                            ((item.normalPrice - item.sellPrice) / item.normalPrice) * 100
                          )
                        }}%<i class="fa-solid fa-caret-down"></i
                      ></span>
                    </p>
                  </div>
                  <div class="labelSpanDiv">
                    <span v-if="0 > item.deliveryPrice">무료배송</span>
                    <span v-for="(label, k) in item.labelList" :key="k">
                      {{ label.labelTitle }}
                    </span>
                  </div>
                </a>
              </swiper-slide>
            </swiper>
            <div class="swiper-button-prev2"></div>
            <div class="swiper-button-next2"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Deal -->
  <section class="section-deal">
    <div class="bg-banner-deal">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="swiper-container">
              <div class="swiper-container">
                <swiper
                  :slidesPerView="2"
                  :loop="true"
                  :spaceBetween="20"
                  :navigation="true"
                  :speed="500"
                  :modules="modules"
                  :breakpoints="breakpoints6"
                  :autoplay="true"
                  class="swiper-wrapper mySwiper"
                  style="height: 300px"
                >
                  <swiper-slide v-for="(item, i) in bannerList" :key="i">
                    <a
                      :href="item.linkUrl"
                      style="position: absolute; width: 100%; height: 100%; top: 0"
                    >
                      <div class="cr-hero-banner cr-banner-image-two webBanner">
                        <img :src="banner3List[i].imgUrl" alt="" />
                      </div>
                      <div class="cr-hero-banner cr-banner-image-two mobileBanner">
                        <img :src="banner3List[i].imgUrl" alt="" />
                      </div>
                    </a>
                  </swiper-slide>
                </swiper>
                <div class="swiper-button-prev2"></div>
                <div class="swiper-button-next2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Popular product -->
  <section class="section-products weekly" style="padding-top: 50px">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-50">
            <div class="cr-banner">
              <h2>신상품</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-minus-24">
        <div
          class="col-lg-12 col-12 cr-product-box mb-24 d-flex flex-wrap gap-1 justify-content-between"
        >
          <div
            class="cr-product-card col-xxl-3 col-xl-3 col-lg-3 col-6"
            v-for="(item, i) in newProductList"
            :key="i"
          >
            <a :href="'productDetail?id=' + item.productId">
              <div class="cr-product-image">
                <div class="cr-image-inner">
                  <a :href="'productDetail?id=' + item.productId" class="title">
                    <img :src="item.mediaList[0].imgUrl" alt="product-1" />
                  </a>
                </div>
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
              <div class="cr-product-details">
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
                    >{{ item.sellPrice.toLocaleString() }}원</span
                  >
                  <span class="new-price percent" style="margin-left: 5px"
                    >{{
                      Math.ceil(
                        ((item.normalPrice - item.sellPrice) / item.normalPrice) * 100
                      )
                    }}%<i class="fa-solid fa-caret-down"></i
                  ></span>
                </p>
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
      </div>
    </div>
  </section>

  <!-- Deal -->
  <section class="section-deal2" style="padding-bottom: 25px">
    <div class="smallOne">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="swiper-container">
              <div class="swiper-container">
                <swiper
                  :loop="true"
                  :slidesPerView="2"
                  :breakpoints="{
                    1399: { slidesPerView: 2, spaceBetween: 24 },
                    1028: { slidesPerView: 2, spaceBetween: 24 },
                    480: { slidesPerView: 1, spaceBetween: 24 },
                    0: { slidesPerView: 1, spaceBetween: 10 },
                  }"
                  :spaceBetween="20"
                  :speed="500"
                  :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }"
                  :autoplay="true"
                  :modules="modules"
                  class="swiper-wrapper mySwiper"
                  style="height: 250px"
                >
                  <swiper-slide
                    v-for="(item, i) in promotionList"
                    :key="i"
                    style="
                      background-position: center;
                      background-size: cover;
                      height: 250px;
                    "
                  >
                    <a
                      :href="item.linkUrl"
                      style="position: absolute; width: 100%; height: 100%; top: 0"
                    >
                      <div class="cr-hero-banner cr-banner-image-two">
                        <img :src="item.bannerImage.imgUrl" alt="" />
                      </div>
                    </a>
                  </swiper-slide>
                </swiper>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Popular product -->
  <section class="section-popular-product-shape paddimg-t-50">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="mb-50">
            <div class="cr-banner">
              <h2>카테고리별 BEST</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="product-content flex-column row mb-minus-24" id="MixItUpDA2FB7">
        <div class="col-xl-12 col-lg-12 col-12 mb-24 cbMenu">
          <div class="row mb-minus-24 sticky">
            <div class="col-lg-12 col-sm-6 col-md-12 cr-product-box mb-24">
              <div class="cr-product-tabs">
                <ul class="d-flex flex-row gap-2">
                  <li
                    v-for="(item, i) in oneDepthList"
                    :key="i"
                    :class="{ active: selectedCategoryId === item.categoryId }"
                  >
                    <a href="" @click.prevent="CategoryBestList(item.categoryId)">{{
                      item.categoryName
                    }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-12 col-lg-12 col-12 mb-24">
          <div class="row mb-minus-24">
            <div
              class="mix bakery col-lg-12 col-sm-12 cr-product-box mb-24 d-flex flex-wrap gap-3"
            >
              <div
                class="cr-product-card col-xxl-3 col-xl-3 col-6"
                v-for="(item, i) in filteredProductsBest"
                :key="i"
              >
                <a :href="'productDetail?id=' + item.productId">
                  <div class="cr-product-image">
                    <div class="cr-image-inner zoom-image-hover">
                      <img :src="item.mediaList[0].imgUrl" alt="product-1" />
                    </div>
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
                  <div class="cr-product-details">
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
                        >{{ item.sellPrice.toLocaleString() }}원</span
                      >
                      <span class="new-price percent" style="margin-left: 5px"
                        >{{
                          Math.ceil(
                            ((item.normalPrice - item.sellPrice) / item.normalPrice) * 100
                          )
                        }}%<i class="fa-solid fa-caret-down"></i
                      ></span>
                    </p>
                  </div>
                  <div class="labelSpanDiv">
                    <span v-if="0 > item.deliveryPrice">무료배송</span>
                    <span v-for="(label, k) in item.labelList" :key="k">
                      {{ label.labelTitle }}
                    </span>
                  </div>
                </a>
              </div>
              <div class="col-12">
                <div
                  class="d-flex justify-content-center align-items-center totheDepth 채"
                >
                  <a
                    v-if="selectedCategoryId"
                    :href="`/upProductList?id=${selectedCategoryId}&name=${selectedCategoryName}`"
                  >
                    <button
                      type="button"
                      class="d-flex align-items-center justify-content-center gap-1"
                    >
                      상품 전체 보기
                      <i class="fa-solid fa-chevron-right" style="font-size: 12px"></i>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="brandSection" style="padding: 100px 0">
    <div class="container">
      <div class="row">
        <div class="d-flex justify-content-center mb-50 fw-bold">
          <h2 style="font-weight: bold; font-size: 28px">온누리가전몰 브랜드관</h2>
        </div>

        <div class="col-12 d-flex gap-5 brandKwan">
          <div v-for="(item, i) in brands.slice(0, 9)" :key="i" @click="scrollToTop()">
            <a
              :href="'/brand/' + item.brandId"
              @click.prevent="navigateToBrand(item.brandId)"
            >
              <div
                style="width: 100px; height: 100px; margin-bottom: 10px"
                class="d-flex justify-content-center align-items-center"
              >
                <img
                  style="width: 60%"
                  v-if="item.mediaUrl != null"
                  :src="item.mediaUrl"
                  alt=""
                />
                <img src="/src/assets/img/logo/omnuryLOGO2.png" alt="" v-else />
              </div>
              <p
                style="
                  text-align: center;
                  color: #666;
                  font-weight: bold;
                  font-size: 12px;
                "
              >
                {{ item.brandTitle }}
              </p>
            </a>
          </div>

          <div>
            <div
              style="
                border-radius: 100%;
                border: none;
                width: 100px;
                height: 100px;
                margin-bottom: 10px;
              "
              class="d-flex justify-content-center align-items-center allbrand"
            >
              <div
                style="
                  background-color: #eee;
                  border-radius: 100%;
                  width: 60%;
                  height: 60%;
                "
                class="d-flex align-items-center justify-content-center"
              >
                <button
                  type="button"
                  class="btn btn-primary brandBtn"
                  data-bs-toggle="modal"
                  data-bs-target="#brand"
                >
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>
            </div>
            <p
              class="allbrandP"
              style="text-align: center; color: #666; font-weight: bold; font-size: 12px"
            >
              전체보기
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Model -->

  <div
    class="modal fade"
    id="brand"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog brandModal modal-dialog-centered" style="max-width: 960px">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">브랜드관</h1>
          <button
            type="button"
            class="btn-close position-absolute"
            data-bs-dismiss="modal"
            aria-label="Close"
            style="right: 15px"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="gap-2">
            <li class="col-2 d-flex flex-column" v-for="(item, i) in brands" :key="i">
              <a :href="'/brand?&id=' + item.brandId">
                <img
                  style="width: 60%"
                  v-if="this.brandsLogo != null"
                  :src="item.mediaUrl"
                  alt=""
                />
                <img src="/src/assets/img/logo/omnuryLOGO2.png" alt="" v-else />
              </a>
              <p>{{ item.brandTitle }}</p>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

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
                    <span class="new-price"
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
import Popup from "./Popup.vue";
import { ref } from "vue";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/swiper-bundle.css";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import {
  Keyboard,
  FreeMode,
  Navigation,
  Thumbs,
  Pagination,
  Autoplay,
} from "swiper/modules";
export default {
  components: {
    Swiper,
    SwiperSlide,
     Popup,
  },
  data() {
    return {
     showPopup1: false,
      showPopup2: false,
      brands: [],
      bannerList: [],
      promotionList: [],
      webbannerList: [],
      appbannerList: [],
      banner3List: [],
      oneDepthList: [],
      newProductList: [],
      filteredProducts: [],
      CategoryBest: [],
      filteredProductsBest: [],
      weeklyProductsBest: [],
      selectedCategory: null,
      selectedCategoryName: "",
      breakpoints: {
        1399: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
        1028: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
        480: {
          slidesPerView: 5,
          spaceBetween: 5,
        },
        0: {
          slidesPerView: 5,
          spaceBetween: 5,
        },
      },
      breakpoints2: {
        1399: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1028: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      },
      breakpoints3: {
        1399: {
          slidesPerView: 2.1,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        1028: {
          slidesPerView: 2.1,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        691: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 10,
        },
      },
      breakpoints4: {
        1399: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        1028: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        0: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
      },
      breakpoints5: {
        1399: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        1028: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
      },
      breakpoints6: {
        1399: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1028: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
      },
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
      categoryBestId: 9,
      selectedCategoryId: null,
      brandsLogo: this.brandsLogo,
    };
  },
  computed: {
    filteredProductList() {
      if (!this.selectedCategory) {
        return this.newProductList;
      }
      return this.newProductList.filter(
        (item) => item.categoryName === this.selectedCategory
      );
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
      modules: [Keyboard, Navigation, Thumbs, Pagination, Autoplay],
    };
  },
  mounted() {
   // Check if Popup 1 should be shown
    const popup1HiddenUntil = localStorage.getItem('popupHiddenUntil_1');
    const now = new Date().getTime();

    if (!popup1HiddenUntil || now >= parseInt(popup1HiddenUntil, 10)) {
      const authorization = sessionStorage.getItem('authorization');
      const loginId = sessionStorage.getItem('loginId');
      const refreshToken = sessionStorage.getItem('refreshToken');

      if (authorization && loginId && refreshToken) {
        this.showPopup1 = true;
      }
    }

    // Check if Popup 2 should be shown
    const popup2HiddenUntil = localStorage.getItem('popupHiddenUntil_2');

    if (!popup2HiddenUntil || now >= parseInt(popup2HiddenUntil, 10)) {
      const authorization = sessionStorage.getItem('authorization');
      const loginId = sessionStorage.getItem('loginId');
      const refreshToken = sessionStorage.getItem('refreshToken');

      if (authorization && loginId && refreshToken) {
        this.showPopup2 = true;
      }
    }
    
    this.tokench();
    if (
      sessionStorage.getItem("loginId") != null ||
      sessionStorage.getItem("loginId") != undefined
    ) {
      this.bannerListUp();
      this.oneDepthListUp();
      this.newProductListUp();
      this.weeklyBestList();
      this.BrandList();
      this.promotionListUp();
    }
  },
  watch: {
    $route(to, from) {
      this.$forceUpdate(); // 강제로 컴포넌트를 다시 렌더링
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    },
    tokench() {
      let url = document.location.href;

      let query = window.location.search;
      let param = new URLSearchParams(query);
      let token = param.get("token");

      if (token != undefined) {
        sessionStorage.setItem("token", token);
      } else {
        axios
          .get("/api/link/EncCode", { params: { data: "C직접입력" } })
          .then((res) => {
            sessionStorage.setItem("token", res.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    navigateToBrand(brandId) {
      // Handle navigation to brand page here, e.g., using Vue Router
      // Example:
      this.$router.push(`/brand?id=${brandId}`);
    },

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
          this.brands = response.data.data;
          this.brandsLogo = this.brands.map((product) => product.mediaUrl);
          this.brandsLogo = this.brandsLogo[0];
        }
      } catch (error) {
        // 에러 처리
      }
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

          // Reset the option price and list for the next selection
          this.selectOptionprice = 0;
          this.selectOptionlist = [];

          // Initialize the select boxes to their default state
          this.quikviewInfo.productOptionList.forEach((option) => {
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
    selectproductDelete(i) {
      this.selectProductlist.splice(i, 1);
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
    checkOut() {
      sessionStorage.removeItem("checkoutlist");
      sessionStorage.setItem("checkoutlist", JSON.stringify(this.selectProductlist));
      window.location.href = "/checkOut";
    },
    async bannerListUp() {
      try {
        const response = await axios.get(`/api/banner/mainlist`, {
          params: this.page,
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });

        for (var b = 0; b < response.data.data.bannerList.length; b++) {
          for (var c = 0; c < response.data.data.bannerList[b].bannerImages.length; c++) {
            if (response.data.data.bannerList[b].bannerImages[c].type == "appbanner") {
              this.appbannerList.push(response.data.data.bannerList[b].bannerImages[c]);
            } else if (
              response.data.data.bannerList[b].bannerImages[c].type == "webbanner"
            ) {
              this.webbannerList.push(response.data.data.bannerList[b].bannerImages[c]);
            } else {
              this.banner3List.push(response.data.data.bannerList[b].bannerImages[c]);
            }
          }
        }

        this.bannerList = response.data.data.bannerList;

        this.totalBannerCount = response.data.data.totalBannerCount;
      } catch (error) {
        // console.log("Error checking login ID:", error);
      }
    },
    async promotionListUp() {
      try {
        const response = await axios.get(`/api/banner/promotion/mainlist`, {
          params: this.page,
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });

        this.promo = response.data.data;
        this.totalPBannerCount = response.data.data.totalBannerCount;
        this.promotionList = response.data.data.bannerList;
      } catch (error) {
        // console.log("Error checking login ID:", error);
      }
    },
    async oneDepthListUp() {
      try {
        const response = await axios.get(`/api/category/mainlist`, {});

        this.oneDepthList = response.data.data;

        this.CategoryBestList(this.oneDepthList[0].categoryId);
      } catch (error) {
        // console.log("Error checking login ID:", error);
      }
    },
    async newProductListUp() {
      try {
        const response = await axios.get("/api/product/newrelease", {
          headers: {
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });
        this.newProductList = response.data.data;
        this.NPLCategory = this.newProductList.map((product) => product.upCategory);
        // Initially, display all products
        this.filteredProducts = this.newProductList;
      } catch (error) {
        // console.log("Error checking login ID:", error);
      }
    },
    async CategoryBestList(id) {
      try {
        const response = await axios.get("/api/product/category/best", {
          params: {
            categoryId: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });
        this.selectedCategoryId = id;
        for (var i = 0; i < this.oneDepthList.length; i++) {
          if (this.oneDepthList[i].categoryId == id) {
            this.selectedCategoryName = this.oneDepthList[i].categoryName;
          }
        }
        this.filteredProductsBest = response.data.data;
        this.fpbUpCategoryID = this.filteredProductsBest.upCategoryId;
        this.fpbMdCategoryID = this.filteredProductsBest.middleCategoryId;
      } catch (error) {
        // console.log("Error fetching category best products:", error);
      }
    },
    async weeklyBestList() {
      try {
        const response = await axios.get("/api/product/weekly/best", {
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionStorage.getItem("authorization"),
            RefreshToken: sessionStorage.getItem("refreshToken"),
          },
        });

        this.weeklyProductsBest = response.data.data;
      } catch (error) {
        // console.log("Error fetching category best products:", error);
      }
    },
    formatPrice(value) {
      if (value == null) {
        return "";
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
<style></style>
