'use strict';
import React, {Component} from 'react';
import Tools from './Tools'
import {Wheel} from "teaset";
import {Button, CenterView, TouchView} from "./Component";
import {Dimensions} from "react-native";

const {height, width, scale} = Dimensions.get('window');

export class DatePicker extends Component {
    /*
     * pickerType:
     *       date        =>年月日选择
     *       dateTime    =>年月日时分秒选择
     *       time        =>时分秒选择
     * */

    constructor(props) {
        super(props);
        this.itemHeight = props.itemHeight || Tools.getHeight(35)
        this.pickerType = props.pickerType || 'dateTime'
        this.title = props.title || 'Select'
        this.cancelText = props.cancelText || 'cancel'
        this.sureText = props.sureText || 'sure'
        this.cancelTextStyle = props.cancelTextStyle || {}
        this.cancelTouchStyle = props.cancelTouchStyle || {}
        this.sureTouchStyle = props.sureTouchStyle || {}
        this.sureTextStyle = props.sureTextStyle || {}
        this.titleTextStyle = props.titleTextStyle || {}
        this.textStyle = props.textStyle || {color: '#DCDCDC'}
        this.textViewStyle = this.props.textViewStyle || {
            marginTop: this.itemHeight * 2,
            height: this.itemHeight,
            justifyContent: 'center',
            alignItems: 'center'
        }
        this.onSure = props.onSure
        this.onCancel = props.onCancel
        this.pickerTimeInterval = props.pickerTimeInterval || ['2019-01-01', '2029-01-01']
        this.startDateTime = this.pickerTimeInterval[0]
        this.endDateTime = this.pickerTimeInterval[1]
        this.state = {
            years: this.returnYears(),
            months: this.returnNum(13, 1),
            days: this.returnNum(32, 1),
            hours: this.returnNum(24, 0),
            minutes: this.returnNum(60, 0),
            seconds: this.returnNum(60, 0),
        };
        this.showUnit = props.showUnit || true
        this.selectYears = '2019'
        this.selectMonths = '01'
        this.selectDays = '01'
        this.selectHours = '00'
        this.selectMinutes = '00'
        this.selectSeconds = '00'
    }


    returnSelect = () => {
        switch (this.pickerType) {
            case 'date':
                return this.selectYears + '-' + this.selectMonths + '-' + this.selectDays
            case 'dateTime':
                return this.selectYears + '-' + this.selectMonths + '-' + this.selectDays + ' ' + this.selectHours + ':' + this.selectMinutes + ':' + this.selectSeconds
            case 'time':
                return this.selectHours + ':' + this.selectMinutes + ':' + this.selectSeconds
        }
        return 1
    }

    isLeapYearMethod = (year) => {
        const cond1 = year % 4 === 0;
        const cond2 = year % 100 !== 0;
        const cond3 = year % 400 === 0;
        if (cond1 && cond2 || cond3) {
            return true;
        } else {
            return false;
        }
    }
    returnNum = (num, startI) => {
        let numList = []
        for (let i = startI; i < num; i++) {
            let h
            if (i < 10) {
                h = '0' + i
            } else {
                h = i.toString()
            }
            numList.push(h)
        }
        return numList
    }
    returnYears = () => {
        const startYear = new Date(this.startDateTime).getFullYear()
        const endYear = new Date(this.endDateTime).getFullYear()
        let yearsList = []
        for (let i = 0; i < (endYear - startYear); i++) {
            yearsList.push(startYear + i)
        }
        return yearsList
    }


