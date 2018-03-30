const Mock=require('mockjs');
const {Random}=Mock
const fs=require('fs')
let arr=['热销','套餐','烧饼类','进店必买','酱肉类','凉菜类','汤类','饮料']
Random.extend({
    mealType:()=>{
        
        let item=Random.pick(arr)
        let idx=arr.indexOf(item)
        let deleted=arr.splice(idx,1)
        return item
    }
})
let res=Mock.mock({
    "success":1,
    "info":"请求成功",
    "code":1001,
    "list|8":[
        {
            "cataid":1,
            "title":()=>Random.mealType(),
            "goodslist|6":[
                {
                    // "goods_id":()=>Random.,
                    "goods_name":()=>Random.cword(2,5),//随机中文字
                    "detail":()=>Random.cparagraph(),//随机描述
                    "price":()=>Random.natural(1,99),//随机价格
                    "img":()=>Random.image('800x800',Random.color(),'#fff','png','!')//随机图片
                    // "store_id":,
                    // "store_name":
                }
            ]
        }
    ]
})

fs.writeFileSync('meal.json',JSON.stringify(res))