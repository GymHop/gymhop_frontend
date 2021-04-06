
import { StyleSheet } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        width: width(70),
        borderRadius: 20,
        alignSelf: 'center',
        paddingBottom: height(3)
    },
    closeContainer: {
        width: width(70),
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginTop: width(4),
        justifyContent: 'space-between',
        paddingHorizontal: width(4)
    },
    buttonContainer: {
        width: width(70),
        height: height(15),
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    },
    picOption: {
        paddingLeft: width(8),
        alignItems: 'center',
        flexDirection: 'row'
    },
    picOptionText: {
        marginLeft: width(2),
        fontSize: totalSize(2)
    },
    line: {
        width: '70%',
        alignSelf: 'center',
        backgroundColor: 'gray',
        height: 0.5
    }
});
export default styles;