import { useState } from "react";
import { Heading, Text, VStack } from "@gluestack-ui/themed";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { SectionList } from "react-native";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '22.07.24',
      data: ['Puxada frontal', 'Remada unilateral'],
    },
    {
      title: '23.07.24',
      data: ['Puxada frontal'],
    },
    {
      title: '24.07.24',
      data: ['Puxada frontal', 'Remada unilateral'],
    },
    {
      title: '25.07.24',
      data: ['Puxada frontal'],
    },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="$gray200" fontSize="$md" mt="$8" mb="$2" fontFamily="$heading">
            {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="$gray200" textAlign="center" fontFamily="$body">
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer execícios hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}