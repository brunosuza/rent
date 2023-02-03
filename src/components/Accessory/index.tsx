import React from 'react';
import { SvgProps } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components';

import {
    Container,
    Name
} from './styles';
import { IconBase } from 'react-icons/lib';

interface Props {
    name: string;
   // icon: React.FC<SvgProps>
   icon: string;
}

export function Accessory({name, icon}:Props) {
    const theme = useTheme();

    return (
        <Container>
            {/*<Icon width={32} height={32} />*/}
            {
                icon == 'speed' || icon === 'directions-car' ?  
            <MaterialIcons
                name={icon}
                size={24}
                fill={theme.colors.header}
            /> : 
            <Icon
                name={icon}
                size={24}
                fill={theme.colors.header}
            />
            }
            <Name>{name}</Name>
        </Container>
    );
}