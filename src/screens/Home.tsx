import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ToastMessage } from "@components/ToastMessage";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Text, useToast } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { HStack, VStack } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState('antebraço');

  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);

  const toast = useToast()

  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: number) {
    navigation.navigate('exercise', { exerciseId });
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);

    } catch (error) {
      console.log(error);

      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

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
    } 
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);

      setExercises(response.data);

    } catch (error) {
      console.log(error);

      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios';

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
    fetchGroups();
  }, [])

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup();
  }, [groupSelected]))

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32, gap: 8 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px="$8">
          <HStack justifyContent="space-between" alignItems="center" mb="$5">
            <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
              Exercícios
            </Heading>

            <Text color="$gray200" fontSize="$sm" fontFamily="$body">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList 
            data={exercises}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ExerciseCard 
                key={item.id} 
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)} 
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  )
}