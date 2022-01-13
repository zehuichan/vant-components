import './index.less'

export default {
  name: 'VTable',
  props: {
    bordered: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    summary: {
      type: Function,
      default: null
    },
    striped: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cellClasses() {
      return (item) => ({
        'v-table__main__head__tr--border': this.bordered,
        [`v-table__main__head__tr--align${item.align ? item.align : ''}`]: true
      })
    },
    getColumnItem() {
      return (value) => this.columns.filter((item) => item.key === value)[0]
    },
  },
  render() {
    const renderMainHead = () => (
      <div class="v-table__main__head">
        <div class="v-table__main__head__tr">
          {
            this.columns.map((item) => (
              <span class={['v-table__main__head__tr__th', this.cellClasses(item)]}>{item.title}</span>
            ))
          }
        </div>
      </div>
    )

    const renderMainBody = () => (
      <div class="v-table__main__body">
        {
          this.data.map((item) => (
            <div class="v-table__main__body__tr">
              {
                Object.keys(item).map((value) => (
                  <span class={['v-table__main__body__tr__td', this.cellClasses(this.getColumnItem(value))]}>
                    {item[value]}
                  </span>
                ))
              }
            </div>
          ))
        }
      </div>
    )

    const renderSummary = () => (
      <div class="v-table__summary">
        <span class="v-table__summary__text" vHtml={this.summary().value}/>
      </div>
    )

    const renderNodata = () => (
      <div class="v-table__nodata">
        <div class={['v-table__nodata', { 'v-table__nodata--border': this.bordered }]}>
          {
            this.$scopedSlots.nodata
              ? this.$scopedSlots.nodata()
              : <div className="v-table__nodata__text"> 暂无数据 </div>
          }
        </div>
      </div>
    )

    return (
      <div class="v-table">
        <div class={['v-table__main', { 'v-table__main--striped': this.striped }]}>
          {renderMainHead()}
          {renderMainBody()}
        </div>
        {this.summary && renderSummary()}
        {!this.data.length && renderNodata()}
      </div>
    )
  }
}