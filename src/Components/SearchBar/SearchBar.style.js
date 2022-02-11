import styled, { css } from 'styled-components';
import { Input, Select, Rate } from 'antd';

const Container = styled.div`
  position: relative;
  width: 40%;
  height: 100%;
  padding: 0 75px 0 20px;
  overflow-y: hidden;
`;

const Header = styled.header`
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  padding: 22px 0 32px 0;
`;

const Form = styled.form`
  position: relative;
`;

const InputContent = styled(Input)`
  margin-bottom: 36px;
`;

const InputTitle = styled.div`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 10px;
`;

const SelectAddress = styled(Select)`
  width: 98px;
  height: 32px;
  margin-right: 13px;
  margin-bottom: 30px;
`;

const RateContent = styled(Rate)`
  margin-bottom: 37px;
`;

const CategoryWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled.button`
  width: 166px;
  height: 40px;
  color: white;
  background: #73d13d;
  border-radius: 2px;
  border: 0;
  cursor: pointer;
  margin-bottom: 10px;
`;

const ButtonWrap = styled.div`
  position: absolute;
  right: 0;
  bottom: -150px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${(props) =>
    props.isResultOpen &&
    css`
      bottom: -70px;
    `}
`;

export const style = {
  Container,
  Header,
  Form,
  InputContent,
  InputTitle,
  SelectAddress,
  RateContent,
  CategoryWrap,
  Button,
  ButtonWrap,
};