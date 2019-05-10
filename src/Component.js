'use strict';
import React, {Component} from 'react';
import {
    Text, Image, View,
    TouchableOpacity,
} from 'react-native';
/**
 * 自定义 点击按钮
 */
export class TouchView extends Component {
    constructor(props) {
        super(props);
        if (this.props.onPress) this.time = 0;  // 上次点击时间
    }

    render() {
        if (this.props.onPress) {
            return (
                <TouchableOpacity
                    {...this.props}
                    activeOpacity={this.props.activeOpacity ? this.props.activeOpacity : this.props.onPress ? 0.36 : 1}
                    onPress={() => {
                        if (this.props.onPress) {
                            let now = new Date().getTime();
                            if ((now - this.time) < 200) return;
                            this.time = now;
                            this.props.onPress();
                        }
                    }}>
                    {this.props.children}
                </TouchableOpacity>
            );
        } else {
            return (<View
                {...this.props}>
                {this.props.children}
            </View>)

        }
    }
}


/**
 * 自定义 CenterView
 *
 * style  //样式
 */
export class CenterView extends Component {
    render() {
        return (<TouchView
                {...this.props}
                onPress={this.props.onPress}
                style={[{
                    alignItems: 'center',
                    justifyContent: 'center',
                }, this.props.style]}>
                {this.props.children}
            </TouchView>
        )

    }
}

/**
 * 自定义 Button
 */
export class Button extends Component {
    render() {
        return (
            <CenterView
                {...this.props}
                style={this.props.buttonStyle}
                onPress={this.props.onPress}>
                <Text
                    {...this.props}
                    style={this.props.textStyle}>
                    {this.props.children}
                </Text>
            </CenterView>
        );
    }
}