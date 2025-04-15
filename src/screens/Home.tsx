import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Text } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { HStack, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { FlatList } from "react-native";

export function Home() {
  const [groups, setGroups] = useState([
    "Costas",
    "Bíceps",
    "Tríceps",
    "Ombro",
  ]);
  const [groupSelected, setGroupSelected] = useState('Costas')

  const [exercises, setExercises] = useState([
    {
      id: '1',
      name: 'Supino reto',
      series: 3,
      repetitions: 10,
    },
    {
      id: '2',
      name: 'Supino inclinado',
      series: 3,
      repetitions: 10,
    },
    {
      id: '3',
      name: 'Supino declinado',
      series: 3,
      repetitions: 10,
    },
    {
      id: '4',
      name: 'Supino reto',
      series: 3,
      repetitions: 10,
    },
    {
      id: '5',
      name: 'Supino reto',
      series: 3,
      repetitions: 10,
    },
    {
      id: '6',
      name: 'Supino reto',
      series: 3,
      repetitions: 10,
    },
    {
      id: '7',
      name: 'Supino reto',
      series: 3,
      repetitions: 10,
    },
    {
      id: '8',
      name: 'Supino reto',
      series: 3,
      repetitions: 10,
    },
    {
      id: '9',
      name: 'Supino reto',
      series: 3,
      repetitions: 10,
    },
    {
      id: '10',
      name: 'Supino reto',
      series: 3,
      repetitions: 10,
    },
  ]);

  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExerciseCard key={item.id} onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}