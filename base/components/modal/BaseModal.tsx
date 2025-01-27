import { ModalContainer } from "components/containers/ModalContainer";
import ModalHeader from "components/headers/ModalHeader";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Portal } from "react-native-portalize";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  show: boolean;
  title: string;
  handleClose: () => void;
  onClose?: () => void;
};

const BaseModal = ({ children, show, title, onClose, handleClose }: Props) => {
  useEffect(() => {
    if (onClose && !show) {
      onClose();
    }
  }, [show]);

  if (!show) return null;
  return (
    <Portal>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.modal}>
            <ModalHeader title={title} onPress={handleClose} />
            <View style={styles.modalContent}>{children}</View>
          </View>
        </SafeAreaView>
      </View>
    </Portal>
  );
};

export default BaseModal;

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  safeContainer: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  modalContent: {
    marginVertical: 20,
    paddingHorizontal: 20,
    maxHeight: "88%",
  },
});
