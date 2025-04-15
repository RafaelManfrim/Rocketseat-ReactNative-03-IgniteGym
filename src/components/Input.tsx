import { Input as GluestackInput, InputField } from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type InputProps = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean
}

export function Input({ isReadOnly = false, ...rest }: InputProps) {
  return (
    <GluestackInput 
      h="$14" 
      borderWidth="$1"
      borderColor="$gray700"
      borderRadius="$md"
      $focus={{
        borderWidth: "$1",
        borderColor: "$green500",
      }}
      isReadOnly={isReadOnly}
      opacity={isReadOnly ? 0.5 : 1}
    >
      <InputField 
        bg="$gray700"
        px="$4"
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...rest} 
      />
    </GluestackInput>
  )
}