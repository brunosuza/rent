import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { 
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import { signIn } from '../../hooks';
import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import theme from '../../styles/theme';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Footer,
    Form
} from './styles';
import api from '../../services/api';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

interface User {
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
}

interface AuthState {
    token: string;
    user: User;
}

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const theme = useTheme();
  const navigation = useNavigation<any>();
  const { signIn } = useAuth();

   async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha obrigatória')
      });

      await schema.validate({ email, password });
     
      if (email && password) {
        signIn({ email, password });
      }

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message)
      } else {
        Alert.alert('Erro na autenticação: ', error.message)
      }
    }
  }

    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep');
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar 
                        barStyle='dark-content'
                        backgroundColor='transparent'
                        translucent
                    />
                    <Header>
                        <Title>
                            Estamos{'\n'}quase lá.
                        </Title>
                        <SubTitle>
                            Faça seu login para começar{'\n'}
                            uma experiência incrível.
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input 
                            iconName='mail' 
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'  
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput 
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title='Login'
                            onPress={handleSignIn}
                            enabled={true}
                            loading={false}
                        />
                        <Button
                            title='Criar conta gratuita'
                            color={theme.colors.background_secondary}
                            light
                            onPress={handleNewAccount}
                            enabled
                            loading={false}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}