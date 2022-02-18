import React from 'react'
import HomeScreen from './screens/home'
import PopularArticlesScreen from './screens/popular'
import RecommendedArticlesScreen from './screens/recommendation'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {RFValue} from 'react-native-responsive-fontsize'

export default function App() {
  return (
    <AppContainer/>
  );
}

const AppTopNavigation = createMaterialTopTabNavigator({
  RecommendedArticles:{
    screen:RecommendedArticlesScreen,
    navigationOptions:{
      tabBarLabel:'Recommended',
      tabBarOptions:{
        tabStyle:{backgroundColor:'cyan'},
        labelStyle:{color:'blue'},
        indicatorStyle:{backgroundColor:'cyan'}
      }
    }
  },
  PopularArticles:{
    screen:PopularArticlesScreen,
    navigationOptions:{
      tabBarLabel:'Popular',
      tabBarOptions:{
        tabStyle:{backgroundColor:'cyan'},
        labelStyle:{color:'blue'},
        indicatorStyle:{backgroundColor:'blue'}
      }
    }
  }
})

const AppStackNavigator = createStackNavigator({
  Home:{
    screen:HomeScreen,
    navigationOptions:{headerShown:false}
  },
  AppTopNavigation:{
    screen:AppTopNavigation,
    navigationOptions:{
      headerBackTitle:null,
      headerTintColor:'cyan',
      headerTitle:'Recommended Articles',
      headerStyle:{backgroundColor:'#D500F9'},
      headerTitleStyle:{color:'cyan', fontWeight:'bold', fontSize:RFValue(18)}
    }
  }
},{
  initialRouteName: 'Home'
}
)

const AppContainer = createAppContainer(AppStackNavigator)