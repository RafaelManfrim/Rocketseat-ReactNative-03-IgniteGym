import AsyncStorage from "@react-native-async-storage/async-storage"

import { AUTH_TOKEN_STORAGE } from "@storage/config"

type StorageAuthTokenProps = {
  token: string
  refresh_token: string
}

export async function storageAuthTokenSave({token, refresh_token}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token, refresh_token }))
}

export async function storageAuthTokenGet() {
  const tokensStorage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  const tokens: StorageAuthTokenProps = tokensStorage ? JSON.parse(tokensStorage) : {}

  return tokens
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}