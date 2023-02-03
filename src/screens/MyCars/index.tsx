import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/model/Car'; 
import { format, parseISO } from 'date-fns';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import { LoadAnimation } from '../../components/LoadAnimation';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate
} from './styles';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

interface DataProps {
    id: string;
    car: ModelCar;
    start_date: string;
    end_date: string;
}

export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading]= useState(true);
    const navigation = useNavigation();
    const theme = useTheme();
    const screenIsFocus = useIsFocused();

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get(`/schedules_byuser?user_id=1`);
                setCars(response.data);
            } catch(error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCars();
    const screenIsFocus = useIsFocused();
    }, [screenIsFocus]);

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle='light-content'
                    translucent
                    backgroundColor='transparent'
                />
                <BackButton
                    onPress={handleBack}
                    color={theme.colors.shape}
                />
                <Title>
                    Escolha uma {'\n'}data de início e {'\n'}fim do aluguel
                </Title>

                <SubTitle>
                    Conforto, segurança e praticidade
                </SubTitle>

            </Header>

            {
            loading ? <LoadAnimation /> :
                <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                    <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                </Appointments>

                <FlatList
                    data={cars}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CarWrapper>
                          <Car data={item.car} />
                          <CarFooter>
                            <CarFooterTitle>Período</CarFooterTitle>
                              <CarFooterPeriod>
                                <CarFooterDate>{item.startDate}</CarFooterDate>
                                <AntDesign
                                    name='arrowright'
                                    size={20}
                                    color={theme.colors.title}
                                    style={{ marginHorizontal: 10 }}
                                />
                              <CarFooterDate>{item.endDate}</CarFooterDate>
                            </CarFooterPeriod>
                        </CarFooter>
                        </CarWrapper>
                      )}
                />
                </Content>
            }
        </Container>
    );
}