    renderWheel = (pickerType) => {
        let view = <TouchView/>
        let itemWidth = 80
        switch (pickerType) {
            case 'date':
                itemWidth = (width - Tools.getWidth(30)) / 5
                view = <TouchView style={{flexDirection: 'row'}}>
                    {this.renderWheelItem(this.state.years, itemWidth, (selectValue) => {
                        this.selectYears = this.state.years[selectValue]
                        this.leapYear(selectValue)
                    })}
                    {this.showUnit && this.renderTextItem('年')}
                    {this.renderWheelItem(this.state.months, itemWidth, (selectValue) => {
                        this.selectMonths = this.state.months[selectValue]
                        this.sizeMonth(selectValue)
                    })}
                    {this.showUnit && this.renderTextItem('月')}
                    {this.renderWheelItem(this.state.days, itemWidth, (selectValue) => {
                        this.selectDays = this.state.days[selectValue]
                    })}
                    {this.showUnit && this.renderTextItem('日')}
                </TouchView>
                break;
            case 'dateTime':
                itemWidth = (width - Tools.getWidth(35)) / 8
                view = <TouchView style={{flexDirection: 'row'}}>
                    {this.renderWheelItem(this.state.years, itemWidth, (selectValue) => {
                        this.selectYears = this.state.years[selectValue]
                        this.leapYear(this.state.years[selectValue])
                    })}
                    {this.showUnit && this.renderTextItem('年')}
                    {this.renderWheelItem(this.state.months, itemWidth, (selectValue) => {
                        this.selectMonths = this.state.months[selectValue]
                        this.sizeMonth(selectValue)
                    })}
                    {this.showUnit && this.renderTextItem('月')}
                    {this.renderWheelItem(this.state.days, itemWidth, (selectValue) => {
                        this.selectDays = this.state.days[selectValue]
                    })}
                    {this.showUnit && this.showUnit && this.renderTextItem('日')}
                    {this.renderWheelItem(this.state.hours, itemWidth, (selectValue) => {
                        this.selectHours = this.state.hours[selectValue]
                    })}
                    {this.showUnit && this.renderTextItem('时')}
                    {this.renderWheelItem(this.state.minutes, itemWidth, (selectValue) => {
                        this.selectMinutes = this.state.minutes[selectValue]
                    })}
                    {this.showUnit && this.renderTextItem('分')}
                    {this.renderWheelItem(this.state.seconds, itemWidth, (selectValue) => {
                        this.selectSeconds = this.state.seconds[selectValue]
                    })}
                    {this.showUnit && this.renderTextItem('秒')}
                </TouchView>
                break;
            case 'time':
                itemWidth = (width - Tools.getWidth(30)) / 5
                view = <TouchView style={{flexDirection: 'row'}}>
                    {this.renderWheelItem(this.state.hours, itemWidth, (selectValue) => {
                        this.selectHours = this.state.hours[selectValue]
                    })}
                    {this.showUnit && this.renderTextItem('时')}
                    {this.renderWheelItem(this.state.minutes, itemWidth, (selectValue) => {
                        this.selectMinutes = this.state.minutes[selectValue]
                    })}
                    {this.showUnit && this.renderTextItem('分')}
                    {this.renderWheelItem(this.state.seconds, itemWidth, (selectValue) => {
                        this.selectSeconds = this.state.seconds[selectValue]
                    })}
                    {this.showUnit && this.renderTextItem('秒')}
                </TouchView>
                break;
        }
        return (view)
    }
    renderTextItem = (text) => {
        return (<Button buttonStyle={this.textViewStyle} textStyle={this.textStyle}>{text}</Button>)
    }
    leapYear = (selectYear) => {
        if (this.selectMonths === '02') {
            if (this.isLeapYearMethod(selectYear)) {
                this.setState({
                    days: this.returnNum(30, 1),
                },)
            } else {
                this.setState({
                    days: this.returnNum(29, 1),
                })
            }
        }
    }
    sizeMonth = (selectValue) => {
        if (selectValue === 3 || selectValue === 5 || selectValue === 8 || selectValue === 10) {
            this.setState({
                days: this.returnNum(31, 1),
            })
        } else if (selectValue === 1) {
            if (this.isLeapYearMethod(this.selectYears)) {
                this.setState({
                    days: this.returnNum(30, 1),
                },)
            } else {
                this.setState({
                    days: this.returnNum(29, 1),
                })
            }
        } else {
            this.setState({
                days: this.returnNum(32, 1),
            })
        }
    }


    render() {
        return (
            <TouchView style={{
                backgroundColor: '#fff',
                width: width,
            }}>
                <TouchView style={{
                    paddingVertical: Tools.getHeight(8),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: Tools.getWidth(10),
                    alignItems: 'flex-end',
                }}>
                    <Button
                        textStyle={[{color: '#000'}, this.cancelTextStyle]}
                        bottonStyle={[{padding: 2}, this.cancelTouchStyle]}
                        onPress={this.onCancel}>
                        {this.cancelText}
                    </Button>
                    <Button textStyle={[{
                        padding: 2,
                        color: '#000',
                        fontSize: 16
                    }, this.titleTextStyle]}>{this.title}</Button>
                    <Button
                        textStyle={[{color: '#000'}, this.sureTextStyle]}
                        bottonStyle={[{padding: 2}, this.sureTouchStyle]}
                        onPress={() => {
                            this.props.onSure(this.returnSelect())
                        }}>
                        {this.sureText}
                    </Button>
                </TouchView>
                <CenterView style={{
                    height: this.itemHeight * 6,
                    borderTopWidth: 1,
                    paddingTop: Tools.getHeight(10),
                    borderColor: '#00000030'
                }}>
                    {this.renderWheel(this.pickerType)}
                </CenterView>
            </TouchView>
        );
    }

    renderWheelItem = (list, itemWidth, selectValue) => {
        if (list.length > 0) {
            return (<Wheel
                items={list}
                style={{height: this.itemHeight * 5, width: itemWidth}}
                itemStyle={{textAlign: 'center'}}
                onChange={(v) => {
                    return selectValue(v)
                }}/>)
        }
    }

}