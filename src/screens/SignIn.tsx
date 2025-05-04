import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';
import { ToastMessage } from '@components/ToastMessage';
import { useState } from 'react';

type FormDataProps = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("Informe o e-mail"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos").required("Informe a senha"),
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  })

  const { signIn } = useAuth()
  const toast = useToast()

  const navigator = useNavigation<AuthNavigationRoutesProps>()

  function handleNavigateToSignUp() {
    navigator.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tarde."

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id} 
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        )
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          w="$full"
          h={624}
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          position="absolute"
        />

        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />

            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e seu corpo
            </Text>
          </Center>

          <Center gap="$2">
            <Heading color="$gray100">Acesse a conta</Heading>

            <Controller 
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="E-mail" 
                  keyboardType="email-address" 
                  autoCapitalize="none" 
                  onChangeText={onChange} 
                  value={value} 
                  errorMessage={formState.errors?.email?.message}
                />
              )}
            />

            <Controller 
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input 
                  placeholder="Senha" 
                  secureTextEntry 
                  onChangeText={onChange} 
                  value={value} 
                  errorMessage={formState.errors?.password?.message}
                  onSubmitEditing={handleSubmit(handleSignIn)} 
                  returnKeyType="send" 
                />
              )}
            />

            <Button 
              title="Acessar" 
              isLoading={isLoading}
              onPress={handleSubmit(handleSignIn)} 
            />
          </Center>

          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
              Ainda não tem acesso?
            </Text>

            <Button title="Criar conta" variant="outline" onPress={handleNavigateToSignUp} />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
