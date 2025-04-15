import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

export function HistoryCard() {
  return (
    <HStack w="$full" px="$5" py="$4" bg="$gray600" rounded="$md" mb="$3" alignItems="center" justifyContent="space-between">
      <VStack flex={1} mr="$5">
        <Heading
          fontSize="$md"
          color="$white"
          fontFamily="$heading"
          textTransform="capitalize"
          numberOfLines={1}
        >
          Costas
        </Heading>
        <Text color="$gray100" fontSize="$lg" fontFamily="$body" numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>

      <Text color="$gray300" fontSize="$md">
        8:30
      </Text>
    </HStack>
  )
}