import { Stack } from 'expo-router/stack';
import { RecoilRoot } from 'recoil';

export default function Layout() {
  return (
    <RecoilRoot>
      <Stack
        initialRouteName='index'
        screenOptions={{ headerShown: false }}
      />
    </RecoilRoot>
  )
};
