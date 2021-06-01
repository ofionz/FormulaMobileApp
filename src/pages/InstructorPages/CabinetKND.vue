<template>
  <div :class="$style.container" class="q-px-md">
    <ui-page-title
      :class="$style.title"
      @backward="$router.go(-1)"
      title="КНД"
    >
    </ui-page-title>
    <div v-for="(document, index) in documents" :key="index">
      <div class="flex" :class="$style.header">
        <span :class="$style.header_text">{{document.name}}</span>
        <UiIcon
          @click="openPopup (document)"
          :class="$style.header_icon"
          :color-inheritance="true"
          :em-size="false"
          name="photo"
        />
      </div>
      <q-input
        v-model="document.state"
        :error="document.inputType === 'date'&&!(document.photo&&document.state)|| document.inputType === 'checker'&&!document.photo"
        label-slot
        input-style = "font-weight: 500"
        :mask="document.inputType==='date'?'##.##.####':''"
        :readonly = 'document.inputType==="checker"'
        class="input"
      >
        <template v-slot:label>
          <div v-if= "document.inputType === 'date'" class="row items-center all-pointer-events input_label">
            Срок до
          </div>
          <div v-else-if= "document.inputType === 'checker' && !document.photo" style="color: black" class="row items-center all-pointer-events">
           Нет
          </div>
          <div v-else-if= "document.inputType === 'checker' && document.photo" style="color: black" class="row items-center all-pointer-events">
            Есть
          </div>
        </template>

      </q-input>
    </div>
    <div class="q-pb-xl"> </div>
    <UiPopUp @close="closePopup" :visible="isPopupVisible">
      <template #label>
        Фото
      </template>
      <template #content>
        <img v-if= 'currentDocument && currentDocument.photo' :class="$style.photo" class="q-mt-lg" :src="currentDocument.photo" />
        <UiPopUp @close="closeCropper" :visible="isCropperVisible">
          <template #label>
          Обрежьте фото
        </template>
          <template #content>
            <ui-cropper
              class="q-mt-lg q-pt-sm"
              :upload-handler="cropperHandler"
              :photo="imageSrc"
              @submit="closeCropper"
              @cancel="closeCropper"
              :output-options="outoptions"
              :output-quality="0.7"
              :cropper-options="{
                aspectRatio: 1,
                guides: false,
                center: false,
                movable: false,
                zoomable: false,
                viewMode: 3
              }"
            >
            </ui-cropper>
          </template>
        </UiPopUp>
        <div class="q-my-lg">
          <UiButton
            @click="getPhotoFromCamera"
            theme="background-brand"
            class="q-mb-md"
            >Сделать фото</UiButton
          >
          <UiButton
            @click="getPhotoFromGallery"
            theme="outline-brand"
            class="q-mb-md"
            >Выбрать из галереи</UiButton
          >
        </div>
      </template>
    </UiPopUp>
  </div>
</template>

