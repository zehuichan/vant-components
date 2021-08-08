import Time from './time'

export default {
	name: 'VTime',
	props: {
		value: {
			type: [Number, Date, String],
			required: true
		},
		// 'relative', 'date', 'datetime'
		type: {
			type: String,
			default: 'relative'
		},
	},
	data() {
		return {
			date: ''
		}
	},
	created() {
		this.setTime()
	},
	methods: {
		setTime() {
			const type = typeof this.value
			let time

			if (type === 'number') {
				const timestamp = this.value.toString().length > 10 ? this.value : this.value * 1000
				time = (new Date(timestamp)).getTime()
			} else if (type === 'object') {
				time = this.value.getTime()
			} else if (type === 'string') {
				time = (new Date(this.value)).getTime()
			}

			if (this.type === 'relative') {
				this.date = Time(time)
			} else {
				const date = new Date(this.value)
				const year = date.getFullYear()
				const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
				const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
				const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
				const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
				const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

				if (this.type === 'datetime') {
					this.date = `${year}-${month}-${day} ${hour}:${minute}:${second}`
				} else if (this.type === 'date') {
					this.date = `${year}-${month}-${day}`
				}
			}
		}
	},
	render() {
		return (
			<span class="v-timeago">{this.date}</span>
		)
	}
}