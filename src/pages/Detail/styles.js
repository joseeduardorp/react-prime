import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #191A30;
`;

export const Header = styled.View`
  padding: 0 14px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 99;

  position: absolute;
  top: 35px;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  background-color: rgba(25, 26, 48, .8);
  border-radius: 23px;
  align-items: center;
  justify-content: center;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 350px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

export const ButtonLink = styled.TouchableOpacity`
  background-color: #E72F49;
  width: 63px;
  height: 63px;
  border-radius: 35px;

  align-items: center;
  justify-content: center;
  z-index: 99;

  position: absolute;
  top: 320px;
  right: 14px;
`;

export const Title = styled.Text`
  color: #FFF;
  font-size: 22px;
  font-weight: bold;
  margin: 35px 14px 8px;
`;

export const ContentArea = styled.View`
  padding: 0 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Rate = styled.Text`
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
`;

export const ListGenres = styled.FlatList`
  padding-left: 14px;
  margin: 8px 0;
  max-height: 35px;
  min-height: 35px;
`;

export const Description = styled.Text`
  padding: 0 14px 30px;
  color: #FFF;
  font-size: 14px;
  line-height: 20px;
`;