<script>
import UiPageTitle from "../../components/UiPageTitle";
import UiIcon from "../../components/UiIcon";
import UiPopUp from "../../components/UiPopUp";
import UiButton from "../../components/UiButton";
import UiCropper from "../../components/UiCropper";
export default {
  name: "CabinetKND",
  components: {
    UiPageTitle,
    UiIcon,
    UiPopUp,
    UiButton,
    UiCropper
  },
  data() {
    return {
      documents: [
        {
          name: 'Водительское удостоверение',
          state: '',
          photo: undefined,
          inputType: 'date'
        },
        {
          name: 'Свидетельство инструктора',
          state: '',
          photo: undefined,
          inputType: 'date'
        },
        {
          name: 'Страховой полис',
          state: '',
          photo: undefined,
          inputType: 'date'
        },
        {
          name: 'Диагностическая карта авто',
          state: '',
          photo: undefined,
          inputType: 'checker'
        },
        {
          name: 'Осмотр в ГИБДД',
          state: '',
          photo: undefined,
          inputType: 'checker'
        },
        {
          name: 'Внесение изменений в СТС',
          state: '',
          photo: undefined,
          inputType: 'checker'
        },
        {
          name: 'Осмотр тех. состояния авто',
          state: '',
          photo: undefined,
          inputType: 'checker'
        },
        {
          name: 'Видеооборудование',
          state: '',
          photo: undefined,
          inputType: 'checker'
        },
        {
          name: 'Диплом об образовании',
          state: '',
          photo: undefined,
          inputType: 'checker'
        },
        {
          name: 'Справка о несудимости',
          state: '',
          photo: undefined,
          inputType: 'checker'
        },
        {
          name: 'Справка о не лишении',
          state: '',
          photo: undefined,
          inputType: 'checker'
        },
        {
          name: 'Справка из психдиспансера',
          state: '',
          photo: undefined,
          inputType: 'checker'
        },
        {
          name: 'Справка из наркодиспансера',
          state: '',
          photo: undefined,
          inputType: 'checker'
        },
      ],
      currentDocument: undefined,
      imageSrc: '',
      testphoto:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgBAAEAAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+afBP/CPeCXS2luUuJbh988vl/cqfxOuh+JtSjewvYkutmzzI0+//v1lXmk3OrPLvspkjSB0d2TY7v8A7FcBrc0Wm2vkRxzPdRyb/KkTYiJ/HXzUJ857cv3eljqLbwXPrmvf2feT7NOSPfHJEn7l/wD7PfXqGlWaWdpFbRf6qNNm+uN+GmsS6ppiJdI7yp9z5E2bK7b7ZBHL5Pmxebs/1e/56yrVZ83KdlLk5eclT938lT1w/jDx8nhu/is4IFvLqX78W/Y6Vp+EvG1tr2iPeTv9ne3+Sff8iI9c0oS5bm3toXsb77Gd0eJH/wB+uI8Sa9beCbSWCNE+0S75f3qP87/79bfhvxxpfia4lgspPNlT+D/2euQ+IvgO51a4lv7bY6f3N/z1dGVp8kwlLnheBkbtTuri3iluZfKfZ/y0+R9/9yuo8JXkFr9ljtpV+0b3SeLZ89XPBnguDRzLBMnny28nySSJvR/9tK7JLOKOTekao/8Az02fPRWrQ+yFGlPcx/Enw5k8VWv9oWE8SXWxIpI5fubE+4/yVn+Cfgy1nf29/rNzC8UU/wBojj8vYm//AG9/zvXYIz7/AJH2f9c65nxJb3K3FvqcH2u8uLfZstlk+R6zjiPsmjpRh756D+7/ANKeJ2gijfY7x/62X/b31wP2OTR/GF1Zb7u8W4/e/aZfuJWtc+Pk+1RQf2NLPqTx+a/z/Jv/ANusvTV1DVtTfWdQllgllT57SP7iVE5+4X8ctC/5e2ud17wbZ6tcXVzBczabdXafv/syI6PXUeX5nyf+Q6heNPMrmp1pw+A1lGEzk9e8MvNplvbafItsibN7yJ9/ZXnt54bl0fW7N/7Q+2XDzo/3/uV3F/q2uab4hljktpbjTZPuPbR79iVxWseH9TsdSeeCCV4p33o8uz5P4/uJXdSm/tHmVf7qM3xtZpD8TNXspod9tJJFcJFEn3/ub9lej63qHhC4uNNsp9Mu9WuotlvHHEmyJP8AYT56898eXnk+LvDeuRIyPeWWz50/jT5KzbeTUtauFlspI4LiN0lkff8AcdK9Wp8EGcFOW6Oy8T6TZ+D/ABbvvN76JeJ8kT/6pP8AYrlfH/iGDxVc2un6anm7PuOtWtY8cXN1P/Z+vTreJHs+Ty9lRXXizRrGCJNKtYbd9m932O7/APfdYw5tzo9r7nKin4h3w2em6VFF9ovURIk8r7+/fXdfBy+1X+2/Es+ry/Z4o7VEvpJPv7P+ee/+DfXnFt9t12S41WK8it4rORPLjkkTzfn/ALleteGJk0f4aXs7wXN/calfeVJv+d32U6k/ZxM4cs2N8Q/Ei81iBLHT5UTzEdEttmyK3Tf8mz+/Wl/whN5Z/DTzEdLxruT7RJJG/wDAiVS0r4e6h4b1OLWNW1CLRLJE3vdy7Ef/AHER/vvXR6P4w0eG5tYLbV7HypbV3S1up/uJ/tv/AH3/ALlcfxrQ2jP39Tx/QdFg1i/uLNLmW3td++T7ldP4t0tIfDWnXmmSyvEj+U+9PnjT+/vrovCug+FPEWpPeae0tu8juj22/wCTf/v1jX9vqujvq9nqsLWCXaeVa20n3P8AY2U4S98J8nIep/DTxF4e8ZQabYaNpkujf2bsimu0kT/SH/3P468j1u4dfD2vW1ttt7b95LNJEm97j+5v/wBivXNK1bwv4Rl0mPTNJm8Pak6J9qeWB98sn+w7/JXkepTRX3hzVraSz2XECSyx3Ns/+tTf9x0ro5/3mhxTl7hyfgbx54l8O6ZFZyRSvZXcnyPK+90T/YSvR7C4eN7hPPuYIrtNn+s+/XC+LY3jsNE1zTNvleWifc+49cNquqavqFx5V/eS7EfzX/gRK6JRhW2Muf2cD6x8vy0rkvEPgmDxE9w7Oib0RE8tPufP9+uteTdUfl/J8leL78D2/dmUNH0Wz0mCOKCBIP4H/wBuvHfEPhvxBN4/ley853R96b3+4leh/E7XNQ0Hw5HJp+7zXf8A1kf8CVT+Hviq9k8G3WoPKs16jvvuZZ9n/fddtGMrcxx1pq/szS1XUNH8P/YpdT8qDVpE2faUg37HT76VJf6XZ/ELwe8GjSvbvO+99nyfJv8A468y1i6h8VSump64l48r+b/o0Gzy3/8AiK2/D0lzp2qRQWVzq/2dNmyK2h/dRInyfP8A33rTlM785d8JeGYPhTfXT6vqEUG/eifP99K9Js7qPUIEmgfej/xpXm3x30jUNYj054I57+JH/wBZs+SOu6+HWgy6D4XtbOd2eX77vXJiIL47nXhvjtY1k+Wpf+Wj0TR/vfkSovM8t68s9TmHeX/sPSJ0SlT/AGKe7JH8/wD6LoNCJ9m+mPN8+ynpJu/jqCZfL2J9+gXwAkn99PnqR1/jp6fK+yj5/wCCoD3SnND86fJVV4fM3oj/AD1rP+8T7lV9vl/7H8dFzPqeT+PPCdz4y8JbtPnfUta0Sd3m/d7HeP8Aj2f7leX2zXlxdJc6fugukf8AeWv3H3/7n8dfR+paH9sukvYLma1uo0dI5Ef5N/8Afri9St4r6/kttV0zSde1GODZ5qP5VxLL/t7K+hw2J56fJI8ivh3CfMjyzWy95YRRz6NcQau82+S7k37HT+5sqw+g22j/ANnag9lLPbwbPtVtdvseV/7iJ9/ZXsnhWPSPCl/e+ZB/ZX2SP7Ruub57j5P9x68yvJoNW1LUd+28ilke4/dXXlO/9z+B66o1VP3YHLymt4S8K2c2/WJ9I3xST/JafcSNP9j+/V//AISzWLfXtS0rQJrv7FFvlSKJ9mxErntS8YT6XcJpmn2f+ixImyOR3ld/9+ucv57aGKynstQae9ukf7Unzp5X+x/t1z+ylKfvG8Jw5NC1rGqRappjteT30+rPJ8m+TfEiU11vJtBi0/7HbeUj+b9pjT96/wDsVt2en2ehaDdanc/OiPsjif597/3KpWHjTxTcOiaZEqJ87pFFap9ytImWgsOuTf2nYJeeVolh5flPJbR7/k/v12lt4q0PxNo1vp9zFfT6lpsj/Zbv7+9N/wDHXJPqSeMLfTrO5nitNRefyppNn8H9+uq1Kx0/wncRaTpnnQRSun2q5uX+f/8AYrGryRJiemTfEbw5rHhx/D1tZ6zPcS3qRSXMqI770/jRK82uVgs/Dut+a815eyJKkVtEmxLRP77v/HXsWpeNn1jwq+h6H5ur3Tzo76hp9r5SW6J9/e6J8715Hf6bL/wjOty208NxKiXEV1bSP5Usfz/f2fx04GVTk6lHwfo+k3Hhd9I0rVl1u9uE3vab9mx/9jelYmseGbmbW3ttVtvsu/8A1n2T97s/4BWd4G1r/hG7BdTkeH7Un+rT+P8A4HWzafGyXWNMubPULNZ7p3d/3c3lQ/f/ALmze/8A33WihLmmyOeHIj3F28lXd32Rom/zJP4Kq2euWd4m+K6hdN+xPLf7715VpuveJbyWKCSdfNd3l8uT5P3af36zfB8M/wDbdxJClpPqX2pEjjV/kjT+OX+5WHsT044hHtepNYf2a6ah9n+zunz+b9yvFNb+L1t4b1R9M0OytH0mN/8Aln/y0qX42eIrnUrxNAtntLjfs2PE/wA6P/Hvo+HXwbvdenVLOz+0bP8AX30qbLe3T+N97/3K7MPh1ye8cmIrOcvdLtz42l8dWtvbWejvpMrv/wAfUn8H+5Umt+KvGPhvTE0ezsooNif8fSfff/br6M8GeCdG8C+D9XSefT9btbx/KTXLZP3tun9x9/z/AH0/v1veKtN0b4leC9Jtp5Lmz063k2Wv2SD7RNcJH8jv/sJ89dPsaZz80z4o8NfFrWfBN3s1OCa8t3/5ZSvs/wCB1794J8YW3jDR7e9jia38z7kUr/PWL8VP2fbnw74e/tl5bbVtId0RPM3o/wA7/J/n5K8Z8EyXPgnxrss7OTUrj7kEXmOmxHrnr4eE0bUa04dT0Hxn8VL/AEm8ltrZ7aK3eTYmoR/vdn99Nn9+rVz8VoNLiuIkRruW0jT95J8jyyv/ALFZviTwrPr2pS6hFBp+m6dv83dfSf6x/wC/srO/trQLzXtEs4tT+2Xu94pJbaDyonSuH2FOa+A7Pay7nX6D8WtK1N5f7Qkh01E2IjSyfPI/+xXfw3CXluksUu9H+5JXlU3g3w62v2FtZ3ls97BA/l20v73fXeeGJtVa0eLVYLaCVPuSWz/I6f7lcGIhBfCd+HnPZms8P/AP+mm+qF/rFtpt5b207ujzvsj+T5KNe8RafoKRPfyMiP8Ack2b64b/AISaz+Id/caVp7JM7xv9l3psfen8bu9c9KlOZ0zqwgdAniiePV5Un8mDTk3+XH/y1l/262dK1y21iJ3tnZ3R9j+YmzZXiuj/AAx8Sw6ta3M7JsSdHnf7Uj7E/wC+66fWPjBpWhzva6fbJPceZ+8l2fJXTVwvSBz08R1keqp+8T79RPvXf8lYvgy4mvtIS8ubyK8ln/e/uk+RP9hK2vuf7715/JyHX8ZnarG7abcJGj7/AC32eW9fPWm+H7261G3s4NGu/wC3EvfNnunf5Nn9yvZ/iXeXNj4e320rwO77HkRPn2Vwfga8v7fxFK+k3jz2qI/mS3abE/4HsevVwc3Cm2ebiY+8dA8M+m+MbbVbyzjvLC8g+z3lrLHv2f76f3Kz9Y+GOp3F3FPGtpPa38jxbNM/1Uafwb/kRErrLDSX0/VJUsLa2t7V5IvIe0kd3kT+N9m9/wCOuO1K3dtcW2svFjaJ+83/ANmSP9x66IT5tEc+5Jr3w/1PwfoOpag+p209lZpsj2P87u//AACvKb+aykey/syzlgkRE8zzX373r1rxhcX914Gt7a5vbTUklvpYnltv9hPkR/8AbrhNEs38VaJFpTvaW628zu8iR/6RJXZT92neZhyLnOk8T28TeFdEeKCNIop/9KVv79dZZ3VtDpNr/Y0VtcfwOu/ZsT+OsL4b69o3huXVtN1meJ0+5uuYN6PVvxVoukWsdh4o0hPsaX+9I4nfYkfyff2I/wD45XDJc3xHRF8hznjbT7LwvrdrqelahbRXCP5rp5n/AKAla1j4l0Pxt4VvftTvH4gif938/wDrPn/8frG8O/Be/wDG88t7BeLBbxpvk+1I+/fWTeR215r1lp9nFEl156RJ5SbNnz7Erq5YTRxy5z6f+F3jh/iNFp2mXOn2OkW+lulvAls7xXD/AO2leTarp7sni25SDZbwfaInubn5Ed/7if33r2v/AISq80Gz02PU/D39jxQbIpNQ0/yniuH+4m9/vpXiGt+XdaRq8l5I/wBlf7W9lHLv2b9/302Vjo53CcP3Z5F4b8B6lNqlvNex/Y7Lej+bL/H/AMASu+8W+B/9Lieztvs7v8j+bHs+T+/V3wHZvfeEriOzuYb+48v5/M2fuv8Ac/jrb03y49Bt7CWCWzjt0+0XVzL/ABv/ALH+xXRUre+ZRo+4ec638WrnUtaS50O22RpHseKWNHrd8Pa9qGrTok/hNHuPv+bp6fvv9/Ynz1037OXwz0Pxtr1vpWsO1v58DyyRxPseR/k+T569Q8T+D/GOm+OdSsPhfbTWeiW6R27yWjxRfOn3/nf53rv9lAw9rUPnjxDY21n4wsntoHs5ZUd54nR0fzP/AGSvqDwH400j4a/C/TX1fR3uotaunl8q1f5ERH/j3vUf7QmreFNH03TdF8X6g15rciea8djapvt/9v8A2P8Agb1x+j+CdfvPAGnXKazFP4PvJE/ev9xPn++/yb0T/geyrjHkNObn3PYfjlNe6X4W/wCEj0Z7SfSLuBIpLbyEfen3/M31nfAHVNV1awl1+8vPI06wtXSO0jjT54vnesPxheTeNvBUqaVFcp4X8Pf8S+O5jk+S8dE+d9n3NnyVT8AQ6n4bt9R1Wws4tbt7B/ss8ds77PK+4/lf7dYS+M3/AOXZ0Nn8Trn4jeAPGH9ueVoOm26b7W+tne3fzfvpGmx97vv/ALn9+vB/h18Pdc8aeMLi/wBMltre3SN7efU9TndE81/v7P43evbfB/wN0rxlcajrkn9oWegxT77W0ufklkTZ9/8A2Ery3wT+0Nrmj+PLWwg0zS4NEe9/s+PT402eVFv2ff8Avv8A3/8Ab31Uo85heBm/E74a+EF1lNMufHE2palb+XElqlk/ku7/AMCOj1yvjn9mPxB4PjlnubCa3t0RP9OR98W96+o/i78J/Cd54jS8sLbULzxZdbHg0+xk2RRP/BJKmz5E/wB/+5XW/GPSfEfjj4QfY9Hs4f7RR0e6ikf5/k/gT/b31PlEJd2fmjZrrGi609lpskz37r5Uj2/3/wDcSvqT4dNqreF7V9Vg8i4RNmyR/nf/AH68l8SaLe/C/wCIdldavE1pe27p9qildHfY/wDuV7r4V1iw8QabLf6e6X8USf39nz/3PuV5mOvUglY9LAe7cztSs7nxEmp2e1ILXy/KR5E++9cl8KPAP/CJ6le6vepv1G3kdIPN+fen9/ZWj4V8SeKbzVtRjvNN36ejv5csqfZ9nz/cT+/WNf8AijxK15cSbPsdunzonkf+Ob3+/Xnw9pD3IHoStPVnRw6tHDrSTvcyzxOjvBbS/OkTv/fT+PZVDXvhTpGvXSTzyxfaPM/efYf4/wDf31WsJk8YaTsgtoYNS3pL9pj+TZ/t/JUtzqVt4JffHeT6lLI/7+JE373/APZKfNUhsX7nU6zw94bs/D9rJDZRukT/AMG+tJ4938FeI+Nvi1qsOpW76Q8tvapH92WPZ89dp8KPHV74sg8meB3+yx/v7t3++/8A3xWFXD1OT2hca0XLkR1uqxoum3W+JHRI3fy3r56OvTR/Yr9NUtt893+80qKPYiJ/t19Af2xH/a19Z3MaQW8UfmpI7/6xP46ztN8M+H7yRNVs9Mh3P86XPl7K1w9WFGHvk1aftvhOUm+Iiab4juHis5Z4kRE81PkrhX8L6r4iubi2h0JfNv7r7Umpyv8AcjrvdV+F95dalL5F+iWUj75Ef+//ALn8dd/YWcWn2dvbR79kSbN71UcTCmv3Zz/V5uep53rHhu/1bwtrejWEsL6tYPFqEFtbQeVvT+P5/wCN68is2jvLxLm2vLawukf57a5k8ry3/wCB/JX05eaX9sv7O9juZoJbOTeiRPsSX/frltb8G6T4sv7eTxB4W/4mM/mPPc6Q/lIn+/8A7dduHxcHDkmctbDVIPnRw3h7RbnUIrh/LiR5X3ySvJFLv3/x7E+fZXoepeNvB3h3wvp1k+h/2siJsdLm1+dP77u7o/zvXnKfDDwVv8ubUtb0W43v+6u0R/k/39laj+BdK0UPBB8Rb6BP+WcfkfJ8/wDf+fZW0vY9znjKp2IP+EuSHVLqz8FXk2l6TdQebPFLHveJ/wCPZ/HXLaPp1zpep2cv2ZL+3+3Rv9q+4+/+5vruk+FOs3w8/SXsde/g+3aG+yX/AIHF/wDEVytyr2t+n7iR0guo/P3O+9HR/n82s+b+UD6FvPEmuah4Z/sZPhpNYadJfR288sk0qb0++j79n/j9eWQ6hLDomt2E8sU9k6Tultc/OkUn/TKvXZrzX/GHhW30aDT5rPSNTkR01DWbr968aP8Acii/uf7b141NHHpvhzxBYWaRQPIkv2q+l+d3RH+RE/uUoSM5xON8Pa9o3gGzfy/N1K6uk2/utn7tP9uq/jbxhP43sLdNPgubO3/5fZXT907/APAK9s8eeFbLRfgJ4aXwJo9pcRakiPqeoeQj3bv/AL/30rC0r4R3mreFrd59TSzkkT9zbJGmx6651IU/fMoKpU9w99/Z1+HugQ+HLfxZ5Xn6s6Psll+dIPnf7n9yqXhL4heHtS8YvZ6NBfabrfzolzK6bLp/v/OleR/s6/HjWPDaf2HHpEurxPvf7NF99E/jdP79el+G9H1Xxh8XdN1yw8FS+EtIs99xJc3MDo9w7p99/k/8c/33r1+Q5IyjzGL8SPhynxy1S41+WWbw1eWEHlajI6eamxEf7ifI9Y/hj48afefDeX4d+E9PvoNRSD7PZXV86P5j7/8AxyuS1X9oTxLq3jm5tbx7a3028kfT5LS0j2bLd3/7730tzH4H+D+t3M8f9qeJdX2O8Gn3P+iRWETv8kkrv/sfOiP/ALFQXodz4y+Inin4F+HbXT7+G31LxJf2rpZaes++xsLRP43i+RHd33/PXD/D34zeJdW1PTfDmvvbaRp3mbIL6xREe0d0++6I/wA+/wD2643x/wDEiX4geMIrnWbNJ7qLTkRLaOfYknyO6b3+T+/WHrd9YabYXE9lZ28ESWsXmSLPvd33/c/2/wDxz7lZ8oRke/a3428U/s62+r20ep2Ot3GpXyIl1ImyJP3SO/yb/wC46VV+D95pXj601vX5dJ02DxbYTo8F9FGmzfI+xPk+4mz+/XD6V8XtV8QeHpbPVdK0jW9EiT7VPHqCPbyp5j7/AJJd/wB962dY0P8A4Sz4S6Rqvg3w4tnpsF673yaZJveWX+Den3/k31Eojh7kz2Tx/rHiP4e+ANGg0rU5X1bV72SW61GJ/wB7cP8AIiJvr134UXWs6L8PI5/GM8VvcRb3eS5kT5Iv77vXz78Dfhre+KPhVew+K5LvRLW3n83TrnUJNiRp/H8j/wAG9K6XUvg/Lr3w0luf+FkNq2nRQv8AYXuX8qxR0+4773ffUxN5y5zxj4gaReftH/F/Uf7F+yfaY4/tMFrfI6eZEnyIj/3P79P0vxJZ+AdBSyvNPttLdE83yrZ/kl3/ANz+/XqHhX4DyfBP7V4r1nU5fE0V/YvaXtjp9i7yy73/AOWT7/kT+/Xn3ifR9G+LXgjXtc0bSrvw9qPh66ji+zS7NkUGzYif8ArGtRU/cZVKU6fwG0/iqzt306KVJd9//qPLT77/AOx/fqh4hkk1S4fT4LOWe+jkTfbf8tU/2HT+D/gdcV8Mfhr4v8Ua1LP/AGnLb28nyT6h9+4f/YR/vpX1p8PfhDpnhWzSC2s9j/feT+N3/wBuuCWHpw+E9anUc1754V8OvgDrjWCSXs/2BnTY6RffRP8Afr0O2/Zz0NYtk8VzcOn+38lfRNh4dSGL/V7P7lSvo/l1nUpT+M2hI+bNV/Zz0q8t3iRJU3/wSPv2Vxuj/AvWPhv9tl0931K1l+ZLRE2Pvr7FfTU2bHSsm50dJN/mp8leXVnOB3whA+JfGel6fHYf2x4h0++nuJX+zpbLPseL/vj79dlYQxSabavBG8ETxpsj/ufJX0B4k+Hun64nmvBslT7kiffSvFPiL4V8X6G9r/Y14tvax/6yR32b/n/9DqI1YVIcpv7Hk96Bn+T/AOP0eT/A9W3ZJn8x65yHxhp95rT6Yjy/aE/56J8j1hyETlyGx5Lx7N/yJR9lfZXJJrWuSeN/sf2bfp6fO/8AsJW+niTT/wC0/wCzftKfav8AnlVuMzDmhM848VaH/wAVbcfYEWe9eNJfLkkd3ff/AHKf4n+H9zpOiW8ttE89xv33Xyb0/wCAJXZeJPAieINWstSjvJbS4g+/Iib96Vva9DqEPhq4fT7aG7ljdHkS5R/ni/j2bPn/AO+K6Y1OdpI4JU+S7OZ+Fcl5o+sukqTQSyIn2X+B32VwHjmTRrPxb4lS5v3/AHl9sjtIn2I/993euw1XxR/YtpLqGjWdsiRR7P7Qed5UtXf/AJ5Jv+T+D+//AAV40nh258RX0s/2Zkt4P3s9xc/J99//AEP79ehQp8r55HHUl7h9f/C7XPEevSRR+Jba+t9Et3iSxtruyRLfy9n/AD1f7/8ABXiWpfZrzSdbsJ7P7PLA928d9av/AKxN7/JKletTalq2m+HLW/lvbbxL4c0mS3ij+0xvFLa732b/APppXit5Nbf2R4juVSbUpZPP8uKJNkVonz/O7/x/7ldMffneJyy+CzONh0vXFvrfVbO932T/AOs8p9/lpXoPhvxVqHhd4tPe1lvLKd38i5kd96P/AOz1wHhvTdWj0298QWX2lI3j2PbSQb4nfZ/frnk0/XPEEbyXt9NEqP5Udtv/APHET+CtakIT+ORzU+eHwo/QObxBo19Nb23g7XNCfV9NTfIjon/HunyP9z7lfPvjD9qbxZq3jm1fwPepBbybLSS0u0R4vtG/Z+6f777/AJKxppvhJZ3HiX+z9fvtW1K6sZ0sorm18qJHf7mx3+/XlWjx6ZpN5ZT/AGlby6Ty3jjj3/I//PN99ezKXIckI856Xonx21DS/GNxr95ofh3W7iB98+rxQfZ3j/gd4t7/AD/7H3N9ec6xr1zqXi3xBezvLdS3kj3cnmSO6SyP9z/vjfRc6LBpv2i5ufKt7V4/Kktv+Ph/76J/cSoNH8H3msPaz21nNeJdvseL/VJEnybN71hOovsHZCk+o6bSZ9S1u30O2ktrxrWBInu/LT5ET+Df/c/gqRNJvP7MvZ4J4bNLVHR/nR/NRPuff/grO8eaPH4f15IbPfvjT53kf77/APxFVdV/tWTTbeS8s5be1n+eN5I9n2j/AG65/enqXyG1Nq1s3h1Hs7+b7RcI8t1bSTb/AN4n8ddBo3jTxB4V8Jafa6BrNxoMetvJLdS2sf8AGnyIm/8Ag+47/wDfFUvDHhn+3vBf/Ev0+G41FJNjySvsR0+/v/4BVW8sf+ENv4o54HuLKdNmz7VsTf8Ax/cqIzUCvZc5SvbxNStJP7Q1LUb6WZPtHmy3ru5ffsfen3K9q+DPxasLe80TRvEuny+IdJi2RaPbW0H+quE+5+6+47vv++9eWXIttBe4nSJ7z7AiIlrcx/ut7vvTe/8AH87vWlDqU+n+MrPVbLT450sJ4tS82Sf55/LTe/yfwfO/8CVtCfOTKn7OB9J+Cf2gvFfjD4n2/hTWdDtrfTp5pLeS28t3ePYjv87/AHKx/EPht9c+KXivw/o2ky6Rolw8b31zFPKn2iT7/wAifwJXH+Ffj58TfEXimJ0vNLnt7hN/l21qjpbo/wDBv+/vr6J+Hugvbxvc3Mv2y9u382e5f77u9RWnyG2GjzHQ+DPBaabaW9tBBsijTYmyvXNE8Kp5W+f5ESs7w3DHaxJv+/XTTX3k2ez7++s4xhGPMdz55zIZrO2jfyoX/wC2lUdVhRpU2fcqRG8z56JofOSuWrV54nXCkZjwpI9V7m3dkrWdf3lRTQ7vkryKsOeB6EDnX0/59+ys3UvDsepQSxSp8jpXZ/Z3p39mo0f3K8WVI9KkfGXx18M6v4JjSfSPks5X+d/40rznSpkmvYr3/Rnvdn76WJP+Pj++n+/X3f4w8F23iLR7i1kjR/k+SvhDxVod58P/ABxdWd++y33vcJdyp9x/ub67sJLn9yR5+LpcnvmXo/xEeG61HUNVtns4nf7OkVsn8f8AwOuv0Hwnp9xeRa5Kj3V7L8++N9iJXkv2O8ju9Fj1eZ9Xt7yR/wDRrl/kd/4HSu10TxFrOh6RqMWoae0EUaPsl/vv/AiJ/cr0KtKEPhPJjPuaPir4kJp9g9nbJcJq/wBs8rytnybE++//AMRXb6Jqk/2eKeWBre4RE3xSf+z14zH4kltfD0ttBZaJO/2pJY7t32Xaf333p/fr1f4e6a9roKfabOK3l+/5cTu+/f8A33es60IU4c0QpylOfvl//hF9GvryJJ9GtHTz9/2b50id/wC/5W/ZXl/mS6h4c1eC51DyL23unlmSP+55v3K9i/6aomxErhfiR4F0aZLjxGjy2F7E6SyRRPvSf5/9v7j1FDEc/uSDEUodDrbmz+Iv/CPS/wBq6vokHhy3vbd08yOJ08j+D90n+3/tpXjtza/avA2r3tlcw3EqRzpe2sqbHj+f5JET+NPuV7fc6Dr+raNpqXllY+GfC+rTxXHlWyPcXEib96JK/wDBv+T7leIarZvZ+BNfvbnyrOIRvFapcvse6dHTf5Sf3P8AbevZpfHY8ifwnIQ+NNV8P+Fb3T5N0n8D/u08rzf+Bp87pVzwN8YNQ0m8/wCJhpkKS+W7pcpa/vaLaO21n+zbxPMgeRE8uTfvRP8AY/2K3ptD1ePTbe9eyig3yP5ksmzfbp/tpROdP+QIRfJozze88QQQvqUUcafZ7+RJdkXybER/kT/bT7n/AHxV9/IvvD3nT7H3o8sly8nzpL/B8n/A6g/4SLSbVNBRNMX7RYPK91K/z7/3juif8Ao1uzn8VR295bIvlfcSOX5Hn/3Er1K3MctGPuFL7Re+JInjisoYHldPMuXf770681LxD4L1P7H9qmR7RPKTY+9NlP0rWraawlgeZbdnT+JNnlV0HjPxxZ2d4llZwwa39lmR/wC0LnY/mf8AfFcnNPmsdJd8JeCbnxla2t7eaejxyT757u5fY8qb/wDb/gTZs+RK6O/uk8cX2reHLyC2t4rP57WXeiIjp/B/c/2KisPGWj/Eq1so9Tlu9IlR9m22k+T/ANDrN03wTZN4x1G21Nbu30S3jluPtKPsfYm/Zv8A9/Y/+/WUpT59TY5nxhour+D9iRrLBZTp/rbF/wB0/wA+/wCd0f8A3KzNB8Hz69aXt7fSvbW9rA7pJs/8c/z/AOz12fjn4hRab4ai8P8Ah6OZLKTf591cv5sv+3s/uf8A2abK57QfHEepWFxpGuS/6D5L+XJGifI/8H/j9apz5A5UZt+2p6a9k95NLcWUXlyvuRE/4B/t1rzTXPiJJbnTZ5nkSTf5rukXl/7G+sXWPEH9pRW/kRsj7Nnm7H+St5IU0Gzls7J5bnyJIvMju4/k81/7lLUo9v8A2ePCLraPqF4kv2q4fe7yf3Er6l8K26SfIm6vM/h7pv8AZ+i28afI+yvYvDcPkp/D/wBdK46k+eZ00Ye4dRYbv4K24fmTe9Y9n9+t1JPkT5K1h8B1wInj/wBupUkRfv03y9tQ/deuSZ3ljcjPTXh27KZD9/fVibpSlsKHxkU0nl/cqWGb+Cq7799RpI8fz14tY9OJZvLfdF8lfJn7Yfwxg8QaCmpoj+bb/fkR/wCCvq7zvMrjfiRoMWueHL2B4kffH9ySuSjUdOpdDqx54ch+dPga3e88aPLfIn2+CNEtLa5f5Ej/AL6P/HXVzQ642vW76rFbf2V53yRxfwP/AAb65e/aWHxpZW0b/ZZdMnkt3uZE2IkSf33+49dRpVjrmpaRq8mpzTXG+N0giidNiP8AwbE/jr3p++7nznwaHf2dnbfOiJF8/wB/5K1vJ8mLyq8Ph0e5/siXULbU9Gs3S6S3ii89/tcr/wC4n30T+/XqXgy8vLzSE+2u73CPseOSB4tn/fdctai4Q5wp1Oc6OGP5P7iVz/jmOD/hEtSif/VbPn/77/uV0FtC8kiIj/O/yfvK8t8eePrzWrXW9K0DSEnsoN6T6ndP/rNn3/KT+5/33XNh6U5z5yqsjtvgn4d1fwf9l1XX53uLLUnil0uVL13R4tn3Iok/2Nn+5srx7XrN5vA2r6hZy2N/sgdJ7fenm2nz/wAaf7f/ALPXul54b1fw/wCHbLVdGfUoPKuoooNDubpJUkif53RET54/4PkTZ8leDQW733gDxHeeQlvFb2jo9zcv5XmO/wA+xP45H/8AQK+lhrUueHP3EZnhjUv+KetbNIJppbqZLjypXT7PAn396fx/+P16k/xI0fTdM82CGJJbxPs8FpFG8SfJ/wA9f79eM6l4kit408mR/sUSRO8UUaI7p/sP/GlM0vxbH4k1C30/T9Klni+eV4nkRHd/9/ZRVpSYUqkYFQeXLq8tnc6RdvdJaollp81tI/7/AORH+RHT/bf/ANDpJvP020ezjtpftFvI6RvLa/JG+9EdEf8Ajf8A4BX1f4/8SfEuz+K/2bQNDW80hJIEjk+w70dHT598v8Hz/wDoFfOHxg8P+I/h74/1H7ZLCl7du96l1bb9n7x/n2f3Pnd0r25x5zzac+SZzlzosMmk/YraG2e6SDe8cfz3Hn1X8MaXo1nbPLrkd3DLA+yRET5/9zZVzUvJh1/QUuZUs9E/0R0dHRN8exPN3un8e/fWS+9r/TtQb9w1xJJsltnfZ8nyI6b65uSUT0IVuc6P4l2qeG/s9tpEssGk3X71I/n2b/8Agf8AsbKXXfitqWv+C7fSngZbj5I72+Oz94ifcT7n/fdc3rcMs39n3OoXMr2ru6SIn/LB/wCOt+GHTd/2aKd30H/W/aUj+d0/j/8A26x6GhZ8BwwX2m3+p6tDLqUVonyJI/33+/8AIn9/7lZ3iSHR9Tgt4NIspfts7/Iks3zx/wDAKg0GxRoNTnttQms7fz/s9jEz73ld32b/APvj+OpPC+mzanBr82n2H9oajJ/x6GaD7Q/3977Ef+PZ/sP/AOP0cl2XKfuXNe5t41tYtIkvIoXS18p7aJN8SS/399bem2c+n6t4c0+5toby4jSOWR7mR3dJftGz5Pn2bNmx/wD0OuFs9Uja4ljivLe0SS58+eGXfGiJsf5Nj/fd/ufJvrrvhRo97rGq6bc2aTX+mpeok+ofPsi+TfsRPv8A9z56OScDJ1FM+0PDdv5MUUaL86JXpGiR/ukf+/XA6JG818kSP9xK9L0e1SNE/wBivJ+OZ69KPuGzCr7ErYs4/l+es6H/AJZ/PWtYb5kT5Nj1tzchvEsJD/BQ9n8nz1YTYrpv+/V540ZP4KxmdEJGIkPyf3KsfY93+5WmlrHs+ao3ki+5QXzFD7L9ad/Z6bPuVY86C3Tc71k6l4osLXZ+/Te/+3XHVpc52Uqok1j5b/c+eqWq2vnWrpVZPG1h5mx5ErWeaDUrXzYJEdH/AOedeRUhE6Iy5z4J+K/w7/tH4g69plzO9tavIl7B8m/+CqOj+KLPT7i30O52QXUeyJPK+5/sV7D+0n4b1CHxhoOq2W9InR4rr5/k2V5pN4f0qbVE1B7aKS6T7ktdNKfPDU8urScJaGP4k+HtnrGmXqb5ZNSkuvtENzI/yJ/Bs2f3NldfoOm/2fpqRSXnyQR73ubmT5ERE/vv/BXK+JPGX/CN39rZx2cupXV3/wAst+zZ/B/6HXWaxY/214ZvbP7a+myuiSvJFH5v3HR9mzem/wC5W3vztCpscXuQ2Mu8+IWjWOmvfxPfT2To6faooNmx/wCD5Pv7P++K82sJom8GppOn6vbT3UF0n2rYm/zYt/8AB/45vrrr/wAP2fiq/t7O9k1CwuZE2QXMnlum9E+d3i2b0/g/jrwbW9N1Pwn4mljubGWN7C6Tz5ER9m/f/wCgV6VGnDaBxVZSPpTW/hj4X8N6DceKJLzXXlj1WO4+w3c/2f7Q7/I8aP8Af/4HXkOq2KP4VvUvPNSJLO8i06O5d9m9Hfeif7eyvcvCXhfwprVv4cvY9Xk8TeKH8qW+ivr10eCX7+xP4EdH2ffryO8mubPw94w0x52fTpILyWOxufuRypvTfF/cfZXdCXv8hw/Yuct4V/4R+bwHeu6Tfc2b33+Un9/f8/8Av0vgXx9pOjwSvZaVp/lR/J5dzH87p/f376yv7Bjt7yPV9VbZZSQJFa6RI+zf8mxET/x+su58CafJqdrZwecl1dP88Ufz7P8AcrarCH2mZRqPoj6u1X9oKw+EumP4c1y/1DxNq0tlFcWt3p8EcSSI6fJs+f5Nmz7/APt1m+Km+GHirwfZeGn1DUrO3eSKW9u4o3e4uP49ksrp8/zvXkXgnUv+F9fGm1vNQtore4lRLWeS0d9joiP86f3N8SbK+ivjZov/AAjPguy0Xwv4XtHsrh385IrHzUR/4H2J/H9/5/8AYr0pzOM8L+MHh/wL8JdS0Gz8M+FtO1v7RY/av7Q1Od7hJU+dPufcpPFWm3nxy8PeH/EekaBFYXsEb2r2lpOiRXUUb/PsR/kTZv8AkT5/v16G/h+G88AeF/DWsaAl/q06XFwn7h3ltY9/ySOn/A9+z+PYn9/5POfi74DvNW8S2sHg62lv9EisUitbHT7pJXt3T77un8G90/4G6Vz8xty8h5pr2j6tothepPoctpqT3UUryahZfPBAm9P4/k+d3T7n9ypIbO2tU8+5guXt47638zTtiImx0eXZv37PL/8AZ69v+3WzeFdX8BeLPtaeLbiC1/4mcvzxQOib4keX+5v3/wDf2vn/AFLQtc0O/wD7KvPDWrPffInyO770/uJsT7lVCVyft7mt4Qtdevtc+2f2ZcX91HO/l/YbFJd6OnzpsT5ET96les/DXwjrPwz1bW/GNzbWUerWejyy22n3d39oe3/g2fJ/y0fY/wBz5ETZ/f8AkTwl4itvhj4PtdPvLG7/AOEwutR3ztEn7qwR0SPynf8A657PkT50d/76Vyug/CvxT4P+IekX+uQRabbxaijz6vd3f7qf50f7/wB999KVSBsdB8K/iZP42+JdlZ+L9P0TV7K/jkSeSWxRHt9m99+/Z/6H/cr0zwl4o8HW/iLVtM8D+F3021v/ACnnu0fYmxH+R/K/g/8A26s+Hv7M0/V7j+xvD1i+k6lBPEmpxQI+9Hfe8Tv/AN913vnWF5punQW1tFZ3G/8AfxxfInyJ8j15866PWw+Ec4e0Zp+HriKzR5J32bE/1lWrz4nWdncbIJkeL/po9cl4n8O3l4kVtFO8Fu7/ALzYlR6J4T8PeG4/t+sPFP8A35JfnrgjUgdUo2Nab47eS/7p/PdH/grW039oS8a7jiSDfv8AufJXHXPxC8FWdncS6N4Ti1hEfY8kcGxE/wCB1d8GeIJPF2paVa6ZpOk2b3kbyyW0TvK9r87psl+TZv2Jv+T+B0pylPoRCXv6nuFt8QvtVpbSSI6O6b66jSvEkV0m+vG9KvrmPXpdD1OOK3uk/wBW8b70eul0q4e1uvLd/uPXDKtOEzs+GZ6m+sJ5O9P9ZXL6x4kkhfZH9+tiz8uS0R0+T5K5zW4UjiuJUj3uifIlZyrT5jq5fcPL/GfiTxXI7/Zp98Tv/q0fZXJaboPjPXJ/9fDbx79/mSz13sPgmz8VaDqMGoTypq8n3JJPk2f7lcZ4e+Dd5qniGygubBNIsrCHynuYpHT7Q+93eV/n+d/uJXVZ8hzusuflOz0r4W6zNE73OoQ7/wCDyq6rRNF1Pw3do7yvPF/HXN3Pg3xDouvJP4a1WW401P8AWRSvXqmgyXN1bolyieb/AB141T35noQOP+LXhVvEnheXyE/0iL97HXzn4h8J6h4Vlt/tibPN+dK+19S0/dZulfL/AMbLNNS8O6tPfyXyS+Hrp9Q2WqJ5skXz70+f+Cs6WlTkOvk9pTdj5i+JGqS2fiK3e2i+z3T2v2dLqVP9v+B/4Pv1leJPHU2qeHf7P+0tDcJ873MT/wCtT/YT+OqF58VNPvNRuP7D8Dz6tcSyeakup3T3Gx/49iIn/s9Fz8WvGDI7vbaFpGxPKSO4g3un/APn/wDH6+qhhnofDzxC59Ds/g5p+oahq/mRwOlulrseV/kii+f+/wDwf7dcx8RfFEi+KvG6RzW0+neelq8T/P5rxp5e9P8AvjfXNXPjDV/F1xb2dzrl9q7p/wAs7v8A0e0i2fP/AKpPv1S1tXh0G4See2eOJIkSOOf/AFm/596Js+//AH3q1RUJkKrLlPpL4P2ejeCdLtdT0jWJZ9SvHiuNV0q5kjt0s3j373ff8+z532V5Zr1466T4yis4IbOW4S8lurt/3txcJvdEj3v/AKtP9z79eg+IfEng7WPDN7Bc65Yf8JQklolrc/Ytn2CXfvTfLs3/ACfPv/8AZ68y1K4/tLwz4gs76OK8t7dLy4srlX2SxP8APv8A99HraHx3ZlP4LFLVfhDHoPhbQfHHijUPs9rqnlJY6MiO8rpsTZ8/8CV6D8OodD0nwy9/BqUDxSO73VzcyeV/sJHv/wA/frgPFvxS1XWvhhpPhrxB4fttSSzgRNO1CF3Sa12ImzelcJeeIPs+m28OoaG2m3EqfuLnfsidP43/ANutqsPamFKoqfxGj4V1e6+HHxAubawm8m4hfzLS5j2b/ufc+f8A2HevrLw94q8S+IvhemvzzxW+pWqS+XLF87yRJ8ju6f39+/8A74r4gvPC+r+Gdeih8hLzUtnmpFbb5dldnonxq1zw6ktjI89ujo8U9r9+L5/v70rqn73wnPz8h9S+G/GHhrxp4X1rw9oGqy3HiPUtOl332ob0lld02J8/3/k/uJ9yvFPhjoWqfCv4gw6zrPk2lhbvLbvsud73R+dPkRP9/wD8f/3Kk+HviyDSY0udK8J/Z724RLT7dqEkjp9/76RP/wB9/wDAK5rSvEz694tutT8Qulx5d59nkiiTytlrG/zomz7n33rBmx6/c65P488S6tr+jwQ3Go/JEmgywJ/pdmn+t3u/yPJ9z/P32+JPiFc3XjC3ltryWzis3S3gitk2RW8Xz/f/AO+EroPCvw91DQ/iXdazLFDBpsfmPapbJFFvR9+xNif7D/x/3K8+8VQ3mseMf7T0zSn03Snd4o7Z49nmP8iP8n/fFck6pvGPOb2sTPJav4hli0/SdJt71P7K0i2tUdLqRPnuHf8A4Gn3/wDY/wC+6Xxp1aL42W+gvoz7Lqw379Pu3SJ5EfZ9z59nybN9dL4q8Mz+PPA+gy6RZrZyWcjp9mdEiST7m/8A8fT/AIHXB/F2zg0O/wBJtvIWz1OK1iee5sU8pEuHf5HT/c2UoTYpRjsd/wDArwbqvgfwdLBqssKS6k/2iOxik3vEiJs+f/vuvS9Es0k1m42Izp/frxT4M/ErWNafRH1X7DcWt27xPKkGyXem/wDuV7x4SVF1J/k/dO9ctc+moz/2VKJ6HpugpdW8bvElcb8QvhrHqkbxvv8AKf8AgSvTdKk2omytq5s4dSh/h31hHD+5zHN754T4M8Jv4bsPsFtBD9lf78Tx/frsPCvhuDw7LLPYWSW9xKmzzY/v12n/AAjqWr/IlXba18v76bP9upj7T4WypR8jlE0dLOaW8dP3v33f+N6zrOGRrzzf9uum1ubzn8qNfkrN0qH7ZeJAn3Ef53rH2XPMuMju9Nt38uLf8+9P9XRqWl+XJv2b0erD/u44tnybKu2c3nb4nrDEU+SZ7NL34HH3Ph99++N/kpkOj/J+8T5K62a18t3RKzLmF9/36rn9w5fZckyukn2NNiItalhM/wB/+OqUNi+/79bVhboqVy8p3U49y153nRfcrwz4zWb6ToPiu/iRvMuNLdPLT+/s2J/6HXvCQ7a8V/ais7n/AIVV4gn0/wD4+ooN6f7m9N9Zcvvo3UvZxPzuhml0HVpbae5l+1PGiJL5kux0/jRE/v16TpXirQ774YXkupaO1+iXX2e6ito9n2h3f5Jn+58/zolc54A1JIdal1/WY4Uiig/4+Ug/1X9zZ/t1q6l4gn8ZPFbaZpENv4beffPcy7LfzHT/AJavs+5/B/v19KpnxsoQ5yjonh//AIWp4iiSC2tvCVtpibIEsdksru+xN7umzfsT/fevI9YaSTUrq2vd89xvS3guf4ERH+eun8T6D4v8JyfabJ5be3ffL5li+x3R/vu6J/wCqcN5feL7WW2trJ99hB9oupXfekCR/wAaf5+/XYm9zhnbY+g9Y8ReHtN0S9is7bRrjxj59u9rd2NqksvmI/ySyvs2Js+ffXj94qabpHiDZE+pX3l3iPJcybIrVP3m/Yn8b/8AoFes/CLxdZ+LrTSdDg0q20iXRXjt3u7aTyri7d3+d9n/AADe9eX680c3h3xL5E8tvdRfbHk+0p8l3G7v9z+46P8A+z1nD47GEvhuZvwvs7nR9FuNS1W/lS3ePem396jvv3o+/wDgrW8V6NB49tIprq2ltbe4TNpdts2b02fc/wDiK5fwb4r0ltJl0ayuVguLhPKeS7g+d/8Ac2b/APgFbXiHXo/Ddvb6UkbJbJP5qfv/ADXd9/3/ALiIlOpzxqXKjKE4Fe28bXml6lKk2mXM8SR+Ukskex5ZP4Kq22uWa3Gq3kFnDb3Ej/aI7p4PN+4nz/ff+CvQ7zR7PUvKe5i3+VvdP+BpVGbwfZSWbwWaLZukbxRyRx7/ACk++/36v2sSZUmcxoOoT+JLXZeaxMl1fwP9llRNiQf30T/brgbO8Twzrd5bXKTJazu6R3dzG6O/+3sr2LQfB9t4fuIpYLmafYnzxyvv3v8A36r+M/AemeKo45rzzUlRPKSSN/uf8Aq4VoL3AlTnyGhpvxkl1DZJrHnbE3pHfaZOibEfZ8nzvs/g/wBuu7eGDUrPw/qCSfYIr9I0sot7v5CbN/z/AN93l2f5evmOz+GPinTdU8i1/dRffS5Z98SD/wCLrsPM1nwfJFBNJ9vldP3bWzuiRP8A39lFWECIc5674t+IFr4L8Q3Fsltd3Go2rxSx23nolpvdEd3RPv8A8b/8DrxH4ifEebWZ7q81WaKfUXTyktov+WSf5eofFXgvxX5T3MFylwJPvxWq/P8A99/x1Z8H/BlLr/SdfeWC437449/3/wCOj93D35FxjOcrGx8H7OLQdPfXr29mt7e1ffJYtHsSN0+f+P8A36+vfBk26VH/AIHRNleHJpKahZ/YU2fP+6SR/n2P/A9eu+G5E0+4ii/uIiVwTn7T3z26K5Icp7Hol480G90dPn+RJK6aFn2R1ymlM/lp92ursN/yVMDojI1khkkqOa3f7laNsqbKsfZ/k31fIVI4/W9P+y6ZcT/8tETelYnhWN/KTemzf8710vi1nmsHX7ifx1zj3iWflbN7u/8AAtYxlCEw5T0mzt3vIEdE+SNKdeW76fF58Sff+R65XRNcuVi+SJ9n/TSr/wDwl3l3aRXMEuyuPEe+eph5chp2Fx9utd/3JU+R46HtfMqC2mj+3y+W/wAj1peXV0oc8CJz98z0s/Lf5HqxueG3fZ99KseT89SpGkf8dYSibQkGmtLNZpLKmx65T4l6SmueGdSsH+dJYHi/ef7aV2v+xWLrEP2rfF/sVxzNz8urmGOH4f63pkUbJeW8ySuv3N8fzo9P0fxt4d1Tw7a6NqsbfZ32RbHd9mxP43epfiXqkvw/+KXi3Sn2vEl7Jsj2b02O+/5/+APXHw2vhbUvKdnubd5HRNiTp9zZ8/8AB9+vepw5oXPk60nCpYf4w1658VX6W1sZk0mCeO32ROmzf/B8+z+5XbeJ7j/hC9MvdG0yJrOK/gd55ZE/ey/J9z+58leeX954fXTXttIhmuHkukfy3f8Aev8AJsT/ANnrcs9U1+803V9G162u7z7HA7pc7N72exPvu/8AcrplH3dDgnM9rttSfwboukJeaGumvYPHbya9p6RP9o+f91vf78f+3Xjl/s/sDxA89z9llnjuIrW2tk3u/wB/e8r/AMCV6hf6p4jvPD11pD+Akg0ie+tInukkdHuo9+/f5v3P+B7PkrzPWN8PhXX57bybp0jure68p/nt97v87/30/wBunSj75zzl7h5ZoPg+K+s01Kwvtlxb/O8Tp86Vo2Ok+I/FaS6tJI08W90/dPGj/J/0y/j/AOAV2PgbTZPCtvHrMmrW2rWEUaSpbWuxHT/f3/wVF4h8bSX1/c22x9N02T53jv40d0/j+4iJ8+z/AG67JTlfkMeRcmh6Mny/wVKjfJ8lV4fv7KsJ9/8Ai31wSOuJL5ibNlcB8V4dWmsLeLT42e33/vPKTe7v/BXQ6x4kttD/ANdv/wBW8vyfx/P/APZ1o2d5BqSJLG+/eiP5f39lEIcnvhL31ynJaJptzqHw/igRGklj+5HK/lP8jv8Ax1zV5fQ+Gdn22zmt/PkdPLSfzX2Jv3u7/wC+9Gq+IPEEfjS4isfO8rzNiI6bE2I/367rWP8AhHtQu/J1D7M+opH5To7/AHErp+Azi+xi+D9Lv/7bt7l7OZIond5JJLvfb/8AAErE8c3moaf42t5bZ3eVHT5I3fZ/sV1/iHWvsXh+1vPD7pPFBIiPtffv/g2f79UfhXr0+vR3X9ofvpUdH3yJ9+subqX8Wlz0bR7if7Lazyo8FxsR9kn8D16bpU3nQWs6fx/f+evKrzUI9PRHlk8h3dIk/wB9/kr1DwTNHqGgps/g+TzK4z16R674YuEuovv/ADpXbWH368y8GTPa7Imdn/23/jr0Szm+dKqBZ19nvrS8xNlYVnMipV17pNlWacxmax/pSPF/yzeuC1LQZ4dSieOWV0T/AJZ13VzMkKVkeckbPPO/3KwlGPUPaTfuRNDd/Z8Vqn/fdOv9PjuHR33/ACf7dZt5fRasiPBcxeVF9/d/BWhpuoW18nlLPvf/ANDrz60r6HdShOBesI0hRERPkStyGRfkrEhheN61rZq1w1T3BSLE0jbPk2f8DqVF+5UX+s+/Uu546uoa0pFl/lT5KzH+aTfVqab5ESqrx/Jvryqh1Hwt+0t4Bnb4neIL3TNT0+3utUtY4ntbpNjyfJ8+x/7/AMlfPtn8PdctbTUbOXQInuJJ0tEu5Z0T7K/3/wDx9P46+k/2t9Luf+Fn6dqEEEvlfZYke537ET532Jv/AIHrmPCt5Z6ppcuv306ulpNv8qKf7Rvi+4m93++/+/8A369zDVZezPnMXH9+eY+D/hjeeJI7fT3srZ7WzunRNQtv+W7/APXX+4n/ALJV/WJo4dF1Hw1oOpyz7JHutRluf9bd/J/6B8nyffp9z4o1XUvGnlXNz9nsn+SPy0+SPf8A/EVL4n8jQ7O61WVIn1a/geySN3dN8WzZv+St1LnnqcE4ch2X2fWfEnh6ytn09NE8NazJbul1czu73CI/8H/PPf8Af+evJNS/5FjX5NkUFskc8Udzcv5X2h9/3E/v/wAH+5Xsnwih1/Sfs1z4jnmn0S4eD+y/Nuk+zpb/AD/IkT/8AryHxPbpBoOq3kse9JUuorWX+BH3u/yf3HrWEv3ljnlLnjc5zXrG28M6TpujW0f728T7VdyR/O8n9xK4nWNdkvr9/tKu9vI/7zzE+ff/AB10mgza94sew1BrPz0sHSKS6+f7if30r0NNNsb7zZ5NPS4SB/N3+W7/AO+9dkp8nxHL8fwljQfF0eqPHBPbfZLqX/Vpv37/AJN9Puby8tbzzPM/deekTx+X/A77Pv15ppuoXmn6ptjlR75H/wBFll2bE/23/wCAV1tt4i0/WNS+zant+0o/yPFJ+6SqlEv2hg+J5otW82ZJ2nlTfs2J8n3/AJE/74rrPhvpstnayyyfxvs/g+d/9utLW7PQNJtUuYo4ftG9ESOOT55HrlbzxNNDrMVy7RTpa/6yKJ/kj/v/APA9myh+/wC6XCVj0pLWP7Rv2J5v/PSsfxD4Ng16dJPOazdEdP3Xyb96bPnp/hjxNBrlgku9IJX+/Hv+5W750XyPvTZ/zzrzvfidHuFDRNBg0XTYraJE+58/ybN9XbCxh0238q2jigiT5/LRKl85I0+R1rK1vxRbaLsSb57iX7ke+lyTmac0DifiFp9/DdPJ/r7f7/mJv2f/ALde6/Bm62+HUgebz9jvvlj+5vryrw9eX/ip/k0aXUot++PfHv8AK/2K9d8AeFbnwfYJbTxvB5r7/Kkq5R9w6KMvfPXNKheN96P8/wD0zrurBn2RPvrh9Hk+RPuV2dmybFrmN5nRWd0/m7Nnyf8APStCab91WRZzf8Dp15cPDE7pUynyAF/qEVrCnmyIleVeLfHkEd1LBFLviT/nl89aGq6bPrjx3l07zoj/ACW2/wCRKdYQxSRPHLHCkn+5TjyT+I9TCQhB85wlh4gn+eSSKbY/yfcrYsPGE8Mn8cDo/wAnmV1D6DBJvT90iP8Ax1ctvDNhG+9Ns/z1yVuQ93nozidToPxAs7ywT7TKkFwn3/M/jrr7O8iuIt8e3ZXA2fgm2upUln2/J9yOul01f7LTyv8All/BXNSmvhPHrRhD3kdN5ny76dM3mJ8lVba8imSpfO+euiUjOEh6ffd3enTfdqLzqJm8u3rhnA6YyPmT9pnTdPk1qyv9Q+4kD+XH5n33/wBz+Ovn3R7PTND/ALR+zXn+hXVq8SWskH8f8Gx6+tvjT4NsPGD2v2lG3x79kkb/AHK+dte/Z9uodS+32d+06RJ8kUifJW2GxdOC9nM4K2H53zwPGv7He8utVn1O5h3+R/osW/8Ag37P/Z60LzQ9Yk+G8V5BcxRpaSSxTrKn+tR9if8AxFac3gnUNJvLi81yG58qJNm+2RPnT561/El953wqvU0iBbdNiO8Uqb38vf8AP/wP7levCrD7J5FWE+p0N5o9/wCG9ETWNMlvk063uokj0+6dJU2O/wA/lfxx/fryK/ZV8NeJZUeXZ5DvdJG++Lfv+Tf/AAV6Pf8AhW2sdJutan1zVN0V7BL5T/I+/fs2I++vOdet/tHhfUY3keCKJHdLaP5Ed3fZvf8Av11w5Dgqy+yVvA3xOsLzw1LoFzB9gvZf3Uf2F/K/4H/cSup0HVn0/Rr22e2ae5RHRJbbYjv/AL7/AH3/ANyuA8T6XbaLrWmvBbb9NSNJY0i/jqqnxOvY7+18rT40ZH3ujv8AfRK1nFT+EwhPk3Nyw8F21jcajcyz208tw++D7n7j59//AKBVi5vLa8u9IeO22Ol6j3sflp9zZ9zf/wB91zelXUurWFxqsGkTPFH8jyxomyoIdYSzu1gTTJfNl2PBFsR9if7f/j9d8os5OY7WHT7bxJf3DpHElvHB9ntWlRE2SPv/AHuz+P8Ag+/U+m+EbDw3ZxPPFbXkqTu8kuzfvj+5s2f99vXFTa9Z2dpbzy6ZLAjyP5fmp8jun8D/AOx89bnhuzl8XTpp+n6ZNcSyf6+Xy9n/AAOly8htD39jbs/7Hm1u6dIIk0j+zkdJfsrp+8R/nf8A8f8A/HKf/wAI3J4q029udPs7lLq6n/0LZ9yO33/3P7//AMXXqXg/9nOJZfP1WSV96bPs0T/JXt2g+A7bR4IoI7ZYET+COuf0O2FH+c+efCXwF1PUIon1CRoHeNPM/eO+x69V8Pfs6+HLO4+0z2bX8vyfPcvvr2Gw0dLXYkafJWtbWfl/wUuVm8eSGxzmj+E7aziRILZUT/nnGlc58RdNSxutOuURNju6V6rDD5fz1xvxUsftXh5J0T54JN9ZVY+4XCT5zl9Kuk3psrqbO8TYlcHpV4ny/frd+1eSm+vJ5jsZ2cOoeX86fx1L9s3Jsd65e21bb/HTodW/vpXNV5wjE1ppPn2JVV1gWLfK67KieZ5It6Va0rTUvHSWf50/uVz++dlLkgYNzeQSfJHEz/3K2tH1BI/k8pkf/poldjDoNnJF8iLvps2jpCnmbN/lf8s/79E4zR1cymFnfPsT/wBF1f8AO85KpfZUjiRok2fx+XVWaZ4/kR/nrliZ1Z8ptWcyR1a+2bv9+uXtrzy0+f79XLa63fOldRyRmdF53z7Ka95uTZWdDdfJvqK5vEjT56irI76UzI15ftl//sIlYlzp6fO/3NlX5r753euV1XxF5zukD/J/z0ryZxOiHOZesafBM7/Ikmz/AGPkrkNY+Huj6pZ3ED2aIlx8j7PkrpZpHm8x/n/4HQkM/wDt1UJThsKXJ9s84vPhLFJfpePeTX7o+/Zdzv8AJ/ubPuV5N458G6zpvh3UoLyz8+3fe8Euzf5fzp9x6+qEtUZ/uJVe5s4pk/fPvR/+WeyvRpY6pTn7x5tbCU6h8b/2Dc/8IlFbTzxalLA/7v7J87p/sPXKalor3V/LBbQfY7iX540ufkf/AHK+udV+G+kTXb3NnAthdbP9ZEnyPXlXjD4Y6nbxO0Fgl06f8tbRN+//AH9/3K9qji4zPIqYRwPNLO31jQbDSY7aVoLWON4vs0n3N7/36l8GabL9jR/IefUUeSJIk+d/v10vhjw7rHxOlso7CH7PEkm95f7j19PfC74J6N4Fh3wRefeu++S5l++717sjzYUep5F4S/ZxufF1vaz+JYPIt0dPLton+f8A4HX0P4P+G+meH7SKCzs0t4k+4kaV2Fno6bETZW3bWfybKOWczr+DYxLPQUjT7laKaekNaX2f+BPkouVRYnTfT5BleG3SP7lSovmPQn36Xd+82IlSUOf92lZuq2MWpWcsEn3HSrs2/am/79RTRvJs2PsesZAfP6eZpN/LZz70kifZ/v10dhdJMmzf89Wvi14d8meLU4vuP/rK5LTdU2zIjv8AJ9yvFq/GehD34HU3MPyfInz1VtpvJf5/+/dS2148fl/3f46r6lD5MqTwf8Djrm5gNmG+8tE/+LrXsNSTfs3/APfuuI+1fanRE/1v3/3dWrO8lVER0fela8pEZHqdtqXlomx6tpqSMm93rzyz8RPGmz/0ZVpNYlm+dP46iXwnTGryHeTXybPv1iXmpRK8ib/9usH+0p5PkRHqzYWLzPvk+5/HXHKI5Vecu2bPcb3f5K0rbetRQxpH8lSPMm+rMIRL4uvL+/WJrGreTF87/f8AuVX1LVI4Y97vXneveKvtUuyD77/In+xXLI9OjE09V8RPdO9tG/yp9/y//QKpW0KfPWbpUO23f5N7v/y0raSH/YrKJ3c3ISQyedPsT50q08O1P7lCRvCm/wCTe9XUh3P/AH3/AO+6jk985JyKv2d2+/8AJ/1zo+yf7Na8Nn+6/wBV9+pUs1/74rojSOWdU5/+wfOfe/yJUiaGkf8AB/38rpIbfcm/ZUz2qKlbwpTMfanNeFfB9nodpFbWdstvbxfIiJXc2Fmi1HZ2qKn+3WzDD5aV9rGJ446GFKsJsX56Z92onk8tN6VYEr3CLUVzJ5ybEqrM264+f5E+/TJpv40fYlOZcIj3utt2iU7zvJeq15ImU/v0iSed/v1iXIvvvZ6EWj/WOmz/AFdPT5aiRmZHiHT01CwljkRHSvBtVs5NH1KWJPkRH+SvouaPzI3315j458OpJLv2f79eVWideHkchYatufY710EMyMn8P/XSuGubGTTZP9jfvrSsNY27E31wTidsonWW1rBI7v8AxpVi2s7bfL8j7/7j1y6X06yS75fk/grdsL540T+CrhEylSN22sYPn3onyfJWimnxeV8iJ/3xWNDdbU3p/wAAq59q+T53+5V8pkaUNrFG9D3Hk/uo0qk95HGm/f8AIiVRm1hI6xnEqETYmvP3Xzv/AN/KzLzXEhid3euc1jxVBYxu7v8AJs/jrznxD4qn1SV44v4/9uuacTspUu51GveJv7Q3pE/7pP8Ax+ues/3zvI7/AP2FZrzRzXCQQfIiJ8/8dadt/c2b/wDKVHIelSOp02T/AEPyXf566Gw2fZ0/jrl9K3zI8LutdVYWqQxIn3P4KjlMKsy7DaxySp8ifIla0Nqmz+Cq1nH8/wBz5ErRto0mTdW0IHBKQQx+c6bPuVY8lI7pE2fwU62h2v8AfrRSFPv7fnrshSOScyJ4X2VH5KfI/wDHVlP3j/J9ypfJ8z+Cuz2Rzcx//9k=",
      isPopupVisible: false,
      isCropperVisible: false,
      outoptions: { width: 300, height: 300 }
    };
  },
  methods: {
    getPhotoFromCamera() {
      navigator.camera.getPicture(
        data => {
          // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`;
          this.openCropper();
        },
        () => {
          // on fail
          this.$q.notify("Could not access device camera.");
        },
        {
          destinationType: 0,
          correctOrientation: true,
          sourceType: 1,
          cameraDirection: 1
        }
      );
    },
    getPhotoFromGallery() {
      this.imageSrc = this.testphoto;
      this.openCropper();
      // navigator.camera.getPicture(
      //   data => {
      //     // on success
      //     this.imageSrc = `data:image/jpeg;base64,${data}`;
      //     this.openSwiper();
      //   },
      //   () => {
      //     // on fail
      //     this.$q.notify("Could not access device camera.");
      //   },
      //   {
      //     destinationType: Camera.DestinationType.DATA_URL,
      //     sourceType: 0,
      //     correctOrientation: true,
      //     allowEdit: true
      //   }
      // );
    },
    closePopup() {
      this.currentDocument = undefined;
      this.$emit("blockToggle", false);
      this.isPopupVisible = false;
    },
    openPopup(document) {
      this.currentDocument = document;
      this.$emit("blockToggle", true);
      this.isPopupVisible = true;
    },
    cropperHandler(cropper) {
      this.currentDocument.photo = cropper
        .getCroppedCanvas()
        .toDataURL(this.cropperOutputMime);
      this.imageSrc = undefined;
      this.isPhotoSeted = true;
    },
    closeCropper() {
      this.$emit("blockToggle", false);
      this.isCropperVisible = false;
    },
    openCropper() {
      this.$emit("blockToggle", true);
      this.isCropperVisible = true;
    }
  }
};
</script>

<style lang="scss" module>
//$
.title {
  margin: 54px 0 26px;
}
.container {
  margin-bottom: 90px;
}
.header {
  margin-bottom: -10px;
  &_text {
    @include signature_12-16_semibold;
  }
  &_icon {
    color: $colorInteractive;
    position: absolute;
    right: 8px;
    width: 30px;
    height: 30px;
    z-index: 1;
  }
}
.photo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
