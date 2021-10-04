import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: 16px 16px 16px 0;
  width: 140px;
  height: 180px;
`;

export const BannerItem = styled.Image`
  width: 100%;
  height: 170px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  padding-top: 8px;
  color: #FFF;
  font-size: 14px;
`;

export const RateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Rate = styled.Text`
  margin-left: 4px;
  color: #FFF;
  font-size: 12px;
`;