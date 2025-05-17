import { useCallback, useState } from "react";
import { Heading, Text, useToast, VStack } from "@gluestack-ui/themed";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { SectionList } from "react-native";
import { ToastMessage } from "@components/ToastMessage";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "@components/Loading";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get('history');
      setExercises(response.data);
    } catch (error) {
      console.log(error);
      
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico';

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

  useFocusEffect(useCallback(() => {
    fetchHistory();
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />
      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <HistoryCard data={item} />}
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
      )}
    </VStack>
  )
}