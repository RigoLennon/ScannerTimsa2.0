import React from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';

import styles from '../styles';

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default({
    capturing = false, 
    cameraType = CameraTypes.back,
    flashMode = CameraFlashModes.off,
    setFlashMode, setCameraType,
    onCaptureIn, onCaptureOut, onLongCapture, onShortCapture,
}) => (
    <View style={ styles.bottomToolbar }>
        <View>
            <View style={ styles.alignCenter }>
                <TouchableOpacity onPress={() => setFlashMode(
                    flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on
                )}>
                    <Ionicons  
                        name = {flashMode == CameraFlashModes.on ? "md-flash" : "md-flash-off"}
                        color = "white"
                        size = {30}
                    />
                </TouchableOpacity>
            </View>
            <View size = {2} style={styles.alignCenter}>
                <TouchableWithoutFeedback 
                    onPress = {onShortCapture}>
                        <View style = {[ styles.captureBtn, capturing && styles.captureBtnActive ]}>
                            { capturing && <View style={styles.captureBtnInternal} />}
                        </View>
                </TouchableWithoutFeedback>
            </View>
            <View style ={ styles.alignCenter }>
                <TouchableOpacity onPress={() => setCameraType(
                    cameraType === CameraTypes.back ? CameraTypes.front : CameraTypes.back
                )}>
                    <Ionicons 
                        name = "md-reverse-camera"
                        color = "white"
                        size = {30}
                    />
                </TouchableOpacity>
            </View>
        </View>
    </View>
)