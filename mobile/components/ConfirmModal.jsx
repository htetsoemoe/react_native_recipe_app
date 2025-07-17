import { 
    Modal,
    View, 
    Text,
    TouchableOpacity,
} from 'react-native'
import { confirmModalStyles } from '../assets/styles/confirmModal.styles'


const ConfirmModal = ({visible, onConfirm, onCancel}) => {
  return (
    <Modal transparent visible={visible} animationType='fade'>
        <View style={confirmModalStyles.overlay}>
            <View style={confirmModalStyles.modalContainer}>
                <Text style={confirmModalStyles.title}>Remove Recipe</Text>
                <Text style={confirmModalStyles.message}>Are you sure you want to remove this recipe from your favorites?</Text>
                <View style={confirmModalStyles.buttonRow}>
                      <TouchableOpacity onPress={onConfirm} style={confirmModalStyles.confirmBtn}>
                        <Text style={confirmModalStyles.confirmText}>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onCancel} style={confirmModalStyles.cancelBtn}>
                          <Text style={confirmModalStyles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
}

export default ConfirmModal