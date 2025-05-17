import { Heading, Icon, Text } from "@gluestack-ui/themed";
import { HStack, Image, VStack } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

type ExerciseCardProps = TouchableOpacityProps & {
  data: ExerciseDTO
}

export function ExerciseCard({ data, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="$gray500" alignItems="center" p="$2" pr="$4" rounded="$md" mb="$3">
        <Image 
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
          alt="Imagem de um exercício"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="$lg" color="$white" fontFamily="$heading">
            {data.name}
          </Heading>

          <Text fontSize="$sm" color="$gray200" fontFamily="$body" numberOfLines={2} mt="$1">
            {data.series} séries de {data.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={ChevronRight} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}