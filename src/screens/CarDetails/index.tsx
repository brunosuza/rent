import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as MOdelCar } from '../../database/model/Car';

import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
    OfflineInfo
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import api from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
    car: CarDTO;
}

export function CarDetails() {
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CatDTO);
    const navigation = useNavigation();
    const netInfo = useNetInfo();
    const route = useRoute();
    const { car } = route.params as Params;

    const theme = useTheme();

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    });

    const sliderCarStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    });

    function handleConfirmRental() {
        navigation.navigate('Scheduling', { car });
    }

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCarUpdated() {
            const response = await api.get(`/cars/${car.id}`);
            setCarUpdated(response.data);
        }

        if (netInfo.isConnected === true) {
            fetchCarUpdated();
        }
    }, [netInfo.isConnected]);

    return (
        <Container>
            <StatusBar 
                barStyle='dark-content'
                translucent
                backgroundColor='transparent'
            />

            <Animated.View 
                style={[
                    sliderCarStyleAnimation, 
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary}
            ]}>
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>
                <Animated.View style={sliderCarStyleAnimation}>
                    <CarImages>
                        <ImageSlider 
                            imagesUrl={
                                !!carUpdated.photos ? carUpdated.photos : car.photos} 
                        />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    padding: 24,
                    paddingTop: getStatusBarHeight() + 160,
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {
                            netInfo.isConnected === true ? car.price : '...'
                        }</Price>
                    </Rent>
                </Details>

                {
                    carUpdated.accessories && 
                    <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }
                    </Accessories>
                }
                
                <About>{car.about}</About>

            </Animated.ScrollView>

            <Footer>
                <Button 
                    title='Escolher período do aluguel' 
                    onPress={handleConfirmRental} 
                    enabled={netInfo.isConnected === true}    
                />

                {
                    netInfo.isConnected === false &&
                    <OfflineInfo>
                        Conecte-se a Internet para ver mais detalhes e agendar seu carro.
                    </OfflineInfo>
                }
            </Footer>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1,
    },

})