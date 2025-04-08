import { HomeHeader } from "@components/HomeHeader";
import { Text, VStack } from "@gluestack-ui/themed";

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />
      <Text>
        Home Screen
      </Text>
    </VStack>
  )
}