import { Center, Heading, Image, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";

export function SignUp() {
  const navigator = useNavigation<AuthNavigationRoutesProps>();

  function handleNavigateToSignIn() {
    navigator.navigate("signIn");
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
            <Heading color="$gray100">Crie sua conta</Heading>

            <Input placeholder="Nome" />
            <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
            <Input placeholder="Senha" secureTextEntry />

            <Button title="Criar e acessar" />
          </Center>

          <Center flex={1} justifyContent="flex-end" mt="$4">
            <Button title="Voltar para o login" variant="outline" onPress={handleNavigateToSignIn} />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}