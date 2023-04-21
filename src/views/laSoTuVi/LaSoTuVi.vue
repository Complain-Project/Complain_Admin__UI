<template>
  <div id="la-so-tu-vi" class="!p-5">
    <section class="action">
      <el-row class="action-wrap">
          <el-col :span="24" class="action-wrap--col">
              <Breadcrumb/>
          </el-col>
      </el-row>
    </section>
    <div v-loading="loading">
        <table border="1" width="600px" v-if="thien_ban && tuan_triet && dia_ban.length > 0">
              <tr>
                  <td cung-id="5" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[5]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[5]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[5]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[5]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[5]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[5]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[5]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[5]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[5]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-bottom-0 txt-sub-content-la-so ml-1"><span id="5">{{thien_ban?.xung_quanh[5]}}</span></div>
                      </div>
                  </td>
                  <td cung-id="6" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[6]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[6]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[6]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[6]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[6]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[6]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[6]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[6]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[6]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-bottom txt-sub-content-la-so"><span id="6">{{thien_ban?.xung_quanh[6]}}</span></div>
                      </div>
                  </td>
                  <td cung-id="7" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[7]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[7]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[7]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[7]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[7]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[7]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[7]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[7]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[7]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-bottom txt-sub-content-la-so"><span id="7">{{thien_ban?.xung_quanh[7]}}</span></div>
                      </div>
                  </td>
                  <td cung-id="8" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[8]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[8]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[8]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[8]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[8]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[8]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[8]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[8]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[8]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-bottom-3 txt-sub-content-la-so"><span id="8">{{thien_ban?.xung_quanh[8]}}</span></div>
                      </div>
                  </td>
              </tr>
              <tr>
                  <td cung-id="4" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[4]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[4]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[4]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[4]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[4]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[4]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[4]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[4]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[4]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-mid-0 txt-sub-content-la-so"><span id="4">{{thien_ban?.xung_quanh[4]}}</span></div>
                      </div>
                  </td>
                  <td colspan="2" rowspan="2" class="cung">
                      <div class="info">
                          <div class="header">
                              <h3>Trang tử vi cổ học hàng đầu Việt Nam</h3>
                              <p>{{website}}</p>
                          </div>
                          <div class="personal-info">
                              <h3 class="name !text-xl">{{ thien_ban.thong_tin.ho_ten }}</h3>
                              <div class="dob">
                                  <div class="year">
                                      <div class="font-bold">Năm</div>
                                      <div>{{ thien_ban.thong_tin.lich_duong.nam }}</div>
                                      <div>{{ thien_ban.thong_tin.lich_am_so.nam }}</div>
                                      <div>{{ thien_ban.thong_tin.lich_am_chu.nam }}</div>
                                  </div>
                                  <div class="month">
                                      <div class="font-bold">Tháng</div>
                                      <div>{{ thien_ban.thong_tin.lich_duong.thang }}</div>
                                      <div>{{ thien_ban.thong_tin.lich_am_so.thang }}</div>
                                      <div>{{ thien_ban.thong_tin.lich_am_chu.thang }}</div>
                                  </div>
                                  <div class="day">
                                      <div class="font-bold">Ngày</div>
                                      <div>{{ thien_ban.thong_tin.lich_duong.ngay }}</div>
                                      <div>{{ thien_ban.thong_tin.lich_am_so.ngay }}</div>
                                      <div>{{ thien_ban.thong_tin.lich_am_chu.ngay }}</div>
                                  </div>
                                  <div class="hours">
                                      <div class="font-bold">Giờ</div>
                                      <div>{{ thien_ban.thong_tin.lich_duong.gio }}</div>
                                      <div>{{ thien_ban.thong_tin.lich_am_so.gio }}</div>
                                      <div>{{ thien_ban.thong_tin.lich_am_chu.gio }}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </td>
                  <td cung-id="9" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[9]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[9]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[9]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[9]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[9]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[9]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[9]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[9]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[9]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-mid txt-sub-content-la-so"><span id="9">{{thien_ban?.xung_quanh[9]}}</span></div>
                      </div>
                  </td>
              </tr>
              <tr>
                  <td cung-id="3" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[3]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[3]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[3]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[3]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[3]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[3]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[3]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[3]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[3]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-mid-0 txt-sub-content-la-so"><span id="3">{{thien_ban?.xung_quanh[3]}}</span></div>
                      </div>
                  </td>
                  <td cung-id="10" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[10]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[10]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[10]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[10]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[10]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[10]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[10]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[10]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[10]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-mid txt-sub-content-la-so"><span id="10">{{thien_ban?.xung_quanh[10]}}</span></div>
                      </div>
                  </td>
              </tr>
              <tr>
                  <td cung-id="2" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[2]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[2]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[2]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[2]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[2]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[2]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[2]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[2]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[2]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-top-0 txt-sub-content-la-so"><span id="2">{{thien_ban?.xung_quanh[2]}}</span></div>
                      </div>
                  </td>
                  <td cung-id="1" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[1]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[1]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[1]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[1]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[1]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[1]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[1]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[1]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[1]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-top txt-sub-content-la-so"><span id="1">{{thien_ban?.xung_quanh[1]}}</span></div>
                      </div>
                  </td>
                  <td cung-id="0" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[0]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[0]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[0]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[0]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                                  <!-- <div class="txt-bold" style="color: #ffa000">Địa Giải</div>
                                  <div style="color: #000000">Lộc Tồn</div>
                                  <div style="color: #000000">Thiên Quan</div>
                                  <div style="color: #ff0000">Nguyệt Đức</div>
                                  <div style="color: #ff0000">Bác Sỹ</div>
                                  <div style="color: #000000">L.Thiên Việt</div>
                                  <div style="color: #ffa000">L.Thiên Mã</div>
                                  <div style="color: #ffa000">Hóa Quyền</div> -->
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[0]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                                  <!-- <div>Địa Không (Đ)</div>
                                  <div class="txt-bold">Địa Kiếp</div>
                                  <div>Kiếp Sát</div>
                                  <div class="txt-bold" style="color: #009130">Phá Toái</div>
                                  <div>Tử Phù</div>
                                  <div>L.Tang Môn</div> -->
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[0]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                              <!-- <p class="txt-sub-content">
                                <span>Hóa Lộc </span>
                                <span>- Phúc Đức</span>
                              </p>
                              <p class="txt-sub-content">
                                <span>Hóa Lộc </span>
                                <span>- Phúc Đức</span>
                              </p>
                              <p class="txt-sub-content">
                                <span>Hóa Lộc </span>
                                <span>- Phúc Đức</span>
                              </p>
                              <p>
                                <span>Hóa Lộc </span>
                                <span>- Phúc Đức</span>
                              </p> -->
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[0]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[0]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[0]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-top txt-sub-content-la-so"><span id="0">{{thien_ban?.xung_quanh[0]}}</span></div>
                      </div>
                  </td>
                  <td cung-id="11" class="cung">
                      <div class="cung-view">
                          <div class="cung-top">
                              <div class="cung-top-left">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[11]['cung_top'].left" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-center">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[11]['cung_top'].center" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                              <div class="cung-top-right">
                                  <p :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[11]['cung_top'].right" :key="obj?.code">{{ obj?.name_vi }}</p>
                              </div>
                          </div>
                          <div class="cung-middle">
                              <div class="cung-middle-left">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[11]['cung_middle'].left" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                              <div class="cung-middle-right">
                                  <div :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[11]['cung_middle'].right" :key="obj?.code">{{ obj?.name_vi }}</div>
                              </div>
                          </div>
                          <div class="cung-middle-tu-hoa-phai">
                              <p class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[11]['cung_middle-tu_hoa_phai']" :key="obj?.code">
                                  <span>{{ obj?.name_vi }}</span>
                              </p>
                          </div>
                          <div class="cung-bottom">
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[11]['cung_bottom'].left" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[11]['cung_bottom'].center" :key="obj?.code">{{ obj?.name_vi }}</span>
                              <span class="txt-sub-content" :style="{textTransform: obj?.style['upper-case']?'uppercase':'', fontWeight: obj?.style['font-weight']?'bold':'normal', color: obj?.style['color'] }" v-for="obj in dia_ban[11]['cung_bottom'].right" :key="obj?.code">{{ obj?.name_vi }}</span>
                          </div>
                          <div class="khoi-tieu-han-top-3 txt-sub-content-la-so"><span id="11">{{thien_ban?.xung_quanh[11]}}</span></div>
                      </div>
                  </td>
              </tr>
          </table>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue";
