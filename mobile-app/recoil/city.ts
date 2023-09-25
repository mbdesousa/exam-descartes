import { atom } from 'recoil'
import { CityData } from '../interfaces/city'

export const cityDataState = atom<CityData | undefined>({
  key: 'cityData',
  default: undefined
})
