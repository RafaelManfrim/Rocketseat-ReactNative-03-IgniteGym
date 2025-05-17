import { Heading, HStack, Icon, Text, VStack, Image, Box } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { AppNavigationRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg"
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/Button";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useToast } from "@gluestack-ui/themed";
import { ToastMessage } from "@components/ToastMessage";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

type RoutesParams = {
  exerciseId: number;
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const navigation = useNavigation<AppNavigationRoutesProps>();

  const toast = useToast()
  const route = useRoute();

  const { exerciseId } = route.params as RoutesParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleExerciseHistoryRegister() {
    try {
      setIsSubmittingRegister(true);
      await api.post(`/history/`, { exercise_id: exerciseId })

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id} 
            action="success"
            title="Exercício registrado no seu histórico"
            onClose={() => toast.close(id)}
          />
        )
      })

      navigation.navigate('history');
    } catch (error) {
      console.log(error);
      
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível registrar o exercício';

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
      setIsSubmittingRegister(false);
    }
  }


  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      console.log(error);
      
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';

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
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <VStack px="$8" pt="$12" bg="$gray600">
            <TouchableOpacity onPress={handleGoBack}>
              <Icon as={ArrowLeft} color="$green600" size="xl" />
            </TouchableOpacity>
            <HStack justifyContent="space-between" alignItems="center" mt="$4" mb="$8">
              <Heading
                color="$gray100"
                fontFamily="$heading"
                fontSize="$lg"
                flexShrink={1}
              >
                {exercise.name}
              </Heading>

              <HStack alignItems="center" >
                <BodySvg />

                <Text color="$gray200" ml="$1" textTransform="capitalize">
                  {exercise.group}
                </Text>
              </HStack>
            </HStack>
          </VStack>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>  
            <VStack p="$8">
              <Box mb="$3" rounded="$lg" overflow="hidden">
                <Image 
                  source={{
                    uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                  }}
                  alt={exercise.name}
                  p="$8"
                  resizeMode="cover"
                  w="$full"
                  h="$80"
                />
              </Box>

              <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
                <HStack
                  alignItems="center"
                  justifyContent="space-around"
                  mb="$6"
                  mt="$5"
                >
                  <HStack>
                    <SeriesSvg />
                    <Text color="$gray200" ml="$2">
                      {exercise.series} séries
                    </Text>
                  </HStack>

                  <HStack>
                    <RepetitionsSvg />
                    <Text color="$gray200" ml="$2">
                      {exercise.repetitions} repetições
                    </Text>
                  </HStack>
                </HStack>

                <Button 
                  title="Marcar como realizado" 
                  isLoading={isSubmittingRegister}
                  onPress={handleExerciseHistoryRegister}
                />
              </Box>
            </VStack>
          </ScrollView>
        </>
      )}
    </VStack>
  )
}