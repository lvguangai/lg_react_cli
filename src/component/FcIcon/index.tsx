import { createFromIconfontCN } from '@ant-design/icons'

const FcIcon = createFromIconfontCN({
	scriptUrl: '/js/iconfont.js' // 在 iconfont.cn 上生成
})

const FcIconFile = createFromIconfontCN({
	scriptUrl: '/js/iconfontFile.js' // 在 iconfont.cn 上生成
})

export { FcIconFile }

export default FcIcon
