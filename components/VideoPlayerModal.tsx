import React from 'react';
import {Modal, View, StyleSheet, Pressable, Text} from 'react-native';
import VideoPlayer from '../screens/VideoPlayerScreen';
import {useVideoModal} from './VideoPlayerModalContext';

const VideoPlayerModal = () => {
  const {videoModalVisible, closeVideoModal, selectedVideoInfo} =
    useVideoModal();

  return (
    <Modal
      visible={videoModalVisible}
      animationType="fade"
      onRequestClose={() => closeVideoModal}>
      <Pressable style={styles.modalBackground} onPress={closeVideoModal}>
        <Pressable>
          <View style={[styles.modalContent, styles.shadowPropBottom]}>
            {/*<Pressable onPress={closeVideoModal} style={styles.closeButton}>*/}
            {/*  <Text style={styles.buttonText}>CLICK ANYWHERE OUTSIDE OF PLAYER TO CLOSE WINDOW</Text>*/}
            {/*</Pressable>*/}
            <VideoPlayer route={{params: selectedVideoInfo}} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666',
  },
  modalContent: {
    backgroundColor: 'transparent',
    width: '100%',
    maxHeight: '100%',
    flexDirection: 'row',
  },
  shadowPropBottom: {
    shadowColor: '#000',
    shadowOffset: {width: -3, height: 3},
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  closeButton: {
    backgroundColor: 'transparent',
    padding: 5,
    position: 'absolute',
    left: 0,
    right: 0,
    top: -20,
  },
  buttonText: {
    fontSize: 9,
    color: '#ccc',
    textAlign: 'center',
  },
});

export default VideoPlayerModal;
