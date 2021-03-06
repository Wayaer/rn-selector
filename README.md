
# rn-selector
基于[@rilyu/Teaset {Wheel}](https://github.com/rilyu/teaset/blob/master/components/Wheel/Wheel.js) 二次开发，封装时间选择器

![Image text](src/res/android.png)
![Image text](src/res/ios.png)



#属性

```pickerType || 'dateTime'  类型  

   
    /* pickerType:
     *       date        =>年月日选择
     *       dateTime    =>年月日时分秒选择
     *       time        =>时分秒选择
     */
     
 itemHeight         单层item高度
 
 title || 'Select'  头部文字
 
 cancelTextStyle    取消文字样式
 
 cancelTouchStyle   取消触摸区域样式
 
 sureTextStyle      确定文字样式
 
 sureTouchStyle     确定触摸区域样式
 
 titleTextStyle     头部文字样式
 
 showUnit || true  是否显示文字（年月日）
 
 pickerTimeInterval || ['2019-01-01', '2029-01-01']   选择时间区间
 
 defaultSelectTime: '2019-02-28 03:04:05',  默认选中时间  //不支持time类型
 
 ```

 
 
#事件
```
onSure     确定 回调

onCancel   取消 回调
```


#例

```
   RNSelector.alertPicker({
            showUnit: true, itemHeight: 30,
            showUnit={pickerValue.showUnit}//是否显示年月日时分秒 文字
            pickerType: 'dateTime', //time date dateTime
            defaultSelectTime: '2019-02-28 03:04:05',    //不支持time类型
            pickerTimeInterval: ['2018-01-12 23:34:45', '2026-01-07 23:34:45'],  //不支持time类型
            sureText: '确定', title: '时间选择器', cancelText: '取消',
        }, (time) => {
            Utils.Toast(time)

        }, () => {

        })
```