import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 14px;
`;

export const Title = styled.Text`
  color: #FFF;
  font-size: ${props => props.size}px;
  font-weight: bold;
`;

export const RateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

export const Rate = styled.Text`
  color: #FFF;
  font-size: 12px;
  padding-left: 4px;
`;

export const ActionContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DetailsButton = styled.TouchableOpacity`
  width: 85%;
  height: 30px;
  background: #E72F49;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;

export const DeleteButton = styled.TouchableOpacity`
  width: 15%;
  height: 30px;
  align-items: center;
  justify-content: center;
`;