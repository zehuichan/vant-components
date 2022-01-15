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
    showSummary: {
      type: Boolean,
      default: false
    },
    summary: String,
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
              <div class={['v-table__main__head__tr__th', this.cellClasses(item)]}>
                <div class="cell">{item.label}</div>
              </div>
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
                  <div class={['v-table__main__body__tr__td', this.cellClasses(this.getColumnItem(value))]}>
                    <div class="cell">
                      {
                        this.$scopedSlots[this.getColumnItem(value).key]
                          ? this.$scopedSlots[this.getColumnItem(value).key]({ scope: item })
                          : item[value]
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    )

    const renderSummary = () => (
      <div class="v-table__summary">
        {
          this.$scopedSlots.summary
            ? this.$scopedSlots.summary()
            : <span class="v-table__summary__text">{this.summary}</span>
        }
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
        {!this.data.length && renderNodata()}
        {this.showSummary && renderSummary()}
      </div>
    )
  }
}