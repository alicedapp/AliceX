/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modalize from 'react-native-modalize';

export default class ModalizeModal extends React.PureComponent {
  modal = React.createRef();

  renderContent = () => (
    <View style={styles.content}>
      <Text style={styles.content__heading}>Article title</Text>
      <Text style={styles.content__paragraph}>
        rkslajnf ndg dnfgkjnsdkjgndlkjngdjkf ngjkd ngjkl ndflg jkndfj ngdlkj nglsdfkjn gfkdjn gjdkfn
        gkdjfn ldkjn fslkjndfgkjs ndklgjn dfkjn gkjdfn gkdjfn glkjdnf glkjsnglkjn slkj ngkj nsdfgkj
        nsdfkj gnkdfjn gkjdsn gkljsn gjkfdn glkj nsgjkldf ngsljk ndfg
      </Text>
    </View>
  );

  onClosed = () => {
    const { onClosed } = this.props;

    if (onClosed) {
      onClosed();
    }
  };

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <Modalize
        ref={this.modal}
        onClosed={this.onClosed}
        handlePosition="outside"
        adjustToContentHeight
      >
        {children}
      </Modalize>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 15,
  },

  content__heading: {
    marginVertical: 10,

    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: '200',
    lineHeight: 22,
    color: '#666',
  },

  modal: {
    margin: 20,

    backgroundColor: '#cac9dd',
    borderRadius: 20,

    shadowOpacity: 0,
  },

  overlay: {
    backgroundColor: 'rgba(41, 36, 107, 0.9)',
  },

  handle: {
    width: 150,

    backgroundColor: '#b0afbc',
  },
});
