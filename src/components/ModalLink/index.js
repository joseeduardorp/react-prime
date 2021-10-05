import React from 'react';
import { WebView } from 'react-native-webview';

import { Feather } from '@expo/vector-icons';

import { Name, BackButton } from './styles';

export default function ModalLink({ link, title, closeModal }) {
  return (
    <>
      <BackButton onPress={closeModal} activeOpacity={.85}>
        <Feather name="x" size={35} color="#FFF" />

        <Name numberOfLines={1}>{title}</Name>
      </BackButton>

      <WebView
        source={{ uri: link }}
      />
    </>
  );
}