'use strict';
import React, {Component} from 'react';
import {DatePicker} from './DatePicker'
import {Overlay} from 'teaset'
import {Dimensions} from "react-native";

const {height, width, scale} = Dimensions.get('window');

export default class Tools {
    //设计尺寸 1334*750  (ios 2x)
    /*
     * 获取等比例 设备宽度
     * */
    static getWidth(w) {
        return (w / 750) * width
    }

    /*
       * 获取等比例 设备高度//18:9高度转换16:9屏幕高度
       * */
    static getHeight(h) {
        return (h / 1334) * height
    }
    /**
     * 检测日期是否合法
     * @param date
     * @returns {*}
     */
    static checkLegalDate(date) {
        return Number(new Date(date).getDate()) === Number(date.substring(date.length - 2)) || console.error('非法日期=>', date)
    }

    /**
     * 正则表达匹配
     * @param re
     * @param str
     * @returns {*}
     */
    static regularStr(re, str) {
        return re.test(str)
    }

    static alertPullView(view, style) {
        return Overlay.show(
            <Overlay.PullView
                overlayOpacity={style && style.overlayOpacity || 0.5}
                side={style && style.side || 'bottom'}
                modal={style && style.modal || false}
                style={[{
                    height: height,
                    width: width,
                    justifyContent: 'flex-end'
                }, style && style]}>{view}</Overlay.PullView>)
    }

    /**
     * 时间选择器
     * @param pickerValue  date=>年月日选择     dateTime=>年月日时分秒选择     time=>时分秒选择
     * @param onSureCallback
     * @param onCancelCallback
     */
    static alertPicker(pickerValue, onSureCallback, onCancelCallback) {
        let pickerView = Tools.alertPullView(
            <DatePicker
                pickerType={pickerValue.pickerType}
                itemHeight={pickerValue.itemHeight}
                cancelTextStyle={pickerValue.cancelTextStyle}
                cancelTouchStyle={pickerValue.cancelTouchStyle}
                sureTouchStyle={pickerValue.sureTouchStyle}
                sureTextStyle={pickerValue.sureTextStyle}
                titleTextStyle={pickerValue.titleTextStyle}
                textViewStyle={pickerValue.textViewStyle}
                textStyle={pickerValue.textStyle}
                showUnit={pickerValue.showUnit}//是否显示年月日时分秒
                sureText={pickerValue.sureText}
                defaultSelectTime={pickerValue.defaultSelectTime}//暂不支持time类型
                pickerTimeInterval={pickerValue.pickerTimeInterval}//暂不支持time类型
                cancelText={pickerValue.cancelText}
                title={pickerValue.title}
                onSure={(v) => {
                    Overlay.hide(pickerView)
                    return onSureCallback && onSureCallback(v)
                }}
                onCancel={() => {
                    Overlay.hide(pickerView)
                    return onCancelCallback && onCancelCallback()
                }}/>
        )
    }

}