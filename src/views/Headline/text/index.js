import React from 'react'
import Icon from 'components/Icon-svg'
import connect from 'connect'
@connect
export default class extends React.Component {
    state = {
        val: '',
        input: null
    }
    componentDidMount () {
        this.refs.text.focus()
    }
    handleChange (val) {
        this.setState({val})
    }
    async send () {
        const {onClose, addHeadlineList, showAlert, showLoading, hideLoading} = this.props
        const {val} = this.state
        if (!val) {
            showAlert({
                content: '请输入你的分享内容!'
            })
            return
        }
        showLoading()

        await addHeadlineList({
            intro: val,
            name: 'cd'
        })
        hideLoading()

        onClose()
    }
    render () {
        const {val} = this.state
        return (
            <div className={`text-wrapper ${this.props.className}`}>
                <div className="title df-sb border-half-bottom">
                    <div className="t-l" onClick={this.props.onClose}>取消</div>
                    <div className="t-r t-disable" className={val ? 't-active':''} onClick={this.send.bind(this)}>发布</div>
                </div>
                <div className="text-box">
                    <textarea placeholder="分享新鲜事..." ref="text" value={val} onChange={e => {this.handleChange(e.target.value)}}></textarea>
                </div>
            </div>
        )
    }
}



// <template>
//     <div class="text-wrapper">
//         <div class="title df-sb border-half-bottom">
//             <div class="t-l" @click="$emit('close')">取消</div>
//             <div class="t-r t-disable" :class="{'t-active': val}" @click="send">发布</div>
//         </div>
//         <div class="text-box">
//             <textarea placeholder="分享新鲜事..." v-model="val" ref="text"></textarea>
//         </div>
//     </div>
// </template>
// <script>
//     export default {
//         data () {
//             return {
//                 val: ''
//             }
//         },
//         mounted () {
//             this.$refs.text.focus()
//         },
//         methods: {
//             async send () {
//                 await this.$store.dispatch('addHeadline', {
//                     intro: this.val,
//                     name: this.$store.state.user.user.name
//                 })
//                 this.$emit('close')
//             }
//         }
//     }
// </script>
// <style lang="less" scoped>
    
// </style>