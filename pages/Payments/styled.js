import { StyleSheet } from 'react-native';
import { Colors, Gaps } from '../../shared/tokens';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.gray50,
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginLeft: 16,
    marginTop: 14,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardsList: {
    flex: 1,
  },
  cardItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardInfo: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  cardHolder: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  expiryDate: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: Gaps.g16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '95%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: Gaps.g16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: Gaps.g12,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  buttonContainer: {
    marginTop: Gaps.g16,
    gap: Gaps.g12,
  },
  submitButton: {
    marginBottom: Gaps.g8,
  },
  cancelButton: {
    backgroundColor: Colors.gray200,
  },
  disabledCard: {
    opacity: 0.5,
    backgroundColor: '#f0f0f0',
  },
  disabledText: {
    color: '#a0a0a0',
  },
  title: {
    marginLeft: 16,
    marginTop: 14,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
