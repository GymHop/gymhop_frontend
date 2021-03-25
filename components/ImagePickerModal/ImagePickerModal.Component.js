import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import styles from './ImagePickerModal.Styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { totalSize } from 'react-native-dimension';
class ModalComponent extends React.Component {
    render() {
        
        return (<Modal isVisible={this.props.isVisible} >
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeContainer} onPress={this.props.onClose}>
                    <AntDesign name="closecircle" size={totalSize(3.5)} color="#000000" />
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.picOption} onPress={this.props.imageFromCamera}>
                        <MaterialIcons name="photo-camera" size={totalSize(3.7)} color="black" />
                        <Text style={styles.picOptionText}>Take Photo</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity style={styles.picOption} onPress={this.props.imageFromGallery}>
                        <MaterialIcons name="insert-photo" size={totalSize(3.7)} color="black" />
                        <Text style={styles.picOptionText}>Choose from Gallery</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>)
    }
}
export default ModalComponent;