import { onMounted, ref } from "vue";
import { Mutations } from "@/store/enums/_type_enum";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import api from "@/utils/services/_api_service";
import _ from "lodash";
import { ElMessage } from "element-plus";

export default {
    name: "LaSoTuVi",
    components: {
        Breadcrumb
    },
    setup(){
        const store = useStore()
        const route = useRoute()
        const idUser = ref("")
        const thien_ban = ref("")
        const tuan_triet = ref("")
        const dia_ban = ref([])
        const loading = ref(false)
        const website = ref("")

        onMounted(() => {
            store.commit(`layoutModule/${Mutations.SET_ACTIVE_MENU}`, 4)
            store.commit(`homeModule/${Mutations.SET_BREADCRUMB}`, [
                {
                    path: '/',
                    name: 'Trang Chủ',
                },
                {
                    path: '/customers',
                    name: 'Danh sách khách hàng',
                    icon: ''
                },
                {
                    path: '/customer/' + route.params.idUser,
                    name: 'Chi tiết khách hàng',
                    icon: ''
                },
                {
                    path: window.location.pathname,
                    name: 'Chi tiết lá số',
                    icon: 'el-icon-shopping-cart-2'
                }
            ])
            detailLaSo()
            website.value = process.env.VUE_APP_WEB_URL
        })

        const detailLaSo = () => {
            loading.value = true
            api.detailLaSo(route.params.idLaSo).then((res) => {
                thien_ban.value = _.get(res,'data.data.thien_ban', "")
                tuan_triet.value = _.get(res,'data.data.tuan_triet', "")
                dia_ban.value = _.get(res,'data.data.dia_ban', [])
                loading.value = false
            }).catch(() => {
                ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau.')
            })
        }

        return {
            idUser,
            thien_ban,
            dia_ban,
            tuan_triet,
            loading,
            website,
            detailLaSo
        }
    }
  }
</script>

<style scoped lang="scss">
@import '@/assets/styles/scss/la-so-tu-vi/la-so-tu-vi.scss';
</style>
