import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Text, TouchableOpacity, View, TextInput, ActivityIndicator} from 'react-native'

import styles from './styles'
import VectorIcon from "../VectorIcon";
import {Dropdown} from "react-native-material-dropdown";
import {Activity_category} from "../../Lib/AppConstants";
import {Colors} from "../../Themes";


export default class ActivityInputItem extends Component {
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.string,
        iconName: PropTypes.string,
        iconType: PropTypes.string,
        onPress: PropTypes.function,
        onChangeText: PropTypes.function,
        onChangeCategory: PropTypes.function,
        type: PropTypes.string,
        fetchingCurrentLocation: PropTypes.boolean
    }
    static defaultProps = {
        label: '',
        value: '',
        type: '',
        iconName: 'my-location',
        iconType: 'MaterialIcons',
        onPress: () => {
        },
        onChangeText: () => {
        },
        onChangeCategory: () => {
        },
        onIconPress: () => {
        },
        fetchingCurrentLocation: false
    }


    renderInput = () => {
        const {type, value, label, onChangeCategory} = this.props
        switch (type) {
            case 'input':
                return <Text
                    style={styles.textInput}>{`$ ${value}`}</Text>
            case 'dropdown':
                return <Dropdown
                    value={value}
                    baseColor={Colors.transparent}
                    onChangeText={onChangeCategory}
                    dropdownOffset={styles.dropdownOffset}
                    containerStyle={styles.dropdownContainer}
                    data={Activity_category}/>
            default:
                return <Text style={[styles.value, label === value && {color: Colors.grayI}]}>{value}</Text>

        }
    }

    render() {
        const {onPress, label, iconName, iconType, onIconPress, fetchingCurrentLocation} = this.props
        return (
            <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.valueContainer}>
                    {this.renderInput()}
                    {fetchingCurrentLocation ?
                        <ActivityIndicator animating={true} color={Colors.themeColor} size={'small'}/> :
                        <TouchableOpacity style={styles.iconContainer}
                                          disabled={!onIconPress}
                                          onPress={onIconPress}>
                            <VectorIcon name={iconName} type={iconType} style={styles.icon}/>
                        </TouchableOpacity>}
                </View>
            </TouchableOpacity>
        )
    }
}
