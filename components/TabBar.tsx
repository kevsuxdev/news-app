import { View, Text, Platform } from 'react-native'
import { useLinkBuilder, useTheme } from '@react-navigation/native'
import { PlatformPressable } from '@react-navigation/elements'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import Entypo from '@expo/vector-icons/Entypo'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Feather from '@expo/vector-icons/Feather'

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { colors } = useTheme()
  const { buildHref } = useLinkBuilder()

  const icon: any = {
    index: (props: any) => (
      <Feather name='home' size={20} color={props.color} />
    ),
    trending: (props: any) => (
      <Entypo name='new' size={20} color={props.color} />
    ),
    following: (props: any) => (
      <MaterialCommunityIcons
        name='format-list-text'
        size={20}
        color={props.color}
      />
    ),
    favorites: (props: any) => (
      <MaterialIcons name='favorite-outline' size={20} color={props.color} />
    ),
  }

  return (
    <View
      style={{ boxShadow: '-3px 4px 5px #a6a6a6' }}
      className='flex-row absolute bottom-10 bg-white border border-gray-200 rounded-full p-4 py-5 z-10'
    >
      {state.routes.map((route: any, index: any) => {
        const renderIcon =
          icon[route.name] ||
          (() => <Feather name='help-circle' size={20} color='gray' />)

        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className='flex-1 items-center justify-center'
          >
            {renderIcon({ color: isFocused ? '#064EE9' : 'black' })}
            <Text
              style={{ color: isFocused ? '#064EE9' : 'black' }}
              className='text-sm font-nunito-bold tracking-wider'
            >
              {label}
            </Text>
          </PlatformPressable>
        )
      })}
    </View>
  )
}
