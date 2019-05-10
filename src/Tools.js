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

    static alertPicker(pickerType, sureText, title, cancelText, onSureCallback, onCancelCallback) {
        let pickerView = this.alertPullView(
            <DatePicker
                pickerType={pickerType}
                sureText={sureText}
                cancelText={cancelText}
                title={title}
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