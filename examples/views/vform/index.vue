<template>
  <demo-wrapper title="VForm 表单">
    <demo-card>
      <v-form ref="form" v-model="form" :options="options">
        <template #smsCode="{scope}">
          <v-field
            v-model="form.smsCode"
            center
            clearable
            :label="scope.label"
            :placeholder="scope.placeholder"
          >
            <template #button>
              <van-button size="small" type="primary" native-type="button">发送验证码</van-button>
            </template>
          </v-field>
        </template>
      </v-form>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="button" @click="submit">提交</van-button>
      </div>
      <code>{{ form }}</code>
    </demo-card>
    <README/>
  </demo-wrapper>
</template>

<script>
import README from './README.md'

const defaultForm = {
  field: null,
  smsCode: null,
  tel: '15800066380',
  bankCard: null,
  money: null,
  autocomplete: '',
  switch: null,
  stepper: null,
  rate: null,
  slider: 50,
  range: [10, 50],
  radio: null,
  picker: null,
  datepicker: null,
}

const restaurants = [
  { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
  { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
  { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
  { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
  { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
  { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
  { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
  { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
  { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
  { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
  { 'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
  { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
  { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
  { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
  { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
  { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
  { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
  { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
  { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
  { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
  { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
  { 'value': '钱记', 'address': '上海市长宁区天山西路' },
  { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
  { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
  { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' },
  { 'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
  { 'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
  { 'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号' },
  { 'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号' },
  { 'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号' },
  { 'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号' },
  { 'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号' },
  { 'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室' },
  { 'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1' },
  { 'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号' },
  { 'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
  { 'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部' },
  { 'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B' },
  { 'value': '浏阳蒸菜', 'address': '天山西路430号' },
  { 'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路' },
  { 'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室' },
  { 'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号' },
  { 'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
  { 'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
  { 'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号' },
  { 'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼' },
  { 'value': '阳阳麻辣烫', 'address': '天山西路389号' },
  { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
]

export default {
  name: 'vform',
  data() {
    return {
      form: Object.assign({}, defaultForm),
      options: [
        {
          title: 'Field 相关',
          options: [
            {
              label: 'field',
              key: 'field',
              type: 'field',
              placeholder: 'field',
              clearable: true,
              required: true,
              rules: [
                { required: true, message: 'required.' }
              ]
            },
            {
              label: 'smsCode',
              key: 'smsCode',
              type: 'smsCode',
              placeholder: 'smsCode',
            },
            {
              label: 'tel',
              key: 'tel',
              type: 'tel',
              placeholder: 'tel',
              clearable: true,
            },
            {
              label: 'bankCard',
              key: 'bankCard',
              type: 'bankCard',
              placeholder: 'bankCard',
              clearable: true,
            },
            {
              label: 'money',
              key: 'money',
              type: 'money',
              placeholder: 'money',
              clearable: true,
            },
            {
              label: 'autocomplete',
              key: 'autocomplete',
              type: 'autocomplete',
              placeholder: 'autocomplete',
              clearable: true,
              fetchSuggestions(queryString, cb) {
                cb(restaurants)
              }
            },
          ]
        },
        {
          title: 'Switch 相关',
          options: [
            {
              label: 'switch',
              key: 'switch',
              type: 'switch',
            },
          ]
        },
        {
          title: 'Stepper 相关',
          options: [
            {
              label: 'stepper',
              key: 'stepper',
              type: 'stepper',
            },
          ]
        },
        {
          title: 'Rate 相关',
          options: [
            {
              label: 'rate',
              key: 'rate',
              type: 'rate',
            },
          ]
        },
        {
          title: 'Slider 相关',
          options: [
            {
              label: 'slider',
              key: 'slider',
              type: 'slider',
            },
            {
              label: 'range',
              key: 'range',
              type: 'slider',
              range: true
            },
          ]
        },
        {
          title: 'Radio 相关',
          options: [
            {
              label: 'radio',
              key: 'radio',
              type: 'radiobutton',
              columns: [
                { label: '上海', value: 1 },
                { label: '北京', value: 2, disabled: true },
                { label: '广州', value: 3 },
                { label: '深圳', value: 4 },
              ]
            },
          ]
        },
        {
          title: 'Picker 相关',
          options: [
            {
              label: 'picker',
              key: 'picker',
              type: 'picker',
              placeholder: 'picker',
              clearable: true,
              columns: [
                { label: '上海', value: 1 },
                { label: '北京', value: 2, disabled: true },
                { label: '广州', value: 3 },
                { label: '深圳', value: 4 },
              ]
            },
            {
              label: 'datepicker',
              key: 'datepicker',
              type: 'datepicker',
              placeholder: 'datepicker',
              clearable: true,
            },
          ]
        },
      ]
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(Object.keys(this.form)).then(() => {
        this.$toast('Success.')
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    README
  }
}
</script>