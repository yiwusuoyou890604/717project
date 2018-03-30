export default function mapStateToProps(state) {
    //便利cartList 计算总价
    let totalcost = 0;
    //全选
    let selectall = true
    state.cart_list.forEach((item, index) => {
        if (item.selected == 1) {
            totalcost += (item.discount_price * item.count)
        }
        if (item.selected == 0) {
            selectall = false
        }
    })
    return {
        cartList: state.cart_list,
        totalcost,
        selectall
    }
}