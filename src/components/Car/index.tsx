import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();//Esse aqui
IconMaterial.loadFont();
import GasolineSvg from '../../assets/gasoline.svg';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as MOdelCar } from '../../database/model/Car';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage
} from './styles';
import { useNetInfo } from '@react-native-community/netinfo';

interface Props extends RectButtonProps {
    data: /*ModelCar;*/CarDTO;
}

export function Car({ data, ...rest }: Props) {

    const netInfo = useNetInfo();
    const MotorIcon = getAccessoryIcon(data.fuel_type);
    
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>

                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>{`R$ ${ netInfo.isConnected === true ? data.price : '...'}`}</Price>
                    </Rent>

                    <Type>
                        {
                            MotorIcon === 'car-electric' || MotorIcon === 'car' ? 
                            <IconMaterial name={MotorIcon} size={30} /> :
                            <Icon name={MotorIcon} size={30} />
                        }
                       {/*<GasolineSvg />  */}
                    </Type>
                </About>
            </Details>

            <CarImage 
                source={{ uri: data.thumbnail }} 
                resizeMode='contain'
            />
        </Container>
    );
}